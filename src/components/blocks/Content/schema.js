const EmbedContentSchema = (props) => {
  return {
    title: 'Embed content',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href'],
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
    },
    required: [],
  };
};

export default EmbedContentSchema;
