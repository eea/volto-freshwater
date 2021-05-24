import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import config from '@plone/volto/registry';

import './style.less';

const DashboardTabsBlockView = (props) => {
  const {
    blocks: { blocksConfig },
  } = config;
  const { tabs = [] } = props.data;
  const [activeTab, setActiveTab] = React.useState(0);

  const TableauBlockView = blocksConfig.tableau_block.view;

  const MenuItem = (props) => {
    const { tab, index } = props;
    const source = tab.source?.[0];

    return (
      <>
        {source && (
          <Menu.Item
            name={tab.title}
            active={activeTab === index}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            <p className="menu-item-title">{tab.title || source.title}</p>
            <p className="menu-item-description">
              {tab.description || source.description}
            </p>
          </Menu.Item>
        )}
      </>
    );
  };

  const panes = tabs.map((tab, index) => {
    return {
      id: tab,
      menuItem: () => {
        return <MenuItem {...props} tab={tab} index={index} />;
      },
      render: () => {
        const dashboard_url =
          tab.dashboard_url ||
          'https://public.tableau.com/views/SuccessfulWomeninMusic-IronquestDiversityinData/WomeninMusic?:language=en&:display_count=y&mobile=&:origin=viz_share_link';
        return (
          <Tab.Pane>
            {dashboard_url && (
              <TableauBlockView {...props} data={{ url: dashboard_url }} />
            )}

            {tab.description}
          </Tab.Pane>
        );
      },
    };
  });

  return (
    <div className="dashboard-tabs-block">
      <Tab
        className="default tabs"
        menu={{ fluid: true }}
        activeIndex={activeTab}
        panes={panes}
      />
    </div>
  );
};

export default DashboardTabsBlockView;
