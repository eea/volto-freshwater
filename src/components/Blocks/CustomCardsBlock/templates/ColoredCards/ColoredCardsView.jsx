import React from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import cx from 'classnames';

import arrowSVG from '@plone/volto/icons/backspace.svg';
import './css/coloredcards.less';

export const CardItem = (props) => {
  const { title, text, link, border_color, text_color, isEditMode } = props;

  return (
    <>
      {link && !isEditMode ? (
        <>
          <div className="ui card">
            <UniversalLink className="colored-card-link" href={link}>
              <div
                className="colored-card"
                style={
                  border_color
                    ? {
                        borderTop: `8px solid ${border_color}`,
                      }
                    : {}
                }
              >
                <div
                  className="content colored-card-content"
                  style={{
                    color: `${text_color}`,
                  }}
                >
                  {title && <div className="ui sub header">{title}</div>}

                  {text && (
                    <>
                      <div className="colored-card-description">
                        {serializeNodes(text)}
                      </div>
                      <div className="link-button">
                        <Icon
                          name={arrowSVG}
                          size="30px"
                          className="next-icon"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </UniversalLink>
          </div>
        </>
      ) : (
        <>
          <div className="ui card">
            <div className="colored-card-wrapper">
              <div
                className="colored-card"
                style={
                  border_color
                    ? {
                        borderTop: `8px solid ${border_color}`,
                      }
                    : {}
                }
              >
                <div
                  className="content colored-card-content"
                  style={{
                    color: `${text_color}`,
                  }}
                >
                  {title && <div className="ui sub header">{title}</div>}

                  {text && (
                    <div className="colored-card-description">
                      {serializeNodes(text)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ColoredCards = ({ data, isEditMode }) => {
  const { title, text, cards, cards_per_row, image_scale } = data;

  return (
    <>
      {cards && cards.length > 0 ? (
        <div className={cx('block align colored-cards-block')}>
          <BodyClass className="has-card-tiles" />
          <div className="colored-cards-grid-wrapper">
            <div className="colored-cards-grid">
              {title && <h4 className="colored-cards-grid-title">{title}</h4>}
              {text && (
                <div className="colored-card-grid-text">
                  {serializeNodes(text)}
                </div>
              )}

              <Card.Group
                className="colored-card-group"
                {...(cards_per_row && cards_per_row > 0
                  ? { itemsPerRow: cards_per_row }
                  : {})}
              >
                {(cards || []).map((card, index) => (
                  <CardItem
                    key={index}
                    {...card}
                    background_color={data.background_color}
                    border_color={data.border_color}
                    text_color={data.text_color}
                    image_scale={image_scale}
                    isEditMode={isEditMode}
                  />
                ))}
              </Card.Group>
            </div>
          </div>
        </div>
      ) : (
        <div className="block-info">Add cards from the sidebar</div>
      )}
    </>
  );
};

export default ColoredCards;
