import CountriesListingView from './CountriesListingView';
import CountriesListingEdit from './CountriesListingEdit';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';

export default (config) => {
  config.blocks.blocksConfig.countriesListing = {
    id: 'countriesListing',
    title: 'Countries Listing',
    icon: listBulletSVG,
    group: 'freshwater_addons',
    view: CountriesListingView,
    edit: CountriesListingEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
