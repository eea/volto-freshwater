const Tab = () => ({
  title: 'Dashboard tab',
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
      selectedItemAttrs: [
        'Title',
        'Description',
        'embed_url',
        'subject',
        'license_copyright',
        'lineage',
        'publisher',
        'legislative_reference',
        'dpsir_type',
        'category',
        'publication_year',
        'temporal_coverage',
        'geo_coverage',
        'original_source',
        'report_type',
        // 'data_source_info',
      ],
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
