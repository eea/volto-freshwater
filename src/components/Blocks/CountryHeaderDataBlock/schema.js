export const CountryHeaderDataBlockSchema = () => ({
  title: 'UWW country data block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['provider_url', 'column_data', 'description'],
    },
  ],

  properties: {
    provider_url: {
      widget: 'pick_provider',
      title: 'Data provider',
    },
    column_data: {
      title: 'Columns',
      choices: [],
    },
    description: {
      title: 'Description',
      widget: 'textarea',
    },
  },

  required: ['provider_url', 'column_data'],
});

export default CountryHeaderDataBlockSchema;
