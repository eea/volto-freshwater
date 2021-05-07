import codeSVG from '@plone/volto/icons/code.svg';
import ContentBlockView from './ContentView';
import ContentBlockEdit from './ContentEdit';

export default (config) => {
  config.blocks.blocksConfig.embedContent = {
    id: 'embedContent',
    title: 'Embed content',
    icon: codeSVG,
    group: 'common',
    view: ContentBlockView,
    edit: ContentBlockEdit,
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
