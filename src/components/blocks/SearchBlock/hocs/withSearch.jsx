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
    const [searchData, setSearchData] = React.useState({
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
    });

    const updateSearchParams = React.useCallback(
      (customSearchText) => {
        const toSearch = customSearchText || searchText;
        const query = data.query || {};
        const searchData = {
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

        if (customSearchText || searchText) {
          searchData.query.push({
            i: 'SearchableText',
            o: 'plone.app.querystring.operation.string.contains',
            v: toSearch,
          });
        }

        setSearchData(searchData);
        // setPreviousSearchText(toSearch);

        const params = new URLSearchParams(location.search);
        params.set('SearchableText', toSearch);
        history.push({ search: params.toString() });
        console.log('history', toSearch, params.toString());
      },
      [
        data.query,
        facets,
        id,
        searchText,
        history,
        location.search,
        // setPreviousSearchText,
      ],
    );

    React.useEffect(() => {
      if (previousSearchText !== searchText) {
        setSearchText(searchText);
        // setPreviousSearchText(searchText);
        updateSearchParams(searchText);
      }
      return () => history.replace({ search: '' });
    }, [
      searchText,
      history,
      setSearchText,
      previousSearchText,
      updateSearchParams,
      // urlSearchText,
      // setPreviousSearchText,
    ]);

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
