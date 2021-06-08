import config from '@plone/volto/registry';

const Card = () => ({
  title: 'Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'source',
        'title',
        'hide_title',
        'description',
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
    hide_title: {
      title: 'Hide title',
      type: 'boolean',
      default: false,
    },
    description: {
      type: 'textarea',
      title: 'Text',
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

export const PresentationCardsSchemaExtender = (schema, data) => {
  const defaultFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id === 'default',
  )[0];

  return {
    title: 'Presentation cards',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...(defaultFieldsets?.fields || {}), 'cards'],
      },
      {
        id: 'style',
        title: 'Style',
        fields: [
          'image_height',
          'border_top_width',
          'border_color',
          'fluid_cards',
        ],
      },
    ],
    properties: {
      cards: {
        widget: 'object_list',
        title: 'Cards',
        description: 'Add a list of Cards',
        schema: Card(),
      },
      border_top_width: {
        title: 'Card top border height',
        type: 'string',
        default: '15px',
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Card top border color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      image_height: {
        type: 'string',
        title: 'Image height',
        default: '220px',
      },
      fluid_cards: {
        title: 'Fluid cards',
        type: 'boolean',
        default: false,
      },
      ...(schema.properties || {}),
    },
    required: ['display', 'cards'],
  };
};
