const Tab = () => ({
  title: 'Dashboard',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'title', 'description', 'tableau_url'],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      mode: 'link',
      title: 'Source',
      description: 'Choose an existing content as source for this tab',
      selectedItemAttrs: ['Title', 'Description', 'embed_url'],
    },
    title: {
      title: 'Title',
    },
    description: {
      title: 'Description',
      widget: 'textarea',
    },
    tableau_url: {
      title: 'Tableau URL',
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
