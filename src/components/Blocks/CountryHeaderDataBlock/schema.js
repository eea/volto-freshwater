export const CountryHeaderDataBlockSchema = () => ({
  title: 'Country header data block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['provider_url', 'column_data', 'description'],
    },
    {
      id: 'options',
      title: 'Options',
      fields: ['country_flag'],
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
    country_flag: {
      title: 'Country flag',
      choices: [],
    },
  },

  required: ['provider_url', 'column_data'],
});

export default CountryHeaderDataBlockSchema;
