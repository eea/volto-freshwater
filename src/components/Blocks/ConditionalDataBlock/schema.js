export const ConditionalDataBlockSchema = () => ({
  title: 'Conditional data block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [], // 'title', 'provider_url', 'column_data', 'operator', 'condition'
    },
  ],

  properties: {
    title: {
      title: 'Title',
      description: 'Section friendly name',
      type: 'string',
    },
    provider_url: {
      widget: 'pick_provider',
      title: 'Data provider',
    },
    column_data: {
      title: 'Column',
      choices: [],
    },
    operator: {
      title: 'Operator',
      choices: ['=', '<', '>'],
    },
    condition: {
      title: 'Condition value',
      widget: 'textarea',
    },
  },

  required: [], // 'provider_url', 'column_data', 'condition'
});

export default ConditionalDataBlockSchema;
