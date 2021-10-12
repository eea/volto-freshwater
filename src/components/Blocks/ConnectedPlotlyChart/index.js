import worldSVG from '@plone/volto/icons/world.svg';
import ConnectedChartBlockEdit from './ConnectedChartBlockEdit';
import ConnectedChartBlockView from './ConnectedChartBlockView';

export default (config) => {
  config.blocks.blocksConfig.filteredConnectedPlotlyChart = {
    id: 'filteredConnectedPlotlyChart',
    title: 'Filtered Connected Plotly Chart',
    icon: worldSVG,
    group: 'freshwater_addons',
    view: ConnectedChartBlockView,
    edit: ConnectedChartBlockEdit,
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
