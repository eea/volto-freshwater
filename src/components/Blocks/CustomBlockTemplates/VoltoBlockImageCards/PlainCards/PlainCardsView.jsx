import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { getScaleUrl, getPath } from '@eeacms/volto-freshwater/utils';
import { serializeNodes } from 'volto-slate/editor/render';
import { CommonCardsSchemaExtender } from '../CommonAssets/schema';
import config from '@plone/volto/registry';
import cx from 'classnames';

import './css/plaincards.less';

export const CardItem = (props) => {
  const { title, description, link, attachedimage, editable } = props;

  return (
    <>
      {link && !editable ? (
        <div className="ui card plain-card">
          <UniversalLink className="plain-card-link" href={link}>
            {attachedimage && (
              <LazyLoadComponent>
                <div
                  className="plain-card-image"
                  style={
                    attachedimage
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            getPath(attachedimage),
                            'thumb',
                          )})`,
                        }
                      : {}
                  }
                ></div>
              </LazyLoadComponent>
            )}

            {title && (
              <div className="content plain-card-content">
                <div className="plain-card-header">{title}</div>
              </div>
            )}

            {description && (
              <div className="content plain-card-content">
                <div className="plain-card-description">{description}</div>
              </div>
            )}
          </UniversalLink>
        </div>
      ) : (
        <div className="ui card plain-card">
          <div className="plain-card-wrapper">
            {attachedimage && (
              <LazyLoadComponent>
                <div
                  className="plain-card-image"
                  style={
                    attachedimage
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            getPath(attachedimage),
                            'thumb',
                          )})`,
                        }
                      : {}
                  }
                ></div>
              </LazyLoadComponent>
            )}

            {title && (
              <div className="content plain-card-content">
                <div className="plain-card-header">{title}</div>
              </div>
            )}

            {description && (
              <div className="content plain-card-content">
                <div className="plain-card-description">{description}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const PlainCards = (props) => {
  const { data, editable } = props;
  const { title, text, cards, custom_class } = data;
  return (
    <>
      {cards && cards.length > 0 ? (
        <div className={cx('block align plain-cards-block', custom_class)}>
          <BodyClass className="has-card-tiles" />
          <div className="plain-cards-grid-wrapper">
            <div className="plain-cards-grid">
              {title && <h2 className="plain-cards-grid-title">{title}</h2>}

              {text && (
                <div className="plain-cards-grid-description">
                  {serializeNodes(text)}
                </div>
              )}

              <Card.Group className="plain-card-group">
                {(cards || []).map((card, index) => (
                  <CardItem key={index} {...card} editable={editable} />
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

export default PlainCards;

PlainCards.schema = () => ({
  title: 'Image Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'attachedimage', 'link'],
    },
  ],
  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    description: {
      type: 'textarea',
      title: 'Description',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
    },
  },

  required: ['attachedimage'],
});

PlainCards.schemaExtender = (schema, data, intl) => {
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
