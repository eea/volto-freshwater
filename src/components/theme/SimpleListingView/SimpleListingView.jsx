import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import './style.less';

const formatItemType = (item) => {
  const type =
    item
      .replace('_', ' / ')
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ') || '';
  return type;
};

const SimpleListingView = ({ items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <ul className="items">
        {items.map((item) => (
          <li className="simple-listing-item" key={item['@id']}>
            <div
              className="simple-listing"
              onClick={() => {
                setOpenModal(true);
                setSelectedItem(item);
              }}
              onKeyDown={() => setSelectedItem(item)}
              role="button"
              tabIndex="0"
            >
              <div className="simple-listing-title">
                {item.title ? item.title : item.id}
              </div>
              {item['@type'] && (
                <div className="metadata-tab-section">
                  <span>{formatItemType(item['@type'])}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Modal
        className="item-metadata-modal"
        open={isOpenModal}
        onClose={close}
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
    </>
  );
};

SimpleListingView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default SimpleListingView;
