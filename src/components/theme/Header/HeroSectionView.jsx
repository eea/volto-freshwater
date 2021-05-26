/**
 * Document view component.
 * @module components/theme/View/HeroSectionView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { Container } from 'semantic-ui-react';
import { map } from 'lodash';

import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Component to display the default view.
 * @function HeroSectionView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const HeroSectionView = ({ content, intl, location }) => {
  const blocksFieldName = getBlocksFieldname(content);
  const hasContentImage = content.image;
  const blocksLayoutFieldName = getBlocksLayoutFieldname(content);

  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      {map(content[blocksLayoutFieldName].items, (block) => {
        const block_data = content[blocksFieldName]?.[block];
        const block_type = block_data?.['@type'];
        const Block = config.blocks?.blocksConfig[block_type]?.['view'] || null;
        return Block !== null ? (
          <React.Fragment key={block}>
            {(block_type !== 'title' || !hasContentImage) && (
              <Block
                key={block}
                id={block}
                properties={content}
                data={block_data}
                path={getBaseUrl(location?.pathname || '')}
              />
            )}
          </React.Fragment>
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: block_type,
            })}
          </div>
        );
      })}
    </div>
  ) : (
    <Container id="page-document" />
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
HeroSectionView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(HeroSectionView);
