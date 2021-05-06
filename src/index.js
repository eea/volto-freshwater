import HeroSectionView from './components/theme/Header/HeroSectionView';
import ColoredCards from './components/blocks/CustomImageCards/ColoredCards/ColoredCards';
import { ColoredCardsSchemaExtender } from './components/blocks/CustomImageCards/ColoredCards/schema';
import PlainCards from './components/blocks/CustomImageCards/PlainCards/PlainCards';

import { PresentationCardsSchemaExtender } from './components/blocks/CustomImageCards/PresentationCards/schema';
import PresentationCards from './components/blocks/CustomImageCards/PresentationCards/PresentationCards';
import { ScrollToTop } from './components';

const applyConfig = (config) => {
  config.settings.navDepth = 3;
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    Document: HeroSectionView,
  };
  config.views.layoutViews = {
    ...config.views.layoutViews,
    document_view: HeroSectionView,
    herosection_view: HeroSectionView,
  };

  config.blocks.blocksConfig.imagecards =
    config.blocks.blocksConfig.imagecards || {};
  config.blocks.blocksConfig.imagecards.display_types =
    config.blocks.blocksConfig.imagecards.display_types || {};

  config.blocks.blocksConfig.imagecards.blockRenderers =
    config.blocks.blocksConfig.imagecards.blockRenderers || {};
  config.blocks.blocksConfig.imagecards.blockRenderers['colored_cards'] = {
    title: 'Colored cards',
    schemaExtender: ColoredCardsSchemaExtender,
    view: ColoredCards,
  };

  config.blocks.blocksConfig.imagecards.blockRenderers['plain_cards'] = {
    title: 'Plain cards',
    schemaExtender: null,
    view: PlainCards,
  };

  config.blocks.blocksConfig.imagecards.blockRenderers['presentation_cards'] = {
    title: 'Presentation cards',
    schemaExtender: PresentationCardsSchemaExtender,
    view: PresentationCards,
  };

  // on home contextNavigation should return false
  config.blocks.blocksConfig.contextNavigation =
    config.blocks.blocksConfig.contextNavigation || {};
  config.blocks.blocksConfig.contextNavigation.blockHasValue = (data) => {
    return data.pathname !== '/';
  };

  config.settings.available_colors = [
    '#156650',
    '#72933d',
    '#88c24f',
    '#d0cd41',
    '#f58450',
    '#f4cf01',
    '#c31f43',
    '#595a93',
    '#064c7f',
    '#003159',
    '#59d3ff',
    '#34c0bf',
    '#826A6A',
    '#000000',
    '#252525',
    '#8d8d8d',
    '#5d5e5e',
    '#4d4d4d',
    '#ccc',
    '#e2e2e2',
    '#ffffff',
    '#FAD0C3',
    '#F3E2AB',
    '#C1E1C5',
    '#BEDADC',
    '#BED3F3',
  ];

  config.settings.slate = config.settings.slate || {};

  // workaround to invalidate render of empty slot blocksConfig with hidden value
  // needed in order to delete the block to get add button to show up on slot edit
  config.blocks.blocksConfig.slate.blockHasValue = (data) => {
    const value = data.plaintext;
    return !!value && value !== 'hidden';
  };

  config.settings.slate.styleMenu = config.settings.slate.styleMenu || {};
  config.settings.slate.styleMenu.inlineStyles = [
    ...(config.settings.slate.styleMenu?.inlineStyles || []),
    { cssClass: 'blue-text', label: 'Blue text' },
    { cssClass: 'grey-text', label: 'Grey text' },
    { cssClass: 'h1', label: 'H1 36px' },
    { cssClass: 'h2', label: 'H2 30px' },
    { cssClass: 'h3', label: 'H3 24px' },
    { cssClass: 'h4', label: 'H4 18px' },
    { cssClass: 'h5', label: 'H5 14px' },
    { cssClass: 'p-text', label: 'Paragraph 16px' },
  ];

  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: ScrollToTop,
    },
  ];

  return config;
};

export default applyConfig;
