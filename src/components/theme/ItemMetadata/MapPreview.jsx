import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import fullscreenSVG from '@plone/volto/icons/slider.svg';
import TableauDownload from './../Tableau/TableauDownload';
import TableauShare from './../Tableau/TableauShare';

const MapPreview = (props) => {
  const { map_url, tableau_url } = props;
  const [open, setOpen] = React.useState(false);
  const {
    blocks: { blocksConfig },
  } = config;

  const TableauBlockView = blocksConfig.tableau_block.view;
  const MapBlockView = blocksConfig.maps.view;

  return (
    <Modal
      className="metadata-tableau"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="mini" className="viz-btn toolbar-button" title="Preview">
          <Icon name={fullscreenSVG} size="28px" />
        </Button>
      }
    >
      <Modal.Content>
        {tableau_url && (
          <TableauBlockView
            {...props}
            data={{ url: props.tableau_url, hideToolbar: true }}
          >
            {(viz) => {
              return (
                <div className="tableau-icons">
                  <TableauDownload {...props} viz={viz} />
                  <TableauShare
                    {...props}
                    viz={viz}
                    data={{ url: props.tableau_url }}
                  />
                </div>
              );
            }}
          </TableauBlockView>
        )}

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

export default MapPreview;
