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

  return config;
};

export default applyConfig;
