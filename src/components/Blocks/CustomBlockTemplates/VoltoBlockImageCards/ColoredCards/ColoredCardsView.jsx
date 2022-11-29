import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { CommonCardsSchemaExtender } from '../CommonAssets/schema';
import cx from 'classnames';

import arrowSVG from '@plone/volto/icons/backspace.svg';
import './css/coloredcards.less';

export const CardItem = (props) => {
  const { title, text, link, border_color, text_color, editable } = props;

  return (
    <>
      {link && !editable ? (
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

const ColoredCards = (props) => {
  const { data, editable } = props;
  const {
    title,
    text,
    cards,
    cards_per_row,
    image_scale,
    custom_class,
    text_align = 'left',
  } = data;

  return (
    <>
      {cards && cards.length > 0 ? (
        <div className={cx('block align colored-cards-block', custom_class)}>
          <BodyClass className="has-card-tiles" />
          <div className="colored-cards-grid-wrapper">
            <div
              className="colored-cards-grid"
              style={{ textAlign: `${text_align}` }}
            >
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
                    editable={editable}
                  />
                ))}
              </Card.Group>
            </div>
          </div>
        </div>
      ) : (
        <>{editable ? <Message>No image cards</Message> : ''}</>
      )}
    </>
  );
};

export default ColoredCards;

ColoredCards.schema = () => ({
  title: 'Image Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'text', 'link'],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
  },

  required: [],
});

ColoredCards.schemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });

  Common.properties.text_color = {
    widget: 'style_simple_color',
    title: 'Cards text color',
    type: 'color',
    available_colors: config.settings.available_colors,
  };

  Common.properties.border_color = {
    widget: 'style_simple_color',
    title: 'Top border color',
    type: 'color',
    default: '#FFF',
    available_colors: config.settings.available_colors,
  };

  Common.fieldsets[0].fields.push('text_color', 'border_color');

  return {
    ...schema,
    ...Common,
    properties: {
      ...schema.properties,
      ...Common.properties,
    },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};
