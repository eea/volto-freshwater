import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import { formatItemType } from '@eeacms/volto-freshwater/utils';
import { useLocation, useHistory } from 'react-router-dom';
import './style.less';

const SimpleListingView = ({ items, isEditMode }) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const modalHash = selectedItem?.getId;
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash.includes(modalHash)) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [location, modalHash]);

  const closeModal = (item) => {
    setOpenModal(false);
    setSelectedItem(null);
    history.push({
      hash: '',
    });
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
                history.push({
                  hash: item?.getId,
                });
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
          <ItemMetadata
            item={selectedItem}
            map_preview={true}
            shareItem={true}
          />
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
