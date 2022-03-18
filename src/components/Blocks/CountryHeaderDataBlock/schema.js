export const CountryHeaderDataBlockSchema = () => ({
  title: 'Country header data block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['country_flag'],
    },
    {
      id: 'data',
      title: 'Data source',
      fields: [
        'provider_url',
        'column_data',
        'description',
        'hide_data_section',
      ],
    },
  ],

  properties: {
    provider_url: {
      widget: 'pick_object',
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
    hide_data_section: {
      type: 'boolean',
      title: 'Hide data section',
    },
  },

  required: [],
});

export default CountryHeaderDataBlockSchema;
