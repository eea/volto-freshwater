import config from '@plone/volto/registry';

const Card = () => ({
  title: 'Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'sub_title', 'text', 'attachedimage', 'link'],
    },
  ],
  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    sub_title: {
      type: 'string',
      title: 'Sub-title',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
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

export const ColoredCardsSchemaExtender = (schema, data) => {
  const defaultFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id === 'default',
  )[0];

  return {
    title: 'Colored cards',
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
          'background_color',
          'text_color',
          'border_color',
          'border_top_width',
          'font_size',
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
      text_color: {
        widget: 'style_simple_color',
        title: 'Card Text color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      background_color: {
        widget: 'style_simple_color',
        title: 'Card Background color',
        type: 'color',
        available_colors: config.settings.available_colors,
        field_props: {
          available_colors: config.settings.available_colors,
        },
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Card top border color',
        type: 'color',
        default: '#FFF',
        available_colors: config.settings.available_colors,
      },
      border_top_width: {
        title: 'Card top border height',
        type: 'string',
        default: '15px',
      },
      font_size: {
        title: 'Card Font size',
        description: 'Relative to normal size of text in the block',
        choices: [
          ['p_size', 'Normal text'],
          ['h_size', 'Headers text'],
        ],
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
