import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import {
  ItemMetadataSnippet,
  ItemMetadata,
} from '@eeacms/volto-freshwater/components';
import { formatItemType } from '@eeacms/volto-freshwater/utils';

import './style.less';

const DatabaseItemView = (props) => {
  const { content } = props;

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

            <ItemMetadataSnippet {...props} item={content} />
          </div>
        </div>

        <ItemMetadata
          {...props}
          item={content}
          map_preview={true}
          item_view={true}
        />
      </div>
    </>
  );
};

export default DatabaseItemView;
