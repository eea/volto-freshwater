import React from 'react';
import { compose } from 'redux';
import ConnectedChart from './ConnectedChart';
import { connectToDataParameters } from '@eeacms/volto-datablocks/helpers';
import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';

const ConnectedChartBlockView = (props) => {
  const { data } = props;

  return <ConnectedChart data={data} />;
};

export default compose(
  connectBlockToProviderData,
  connectToDataParameters,
)(React.memo(ConnectedChartBlockView));
