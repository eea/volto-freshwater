import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import fullscreenSVG from '@plone/volto/icons/fullscreen.svg';

import config from '@plone/volto/registry';

const TableauFullscreen = (props) => {
  const [open, setOpen] = React.useState(false);
  const {
    blocks: { blocksConfig },
  } = config;
  const tableau_url = props.data.url;

  const TableauBlockView = blocksConfig.tableau_block.view;

  return (
    <Modal
      className="tableau-fullscreen"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button className="toolbar-button" title="Full Screen">
          <Icon name={fullscreenSVG} size="22px" />
        </Button>
      }
    >
      <Modal.Content>
        <TableauBlockView
          {...props}
          data={{ url: tableau_url, hideToolbar: true }}
        ></TableauBlockView>
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TableauFullscreen;
