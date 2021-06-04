import HeroSectionView from './components/theme/Header/HeroSectionView';
import ColoredCards from './components/blocks/CustomImageCards/ColoredCards/ColoredCards';
import { ColoredCardsSchemaExtender } from './components/blocks/CustomImageCards/ColoredCards/schema';
import PlainCards from './components/blocks/CustomImageCards/PlainCards/PlainCards';

import { PresentationCardsSchemaExtender } from './components/blocks/CustomImageCards/PresentationCards/schema';
import PresentationCardsView from './components/blocks/CustomImageCards/PresentationCards/PresentationCardsView';
import PresentationCardsEdit from './components/blocks/CustomImageCards/PresentationCards/PresentationCardsEdit';

import { ScrollToTop } from './components';
import installEmbedContentBlock from './components/blocks/Content';
import installDashboardTabsBlock from './components/blocks/DashboardTabsBlock';
import installcustomCardsBlock from './components/blocks/CustomCardsBlock';

import CopyrightWidget from './components/Widgets/CopyrightWidget';

import DatabaseItemView from './components/Views/DatabaseItemView';

const available_colors = [
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

const applyConfig = (config) => {
  config.settings.navDepth = 3;

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    Document: HeroSectionView,
    dashboard: DatabaseItemView,
    dataset: DatabaseItemView,
    database: DatabaseItemView,
    report_publication: DatabaseItemView,
    indicator: DatabaseItemView,
    briefing: DatabaseItemView,
    map_interactive: DatabaseItemView,
  };

  config.views.layoutViews = {
    ...config.views.layoutViews,
    document_view: HeroSectionView,
    herosection_view: HeroSectionView,
  };

  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'custom_addons', title: 'Freshwater' },
  ];

  config.blocks.blocksConfig.imagecards = {
    sidebarTab: 1,
    ...config.blocks.blocksConfig.imagecards,
    display_types: {
      ...config.blocks.blocksConfig.imagecards?.display_types,
    },
    blockRenderers: {
      ...config.blocks.blocksConfig.imagecards?.blockRenderers,
      colored_cards: {
        title: 'Colored cards',
        schemaExtender: ColoredCardsSchemaExtender,
        view: ColoredCards,
      },
      plain_cards: {
        title: 'Plain cards',
        schemaExtender: null,
        view: PlainCards,
      },
      presentation_cards: {
        title: 'Presentation cards',
        view: PresentationCardsView,
        edit: PresentationCardsEdit,
        schemaExtender: PresentationCardsSchemaExtender,
      },
    },
  };

  // on home contextNavigation should return false
  config.blocks.blocksConfig.contextNavigation = {
    ...config.blocks.blocksConfig.contextNavigation,
    blockHasValue: (data) => {
      return data.pathname !== '/';
    },
  };

  config.blocks.blocksConfig.imagesGrid.restricted = true;
  config.blocks.blocksConfig.teaserGrid.restricted = true;
  config.blocks.blocksConfig.teaser.restricted = false;
  config.blocks.blocksConfig.teaser.mostUsed = false;
  config.blocks.blocksConfig.__grid.title = 'Teasers row';
  config.blocks.blocksConfig.__grid.mostUsed = false;
  config.settings.available_colors = available_colors;

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

  config.widgets.id.license_copyright = CopyrightWidget;

  return [
    installEmbedContentBlock,
    installDashboardTabsBlock,
    installcustomCardsBlock,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
