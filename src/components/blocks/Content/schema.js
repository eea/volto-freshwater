const EmbedContentSchema = (props) => {
  return {
    title: 'Embed content',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href', 'title_style'],
      },
    ],
    properties: {
      href: {
        title: 'Source',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
        allowExternals: true,
      },
      title_style: {
        title: 'Title style',
        choices: [
          ['hidden', 'Hidden'],
          ['h1', 'Main page title'],
          ['h2', 'Title'],
          ['h3', 'Subtitle'],
        ],
      },
    },
    required: [],
  };
};

export default EmbedContentSchema;
