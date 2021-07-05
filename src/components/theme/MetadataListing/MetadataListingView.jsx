import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import TableauDownload from './../Tableau/TableauDownload';
import TableauShare from './../Tableau/TableauShare';
import fullscreenSVG from '@plone/volto/icons/slider.svg';
import config from '@plone/volto/registry';

import './less/listing.less';

const MapPreview = (props) => {
  const { map_url, tableau_url } = props;
  const [open, setOpen] = React.useState(false);
  const {
    blocks: { blocksConfig },
  } = config;

  const TableauBlockView = blocksConfig.tableau_block.view;
  const MapBlockView = blocksConfig.maps.view;

  return (
    <Modal
      className="metadata-tableau"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="mini" className="viz-btn toolbar-button" title="Preview">
          <Icon name={fullscreenSVG} size="28px" />
        </Button>
      }
    >
      <Modal.Content>
        {tableau_url && (
          <TableauBlockView
            {...props}
            data={{ url: props.tableau_url, hideToolbar: true }}
          >
            {(viz) => {
              return (
                <div className="tableau-icons">
                  <TableauDownload {...props} viz={viz} />
                  <TableauShare
                    {...props}
                    viz={viz}
                    data={{ url: props.tableau_url }}
                  />
                </div>
              );
            }}
          </TableauBlockView>
        )}

        {map_url && (
          <div style={{ margin: '1em 0' }}>
            <MapBlockView {...props} data={{ url: map_url }} />
          </div>
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export const ItemMetadata = (props) => {
  const { item, isOpenModal, close } = props;

  const tableau_url = item?.embed_url;
  const map_url = item?.webmap_url;

  return (
    <Modal
      className="item-metadata-modal"
      open={isOpenModal}
      onClose={close}
      size="large"
      closeIcon
      centered
    >
      <Modal.Header>
        <h3>{item.title ? item.title : item.id}</h3>
      </Modal.Header>

      <Modal.Content>
        <div className="item-modal-metadata">
          <div>
            {item.publication_year && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">
                  Year of publication:{' '}
                </span>
                <span>{item.publication_year}</span>
              </div>
            )}
            {item.category && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">Topic: </span>
                <span>{item.category}</span>
              </div>
            )}
            {item.publisher && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">Organisation: </span>
                <span>{item.publisher.title}</span>
              </div>
            )}
          </div>

          {(tableau_url || map_url) && (
            <div className="map-preview">
              <MapPreview tableau_url={tableau_url} map_url={map_url} />
            </div>
          )}
        </div>

        <div className="item-metadata-table">
          {item.description && <p>{item.description}</p>}
          {item.lineage && <p>{item.lineage}</p>}

          <Table celled definition basic="very">
            <Table.Body>
              {item.category && (
                <Table.Row>
                  <Table.Cell>Topic</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                </Table.Row>
              )}

              {item.subjects && item.subjects.length > 0 && (
                <Table.Row>
                  <Table.Cell>Tag</Table.Cell>
                  <Table.Cell>
                    <div className="tag-types">
                      {item.subjects.map((tag, i) => (
                        <div key={i}>
                          <p>{tag}</p>
                        </div>
                      ))}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}

              {item.dpsir_type && (
                <Table.Row>
                  <Table.Cell>DPSIR</Table.Cell>
                  <Table.Cell>{item.dpsir_type.title}</Table.Cell>
                </Table.Row>
              )}

              {item.legislative_reference && (
                <Table.Row>
                  <Table.Cell>Reference legislation</Table.Cell>
                  <Table.Cell>{item.legislative_reference.title}</Table.Cell>
                </Table.Row>
              )}

              {/*{item.description && (
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                </Table.Row>
              )}

              {item.lineage && (
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>{item.lineage}</Table.Cell>
                </Table.Row>
              )}*/}

              {item.temporal_coverage &&
                Object.keys(item.temporal_coverage).length > 0 && (
                  <Table.Row>
                    <Table.Cell>Temporal coverage</Table.Cell>
                    <Table.Cell>
                      <div className="tag-types">
                        {item.temporal_coverage.temporal.map((temp, i) => (
                          <div key={i}>
                            <p>{temp.label}</p>
                          </div>
                        ))}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}

              {item.geo_coverage && Object.keys(item.geo_coverage).length > 0 && (
                <Table.Row>
                  <Table.Cell>Spatial coverage</Table.Cell>
                  <Table.Cell>
                    <div className="geo-tags tag-types">
                      {item.geo_coverage.geolocation.map((geo, i) => (
                        <div key={i}>
                          <p>{geo.label}</p>
                        </div>
                      ))}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}

              {item.publisher && (
                <Table.Row>
                  <Table.Cell>Organisation</Table.Cell>
                  <Table.Cell>{item.publisher.title}</Table.Cell>
                </Table.Row>
              )}

              {item.original_source && (
                <Table.Row>
                  <Table.Cell>Source</Table.Cell>
                  <Table.Cell>
                    <a href={item.original_source}>{item.original_source}</a>
                  </Table.Cell>
                </Table.Row>
              )}

              {item.publication_year && (
                <Table.Row>
                  <Table.Cell>Year of publication</Table.Cell>
                  <Table.Cell>{item.publication_year}</Table.Cell>
                </Table.Row>
              )}

              {item.license_copyright && (
                <Table.Row>
                  <Table.Cell>Rights</Table.Cell>
                  <Table.Cell>{item.license_copyright}</Table.Cell>
                </Table.Row>
              )}

              {item.report_type && (
                <Table.Row>
                  <Table.Cell>Report type</Table.Cell>
                  <Table.Cell>{item.report_type.title}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Modal.Content>
    </Modal>
  );
};

const MetadataListingView = ({ items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <div className="listing-body">
              <div
                className="listing-title"
                onClick={() => {
                  setOpenModal(true);
                  setSelectedItem(item);
                }}
                onKeyDown={() => setSelectedItem(item)}
                role="button"
                tabIndex="0"
              >
                <h3>{item.title ? item.title : item.id}</h3>
              </div>
              <div className="item-metadata">
                {item.publication_year && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">
                      Year of publication:{' '}
                    </span>
                    <span>{item.publication_year}</span>
                  </div>
                )}
                {item.category && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">Topic: </span>
                    <span>{item.category}</span>
                  </div>
                )}
                {item.publisher && (
                  <div className="metadata-tab-section">
                    <span className="metadata-tab-title">Organisation: </span>
                    <span>{item.publisher.title}</span>
                  </div>
                )}
              </div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        {isOpenModal && (
          <ItemMetadata
            item={selectedItem}
            isOpenModal={isOpenModal}
            close={close}
          />
        )}
      </div>
    </>
  );
};

MetadataListingView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default MetadataListingView;
