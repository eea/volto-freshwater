const TitleSchema = {
  title: 'Page Title',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['hide_title'],
    },
  ],

  properties: {
    hide_title: {
      title: 'Hide page title on view',
      type: 'boolean',
    },
  },
  required: [],
};

export default TitleSchema;
