import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import SearchBlockView from './SearchBlockView';
import SearchBlockEdit from './SearchBlockEdit';
import SelectWidget from './SelectMetadataField';
import RightColumnFacets from './Facets';

export default (config) => {
  config.blocks.blocksConfig.searchBlock = {
    id: 'searchBlock',
    title: 'Search listing',
    icon: listBulletSVG,
    group: 'common',
    view: SearchBlockView,
    edit: SearchBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    extensions: {
      layout: [
        {
          title: 'Facets on right side',
          view: RightColumnFacets,
          isDefault: true,
        },
      ],
    },
  };

  config.widgets.widget.select_metadata_field = SelectWidget;

  return config;
};
