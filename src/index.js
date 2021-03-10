import HeroSectionView from './components/theme/Header/HeroSectionView';
import ColoredCards from './components/blocks/CustomImageCards/ColoredCards/ColoredCards';
import { ColoredCardsSchemaExtender } from './components/blocks/CustomImageCards/ColoredCards/schema';
import PlainCards from './components/blocks/CustomImageCards/PlainCards/PlainCards';

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

  config.settings.slate.styleMenu = config.settings.slate.styleMenu || {};
  config.settings.slate.styleMenu.inlineStyles = [
    ...(config.settings.slate.styleMenu?.inlineStyles || []),
    { cssClass: 'blue-text', label: 'Blue text' },
    { cssClass: 'grey-text', label: 'Grey text' },
  ];

  return config;
};

export default applyConfig;
