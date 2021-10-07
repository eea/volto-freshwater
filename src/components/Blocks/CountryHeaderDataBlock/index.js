import View from './View';
import Edit from './Edit';
import headerSVG from '@plone/volto/icons/hero.svg';

export default (config) => {
  config.blocks.blocksConfig.countryHeaderDataBlock = {
    id: 'countryHeaderDataBlock',
    title: 'Country header data block',
    icon: headerSVG,
    group: 'freshwater_addons',
    view: View,
    edit: Edit,
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
