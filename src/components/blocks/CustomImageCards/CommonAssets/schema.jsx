export const CommonCardsSchemaExtender = (schema, data) => {
  schema.fieldsets[0].fields.splice(4, 0, 'border_top_width');
  schema.fieldsets[0].fields.splice(-1, 0, 'fluid_cards');

  schema.properties.border_top_width = {
    title: 'Card top border height',
    type: 'string',
    default: '15px',
  };

  schema.properties.fluid_cards = {
    title: 'Fluid cards',
    type: 'boolean',
    default: false,
  };

  return schema;
};
