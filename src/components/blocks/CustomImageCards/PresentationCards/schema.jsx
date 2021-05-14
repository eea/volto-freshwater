import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';
import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

export const PresentationCardsSchemaExtender = (schema, data) => {
  if (!data.display === 'presentation_cards') return schema;
  schema = cloneDeep(schema);
  schema = CommonCardsSchemaExtender(schema, data);
  schema.fieldsets[0].fields.splice(4, 0, 'border_color');
  schema.fieldsets[0].fields.splice(4, 0, 'image_bg_size');
  schema.fieldsets[0].fields.splice(4, 0, 'image_bg_min_size');
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

  schema.properties.image_bg_size = {
    title: 'Card image size',
    choices: [
      ['contain', 'Contains header area'],
      ['cover', 'Covers header area'],
    ],
    default: 'contain',
  };

  schema.properties.image_bg_min_size = {
    type: 'string',
    title: 'Background image height',
    default: '90px',
  };

  return schema;
};
