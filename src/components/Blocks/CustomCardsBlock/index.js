import React from 'react';
import {
  BlockStyleWrapperEdit,
  BlockStyleWrapperView,
} from '@eeacms/volto-block-style/BlockStyleWrapper';

import CustomCardsView from './View';
import CustomCardsEdit from './Edit';
import { PlainCardsSchemaExtender } from './templates/PlainCards/schema';
import PlainCardsView from './templates/PlainCards/PlainCardsView';
import { ColoredCardsSchemaExtender } from './templates/ColoredCards/schema';
import ColoredCardsView from './templates/ColoredCards/ColoredCardsView';
import { PresentationCardsSchemaExtender } from './templates/PresentationCards/schema';
import PresentationCardsView from './templates/PresentationCards/PresentationCardsView';
import { MetadataCardsSchemaExtender } from './templates/MetadataCards/schema';
import MetadataCardsView from './templates/MetadataCards/MetadataCardsView';

import AttachedImageWidget from './Widgets/AttachedImageWidget';
import TextAlignWidget from './Widgets/TextAlign';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';
import cardsSVG from '@plone/volto/icons/apps.svg';

export default (config) => {
  config.blocks.blocksConfig.customCardsBlock = {
    id: 'customCardsBlock',
    title: 'Cards block',
    icon: cardsSVG,
    group: 'freshwater_addons',
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
      metadata_cards: {
        title: 'Metadata Cards',
        schemaExtender: MetadataCardsSchemaExtender,
        view: MetadataCardsView,
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

  config.widgets.widget.text_align = TextAlignWidget;
  config.widgets.widget.object_by_path = UrlWidget;

  return config;
};
