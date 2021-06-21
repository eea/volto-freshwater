import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
  return (props) => {
    const { data, id } = props;

    const location = useLocation();
    const history = useHistory();

    const urlSearchText = location.search
      ? new URLSearchParams(location.search).get('SearchableText')
      : '';

    const [searchText, setSearchText] = React.useState(urlSearchText);
    const previousSearchText = usePrevious(searchText);
    const [facets, setFacets] = React.useState({});
    const [searchData, setSearchData] = React.useState(
      getInitialState(data, facets, urlSearchText, id),
    );

    const updateSearchParams = React.useCallback(
      (toSearch) => {
        const query = data.query || {};
        const searchData = getSearchData(query, facets, id, toSearch);

        setSearchData(searchData);
        // setPreviousSearchText(toSearch);

        const params = new URLSearchParams(location.search);
        params.set('SearchableText', toSearch || '');
        history.push({ search: params.toString() });
        console.log('history', toSearch, params.toString());
      },
      [data.query, facets, id, history, location.search],
    );

    React.useEffect(() => {
      return () => {
        console.log('unmount');
      };
    }, []);

    // React.useEffect(() => {
    //   if (previousSearchText !== searchText) {
    //     setSearchText(searchText);
    //     updateSearchParams(searchText);
    //   }
    //   // return () => history.replace({ search: '' });
    // }, [
    //   searchText,
    //   setSearchText,
    //   previousSearchText,
    //   updateSearchParams,
    //   history,
    // ]);

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );

    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

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
