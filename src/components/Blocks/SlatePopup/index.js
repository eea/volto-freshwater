import { defineMessages } from 'react-intl';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';
import popupSVG from '@eeacms/volto-freshwater/icons/popup.svg';
import { withSlatePupup } from './extensions';
import { SLATEPOPUP } from './constants';
import { SlatePopupSchema } from './schema';
import { SlatePopupElement } from './render';

import './styles.less';

const messages = defineMessages({
  edit: {
    id: 'Edit popup',
    defaultMessage: 'Edit popup',
  },
  delete: {
    id: 'Remove popup',
    defaultMessage: 'Remove popup',
  },
});

export default function install(config) {
  const opts = {
    pluginId: SLATEPOPUP,
    elementType: SLATEPOPUP,
    element: SlatePopupElement,
    editSchema: SlatePopupSchema,
    isInlineElement: true,
    hasValue: () => true,
    extensions: [withSlatePupup],
    toolbarButtonIcon: popupSVG,
    title: 'Popup',
    messages,
  };
  const [installSlatePopupEditor] = makeInlineElementPlugin(opts);
  config = installSlatePopupEditor(config);

  const { slate } = config.settings;

  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'slatepopup'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'slatepopup',
  ];

  return config;
}
