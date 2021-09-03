import React from 'react';
import { compose } from 'redux';
import { DataConnectedValue } from '@eeacms/volto-datablocks/Utils';
import {
  connectToDataParameters,
  filterDataByParameters,
} from '@eeacms/volto-datablocks/helpers';
import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';
import './style.less';
import cx from 'classnames';

const getClassName = (value) => {
  switch (true) {
    case value >= 97 && value <= 100:
      return 'blue-bg';
    case value >= 95 && value <= 97:
      return 'green-bg';
    case value >= 85 && value <= 95:
      return 'yellow-bg';
    case value >= 70 && value <= 85:
      return 'orange-bg';
    case value >= 0 && value <= 70:
      return 'red-bg';
    default:
      return;
  }
};

const View = (props) => {
  const { data, provider_data, connected_data_parameters } = props;
  const { provider_url, column_data, description, placeholder = '-' } = data;
  const filteredData =
    filterDataByParameters(provider_data, connected_data_parameters) || {};
  const column_value = Array.from(new Set(filteredData?.[column_data])).sort();

  return (
    <div className="uww-country-wrapper">
      <div className={cx('uww-country-block', getClassName(column_value))}>
        <div className="upper">
          <div>
            <DataConnectedValue
              url={provider_url}
              column={column_data}
              placeholder={placeholder}
            />{' '}
            %
          </div>
        </div>
        {description && <p className="lower">{description}</p>}
      </div>
      <div className="uww-country-legend">
        <div className="legend-wrapper">
          <span className="legend-box blue-bg"></span>
          <p className="legend-text">97 - 100%</p>
        </div>
        <div className="legend-wrapper">
          <span className="legend-box green-bg"></span>
          <p className="legend-text">95 - 97%</p>
        </div>
        <div className="legend-wrapper">
          <span className="legend-box yellow-bg"></span>
          <p className="legend-text">85 - 95%</p>
        </div>
        <div className="legend-wrapper">
          <span className="legend-box orange-bg"></span>
          <p className="legend-text">70 - 85%</p>
        </div>
        <div className="legend-wrapper">
          <span className="legend-box red-bg"></span>
          <p className="legend-text">0 - 70%</p>
        </div>
      </div>
    </div>
  );
};

export default compose(
  connectBlockToProviderData,
  connectToDataParameters,
)(React.memo(View));
