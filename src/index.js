import React from 'react';
import {
  HeroSectionView,
  DatabaseItemView,
  MetadataListingView,
  SimpleListingView,
  HorizontalTocView,
  FavBoardView,
  FavBoardListingView,
  CaseStudyView,
  MeasureView,
  SourceView,
} from './components';

import { basket, boards, localnavigation, breadcrumb } from './reducers';
import CopyrightWidget from './components/Widgets/CopyrightWidget';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

import installArcgisBlock from './components/Blocks/ArcgisBlock';
import installCountryHeaderDataBlock from './components/Blocks/CountryHeaderDataBlock';
import installCountriesListingBlock from './components/Blocks/CountriesListingBlock';
import installEmbedContentBlock from './components/Blocks/Content';
import installDashboardTabsBlock from './components/Blocks/DashboardTabsBlock';
import installCustomCardsBlock from './components/Blocks/CustomCardsBlock';
import installSearchBlock from './components/Blocks/SearchBlock';
import installAppExtras from './components/theme/AppExtras';
import installSlatePopup from './components/Blocks/SlatePopup';
import installCaseStudyExplorer from './components/Blocks/CaseStudyExplorer';

import customBlockTemplates from '@eeacms/volto-freshwater/components/Blocks/CustomBlockTemplates/customBlockTemplates';

import './slate-styles.less';
import './block-styles.less';

const available_colors = [
  '#0099BB',
  'F2F9FB',
  '#ED763E',
  '#FF4422',
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
  '#f5f5f5',
];

const applyConfig = (config) => {
  // Navigation
  config.settings.navDepth = 3;

  // Content type views
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
    case_study: CaseStudyView,
    measure: MeasureView,
    source: SourceView,
  };

  // Layout views
  config.views.layoutViews = {
    ...config.views.layoutViews,
    document_view: HeroSectionView,
    herosection_view: HeroSectionView,
  };

  config.blocks = {
    ...config.blocks,
    blocksConfig: { ...customBlockTemplates(config) },
  };

  // Colors
  config.settings.available_colors = available_colors;

  // Block chooser
  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'freshwater_addons', title: 'Freshwater' },
  ];

  // on home contextNavigation should return false
  config.blocks.blocksConfig.contextNavigation = {
    ...config.blocks.blocksConfig.contextNavigation,
    blockHasValue: (data) => {
      return data.pathname !== '/';
    },
  };

  // Addons config
  config.blocks.blocksConfig.imagesGrid.restricted = true;
  config.blocks.blocksConfig.teaserGrid.restricted = true;
  config.blocks.blocksConfig.teaser.restricted = false;
  config.blocks.blocksConfig.teaser.mostUsed = false;
  config.blocks.blocksConfig.__grid.title = 'Teasers row';
  config.blocks.blocksConfig.__grid.mostUsed = false;
  config.blocks.blocksConfig.columnsBlock.available_colors = available_colors;

  // config.blocks.blocksConfig.plotly_chart =
  //   config.blocks.blocksConfig.connected_plotly_chart;
  // config.blocks.blocksConfig.plotly_chart.restricted = false;

  // workaround to invalidate render of empty slot blocksConfig with hidden value
  // needed in order to delete the block to get add button to show up on slot edit
  config.blocks.blocksConfig.slate.blockHasValue = (data) => {
    const value = data.plaintext;
    return !!value && value !== 'hidden';
  };

  // Slate styles
  config.settings.slate.styleMenu = config.settings.slate.styleMenu || {};
  config.settings.slate.styleMenu.inlineStyles = [
    ...(config.settings.slate.styleMenu?.inlineStyles || []),
    { cssClass: 'blue-text', label: 'Blue text' },
    { cssClass: 'blue-chart-text', label: 'Blue plot-chart text' },
    { cssClass: 'green-chart-text', label: 'Green plot-chart text' },
    { cssClass: 'yellow-chart-text', label: 'Yellow plot-chart text' },
    { cssClass: 'orange-chart-text', label: 'Orange plot-chart text' },
    { cssClass: 'blue-circle text-circle', label: 'Blue circle' },
    { cssClass: 'green-circle text-circle', label: 'Green circle' },
    { cssClass: 'orange-circle text-circle', label: 'Orange circle' },
    { cssClass: 'yellow-circle text-circle', label: 'Yellow circle' },
    { cssClass: 'grey-circle text-circle', label: 'Grey circle' },
    { cssClass: 'grey-text', label: 'Grey text' },
    { cssClass: 'black-text', label: 'Black text' },
    { cssClass: 'p-text', label: 'Paragraph 16px' },
    { cssClass: 'h1', label: 'H1 36px' },
    { cssClass: 'h2', label: 'H2 30px' },
    { cssClass: 'h3', label: 'H3 24px' },
    { cssClass: 'h4', label: 'H4 18px' },
    { cssClass: 'h5', label: 'H5 14px' },
  ];

  // Search block metadata listing view
  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'metadata',
        title: 'Metadata Listing',
        template: MetadataListingView,
        isDefault: false,
      },
      {
        id: 'simple',
        title: 'Simple Listing',
        template: SimpleListingView,
        isDefault: false,
      },
    ],
  };

  // Table of contents custom view
  config.blocks.blocksConfig.toc = {
    ...config.blocks.blocksConfig.toc,
    extensions: [
      ...config.blocks.blocksConfig.toc.extensions,
      {
        id: 'horizontalTocView',
        title: 'FW horizontal menu',
        view: HorizontalTocView,
        schemaExtender: null,
      },
    ],
  };

  // API expanders
  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '/',
      GET_CONTENT: ['siblings'],
    },
  ];

  config.settings.externalRoutes = [
    ...(config.settings.externalRoutes || []),
    ...(config.settings.prefixPath
      ? [
          {
            match: {
              path: /\/$/,
              exact: true,
              strict: true,
            },

            url(payload) {
              return payload.location.pathname;
            },
          },
        ]
      : []),
  ];

  // Custom block styles
  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'uiContainer',
      title: 'Container',
      viewComponent: (props) => {
        return <div className="ui container">{props.children}</div>;
      },
    },
    {
      id: 'marginBottom5em',
      title: 'Margin bottom 5em',
      cssClass: 'margin-bottom-5em',
    },
    {
      id: 'marginBottom1em',
      title: 'Margin bottom 1em',
      cssClass: 'margin-bottom-1em',
    },
  ];

  // Routes
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/boards/boardview',
      component: FavBoardView,
    },
    {
      path: '/boards',
      component: FavBoardListingView,
    },
  ];

  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    '/boards/boardview',
    '/boards',
  ];

  // Persistent reducers
  config.settings.persistentReducers = ['basket'];

  // Widgets
  config.widgets.id.license_copyright = CopyrightWidget;
  config.widgets.id.category = TokenWidget;

  // addonReducers
  config.addonReducers = {
    ...(config.addonReducers || {}),
    basket,
    boards,
    localnavigation,
    breadcrumb,
  };

  if (__SERVER__) {
    const installExpressMiddleware = require('./express-middleware').default;
    config = installExpressMiddleware(config);
  }

  const final = [
    installEmbedContentBlock,
    installDashboardTabsBlock,
    installCustomCardsBlock,
    installSearchBlock,
    installCountryHeaderDataBlock,
    installCountriesListingBlock,
    installArcgisBlock,
    installAppExtras,
    installSlatePopup,
    installCaseStudyExplorer,
  ].reduce((acc, apply) => apply(acc), config);

  // console.log('final config', final);
  return final;
};

export default applyConfig;
