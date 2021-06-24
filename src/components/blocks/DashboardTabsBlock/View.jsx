import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import TableauDownload from './TableauDownload';
import TableauShare from './TableauShare';
import TableauFullscreen from './TableauFullscreen';
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

  const Metadata = (props) => {
    const { tab } = props;
    const source = props.tab.source?.[0];
    const description = tab.description || source?.description;
    const {
      lineage,
      original_source,
      publisher,
      dpsir_type,
      category,
      legislative_reference,
      publication_year,
      license_copyright,
      temporal_coverage,
      geo_coverage,
      report_type,
    } = source || {};

    return (
      <div className="dashboard-metadata">
        {source && (
          <>
            {description && <p>{description}</p>}
            <ul className="metadata-list">
              {lineage && (
                <li>
                  <strong>Lineage: </strong> {lineage}
                </li>
              )}
              {original_source && (
                <li>
                  <strong>Original source: </strong> {original_source}
                </li>
              )}
              {publisher && (
                <li>
                  <strong>Organization: </strong> {publisher}
                </li>
              )}
              {dpsir_type && (
                <li>
                  <strong>DPSIR: </strong> {dpsir_type}
                </li>
              )}
              {category && (
                <li>
                  <strong>Topic: </strong> {category}
                </li>
              )}
              {legislative_reference && (
                <li>
                  <strong>Legislative reference: </strong>{' '}
                  {legislative_reference}
                </li>
              )}
              {publication_year && (
                <li>
                  <strong>Publication year: </strong> {publication_year}
                </li>
              )}
              {license_copyright && (
                <li>
                  <strong>Rights: </strong> {license_copyright}
                </li>
              )}
              {report_type && (
                <li>
                  <strong>Report type: </strong> {report_type}
                </li>
              )}

              {Object.entries(temporal_coverage).length > 0 && (
                <>
                  {temporal_coverage.temporal.length > 0 && (
                    <li>
                      <strong>Temporal coverage: </strong>
                      <div className="tag-types">
                        {temporal_coverage.temporal.map((temp, i) => (
                          <div key={i}>
                            <p>{temp.label}</p>
                          </div>
                        ))}
                      </div>
                    </li>
                  )}
                </>
              )}

              {Object.entries(geo_coverage).length > 0 && (
                <>
                  {geo_coverage.geolocation.length > 0 && (
                    <li>
                      <strong>Geo coverage: </strong>
                      <div className="geo-tags tag-types">
                        {geo_coverage.geolocation.map((geo, i) => (
                          <div key={i}>
                            <p>{geo.label}</p>
                          </div>
                        ))}
                      </div>
                    </li>
                  )}
                </>
              )}
            </ul>
          </>
        )}
      </div>
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
                <Metadata {...props} tab={tab} />
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
