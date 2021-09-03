import worldSVG from '@plone/volto/icons/world.svg';
import View from './View';
import Edit from './Edit';

export default (config) => {
  config.blocks.blocksConfig.countryHeaderDataBlock = {
    id: 'countryHeaderDataBlock',
    title: 'UWW country data block',
    icon: worldSVG,
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
