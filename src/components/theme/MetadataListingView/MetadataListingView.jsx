import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  addItemToBasket,
  removeItemFromBasket,
} from '@eeacms/volto-freshwater/actions/basket';
import {
  ItemMetadataSnippet,
  MetadataHeader,
} from '@eeacms/volto-freshwater/components';
import starSVG from '@plone/volto/icons/half-star.svg';
import starFullSVG from '@eeacms/volto-freshwater/icons/star-full.svg';
import './style.less';

const MetadataListingView = ({ items, isEditMode, basket }) => {
  const dispatch = useDispatch();

  return (
    <div className="items">
      {items.map((item, index) => (
        <div className="listing-item" key={item['@id']}>
          <div className="listing-body">
            <MetadataHeader item={item} />

            {basket.items.some((b) => b.content === item) ? (
              <Button
                basic
                className="add-fav-btn"
                title="Remove selection"
                onClick={() => {
                  dispatch(removeItemFromBasket(item));
                }}
              >
                <Icon className="selected" name={starFullSVG} size="20px" />
              </Button>
            ) : (
              <Button
                basic
                className="add-fav-btn"
                title="Save to Board"
                onClick={() => {
                  dispatch(addItemToBasket({ content: item }));
                }}
              >
                <Icon name={starSVG} size="20px" />
              </Button>
            )}

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
    basket: state.basket,
  })),
)(MetadataListingView);
