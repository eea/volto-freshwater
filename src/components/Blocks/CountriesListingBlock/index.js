import CountriesListingView from './CountriesListingView';
import CountriesListingEdit from './CountriesListingEdit';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';

export default (config) => {
  config.blocks.blocksConfig.wiseCountriesListing = {
    id: 'wiseCountriesListing',
    title: 'Countries Listing',
    icon: listBulletSVG,
    group: 'freshwater_addons',
    view: CountriesListingView,
    edit: CountriesListingEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
