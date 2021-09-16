import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import { addItemToBasket } from '@eeacms/volto-freshwater/actions/pinLists';
import starSVG from '@plone/volto/icons/star.svg';
import './style.less';

const MetadataListingView = ({ basket, items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="items">
        {items.map((item, index) => (
          <div className="listing-item" key={item['@id']}>
            <div className="listing-body">
              <div
                className="listing-title"
                onClick={() => {
                  setOpenModal(true);
                  setSelectedItem(item);
                }}
                onKeyDown={() => setSelectedItem(item)}
                role="button"
                tabIndex="0"
              >
                <h3>{item.title ? item.title : item.id}</h3>
              </div>
              <Button
                basic
                className="add-pin-btn"
                onClick={() => dispatch(addItemToBasket(item))}
              >
                <Icon name={starSVG} size="20px" />
              </Button>

              <ItemMetadataSnippet item={item} />
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        <Modal
          className="item-metadata-modal"
          open={isOpenModal}
          onClose={closeModal}
          size="large"
          closeIcon
          centered
        >
          <Modal.Header>
            <ItemMetadataSnippet item={selectedItem} />
            <ItemTitle item={selectedItem} />
          </Modal.Header>

          <Modal.Content>
            <ItemMetadata item={selectedItem} />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};

MetadataListingView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default compose(
  connect(
    (state) => ({
      basket: state.pinLists.basket,
    }),
    { addItemToBasket },
  ),
)(MetadataListingView);
