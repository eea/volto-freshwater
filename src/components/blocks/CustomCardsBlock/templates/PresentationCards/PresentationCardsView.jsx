import React from 'react';
import { Card } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import { serializeNodes } from 'volto-slate/editor/render';
import config from '@plone/volto/registry';
import cx from 'classnames';

import './css/presentationcards.less';

export const CardItem = (props) => {
  const {
    source,
    title,
    description,
    hide_description,
    item_type,
    link,
    border_color,
    attachedimage,
    image_height = '220px',
    image_scale,
    isEditMode,
  } = props;

  const leadImage = source?.[0]?.lead_image;

  return (
    <>
      {link && !isEditMode ? (
        <div
          className="ui card presentation-card has-link"
          style={
            border_color
              ? {
                  borderTop: `8px solid ${border_color}`,
                }
              : {}
          }
        >
          <div className="content presentation-card-content">
            <UniversalLink className="presentation-card-link" href={link}>
              <>
                {leadImage && !attachedimage ? (
                  <LazyLoadComponent>
                    <div
                      className="presentation-card-image"
                      style={{
                        backgroundImage: `url(${props.source?.[0]['@id']
                          .replace(config.settings.apiPath, '')
                          .replace(
                            config.settings.internalApiPath,
                            '',
                          )}/@@images/image/${image_scale || 'large'})`,
                        minHeight: `${image_height}`,
                      }}
                    ></div>
                  </LazyLoadComponent>
                ) : (
                  <LazyLoadComponent>
                    <div
                      className="presentation-card-image"
                      style={
                        attachedimage
                          ? {
                              backgroundImage: `url(${getScaleUrl(
                                getPath(attachedimage),
                                image_scale || 'large',
                              )})`,
                              minHeight: `${image_height}`,
                            }
                          : {}
                      }
                    ></div>
                  </LazyLoadComponent>
                )}

                <div className="presentation-cards-content-wrapper">
                  {title && (
                    <div className="presentation-card-header">{title}</div>
                  )}

                  {!hide_description && description && (
                    <div className="presentation-card-description">
                      <p>{description}</p>
                    </div>
                  )}
                </div>
              </>
            </UniversalLink>
          </div>

          {item_type && (
            <div className="extra content">
              <div className="left floated card_item_type">{item_type}</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="ui card presentation-card"
          style={
            border_color
              ? {
                  borderTop: `8px solid ${border_color}`,
                }
              : {}
          }
        >
          <div className="content presentation-card-content">
            <div className="presentation-card-link">
              <>
                {leadImage && !attachedimage ? (
                  <LazyLoadComponent>
                    <div
                      className="presentation-card-image"
                      style={{
                        backgroundImage: `url(${props.source?.[0]['@id']
                          .replace(config.settings.apiPath, '')
                          .replace(
                            config.settings.internalApiPath,
                            '',
                          )}/@@images/image/${image_scale || 'large'})`,
                        minHeight: `${image_height}`,
                      }}
                    ></div>
                  </LazyLoadComponent>
                ) : (
                  <LazyLoadComponent>
                    <div
                      className="presentation-card-image"
                      style={
                        attachedimage
                          ? {
                              backgroundImage: `url(${getScaleUrl(
                                getPath(attachedimage),
                                image_scale || 'large',
                              )})`,
                              minHeight: `${image_height}`,
                            }
                          : {}
                      }
                    ></div>
                  </LazyLoadComponent>
                )}

                <div className="presentation-cards-content-wrapper">
                  {title && (
                    <div className="presentation-card-header">{title}</div>
                  )}

                  {!hide_description && description && (
                    <div className="presentation-card-description">
                      <p>{description}</p>
                    </div>
                  )}
                </div>
              </>
            </div>
          </div>

          {item_type && (
            <div className="extra content">
              <div className="left floated card_item_type">{item_type}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const PresentationCardsView = ({ data, isEditMode }) => {
  const {
    title,
    text,
    cards,
    border_color,
    image_bg_size,
    image_height,
    image_scale,
    cards_per_row,
    custom_class,
    text_align = 'left',
  } = data;

  return (
    <>
      {cards && cards.length > 0 ? (
        <div
          className={cx('block align presentation-cards-block', custom_class)}
        >
          <BodyClass className="has-card-tiles" />
          <div className="presentation-cards-grid-wrapper">
            <div className="presentation-cards-grid">
              {title && (
                <h2 className="presentation-cards-grid-title">{title}</h2>
              )}

              {text && (
                <div className="presentation-cards-grid-description">
                  {serializeNodes(text)}
                </div>
              )}

              <div style={{ textAlign: `${text_align}` }}>
                <Card.Group
                  className="presentation-cards-group"
                  itemsPerRow={cards_per_row ? cards_per_row : ''}
                >
                  {(cards || []).map((card, index) => (
                    <CardItem
                      key={index}
                      {...card}
                      border_color={border_color}
                      border_top_width={data.border_top_width}
                      image_bg_size={image_bg_size}
                      image_height={image_height}
                      image_scale={image_scale}
                      isEditMode={isEditMode}
                    />
                  ))}
                </Card.Group>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="block-info">Add cards from the sidebar</div>
      )}
    </>
  );
};

export default PresentationCardsView;
