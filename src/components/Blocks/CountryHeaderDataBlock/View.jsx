import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { DataConnectedValue } from '@eeacms/volto-datablocks/Utils';
import {
  connectToDataParameters,
  filterDataByParameters,
} from '@eeacms/volto-datablocks/helpers';
import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';
import cx from 'classnames';
import countryNames from './data/countries';
import './style.less';

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

const getContentSiblings = (siblings) => {
  const countriesDropdown = siblings?.items?.map((item) => {
    return {
      key: item.id,
      value: item.id,
      text: item.name,
      as: Link,
      to: flattenToAppURL(item.url),
    };
  });
  return countriesDropdown;
};

const View = (props) => {
  const { data, provider_data, connected_data_parameters, content } = props;
  const { provider_url, column_data, description, placeholder = '-' } = data;
  const filteredData =
    filterDataByParameters(provider_data, connected_data_parameters) || {};
  const column_value = Array.from(new Set(filteredData?.[column_data])).sort();
  const siblings = getContentSiblings(content['@components'].siblings);
  const country_profiles = siblings.filter(
    (item) => item.key !== 'discodata' && item.key !== 'queries',
  );

  const [flag, setFlag] = React.useState();

  React.useEffect(() => {
    if (data.country_flag) {
      const code = data.country_flag.toLowerCase();
      import(`./data/svg/${code}.svg`).then((module) => {
        setFlag(module.default);
      });
    }
  });

  return (
    <div className="country-header-block full-width">
      <div className="ui container">
        <div
          className={cx('country-header-wrapper', {
            'no-flag': !data.country_flag,
          })}
        >
          <div>
            <div className="country-profile-flag">
              {data.country_flag && (
                <img alt={countryNames[data.country_flag]} src={flag} />
              )}
            </div>
          </div>
          <div>
            <Dropdown
              selection
              className="countries-dd"
              options={country_profiles}
              defaultValue={content.title.toLowerCase()}
              icon="angle down"
            />

            <div className="uww-country-wrapper">
              <div className="uww-country-block">
                <div className="uww-left">
                  <div className="uww-data">
                    <div className={getClassName(column_value)}>
                      <DataConnectedValue
                        url={provider_url}
                        column={column_data}
                        placeholder={placeholder}
                      />{' '}
                      %
                    </div>
                  </div>
                  {description && (
                    <span className="uww-text">{description}</span>
                  )}
                </div>
                <div className="uww-country-legend">
                  <div className="legend-wrapper">
                    <span className="legend-box red-bg"></span>
                    <p className="legend-text">0 - 70%</p>
                  </div>
                  <div className="legend-wrapper">
                    <span className="legend-box orange-bg"></span>
                    <p className="legend-text">70 - 85%</p>
                  </div>
                  <div className="legend-wrapper">
                    <span className="legend-box yellow-bg"></span>
                    <p className="legend-text">85 - 95%</p>
                  </div>
                  <div className="legend-wrapper">
                    <span className="legend-box green-bg"></span>
                    <p className="legend-text">95 - 97%</p>
                  </div>
                  <div className="legend-wrapper">
                    <span className="legend-box blue-bg"></span>
                    <p className="legend-text">97 - 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    content: state.content.data,
  })),
  connectBlockToProviderData,
  connectToDataParameters,
)(React.memo(View));
