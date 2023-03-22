import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { ItemMetadataSnippet } from '@eeacms/volto-freshwater/components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.less';

const SourceView = (props) => {
  const { content } = props;

  return (
    <>
      <BodyClass className="source-view" />

      <div id="page-document" className="ui container">
        <div>
          <div className="metadata-header">
            <h1>{content.title}</h1>

            <ItemMetadataSnippet {...props} item={content} />

            <div>
              <div
                class="field__item"
                dangerouslySetInnerHTML={{
                  __html: content.source_data.data,
                }}
              ></div>
            </div>

            <br />
            {content.source_case_studies && (
              <div>
                <h4>Case studies</h4>
                <div class="field__item">
                  <ul>
                    {content.source_case_studies.map((item) => (
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

export default SourceView;
