import config from '@plone/volto/registry';

const CustomCards = (props) => {
  const display_types_obj =
    config.blocks.blocksConfig.customCardsBlock.blockRenderers;

  const display_types = Object.keys(display_types_obj).map((template) => [
    template,
    display_types_obj[template].title || template,
  ]);

  return {
    title: 'Cards',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'text', 'display', 'align', 'custom_class'],
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
        description: 'Rich text, double click on text for toolbar',
      },
      display: {
        title: 'Display',
        choices: [...display_types],
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        type: 'string',
      },
      custom_class: {
        title: 'Custom CSS Class',
        description: 'A custom CSS class, aplicable to this block',
      },
    },

    required: ['display'],
  };
};

export default CustomCards;
