import React from 'react';
import { Modal, Table } from 'semantic-ui-react';

const DashboardMetadata = (props) => {
  const { item, isOpenModal, close } = props;
  const source = item?.source?.[0];

  return (
    <Modal
      className="item-metadata-modal"
      open={isOpenModal}
      onClose={close}
      size="large"
      closeIcon
      centered
    >
      <Modal.Header>{item && <h3>{item.title}</h3>}</Modal.Header>

      <Modal.Content>
        <div className="item-metadata-table">
          <Table celled definition basic="very">
            <Table.Body>
              {source && (
                <>
                  {source.category && (
                    <Table.Row>
                      <Table.Cell>Topic</Table.Cell>
                      <Table.Cell>{source.category}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.subject && source.subject.length > 0 && (
                    <Table.Row>
                      <Table.Cell>Tag</Table.Cell>
                      <Table.Cell>
                        <div className="tag-types">
                          {source.subject.map((tag, i) => (
                            <div key={i}>
                              <p>{tag}</p>
                            </div>
                          ))}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {source.dpsir_type && (
                    <Table.Row>
                      <Table.Cell>DPSIR</Table.Cell>
                      <Table.Cell>{source.dpsir_type}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.legislative_reference && (
                    <Table.Row>
                      <Table.Cell>Reference legislation</Table.Cell>
                      <Table.Cell>{source.legislative_reference}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.lineage && (
                    <Table.Row>
                      <Table.Cell>Lineage</Table.Cell>
                      <Table.Cell>{source.lineage}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.temporal_coverage &&
                    Object.keys(source.temporal_coverage).length > 0 && (
                      <Table.Row>
                        <Table.Cell>Temporal coverage</Table.Cell>
                        <Table.Cell>
                          <div className="tag-types">
                            {source.temporal_coverage.temporal.map(
                              (temp, i) => (
                                <div key={i}>
                                  <p>{temp.label}</p>
                                </div>
                              ),
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}

                  {source.geo_coverage &&
                    Object.keys(source.geo_coverage).length > 0 && (
                      <Table.Row>
                        <Table.Cell>Spatial coverage</Table.Cell>
                        <Table.Cell>
                          <div className="geo-tags tag-types">
                            {source.geo_coverage.geolocation.map((geo, i) => (
                              <div key={i}>
                                <p>{geo.label}</p>
                              </div>
                            ))}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}

                  {source.publisher && (
                    <Table.Row>
                      <Table.Cell>Organisation</Table.Cell>
                      <Table.Cell>{source.publisher}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.original_source && (
                    <Table.Row>
                      <Table.Cell>Source</Table.Cell>
                      <Table.Cell>
                        <a href={source.original_source}>
                          {source.original_source}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {source.publication_year && (
                    <Table.Row>
                      <Table.Cell>Year of publication</Table.Cell>
                      <Table.Cell>{source.publication_year}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.license_copyright && (
                    <Table.Row>
                      <Table.Cell>Rights</Table.Cell>
                      <Table.Cell>{source.license_copyright}</Table.Cell>
                    </Table.Row>
                  )}

                  {source.report_type && (
                    <Table.Row>
                      <Table.Cell>Report type</Table.Cell>
                      <Table.Cell>{source.report_type}</Table.Cell>
                    </Table.Row>
                  )}
                </>
              )}
            </Table.Body>
          </Table>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DashboardMetadata;
