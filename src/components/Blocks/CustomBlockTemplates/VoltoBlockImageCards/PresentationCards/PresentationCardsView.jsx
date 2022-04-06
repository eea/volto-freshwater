import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from 'volto-slate/editor/render';
import { Message } from 'semantic-ui-react';
import {
  CarouselCardsView,
  GroupCardsView,
} from '@eeacms/volto-freshwater/components/Blocks/CustomBlockTemplates/VoltoBlockImageCards';
import cx from 'classnames';
import { CommonCardsSchemaExtender } from '../CommonAssets/schema';
import config from '@plone/volto/registry';

import './css/presentationcards.less';

const PresentationCards = (props) => {
  const { data, editable } = props;
  const {
    title,
    text,
    cards,
    border_color,
    image_height,
    image_scale,
    text_align = 'left',
    cards_per_row,
    slider,
    slides_to_show,
    custom_class,
    display,
  } = data;

  const [refresh, forceRefresh] = React.useState(0);

  React.useEffect(() => {
    (cards || []).forEach((card, index) => {
      if (card.source?.length && !card.title) {
        card.title = card.source[0].title;
        card.description = card.source[0].Description;
        card.link = card.source[0].getURL;
        card.item_type = card.source[0]?.Type;
        forceRefresh(refresh + 1);
      }
    });
  }, [cards, refresh]);

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
                {slider ? (
                  <CarouselCardsView
                    cards={cards}
                    slides_to_show={slides_to_show}
                    border_color={border_color}
                    image_height={image_height}
                    image_scale={image_scale}
                    editable={editable}
                  />
                ) : (
                  <GroupCardsView
                    cards={cards}
                    cards_per_row={cards_per_row}
                    border_color={border_color}
                    image_height={image_height}
                    image_scale={image_scale}
                    editable={editable}
                    display={display}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{editable ? <Message>No image cards</Message> : ''}</>
      )}
    </>
  );
};

export default PresentationCards;

PresentationCards.schema = () => ({
  title: 'Image Cards',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'source',
        'title',
        'description',
        'hide_description',
        'attachedimage',
        'link',
        'item_type',
      ],
    },
  ],
  properties: {
    source: {
      widget: 'object_browser',
      mode: 'link',
      title: 'Source',
      description: 'Choose an existing content as source for this card',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    description: {
      type: 'textarea',
      title: 'Description',
    },
    hide_description: {
      type: 'boolean',
      title: 'Hide description',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
      description: 'Override or upload a new image',
    },
    item_type: {
      type: 'string',
      title: 'Type of item',
    },
  },

  required: [],
});

PresentationCards.schemaExtender = (schema, data, intl) => {
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

  Common.properties.image_height = {
    type: 'string',
    title: 'Image height',
    default: '220px',
  };

  Common.properties.slider = {
    title: 'Activate slider',
    type: 'boolean',
    default: false,
  };

  Common.properties.slides_to_show = {
    title: 'Cards to show',
    type: 'number',
    description: 'Number of cards to show at a time.',
    default: '4',
  };

  Common.fieldsets[0].fields.push('text_color', 'border_color', 'image_height');
  Common.fieldsets[1].fields.push('slider', 'slides_to_show');

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
