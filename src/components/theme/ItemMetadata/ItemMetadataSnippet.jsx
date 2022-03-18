import React from 'react';
import { formatItemType } from '@eeacms/volto-freshwater/utils';

const ItemMetadataSnippet = (props) => {
  const { item } = props;
  const source = item?.source?.[0] || item;
  const type = item?.source?.[0]['@type'] || item['@type'];
  const { category, publication_year, legislative_reference } = source;

  return (
    <>
      <div className="item-modal-metadata">
        {type && (
          <div className="metadata-tab-section item-snippet-type">
            <span className="metadata-tab-title">Item: </span>
            <span>{formatItemType(type)}</span>
          </div>
        )}

        {category && category.length > 0 && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Topics: </span>
            {Array.isArray(category) ? (
              <>
                {category.map((topic, i) => (
                  <span key={i}>
                    {topic}
                    {i < category.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </>
            ) : (
              <span>{category}</span>
            )}
          </div>
        )}

        {publication_year && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Publication year: </span>
            <span>{publication_year}</span>
          </div>
        )}

        {legislative_reference && legislative_reference.length > 0 && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Legislative reference: </span>
            {Array.isArray(legislative_reference) ? (
              <>
                {legislative_reference.map((tag, i) => (
                  <span key={i}>
                    {tag.title || tag}
                    {i < legislative_reference.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </>
            ) : (
              <span>
                {legislative_reference.title || legislative_reference}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ItemMetadataSnippet;
