import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import './style.less';

const CountriesListingView = (props) => {
  const { data, content } = props;
  const path = content['@id'];
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const country_profiles = searchSubrequests?.countries?.items || [];

  const sections = [
    {
      title: data.block_title,
      items: country_profiles || [],
    },
  ];

  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          'path.depth': 1,
          portal_type: ['country_profile'],
          b_size: 50,
        },
        'countries',
      ),
    );
  }, [path, dispatch]);

  return (
    <div className="countries-listing-view full-width">
      <div className="ui container">
        {sections.map((section, index) => {
          return (
            <div className="section-wrapper" key={index}>
              {section.title && (
                <h3 className="section-title">{section.title}</h3>
              )}
              <div
                className="countries-listing-section"
                style={{ columns: data.columns || 3 }}
              >
                {section?.items
                  .sort((a, b) => (a.title > b.title ? 1 : -1))
                  .map((item, i) => (
                    <div key={i}>
                      <Link to={flattenToAppURL(item['@id'])}>
                        {item.title}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    content: state.content.data,
  })),
)(CountriesListingView);
