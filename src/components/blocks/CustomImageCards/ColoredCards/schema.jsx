import config from '@plone/volto/registry';

export const ColoredCardsSchemaExtender = (schema, data) => {
  schema.fieldsets[0].fields.push('text_color');
  schema.fieldsets[0].fields.push('background_color');

  schema.properties.text_color = {
    widget: 'style_simple_color',
    title: 'Card Text color',
    type: 'color',
    available_colors: config.settings.available_colors,
  };
  schema.properties.background_color = {
    widget: 'style_simple_color',
    title: 'Card Background color',
    type: 'color',
    available_colors: config.settings.available_colors,
    field_props: {
      available_colors: config.settings.available_colors,
    },
  };

  return schema;
};
