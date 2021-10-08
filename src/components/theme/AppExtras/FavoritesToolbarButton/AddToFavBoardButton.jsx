import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import starSVG from '@plone/volto/icons/half-star.svg';
import starFullSVG from '@eeacms/volto-freshwater/icons/star-full.svg';
import {
  addItemToBasket,
  removeItemFromBasket,
} from '@eeacms/volto-freshwater/actions/favBasket';

const AddToFavBoardButton = (props) => {
  const items = useSelector((state) => state.favBoards?.items || []);
  const dispatch = useDispatch();

  return items && items.length > 0 ? (
    <div>
      <Portal node={__CLIENT__ && document.querySelector('.toolbar-actions')}>
        <div className="fav-toolbar-menu">
          {props.basket.includes(props.content) ? (
            <Button
              className="add-to-fav"
              title="Save to Board"
              onClick={() => {
                dispatch(removeItemFromBasket(props.content));
              }}
            >
              <Icon name={starFullSVG} size="33px" />
            </Button>
          ) : (
            <Button
              className="add-to-fav"
              title="Save to favorites"
              onClick={() => {
                if (props.location.hash) {
                  dispatch(
                    addItemToBasket({
                      title: props.content.title,
                      UID: props.content.UID,
                      hash: props.location.hash,
                    }),
                  );
                } else {
                  dispatch(addItemToBasket(props.content));
                }
              }}
            >
              <Icon name={starSVG} size="33px" />
            </Button>
          )}
        </div>
      </Portal>
    </div>
  ) : (
    ''
  );
};

export default compose(
  connect((state) => ({
    basket: state.favBasket.basket,
  })),
)(AddToFavBoardButton);
