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

  required: ['title'],
});

export const PresentationCardsSchemaExtender = (schema, data) => {
  const defaultFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id === 'default',
  )[0];

  const restOfFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id !== 'default',
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
        title: 'Styling',
        fields: ['image_scale', 'image_height', 'border_color', 'text_align'],
      },
      {
        id: 'display',
        title: 'Display',
        fields: [
          ...(!data.slider ? ['cards_per_row'] : []),
          'slider',
          ...(data.slider ? ['slides_to_show'] : []),
        ],
      },
      { ...restOfFieldsets },
    ],
    properties: {
      cards: {
        widget: 'object_list',
        title: 'Cards',
        description: 'Add a list of Cards',
        schema: Card(),
      },
      image_scale: {
        title: 'Image scale',
        choices: [
          ['preview', 'Preview'],
          ['large', 'Large'],
          ['panoramic', 'Panoramic'],
        ],
        default: 'large',
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Top border color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      image_height: {
        type: 'string',
        title: 'Image height',
        default: '220px',
      },
      cards_per_row: {
        title: 'Cards per row',
        type: 'number',
        description:
          'A group of cards can set how many cards should exist in a row.',
      },
      text_align: {
        title: 'Text align',
        widget: 'text_align',
        default: 'left',
      },
      slider: {
        title: 'Activate slider',
        type: 'boolean',
        default: false,
      },
      slides_to_show: {
        title: 'Cards to show',
        type: 'number',
        description: 'Number of cards to show at a time.',
        default: '4',
      },
      ...(schema.properties || {}),
    },
    required: ['display', 'cards'],
  };
};
