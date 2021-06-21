import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

function getInitialState(data, facets, urlSearchText, id) {
  return {
    query: [
      ...(data.query?.query || []),
      ...Object.keys(facets).map((name) => ({
        i: name,
        v: facets[name],

        // TODO: make the facet operator pluggable
        o: 'plone.app.querystring.operation.selection.is',
      })),
      ...(urlSearchText
        ? [
            {
              i: 'SearchableText',
              o: 'plone.app.querystring.operation.string.contains',
              v: urlSearchText,
            },
          ]
        : []),
    ],
    sort_on: data.query?.sort_on,
    sort_order: data.query?.sort_order,
    b_size: data.query?.b_size,
    limit: data.query?.limit,
    block: id,
  };
}

function getSearchData(query, facets, id, searchText) {
  const res = {
    query: [
      ...(query.query || []),
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
    sort_on: query.sort_on,
    sort_order: query.sort_order,
    b_size: query.b_size,
    limit: query.limit,
    block: id,
  };

  if (searchText) {
    res.query.push({
      i: 'SearchableText',
      o: 'plone.app.querystring.operation.string.contains',
      v: searchText,
    });
  }

  return res;
}

const withSearch = (options) => (WrappedComponent) => {
  const { inputDelay = 1000 } = options || {};
  return (props) => {
    const { data, id } = props;

    const location = useLocation();
    const history = useHistory();
    const urlSearchText = location.search
      ? new URLSearchParams(location.search).get('SearchableText')
      : '';

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

    const [searchText, setSearchText] = React.useState(urlSearchText);
    const [facets, setFacets] = React.useState({});
    const [searchData, setSearchData] = React.useState(
      getInitialState(data, facets, urlSearchText, id),
    );

    const timeoutRef = React.useRef();

    const updateSearchParams = React.useCallback(
      (toSearch, toSearchFacets) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          const searchData = getSearchData(
            data.query || {},
            toSearchFacets || facets,
            id,
            toSearch,
          );
          if (toSearchFacets) setFacets(toSearchFacets);
          setSearchData(searchData);
          const params = new URLSearchParams(location.search);
          params.set('SearchableText', toSearch || '');
          history.push({ search: params.toString() });
        }, inputDelay);
      },
      [data.query, facets, id, history, location.search],
    );

    return (
      <WrappedComponent
        {...props}
        searchData={searchData}
        facets={facets}
        setFacets={setFacets}
        searchedText={urlSearchText}
        searchText={searchText}
        setSearchText={setSearchText}
        onTriggerSearch={updateSearchParams}
        totalItems={totalItems}
      />
    );
  };
};

export default withSearch;
