import { connect } from 'react-redux';
import { getConnectedDataParametersForContext } from '@eeacms/volto-datablocks/helpers';

export const connectToDataParameters = connect((state, props) => {
  const connected_data_parameters = getConnectedDataParametersForContext(
    state.connected_data_parameters,
    state.router.location.pathname,
  );

  return {
    connected_data_parameters,
  };
}, null);
