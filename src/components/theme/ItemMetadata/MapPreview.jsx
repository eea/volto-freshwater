import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import fullscreenSVG from '@plone/volto/icons/slider.svg';
import { useHistory, useLocation } from 'react-router-dom';
import {
  TableauDownload,
  TableauShare,
} from '@eeacms/volto-freshwater/components';

const MapPreview = (props) => {
  const { item, map_url, tableau_url, item_view } = props;
  const modalHash = item?.id + '_preview';
  const [open, setOpen] = React.useState(false);
  const {
    blocks: { blocksConfig },
  } = config;
  const TableauBlockView = blocksConfig.tableau_block.view;
  const MapBlockView = blocksConfig.maps.view;
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash.includes(modalHash)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location, modalHash]);

  const closeModal = () => {
    history.push({
      hash: item_view ? '' : item?.id,
    });
    setOpen(false);
  };

  return (
    <>
      <div className="toolbar-button-wrapper">
        <Button
          size="mini"
          className="viz-btn toolbar-button"
          title="Preview"
          onClick={() => {
            setOpen(true);
            if (item) {
              history.push({
                hash: item.id + '_preview',
              });
            }
          }}
        >
          <Icon name={fullscreenSVG} size="28px" />
        </Button>
        <span className="btn-text">Preview</span>
      </div>

      <Modal
        className="metadata-tableau"
        onClose={closeModal}
        onOpen={() => setOpen(true)}
        open={open}
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
          <Button primary onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default MapPreview;
