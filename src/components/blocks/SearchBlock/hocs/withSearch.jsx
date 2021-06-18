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

    const [facets, setFacets] = React.useState({});
    const history = useHistory();

    const paramSearchText = location.search
      ? new URLSearchParams(location.search).get('SearchableText')
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
    // const columns = 1 + data.facets?.length + (data.showSearchInput ? 1 : 0);
    // const colWidth = Math.floor(12 / columns);

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
        searchedText={paramSearchText}
        searchText={searchText}
        setSearchText={setSearchText}
        onTriggerSearch={updateSearchParams}
        totalItems={totalItems}
      />
    );
  };
};

export default withSearch;
