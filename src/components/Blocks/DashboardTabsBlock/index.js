import tabsSVG from '@plone/volto/icons/interface.svg';
import DashboardTabsBlockView from './View';
import DashboardTabsBlockEdit from './Edit';

export default (config) => {
  config.blocks.blocksConfig.dashboardTabsBlock = {
    id: 'dashboardTabsBlock',
    title: 'Dashboard tabs block',
    icon: tabsSVG,
    group: 'freshwater_addons',
    view: DashboardTabsBlockView,
    edit: DashboardTabsBlockEdit,
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
