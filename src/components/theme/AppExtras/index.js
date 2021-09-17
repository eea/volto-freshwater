import FavoritesToolbarButton from './FavoritesToolbarButton';

export default (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: FavoritesToolbarButton,
    },
  ];

  return config;
};
