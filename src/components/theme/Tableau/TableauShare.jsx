import React from 'react';
import { Popup, Tab, Button, Menu, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { useCopyToClipboard } from '@eeacms/volto-freshwater/utils';

import shareSVG from '@plone/volto/icons/share.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import linkSVG from '@plone/volto/icons/link.svg';

import cx from 'classnames';

const TableauShare = (props) => {
  const tableau_url = props.data.url;

  const embedContent = () => {
    var pathArray = tableau_url.split('/');
    var t_siteRoot = '/' + pathArray[3] + '/' + pathArray[4];
    var t_name = pathArray[6] + '/' + pathArray[7].split('?')[0];
    var t_filter = pathArray[7].split('?')[1];
    t_filter = t_filter.split('&:')[0];

    var embed =
      "<script type='text/javascript'" +
      "src='https://tableau.discomap.eea.europa.eu/javascripts/api/viz_v1.js'></script>" +
      "<div class='tableauPlaceholder' style='width: 100%; height: 850px;'>" +
      "<object class='tableauViz' width='100%' height='850' style='display:none;'>" +
      "<param name='host_url' value='https%3A%2F%2Ftableau.discomap.eea.europa.eu%2F' />" +
      "<param name='site_root' value='" +
      t_siteRoot +
      "' />" +
      "<param name='name' value='" +
      t_name +
      "' />" +
      "<param name='filter' value='" +
      t_filter +
      "'/>" +
      "<param name='toolbar' value='no' />" +
      "<param name='isGuestRedirectFromVizportal' value='y' />" +
      '</object>' +
      '</div>';

    return embed;
  };

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

  const panes = [
    {
      menuItem: (
        <Menu.Item key="location">
          <span className="nav-dot">
            <Icon name={linkSVG} size="24px" />
          </span>
          <span className="nav-dot-title">URL</span>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Input defaultValue={tableau_url} />
          <CopyUrlButton url={tableau_url} buttonText="Copy sharing URL" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="messages">
          <span className="nav-dot">
            <Icon name={codeSVG} size="24px" />
          </span>
          <span className="nav-dot-title">Embed</span>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <textarea defaultValue={embedContent()} />
          <CopyUrlButton url={embedContent()} buttonText="Copy embed code" />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Popup
      className="tableau-share-dialog"
      position="top center"
      on="click"
      trigger={
        <div className="toolbar-button-wrapper">
          <Button className="toolbar-button" title="Share">
            <Icon name={shareSVG} size="26px" />
          </Button>
          <span className="btn-text">Share</span>
        </div>
      }
    >
      <Popup.Header>Share Dashboard</Popup.Header>
      <Popup.Content>
        <Tab
          menu={{ secondary: true, pointing: true, fluid: true }}
          panes={panes}
        />
      </Popup.Content>
    </Popup>
  );
};

export default TableauShare;
