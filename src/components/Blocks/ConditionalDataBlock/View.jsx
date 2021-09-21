import React from 'react';
import { compose } from 'redux';
import {
  connectToDataParameters,
  filterDataByParameters,
} from '@eeacms/volto-datablocks/helpers';
import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';
import './style.less';
import { RenderBlocks } from '@plone/volto/components';

const isNumber = (n) => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

const evaluateCondition = (value1, operator, value2) => {
  switch (true) {
    case operator === '=':
      if (isNumber(value1) && isNumber(value2)) {
        return parseFloat(value1) === parseFloat(value2);
      }

      return value1 === value2;

    case operator === '<':
      return parseFloat(value1) < parseFloat(value2);
    case operator === '>':
      return parseFloat(value1) > parseFloat(value2);
    default:
      return 'Could not evaluate!';
  }
};

const View2 = (props) => {
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

  const metadata = props.metadata || props.properties;
  const CustomTag = `${data.as || 'div'}`;
  const customId = data?.title
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z-\s]/gi, '')
    ?.trim()
    ?.replace(/\s+/gi, '-');
  return (
    evalResult && (
      <CustomTag id={customId}>
        <RenderBlocks
          {...props}
          metadata={metadata}
          content={data?.data || {}}
        />
      </CustomTag>
    )
  );
};

export default compose(
  connectBlockToProviderData,
  connectToDataParameters,
)(React.memo(View));
