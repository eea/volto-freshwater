import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import fullscreenSVG from '@plone/volto/icons/fullscreen.svg';

const MapFullscreen = (props) => {
  const map_url = props.data.url;
  const [open, setOpen] = React.useState(false);
  const {
    blocks: { blocksConfig },
  } = config;

  const MapBlockView = blocksConfig.maps.view;

  return (
    <Modal
      className="metadata-tableau"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="mini" className="toolbar-button" title="Fullscreen">
          <Icon name={fullscreenSVG} size="28px" />
        </Button>
      }
    >
      <Modal.Content>
        {map_url && (
          <div style={{ margin: '1em 0' }}>
            <MapBlockView {...props} data={{ url: map_url }} />
          </div>
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MapFullscreen;
