import config from '@plone/volto/registry';

const CardsGrid = () => ({
  title: 'Colored Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'title',
        'text',
        'attachedimage',
        'link',
        'copyright',
        'background_color',
        'text_color',
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
    link: {
      widget: 'object_by_list',
      title: 'Link',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
    },
    copyright: {
      widget: 'slate_richtext',
      title: 'Copyright',
    },
    text_color: {
      widget: 'style_simple_color',
      title: 'Card Text color',
      type: 'color',
      available_colors: config.settings.available_colors,
    },
    background_color: {
      widget: 'style_simple_color',
      title: 'Card Background color',
      type: 'color',
      available_colors: config.settings.available_colors,
      field_props: {
        available_colors: config.settings.available_colors,
      },
    },
  },

  required: ['attachedimage'],
});
