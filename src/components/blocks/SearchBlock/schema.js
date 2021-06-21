import config from '@plone/volto/registry';

const FacetSchema = () => ({
  title: 'Facet',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'field', 'multiple', 'type'],
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
    type: {
      title: 'Facet widget',
      choices: config.blocks.blocksConfig.searchBlock.extensions.facetWidgets.types.map(
        ({ id, title }) => [id, title],
      ),
      defaultValue: config.blocks.blocksConfig.searchBlock.extensions.facetWidgets.types.find(
        ({ isDefault }) => isDefault,
      ).id,
    },
  },
  required: ['field'],
});

export default ({ data = {} }) => {
  return {
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
        title: 'Base search query',
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
  };
};
