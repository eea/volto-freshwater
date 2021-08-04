const Tab = () => ({
  title: 'Dashboard tab',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'title', 'description', 'tableau_url', 'webmap_url'],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      mode: 'link',
      title: 'Source',
      description: 'Choose an existing content as source for this tab',
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
    webmap_url: {
      title: 'Embed URL',
    },
  },

  required: ['source'],
});

const DashboardTabsSchema = {
  title: 'Dashboard tabs',
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

export default DashboardTabsSchema;
