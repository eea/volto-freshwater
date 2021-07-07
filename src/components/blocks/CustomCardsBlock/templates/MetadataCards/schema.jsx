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
        // 'link',
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
    // link: {
    //   widget: 'url',
    //   title: 'Link',
    // },
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

export const MetadataCardsSchemaExtender = (schema, data) => {
  const defaultFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id === 'default',
  )[0];

  const restOfFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id !== 'default',
  )[0];

  return {
    title: 'Metadata cards',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...(defaultFieldsets?.fields || {}), 'cards'],
      },
      {
        id: 'style',
        title: 'Cards styling',
        fields: [
          'image_scale',
          'image_height',
          'border_color',
          'text_align',
          'fluid_cards',
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
      fluid_cards: {
        title: 'Fluid cards',
        type: 'boolean',
        default: false,
      },
      text_align: {
        title: 'Text align',
        widget: 'text_align',
        default: 'left',
      },
      ...(schema.properties || {}),
    },
    required: ['display', 'cards'],
  };
};
