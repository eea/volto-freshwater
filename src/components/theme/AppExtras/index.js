import {
  FavoritesToolbarButton,
  BasketButton,
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
      component: FavoritesToolbarButton,
    },
    {
      match: '',
      component: BasketButton,
    },
    {
      match: '',
      component: AddToFavBoardButton,
    },
  ];

  return config;
};
