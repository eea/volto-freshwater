export const SlatePopupSchema = {
  title: 'Slate Popup',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['popup_text', 'popup_position'],
    },
  ],
  properties: {
    popup_text: {
      title: 'Popup text',
    },
    popup_position: {
      title: 'Popup position',
      choices: [
        ['top center', 'Top center'],
        ['top left', 'Top left'],
        ['top right', 'Top right'],
        ['bottom center', 'Bottom center'],
        ['bottom left', 'Bottom left'],
        ['bottom right', 'Bottom right'],
        ['right center', 'Right center'],
        ['left center', 'Left center'],
      ],
      default: 'bottom left',
    },
  },
  required: [],
};
