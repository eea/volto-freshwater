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
        const tableau_url = tab.tableau_url || tab.source?.[0].embed_url;
        return (
          <Tab.Pane>
            {tableau_url && (
              <TableauBlockView {...props} data={{ url: tableau_url }} />
            )}
          </Tab.Pane>
        );
      },
    };
  });

  return (
    <div className="dashboard-tabs-block">
      {tabs.length > 0 ? (
        <Tab
          className="default tabs"
          menu={{ fluid: true }}
          activeIndex={activeTab}
          panes={panes}
        />
      ) : (
        'Add dashboard from the sidebar'
      )}
    </div>
  );
};

export default DashboardTabsBlockView;
