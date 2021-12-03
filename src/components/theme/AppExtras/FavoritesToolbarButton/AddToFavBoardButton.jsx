import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { FavButton } from '@eeacms/volto-freshwater/components';
import starSVG from '@plone/volto/icons/half-star.svg';
import starFullSVG from '@eeacms/volto-freshwater/icons/star-full.svg';
import {
  addItemToBasket,
  removeItemFromBasket,
} from '@eeacms/volto-freshwater/actions/basket';

const AddToFavBoardButton = (props) => {
  const { basket, content, location } = props;
  const dispatch = useDispatch();
  const isSearchQuerySelected = basket.items.some(
    (item) => item.hash === location.hash,
  );

  return (
    <Portal node={__CLIENT__ && document.querySelector('.toolbar-actions')}>
      <div className="fav-toolbar-menu">
        {location.hash ? (
          <>
            {isSearchQuerySelected ? (
              <Button
                className="add-to-fav"
                title="Remove selection"
                onClick={() => {
                  dispatch(removeItemFromBasket(content));
                }}
              >
                <Icon className="selected" name={starFullSVG} size="33px" />
              </Button>
            ) : (
              <Button
                className="add-to-fav"
                title="Save to Board"
                onClick={() => {
                  if (location.hash && !isSearchQuerySelected) {
                    dispatch(
                      addItemToBasket({
                        content: content,
                        hash: location.hash,
                      }),
                    );
                  }
                }}
              >
                <Icon name={starSVG} size="33px" />
              </Button>
            )}
          </>
        ) : (
          <FavButton item={content} iconSize="33" />
        )}
      </div>
    </Portal>
  );
};

export default compose(
  connect((state) => ({
    basket: state.basket,
  })),
)(AddToFavBoardButton);
