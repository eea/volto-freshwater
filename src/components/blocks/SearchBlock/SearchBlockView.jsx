import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

import { Button, Input } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import Facets from './Facets';
import { isEmpty } from 'lodash';

import config from '@plone/volto/registry';

const SearchDetails = ({ total, text, as = 'h4' }) => {
  const El = as;
  return (
    <El>
      {text ? `Searched for: ${text}. ` : ''}Search results: {total}
    </El>
  );
};

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const SearchBlockView = withRouter((props) => {
  const { data, id, mode = 'view' } = props;

  const [facets, setFacets] = React.useState({});
  const history = useHistory();

  const paramSearchText = props.location.search
    ? new URLSearchParams(props.location.search).get('SearchableText')
    : '';
  const previousParamSearchText = usePrevious(paramSearchText);

  const [searchText, setSearchText] = React.useState(paramSearchText);

  const [searchData, setSearchData] = React.useState({
    query: [
      ...(data.query || []),
      ...Object.keys(facets).map((name) => ({
        i: name,
        o: 'plone.app.querystring.operation.selection.is',
        v: facets[name],
      })),
      ...(paramSearchText
        ? [
            {
              i: 'SearchableText',
              o: 'plone.app.querystring.operation.string.contains',
              v: paramSearchText,
            },
          ]
        : []),
    ],
    block: id,
  });

  const updateSearchParams = React.useCallback(
    (customSearchText) => {
      const searchData = {
        query: [
          ...(data.query || []),
          ...Object.keys(facets).map((name) =>
            !isEmpty(facets[name])
              ? {
                  i: name,
                  o: Array.isArray(facets[name])
                    ? 'plone.app.querystring.operation.list.contains'
                    : 'plone.app.querystring.operation.selection.is',
                  v: facets[name],
                }
              : undefined,
          ),
        ].filter((o) => !!o),
        block: id,
      };

      if (customSearchText || searchText) {
        searchData.query.push({
          i: 'SearchableText',
          o: 'plone.app.querystring.operation.string.contains',
          v: customSearchText || searchText,
        });
      }

      setSearchData(searchData);
      // const params = new URLSearchParams(searchText);
      // params.set('SearchableText', searchText);
      // history.replace({ search: params.toString() });
    },
    [data.query, facets, id, searchText],
  );

  React.useEffect(() => {
    if (previousParamSearchText !== paramSearchText) {
      setSearchText(paramSearchText);
      updateSearchParams(paramSearchText);
    }
    // return () => history.replace({ search: '' });
  }, [
    history,
    setSearchText,
    paramSearchText,
    previousParamSearchText,
    updateSearchParams,
  ]);

  // starting from 1, for the search button
  const columns = 1 + data.facets?.length + (data.showSearchInput ? 1 : 0);
  const colWidth = Math.floor(12 / columns);

  const querystringResults = useSelector(
    (state) => state.querystringsearch.subrequests,
  );

  const totalItems =
    querystringResults[id]?.total || querystringResults[id]?.items?.length;

  const listingBodyVariation = config.blocks.blocksConfig.listing.variations[0];

  return (
    <div className="block searchBlock">
      <h3>{data.title}</h3>
      <SearchDetails text={paramSearchText} total={totalItems} />
      <Grid className="searchBlock-facets" stackable>
        {data.showSearchInput && (
          <Grid.Column key="search_input" width={3}>
            {data.searchInputPrompt && (
              <label className="search-block-prompt">
                {data.searchInputPrompt}
              </label>
            )}
            <Input
              id={`${props.id}-searchtext`}
              value={searchText}
              placeholder="Search..."
              fluid
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  updateSearchParams();
                }
              }}
              onChange={(event, { value }) => {
                setSearchText(value);
              }}
            />
          </Grid.Column>
        )}
        <Facets data={data} facets={facets} setFacets={setFacets} />
        {data.showSearchButton && (
          <Grid.Column width={colWidth}>
            <Button onClick={() => updateSearchParams()}>
              {data.searchButtonLabel || 'Search!'}
            </Button>
          </Grid.Column>
        )}
      </Grid>
      <Divider />

      <ListingBody
        variation={listingBodyVariation}
        data={searchData || {}}
        path={props.path}
        isEditMode={mode === 'edit'}
      />
    </div>
  );
});

export default SearchBlockView;
