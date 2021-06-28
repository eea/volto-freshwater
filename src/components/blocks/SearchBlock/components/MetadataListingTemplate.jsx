import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'semantic-ui-react';

import './style.less';

export const ItemMetadata = (props) => {
  const { item, isOpenModal, close } = props;
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
        <div className="item-metadata-table">
          <Table celled definition basic="very">
            <Table.Body>
              {item.lineage && (
                <Table.Row>
                  <Table.Cell>Lineage:</Table.Cell>
                  <Table.Cell>{item.lineage}</Table.Cell>
                </Table.Row>
              )}

              {item.original_source && (
                <Table.Row>
                  <Table.Cell>Original source:</Table.Cell>
                  <Table.Cell>{item.original_source}</Table.Cell>
                </Table.Row>
              )}

              {item.publisher && (
                <Table.Row>
                  <Table.Cell>Organization:</Table.Cell>
                  <Table.Cell>{item.publisher.title}</Table.Cell>
                </Table.Row>
              )}

              {item.dpsir_type && (
                <Table.Row>
                  <Table.Cell>DPSIR:</Table.Cell>
                  <Table.Cell>{item.dpsir_type.title}</Table.Cell>
                </Table.Row>
              )}

              {item.category && (
                <Table.Row>
                  <Table.Cell>Topic:</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                </Table.Row>
              )}

              {item.legislative_reference && (
                <Table.Row>
                  <Table.Cell>Legislative reference:</Table.Cell>
                  <Table.Cell>{item.legislative_reference.title}</Table.Cell>
                </Table.Row>
              )}

              {item.publication_year && (
                <Table.Row>
                  <Table.Cell>Publication year:</Table.Cell>
                  <Table.Cell>{item.publication_year}</Table.Cell>
                </Table.Row>
              )}

              {item.license_copyright && (
                <Table.Row>
                  <Table.Cell>Rights:</Table.Cell>
                  <Table.Cell>{item.license_copyright}</Table.Cell>
                </Table.Row>
              )}

              {item.report_type && (
                <Table.Row>
                  <Table.Cell>Report type:</Table.Cell>
                  <Table.Cell>{item.report_type.title}</Table.Cell>
                </Table.Row>
              )}

              {item.temporal_coverage &&
                Object.keys(item.temporal_coverage).length > 0 && (
                  <Table.Row>
                    <Table.Cell>Temporal coverage:</Table.Cell>
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
                  <Table.Cell>Geo coverage:</Table.Cell>
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
            </Table.Body>
          </Table>
        </div>
      </Modal.Content>
    </Modal>
  );
};

const MetadataListingTemplate = ({ items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setselectedItem] = React.useState(null);

  const close = (item) => {
    setOpenModal(false);
    setselectedItem(null);
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
                  setselectedItem(item);
                }}
                onKeyDown={() => setselectedItem(item)}
                role="button"
                tabIndex="0"
              >
                <h3>{item.title ? item.title : item.id}</h3>
              </div>
              <div className="item-metadata">
                <div className="metadata-tab">
                  {item.publication_year && (
                    <>
                      <span class="metadata-tab-title">Publication year: </span>
                      <span>{item.publication_year}</span>
                    </>
                  )}
                </div>
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

MetadataListingTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default MetadataListingTemplate;
