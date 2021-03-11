import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';

export const ColoredCardsSchemaExtender = (schema, data) => {
  if (!data.display === 'colored_cards') return schema;
  schema = cloneDeep(schema);
  schema.fieldsets[0].fields.push('text_color');
  schema.fieldsets[0].fields.push('background_color');
  schema.fieldsets[0].fields.push('font_size');
  schema.properties.cards.schema.fieldsets[0].fields.splice(1, 0, 'sub_title');
  schema.properties.cards.schema.properties.sub_title = {
    type: 'string',
    title: 'Sub-title',
  };
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

  schema.properties.font_size = {
    title: 'Card Font size',
    description: 'Relative to normal size of text in the block',
    choices: [
      ['p_size', 'Normal text'],
      ['h_size', 'Headers text'],
    ],
  };

  return schema;
};
