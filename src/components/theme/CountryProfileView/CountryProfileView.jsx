import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Component to display the country profile view.
 * @function CountryProfileView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const CountryProfileView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return (
    <div id="page-document" className="ui container">
      <BodyClass className="country-profile" />
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          config.blocks.blocksConfig[
            content[blocksFieldname]?.[block]?.['@type']
          ]?.['view'] || null;
        return Block !== null ? (
          <Block
            key={block}
            id={block}
            properties={content}
            data={content[blocksFieldname][block]}
            path={getBaseUrl(location?.pathname || '')}
          />
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </div>
  );
};

export default injectIntl(CountryProfileView);
