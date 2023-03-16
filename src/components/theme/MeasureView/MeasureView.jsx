import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { ItemMetadataSnippet } from '@eeacms/volto-freshwater/components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.less';

const MeasureView = (props) => {
  const { content } = props;

  return (
    <>
      <BodyClass className="measure-view" />

      <div id="page-document" className="ui container">
        <div>
          <div className="metadata-header">
            <h1>{content.title}</h1>

            <ItemMetadataSnippet {...props} item={content} />

            <div class="field--label-inline">
              <div class="field__label">Code</div>
              <div class="field__item">{content.measure_code}</div>
            </div>

            <div class="field--label-inline">
              <div class="field__label">Sector</div>
              <div class="field__item">{content.measure_sector}</div>
            </div>

            {content.other_sector && (
              <>
                <br />
                <div class="field--label-inline">
                  <div class="field__label">Other sector(s)</div>
                  <div class="field__item">{content.other_sector}</div>
                </div>
              </>
            )}

            <br />
            <div>
              <h4>The complete description of the NWRM</h4>
              <div class="field__item">
                {content.items.map(
                  (item) =>
                    item['@type'] == 'File' && (
                      <a href={item['@id'] + '/@@images/file'} target="_blank">
                        {item.title}
                      </a>
                    ),
                )}
              </div>
            </div>

            <br />
            <div>
              <h4>Summary</h4>
              <div
                class="field__item"
                dangerouslySetInnerHTML={{
                  __html: content.measure_summary.data,
                }}
              ></div>
            </div>

            <br />
            <div class="fullwidthZ">
              <div class="images-container">
                <h4>Illustration(s)</h4>
                <div class="image-flexbox">
                  {content.items.map(
                    (item) =>
                      item['@type'] == 'Image' && (
                        <div class="image-wrapper">
                          <div>
                            <a href={item['@id'] + '/@@images/image'}>
                              <LazyLoadImage
                                src={item['@id'] + '/@@images/image/preview'}
                                title={item.title}
                                alt={item.title}
                              />
                            </a>
                          </div>
                          <div>{item.title}</div>
                          {item.description.includes('http') ? (
                            <div>
                              <a href={item.description.split(': ')[1]}>
                                Source
                              </a>
                            </div>
                          ) : (
                            <div>Source: {item.description.split(': ')[1]}</div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>

            <br />
            <div>
              <h4>Possible benefits with level</h4>
              <div
                class="field__item"
                dangerouslySetInnerHTML={{
                  __html: content.possible_benefits.data,
                }}
              ></div>
            </div>

            <br />
            {content.case_studies && (
              <div>
                <h4>Case studies</h4>
                <div class="field__item">
                  <ul>
                    {content.case_studies.map((item) => (
                      <li key={item['@id']}>
                        <a href={item['@id']}>{item.title}</a>
                      </li>
                    ))}{' '}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MeasureView;
