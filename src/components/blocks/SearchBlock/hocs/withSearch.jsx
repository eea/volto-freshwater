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
    // console.log('props', props);
    const location = useLocation();

    const history = useHistory();

    const paramSearchText = location.search
      ? new URLSearchParams(location.search).get('SearchableText')
      : '';
    const previousParamSearchText = usePrevious(paramSearchText);

    const [facets, setFacets] = React.useState({});
    const [searchText, setSearchText] = React.useState(paramSearchText);
    const [searchData, setSearchData] = React.useState({
      query: [
        ...(data.query?.query || []),
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
      sort_on: data.query?.sort_on,
      sort_order: data.query?.sort_order,
      b_size: data.query?.b_size,
      limit: data.query?.limit,
      block: id,
    });

    const updateSearchParams = React.useCallback(
      (customSearchText) => {
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
      return () => history.replace({ search: '' });
    }, [
      history,
      setSearchText,
      paramSearchText,
      previousParamSearchText,
      updateSearchParams,
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
