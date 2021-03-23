export const CommonCardsSchemaExtender = (schema, data) => {
  schema.fieldsets[0].fields.splice(4, 0, 'cards_per_line');
  schema.fieldsets[0].fields.splice(4, 0, 'border_top_width');
  schema.properties.cards_per_line = {
    title: 'Cards per line on desktop',
    type: 'string',
    choices: [
      ['three', 'Three cards'],
      ['four', 'Four cards'],
      ['five', 'Five cards'],
    ],
  };

  schema.properties.border_top_width = {
    title: 'Card top border height',
    type: 'string',
    default: '15px',
  };

  return schema;
};
