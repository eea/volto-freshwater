import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import SearchBlockView from './SearchBlockView';
import SearchBlockEdit from './SearchBlockEdit';
import SelectWidget from './SelectMetadataField';
import RightColumnFacets from './layout/RightColumnFacets';
import LeftColumnFacets from './layout/LeftColumnFacets';
import TopSideFacets from './layout/TopSideFacets';

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
    variations: [
      {
        id: 'facetsRightSide',
        title: 'Facets on right side',
        view: RightColumnFacets,
        isDefault: true,
      },
      {
        id: 'facetsLeftSide',
        title: 'Facets on left side',
        view: LeftColumnFacets,
        isDefault: false,
      },
      {
        id: 'facetsTopSide',
        title: 'Facets on top',
        view: TopSideFacets,
        isDefault: false,
      },
    ],
    // extensions: {
    //   layout: ,
    // },
  };

  config.widgets.widget.select_metadata_field = SelectWidget;

  return config;
};
