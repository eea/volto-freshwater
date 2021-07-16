import config from '@plone/volto/registry';

const ImageCard = () => ({
  title: 'Image Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'source',
        'title',
        'hide_title',
        'description',
        'text',
        'attachedimage',
        'link',
        'item_type',
      ],
    },
  ],
  properties: {
    source: {
      widget: 'object_browser',
      mode: 'link',
      title: 'Source',
      description: 'Choose an existing content as source for this card',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    hide_title: {
      title: 'Hide title',
      type: 'boolean',
      default: false,
    },
    description: {
      widget: 'textarea',
      title: 'Description',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
      description: 'Override or upload a new image',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
    item_type: {
      type: 'string',
      title: 'Type of item',
    },
  },

  required: [],
});

export const PresentationCardsSchemaExtender = (schema, data) => {
  const display_types_obj =
    config.blocks.blocksConfig.imagecards.blockRenderers;

  const display_types = Object.keys(display_types_obj).map((template) => [
    template,
    display_types_obj[template].title || template,
  ]);

  return {
    title: 'Presentation Cards',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'text', 'display', 'align', 'image_scale', 'cards'],
      },
      {
        id: 'style',
        title: 'Style',
        fields: [
          'border_top_width',
          'border_color',
          'image_bg_size',
          'image_bg_min_size',
          'fluid_cards',
        ],
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
      },
      display: {
        title: 'Display',
        choices: [...display_types],
      },
      cards: {
        widget: 'object_list',
        title: 'Cards',
        description: 'Add a list of Cards',
        schema: ImageCard(),
      },
      image_scale: {
        type: 'string',
        title: 'Image scale',
        default: 'large',
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        type: 'string',
      },
      border_top_width: {
        title: 'Card top border height',
        type: 'string',
        default: '15px',
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Card top border color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      image_bg_size: {
        title: 'Card image size',
        choices: [
          ['contain', 'Contains header area'],
          ['cover', 'Covers header area'],
        ],
        default: 'contain',
      },
      image_bg_min_size: {
        type: 'string',
        title: 'Background image height',
        default: '90px',
      },
      fluid_cards: {
        title: 'Fluid cards',
        type: 'boolean',
        default: false,
      },
    },
    required: ['display', 'cards'],
  };
};
