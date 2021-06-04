import React from 'react';
import cardsSVG from '@plone/volto/icons/apps.svg';
import {
  BlockStyleWrapperEdit,
  BlockStyleWrapperView,
} from '@eeacms/volto-block-style/BlockStyleWrapper';

import CustomCardsView from './View';
import CustomCardsEdit from './Edit';
import AttachedImageWidget from './AttachedImageWidget';
import { PlainCardsSchemaExtender } from './templates/PlainCards/schema';
import PlainCardsView from './templates/PlainCards/PlainCardsView';
import { ColoredCardsSchemaExtender } from './templates/ColoredCards/schema';
import ColoredCardsView from './templates/ColoredCards/ColoredCardsView';
import { PresentationCardsSchemaExtender } from './templates/PresentationCards/schema';
import PresentationCardsView from './templates/PresentationCards/PresentationCardsView';

export default (config) => {
  config.blocks.blocksConfig.customCardsBlock = {
    id: 'customCardsBlock',
    title: 'Cards block',
    icon: cardsSVG,
    group: 'custom_addons',
    view: (props) => (
      <BlockStyleWrapperView {...props}>
        <CustomCardsView {...props} />
      </BlockStyleWrapperView>
    ),
    edit: (props) => (
      <BlockStyleWrapperEdit {...props}>
        <CustomCardsEdit {...props} />
      </BlockStyleWrapperEdit>
    ),
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockRenderers: {
      colored_cards: {
        title: 'Colored cards',
        schemaExtender: ColoredCardsSchemaExtender,
        view: ColoredCardsView,
      },
      plain_cards: {
        title: 'Plain cards',
        schemaExtender: PlainCardsSchemaExtender,
        view: PlainCardsView,
      },
      presentation_cards: {
        title: 'Presentation Cards',
        schemaExtender: PresentationCardsSchemaExtender,
        view: PresentationCardsView,
      },
    },
    security: {
      addPermission: [],
      view: [],
    },
  };

  if (!config.widgets.widget.attachedimage) {
    config.widgets.widget.attachedimage = AttachedImageWidget;
  }
  return config;
};
