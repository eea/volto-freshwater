import codeSVG from '@plone/volto/icons/code.svg';
import DashboardTabsBlockView from './View';
import DashboardTabsBlockEdit from './Edit';

export default (config) => {
  config.blocks.blocksConfig.dashboardTabsBlock = {
    id: 'dashboardTabsBlock',
    title: 'Dashboard tabs block',
    icon: codeSVG,
    group: 'common',
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
