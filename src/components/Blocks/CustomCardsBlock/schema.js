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
        fields: ['title', 'text', 'display'],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        fields: ['custom_class'],
      },
    ],

    properties: {
      title: {
        type: 'string',
        title: 'Block title',
      },
      text: {
        widget: 'slate_richtext',
        title: 'Block text',
        description: 'Rich text, double click on text for toolbar',
      },
      display: {
        title: 'Display',
        description: 'Choose a template',
        choices: [...display_types],
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
