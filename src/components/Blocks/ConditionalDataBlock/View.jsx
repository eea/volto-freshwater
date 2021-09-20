import React from 'react';
import { compose } from 'redux';
import {
  connectToDataParameters,
  filterDataByParameters,
} from '@eeacms/volto-datablocks/helpers';
import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';
import './style.less';

const evaluateCondition = (value1, operator, value2) => {
  switch (true) {
    case operator === '=':
      return value1 === value2;
    case operator === '<':
      return parseFloat(value1) < parseFloat(value2);
    case operator === '>':
      return parseFloat(value1) > parseFloat(value2);
    default:
      return 'Could not evaluate!';
  }
};

const View = (props) => {
  const { data, provider_data, connected_data_parameters } = props;
  const {
    // provider_url,,
    column_data,
    operator,
    condition,
    // placeholder = '-',
  } = data;
  const filteredData =
    filterDataByParameters(provider_data, connected_data_parameters) || {};
  const columnValue = Array.from(new Set(filteredData?.[column_data])).sort();
  const evalResult = evaluateCondition(columnValue, operator, condition);

  return (
    <div className="uww-country-wrapper">
      <div>
        {columnValue}
        {operator}
        {condition}
      </div>
      <div>{evalResult.toString()}</div>
      {evalResult && <div>This is a conditional block</div>}
    </div>
  );
};

export default compose(
  connectBlockToProviderData,
  connectToDataParameters,
)(React.memo(View));
