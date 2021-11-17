const Schema = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['block_title', 'columnsCount'],
    },
  ],
  properties: {
    block_title: {
      title: 'Title',
    },
    columnsCount: {
      title: 'Number of columns',
      widget: 'number',
    },
  },
  required: [],
};
export default Schema;
