import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Item, Grid } from 'semantic-ui-react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import './style.less';

const CountriesListingView = (props) => {
  const { data, pathname } = props;
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
        getBaseUrl(pathname),
        {
          'path.depth': 1,
          portal_type: ['country_profile'],
          b_size: 50,
        },
        'countries',
      ),
    );
  }, [pathname, dispatch]);

  return (
    <div className="countries-listing-view full-width">
      <div className="ui container">
        {sections.map((section, index) => {
          return (
            <div className="section-wrapper" key={index}>
              {section.title && (
                <h3 className="section-title">{section.title}</h3>
              )}
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    {section?.items
                      .filter((a) => a.id === 'european-union')
                      .map((item, i) => (
                        <div key={i} className="countries-item-wrapper single">
                          {item.lead_image && (
                            <Item.Image
                              className="countries-list-flag"
                              alt={item.title}
                              src={`${item['@id']
                                .replace(config.settings.apiPath, '')
                                .replace(
                                  config.settings.internalApiPath,
                                  '',
                                )}/@@images/image/thumb`}
                            />
                          )}
                          <Link
                            to={flattenToAppURL(item['@id'])}
                            className="countries-listing-link"
                          >
                            {item.title}
                          </Link>
                        </div>
                      ))}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <div
                      className="countries-listing-section"
                      style={{ columns: data.columnsCount || 3 }}
                    >
                      {section?.items
                        .sort((a, b) => (a.title > b.title ? 1 : -1))
                        .filter((a) => a.id !== 'european-union')
                        .map((item, i) => (
                          <div key={i} className="countries-item-wrapper">
                            {item.lead_image && (
                              <Item.Image
                                className="countries-list-flag"
                                alt={item.title}
                                src={`${item['@id']
                                  .replace(config.settings.apiPath, '')
                                  .replace(
                                    config.settings.internalApiPath,
                                    '',
                                  )}/@@images/image/thumb`}
                              />
                            )}
                            <Link
                              to={flattenToAppURL(item['@id'])}
                              className="countries-listing-link"
                            >
                              {item.title}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
    pathname: state.router.location.pathname,
  })),
)(CountriesListingView);
