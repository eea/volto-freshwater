import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ItemMetadataSnippet,
  MetadataHeader,
  FavButton,
} from '@eeacms/volto-freshwater/components';
import './style.less';

const MetadataListingView = ({ items, isEditMode, token }) => {
  return (
    <div className="items">
      {items.map((item, index) => (
        <div className="listing-item" key={item['@id']}>
          <div className="listing-body">
            <MetadataHeader item={item} />
            {token && <FavButton item={item} iconSize="20" />}
            <ItemMetadataSnippet item={item} />
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

MetadataListingView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default compose(
  connect((state) => ({
    token: state.userSession.token,
  })),
)(MetadataListingView);
