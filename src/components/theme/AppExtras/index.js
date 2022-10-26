import {
  FavoritesToolbarButton,
  BasketToolbarButton,
  AddToFavBoardButton,
  BasketSearchButton,
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
      component: FavoritesToolbarButton,
    },
    {
      match: '',
      component: BasketToolbarButton,
    },
    {
      match: '',
      component: AddToFavBoardButton,
    },
    {
      match: '',
      component: BasketSearchButton,
    },
  ];

  return config;
};
