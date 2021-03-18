import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';

export const PresentationCardsSchemaExtender = (schema, data) => {
  if (!data.display === 'presentation_cards') return schema;
  schema = cloneDeep(schema);
  schema.fieldsets[0].fields.push('border_color');
  schema.properties.cards.schema.fieldsets[0].fields.splice(1, 0, 'item_type');
  schema.properties.cards.schema.properties.item_type = {
    type: 'string',
    title: 'Type of item',
  };
  schema.properties.border_color = {
    widget: 'style_simple_color',
    title: 'Card top border color',
    type: 'color',
    default: '#FFF',
    available_colors: config.settings.available_colors,
  };

  return schema;
};
