import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { MapPreview } from '@eeacms/volto-freshwater/components';
import { formatItemType } from '@eeacms/volto-freshwater/utils';

import './style.less';

const EEA_LICENSE =
  'EEA standard re-use policy: unless otherwise indicated,' +
  're-use of content on the EEA website for commercial or ' +
  'non-commercial purposes is permitted free of charge, ' +
  'provided that the content is acknowledged ' +
  '(https://www.eea.europa.eu/legal/copyright). ' +
  'Copyright holder: European Commission.';

const DatabaseItemView = (props) => {
  const { content } = props;
  const tableau_url = content?.embed_url;
  const map_url = content?.webmap_url;

  const copyright =
    content.license_copyright === 'EEA'
      ? EEA_LICENSE
      : content.license_copyright;

  return (
    <>
      <BodyClass className="database-item-view" />

      <div id="page-document" className="ui container">
        <div>
          <Link to="/data-maps-and-tools/metadata" className="resources-link">
            <Icon name="folder open outline" size="small" />
            Resource catalogue
          </Link>

          <div className="metadata-header">
            {content['@type'] && (
              <h3 className="item-type">{formatItemType(content['@type'])}</h3>
            )}
            <h1>{content.title}</h1>
            <div className="metadata-info">
              {content.category && content.category.length > 0 && (
                <div className="metadata-section">
                  <span className="metadata-tab-title">Topics: </span>
                  {Array.isArray(content.category) ? (
                    <>
                      {content.category.map((topic, i) => (
                        <span key={i}>
                          {topic}
                          {i < content.category.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span>{content.category}</span>
                  )}
                </div>
              )}

              {content.publication_year && (
                <div className="metadata-section">
                  <span className="metadata-tab-title">Publication year: </span>
                  <span>{content.publication_year}</span>
                </div>
              )}

              {content.legislative_reference &&
                content.legislative_reference.length > 0 && (
                  <div className="metadata-section">
                    <span className="metadata-tab-title">
                      Legislative reference:{' '}
                    </span>
                    {Array.isArray(content.legislative_reference) ? (
                      <>
                        {content.legislative_reference.map((tag, i) => (
                          <span key={i}>
                            {tag.title || tag}
                            {i < content.legislative_reference.length - 1
                              ? ', '
                              : ''}
                          </span>
                        ))}
                      </>
                    ) : (
                      <span>
                        {content.legislative_reference.title ||
                          content.legislative_reference}
                      </span>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="map-preview-wrapper">
          {(tableau_url || map_url) && (
            <div className="map-preview">
              <MapPreview
                item={content}
                item_view={true}
                tableau_url={tableau_url}
                map_url={map_url}
              />
            </div>
          )}
        </div>

        <div className="item-table item-metadata-table">
          <Table celled definition basic="very">
            <Table.Body>
              {content && (
                <>
                  {content.description && (
                    <Table.Row>
                      <Table.Cell>Description</Table.Cell>
                      <Table.Cell>
                        {content.description}
                        {content.lineage && (
                          <p style={{ paddingTop: '1rem' }}>
                            {content.lineage}
                          </p>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {content.temporal_coverage &&
                    Object.keys(content.temporal_coverage).length > 0 && (
                      <Table.Row>
                        <Table.Cell>Temporal coverage</Table.Cell>
                        <Table.Cell>
                          <div className="tag-types">
                            {content.temporal_coverage.temporal.map(
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

                  {content.geo_coverage &&
                    Object.keys(content.geo_coverage).length > 0 && (
                      <Table.Row>
                        <Table.Cell>Spatial coverage</Table.Cell>
                        <Table.Cell>
                          <div className="geo-tags tag-types">
                            {content.geo_coverage.geolocation.map((geo, i) => (
                              <div key={i}>
                                <p>{geo.label}</p>
                              </div>
                            ))}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}

                  {content.publisher && (
                    <Table.Row>
                      <Table.Cell>Organisation</Table.Cell>
                      <Table.Cell>
                        {content.publisher.title || content.publisher}
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {content.original_source && (
                    <Table.Row>
                      <Table.Cell>Source</Table.Cell>
                      <Table.Cell>
                        <a
                          href={content.original_source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {content.original_source}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {content.license_copyright && (
                    <Table.Row>
                      <Table.Cell>Rights</Table.Cell>
                      <Table.Cell>{copyright}</Table.Cell>
                    </Table.Row>
                  )}

                  {content.subject && content.subject.length > 0 && (
                    <Table.Row>
                      <Table.Cell>Keywords</Table.Cell>
                      <Table.Cell>
                        <div className="tag-types">
                          {content.subject.map((tag, i) => (
                            <div key={i}>
                              <p>{tag}</p>
                            </div>
                          ))}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {content.dpsir_type && (
                    <Table.Row>
                      <Table.Cell>DPSIR</Table.Cell>
                      <Table.Cell>
                        {content.dpsir_type.title || content.dpsir_type}
                      </Table.Cell>
                    </Table.Row>
                  )}

                  {content.report_type && (
                    <Table.Row>
                      <Table.Cell>Report type</Table.Cell>
                      <Table.Cell>
                        {content.report_type.title || content.report_type}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DatabaseItemView;
