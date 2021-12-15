import config from '@plone/volto/registry';

const Card = () => ({
  title: 'Card',
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
      description: 'Rich text, double click on text for toolbar',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
  },

  required: ['attachedimage'],
});

export const ColoredCardsSchemaExtender = (schema, data) => {
  const defaultFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id === 'default',
  )[0];

  const restOfFieldsets = schema.fieldsets.filter(
    (fieldset) => fieldset.id !== 'default',
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
        title: 'Cards styling',
        fields: ['text_color', 'border_color', 'cards_per_row'],
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
      text_color: {
        widget: 'style_simple_color',
        title: 'Text color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Top border color',
        type: 'color',
        default: '#FFF',
        available_colors: config.settings.available_colors,
      },
      cards_per_row: {
        title: 'Cards per row',
        type: 'number',
        description:
          'A group of cards can set how many cards should exist in a row.',
      },
      ...(schema.properties || {}),
    },
    required: ['display', 'cards'],
  };
};
