import starSVG from '@plone/volto/icons/star.svg';
import PinListingBlockView from './View';
import PinListingBlockEdit from './Edit';

export default (config) => {
  config.blocks.blocksConfig.pinListingBlock = {
    id: 'pinListingBlock',
    title: 'Pin listing block',
    icon: starSVG,
    group: 'freshwater_addons',
    view: PinListingBlockView,
    edit: PinListingBlockEdit,
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
