import imagewideSVG from '@plone/volto/icons/world.svg';
import View from './View';
import Edit from './Edit';

export default (config) => {
  config.blocks.blocksConfig.freshwaterArcgisBlock = {
    id: 'freshwaterArcgisBlock',
    title: 'Freshwater Arcgis block',
    icon: imagewideSVG,
    group: 'freshwater_addons',
    view: View,
    edit: Edit,
    restricted: false,
    blockHasOwnFocusManagement: true,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};
