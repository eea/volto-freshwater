import React from 'react';
import { Modal, Menu, Tab, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import arrowSVG from '@plone/volto/icons/backspace.svg';
import config from '@plone/volto/registry';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
  TableauDownload,
  TableauShare,
  TableauFullscreen,
} from '@eeacms/volto-freshwater/components';

import './style.less';

const DashboardTabsBlockView = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { tabs = [] } = props.data;
  const {
    blocks: { blocksConfig },
  } = config;

  const TableauBlockView = blocksConfig.tableau_block.view;

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const MenuItem = (props) => {
    const { tab, index } = props;
    const source = tab?.source?.[0];

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
          </Menu.Item>
        )}
      </>
    );
  };

  const panes = tabs.map((tab, index) => {
    return {
      id: tab,
      menuItem: () => {
        return (
          <MenuItem {...props} key={`tab-${index}`} tab={tab} index={index} />
        );
      },
      render: () => {
        const source = tab.source?.[0];
        const tableau_url = tab.tableau_url || source?.embed_url;
        const description = tab.description || source?.description;

        return (
          <Tab.Pane>
            {tableau_url && (
              <div className="dashboard-wrapper">
                <TableauBlockView
                  {...props}
                  data={{
                    url: tableau_url,
                    hideToolbar: true,
                    version: '2.7.0',
                  }}
                >
                  {(viz) => {
                    return (
                      <div className="tableau-icons">
                        <TableauDownload {...props} viz={viz} />
                        <TableauShare
                          {...props}
                          viz={viz}
                          data={{ url: tableau_url }}
                        />
                        <TableauFullscreen
                          {...props}
                          viz={viz}
                          data={{ url: tableau_url }}
                        />
                      </div>
                    );
                  }}
                </TableauBlockView>

                <div className="dashboard-metadata">
                  {description && <p>{description}</p>}

                  <div>
                    <Button
                      className="read-more"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedItem(tab);
                      }}
                    >
                      <span>Read more</span>
                      <Icon name={arrowSVG} size="27px" className="next-icon" />
                    </Button>
                  </div>

                  <Modal
                    className="item-metadata-modal"
                    open={isOpenModal}
                    onClose={close}
                    size="large"
                    closeIcon
                    centered
                  >
                    <Modal.Header>
                      <ItemMetadataSnippet {...props} item={selectedItem} />
                      <ItemTitle {...props} item={selectedItem} />
                    </Modal.Header>

                    <Modal.Content>
                      <ItemMetadata {...props} item={selectedItem} />
                    </Modal.Content>
                  </Modal>
                </div>
              </div>
            )}
          </Tab.Pane>
        );
      },
    };
  });

  return (
    <>
      {tabs.length > 0 ? (
        <div className="dashboard-tabs-block full-width">
          <div className="dashboard-tabs-block-container ui container">
            <Tab
              className="default tabs"
              menu={{ fluid: true }}
              activeIndex={activeTab}
              panes={panes}
            />
          </div>
        </div>
      ) : (
        <div className="block-info">Add dashboard from the sidebar.</div>
      )}
    </>
  );
};

export default DashboardTabsBlockView;
