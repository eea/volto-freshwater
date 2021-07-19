import React from 'react';

const formatItemType = (item) => {
  const type =
    item
      .replace('_', ' / ')
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ') || '';
  return type;
};

const ItemMetadataSnippet = (props) => {
  const { item } = props;
  const source = item?.source?.[0] || item;
  const type = item?.source?.[0]['@type'] || item['@type'];

  return (
    <>
      <div className="item-modal-metadata">
        {type && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Item: </span>
            <span>{formatItemType(type)}</span>
          </div>
        )}

        {source.category && source.category.length > 0 && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Topics: </span>
            {Array.isArray(source.category) ? (
              <>
                {source.category.map((topic, i) => (
                  <span key={i}>
                    {topic}
                    {i < source.category.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </>
            ) : (
              <span>{source.category}</span>
            )}
          </div>
        )}

        {source.publication_year && (
          <div className="metadata-tab-section">
            <span className="metadata-tab-title">Publication year: </span>
            <span>{source.publication_year}</span>
          </div>
        )}

        {source.legislative_reference &&
          source.legislative_reference.length > 0 && (
            <div className="metadata-tab-section">
              <span className="metadata-tab-title">
                Legislative reference:{' '}
              </span>
              {Array.isArray(source.legislative_reference) ? (
                <>
                  {source.legislative_reference.map((tag, i) => (
                    <span key={i}>
                      {tag.title || tag}
                      {i < source.legislative_reference.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </>
              ) : (
                <span>
                  {source.legislative_reference.title ||
                    source.legislative_reference}
                </span>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default ItemMetadataSnippet;
