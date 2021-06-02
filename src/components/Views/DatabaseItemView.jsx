import React from 'react';
import config from '@plone/volto/registry';
import { DefaultView } from '@plone/volto/components';

const DatabaseItemView = (props) => {
  const { content } = props;
  const tableau_url = content?.embed_url;
  const lead_image = content?.image;
  const {
    blocks: { blocksConfig },
  } = config;

  const TableauBlockView = blocksConfig.tableau_block.view;

  return (
    <>
      {!lead_image && <DefaultView {...props} />}

      <div id="page-document" className="ui container">
        {tableau_url && (
          <div style={{ margin: '1em 0' }}>
            <TableauBlockView {...props} data={{ url: tableau_url }} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatabaseItemView;
