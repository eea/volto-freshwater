import {
  BasketToolbarButton,
  FavoritesToolbarButton,
} from './FavoritesToolbarButton';
import ScrollToTop from './ScrollToTop';

export default (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: ScrollToTop,
    },
    {
      match: '/data-maps-and-tools/metadata',
      component: BasketToolbarButton,
    },
    {
      match: '',
      component: FavoritesToolbarButton,
    },
  ];

  return config;
};
