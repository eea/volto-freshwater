import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';

import './style.less';

const DashboardTabsBlockView = (props) => {
  const { tabs = [] } = props.data;
  const [activeTab, setActiveTab] = React.useState(0);

  const MenuItem = (props) => {
    const { tab, index } = props;
    const source = tab.source?.[0];

    return (
      <>
        {source && (
          <Menu.Item
            name={source.Title}
            active={activeTab === index}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            <p className="menu-item-title">{source.Title}</p>
            <p className="menu-item-description">{source.Description}</p>
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
        return <Tab.Pane>{tab.description}</Tab.Pane>;
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
