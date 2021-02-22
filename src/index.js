import HeroSectionView from './components/theme/Header/HeroSectionView';

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
