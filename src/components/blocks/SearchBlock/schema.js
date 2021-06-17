const FacetSchema = () => ({
  title: 'Facet',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'field', 'multiple'],
    },
  ],
  properties: {
    title: {
      title: 'Label',
    },
    field: {
      title: 'Field',
      widget: 'select_metadata_field',
      vocabulary: { '@id': 'plone.app.vocabularies.MetadataFields' },
    },
    multiple: {
      type: 'boolean',
      title: 'Multiple choices?',
      default: false,
    },
  },
  required: ['field'],
});

export default ({ data = {} }) => ({
  title: 'Search block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
    {
      id: 'controls',
      title: 'Controls',
      fields: [
        'showSearchInput',
        ...(data.showSearchInput ? ['searchInputPrompt'] : []),
        'showSearchButton',
        ...(data.showSearchButton ? ['searchButtonLabel'] : []),
      ],
    },
    {
      id: 'searchquery',
      title: 'Search query',
      fields: ['query'],
    },
    {
      id: 'facets',
      title: 'Facets',
      fields: ['facets'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
    },
    searchInputPrompt: {
      title: 'Search input label',
    },
    showSearchInput: {
      type: 'boolean',
      title: 'Show search input?',
    },
    showSearchButton: {
      type: 'boolean',
      title: 'Show search button?',
    },
    searchButtonLabel: {
      title: 'Search button label',
    },
    facets: {
      title: 'Facets',
      widget: 'object_list',
      schema: FacetSchema(),
    },
    query: {
      title: 'Query',
    },
  },
  required: [],
});
