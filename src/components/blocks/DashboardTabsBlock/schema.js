const Tab = () => ({
  title: 'Dashboard',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'title', 'description'],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      title: 'Source',
      mode: 'link',
      allowExternals: true,
    },
    title: {
      title: 'Title',
    },
    description: {
      title: 'Description',
      widget: 'textarea',
    },
  },

  required: [],
});

const DashboardTabsSchema = () => {
  return {
    title: 'Tabs',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['tabs'],
      },
    ],

    properties: {
      tabs: {
        widget: 'object_list',
        title: 'Tabs',
        schema: Tab(),
      },
    },

    required: [],
  };
};

export default DashboardTabsSchema;
