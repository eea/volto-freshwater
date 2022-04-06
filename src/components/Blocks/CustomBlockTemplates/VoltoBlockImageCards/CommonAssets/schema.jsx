export const CommonCardsSchemaExtender = ({ data, schema, intl }) => {
  return {
    fieldsets: [
      {
        id: 'style',
        title: 'Cards styling',
        fields: ['text_align'],
      },
      {
        id: 'settings',
        title: 'Settings',
        fields: ['cards_per_row'],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        fields: ['custom_class'],
      },
    ],
    properties: {
      text_align: {
        title: 'Text align',
        widget: 'text_align',
        default: 'left',
      },
      cards_per_row: {
        title: 'Cards per row',
        type: 'number',
        description:
          'A group of cards can set how many cards should exist in a row.',
      },
      custom_class: {
        title: 'Custom CSS Class',
        description: 'A custom CSS class, aplicable to this block',
      },
    },
  };
};
