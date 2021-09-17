import React from 'react';
import { Table } from 'semantic-ui-react';
import MapPreview from './MapPreview';

const EEA_LICENSE =
  'EEA standard re-use policy: unless otherwise indicated,' +
  're-use of content on the EEA website for commercial or ' +
  'non-commercial purposes is permitted free of charge, ' +
  'provided that the source is acknowledged ' +
  '(https://www.eea.europa.eu/legal/copyright). ' +
  'Copyright holder: European Commission.';

const ItemMetadata = (props) => {
  const { item } = props;
  const source = item?.source?.[0] || item;
  const description = item.description || source?.description;
  const subject = source.subject || source.subjects;
  const tableau_url = source?.embed_url;
  const map_url = source?.webmap_url;
  const copyright =
    source.license_copyright === 'EEA' ? EEA_LICENSE : source.license_copyright;

  return (
    <>
      <div className="map-preview-wrapper">
        {(tableau_url || map_url) && (
          <div className="map-preview">
            <MapPreview tableau_url={tableau_url} map_url={map_url} />
          </div>
        )}
      </div>

      <div className="item-metadata-table">
        <Table celled definition basic="very">
          <Table.Body>
            {source && (
              <>
                {description && (
                  <Table.Row>
                    <Table.Cell>Description</Table.Cell>
                    <Table.Cell>
                      {description}
                      {source.lineage && (
                        <p style={{ paddingTop: '1rem' }}>{source.lineage}</p>
                      )}
                    </Table.Cell>
                  </Table.Row>
                )}

                {source.temporal_coverage &&
                  Object.keys(source.temporal_coverage).length > 0 && (
                    <Table.Row>
                      <Table.Cell>Temporal coverage</Table.Cell>
                      <Table.Cell>
                        <div className="tag-types">
                          {source.temporal_coverage.temporal.map((temp, i) => (
                            <div key={i}>
                              <p>{temp.label}</p>
                            </div>
                          ))}
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
                    <Table.Cell>
                      {source.publisher.title || source.publisher}
                    </Table.Cell>
                  </Table.Row>
                )}

                {source.original_source && (
                  <Table.Row>
                    <Table.Cell>Source</Table.Cell>
                    <Table.Cell>
                      <a
                        href={source.original_source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.original_source}
                      </a>
                    </Table.Cell>
                  </Table.Row>
                )}

                {source.license_copyright && (
                  <Table.Row>
                    <Table.Cell>Rights</Table.Cell>
                    <Table.Cell>{copyright}</Table.Cell>
                  </Table.Row>
                )}

                {subject && subject.length > 0 && (
                  <Table.Row>
                    <Table.Cell>Keywords</Table.Cell>
                    <Table.Cell>
                      <div className="tag-types">
                        {subject.map((tag, i) => (
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
                    <Table.Cell>
                      {source.dpsir_type.title || source.dpsir_type}
                    </Table.Cell>
                  </Table.Row>
                )}

                {source.report_type && (
                  <Table.Row>
                    <Table.Cell>Report type</Table.Cell>
                    <Table.Cell>
                      {source.report_type.title || source.report_type}
                    </Table.Cell>
                  </Table.Row>
                )}
              </>
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ItemMetadata;