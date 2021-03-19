export const CommonCardsSchemaExtender = (schema, data) => {
  schema.fieldsets[0].fields.splice(4, 0, 'cards_per_line');
  schema.properties.cards_per_line = {
    title: 'Cards per line on desktop',
    type: 'string',
    choices: [
      ['three', 'Three cards'],
      ['four', 'Four cards'],
      ['five', 'Five cards'],
    ],
  };

  return schema;
};
