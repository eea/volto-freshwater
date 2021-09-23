import {
  BasketToolbarButton,
  FavoritesToolbarButton,
  AddToFavBoardButton,
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
      match: '',
      component: BasketToolbarButton,
    },
    {
      match: '',
      component: FavoritesToolbarButton,
    },
    {
      match: '',
      component: AddToFavBoardButton,
    },
  ];

  return config;
};
