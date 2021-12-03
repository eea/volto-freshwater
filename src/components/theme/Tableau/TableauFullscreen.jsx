import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { useHistory, useLocation } from 'react-router-dom';
import fullscreenSVG from '@plone/volto/icons/fullscreen.svg';

import config from '@plone/volto/registry';

const TableauFullscreen = (props) => {
  const tableau_url = props.data.url;
  const modalHash = props?.item.getId + '_preview';
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const {
    blocks: { blocksConfig },
  } = config;
  const TableauBlockView = blocksConfig.tableau_block.view;

  React.useEffect(() => {
    if (location.hash.includes(modalHash)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location, modalHash]);

  const closeModal = () => {
    history.push({
      hash: '',
    });
    setOpen(false);
  };

  return (
    <>
      <div className="toolbar-button-wrapper">
        <Button
          className="toolbar-button"
          title="Full Screen"
          onClick={() => {
            setOpen(true);
            if (props.item) {
              history.push({
                hash: props.item.getId + '_preview',
              });
            }
          }}
        >
          <Icon name={fullscreenSVG} size="23px" />
        </Button>
        <span className="btn-text">Enlarge</span>
      </div>

      <Modal
        className="tableau-fullscreen"
        onClose={closeModal}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>
          <TableauBlockView
            {...props}
            data={{ url: tableau_url, hideToolbar: true }}
          ></TableauBlockView>
        </Modal.Content>

        <Modal.Actions>
          <Button primary onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TableauFullscreen;
