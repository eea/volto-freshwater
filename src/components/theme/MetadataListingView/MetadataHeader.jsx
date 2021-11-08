import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import {
  ItemMetadata,
  ItemTitle,
  ItemMetadataSnippet,
} from '@eeacms/volto-freshwater/components';
import './style.less';
import { useLocation, useHistory } from 'react-router-dom';

const MetadataHeader = (props) => {
  const { item } = props;
  const [isOpenModal, setOpenModal] = useState(false);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash.includes(item?.id)) {
      setOpenModal(false);
    }
  }, [location, item.id]);

  const closeModal = (item) => {
    history.replace({}, document.title, window.location.pathname);
    setOpenModal(false);
  };

  return (
    <>
      <div
        className="listing-title"
        onClick={() => {
          setOpenModal(true);
          history.push({
            hash: item?.id,
          });
        }}
        onKeyDown={() => setOpenModal(true)}
        role="button"
        tabIndex="0"
      >
        <h3>{item.title ? item.title : item.id}</h3>
      </div>

      <Modal
        className="item-metadata-modal"
        open={isOpenModal}
        onClose={closeModal}
        size="large"
        closeIcon
        centered
      >
        <Modal.Header>
          <ItemMetadataSnippet item={item} />
          <ItemTitle item={item} />
        </Modal.Header>

        <Modal.Content>
          <ItemMetadata item={item} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default MetadataHeader;
