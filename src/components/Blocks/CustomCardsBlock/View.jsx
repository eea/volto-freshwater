import React from 'react';
import config from '@plone/volto/registry';

const CustomCardsView = (props) => {
  const byDisplayType = {};
  const blockRenderers =
    config.blocks.blocksConfig.customCardsBlock.blockRenderers;
  const block_renderers_ids = Object.keys(blockRenderers);
  block_renderers_ids.forEach(function (value) {
    byDisplayType[value] = blockRenderers[value].view;
  });

  const Impl = byDisplayType[props.data.display || 'presentation_cards'];
  return <Impl {...props} />;
};

export default CustomCardsView;
