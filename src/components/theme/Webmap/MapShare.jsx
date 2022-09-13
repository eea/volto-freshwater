import React from 'react';
import { Popup, Button, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { useCopyToClipboard } from '@eeacms/volto-freshwater/helpers';
import cx from 'classnames';

import shareSVG from '@plone/volto/icons/share.svg';

const MapShare = (props) => {
  const map_url = props.data.url;

  const CopyUrlButton = ({ url, buttonText }) => {
    const [copyUrlStatus, copyUrl] = useCopyToClipboard(url);

    if (copyUrlStatus === 'copied') {
      buttonText = 'Copied!';
    } else if (copyUrlStatus === 'failed') {
      buttonText = 'Copy failed. Please try again.';
    }

    return (
      <Button
        primary
        onClick={copyUrl}
        className={cx('copy-button', {
          'green-button': copyUrlStatus === 'copied',
        })}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <Popup
      className="map-share-dialog"
      position="top center"
      on="click"
      trigger={
        <Button className="toolbar-button" title="Share">
          <Icon name={shareSVG} size="26px" />
        </Button>
      }
    >
      <Popup.Header>Share</Popup.Header>
      <Popup.Content>
        <Input defaultValue={map_url} />
        <CopyUrlButton url={map_url} buttonText="Copy sharing URL" />
      </Popup.Content>
    </Popup>
  );
};

export default MapShare;
