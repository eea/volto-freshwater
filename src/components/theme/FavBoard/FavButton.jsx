import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  addItemToBasket,
  removeItemFromBasket,
} from '@eeacms/volto-freshwater/actions/basket';

import starSVG from '@plone/volto/icons/half-star.svg';
import starFullSVG from '@eeacms/volto-freshwater/icons/star-full.svg';
import './style.less';

const getSize = (size) => {
  return size + 'px';
};

const FavButton = (props) => {
  const { item, basket, iconSize } = props;
  const dispatch = useDispatch();

  return (
    <>
      {basket.items.some((b) => b.content === item) ? (
        <Button
          basic
          className="add-fav-btn"
          title="Remove selection"
          onClick={() => {
            dispatch(removeItemFromBasket(item));
          }}
        >
          <Icon
            className="selected"
            name={starFullSVG}
            size={getSize(iconSize)}
          />
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
          <Icon name={starSVG} size={getSize(iconSize)} />
        </Button>
      )}
    </>
  );
};

export default compose(
  connect((state) => ({
    basket: state.basket,
  })),
)(FavButton);
