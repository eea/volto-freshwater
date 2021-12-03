import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Menu } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const HorizontalMenu = (props) => {
  const { data, tocEntries } = props;

  return (
    <div className="fw-horizontal-menu full-width">
      <div className="ui container">
        {data.title && !data.hide_title && (
          <p className="block-title">
            {data.title || (
              <FormattedMessage
                id="Table of Contents"
                defaultMessage="Table of Contents"
              />
            )}
          </p>
        )}
        <Menu>
          {map(tocEntries, (entries) => {
            return map(entries, (myentry) => {
              const [level, entry, id] = myentry;
              return (
                entry && (
                  <Menu.Item key={id} className={`headline-${level}`}>
                    <AnchorLink href={`#${id}`}>{entry}</AnchorLink>
                  </Menu.Item>
                )
              );
            });
          })}
        </Menu>
      </div>
    </div>
  );
};

const View = ({ properties, data, tocEntries }) => {
  return (
    <>
      {__CLIENT__ && document.body.classList.contains('has-image') ? (
        <Portal node={__CLIENT__ && document.querySelector('.portal-top')}>
          <HorizontalMenu data={data} tocEntries={tocEntries} />
        </Portal>
      ) : (
        <Portal node={__CLIENT__ && document.querySelector('.breadcrumbs')}>
          <HorizontalMenu data={data} tocEntries={tocEntries} />
        </Portal>
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
