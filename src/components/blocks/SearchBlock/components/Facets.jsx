import React from 'react';
import { withQueryString } from '../hocs';
import { compose } from 'redux';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';

const Facets = (props) => {
  const { querystring, data, facets, setFacets, facetWrapper } = props;
  // console.log('facetWrapper', props);
  const FacetWrapper = facetWrapper;
  // const colWidth = 3; // width={Math.min(3, colWidth)}

  return (
    <div className="search-facets">
      {data.facets?.map((facet) => {
        const index = querystring.indexes[facet?.field?.value] || {};
        const { values = {} } = index;

        const isMulti = facet.multiple;
        const selectedValue = facets[facet?.field?.value];

        let value = selectedValue
          ? isMulti
            ? selectedValue.map((v) => ({
                value: v,
                label: index.values?.[v]?.title,
              }))
            : {
                value: selectedValue,
                label: index.values?.[selectedValue]?.title,
              }
          : [];

        const { view: FacetWidget } = resolveExtension(
          'type',
          config.blocks.blocksConfig.searchBlock.extensions.facetWidgets.types,
          facet,
        );

        return FacetWrapper && Object.keys(values).length ? (
          <FacetWrapper key={facet['@id']}>
            <FacetWidget
              facet={facet}
              options={values}
              isMulti={isMulti}
              value={value}
              onChange={(id, value) => {
                setFacets({ ...facets, [id]: value });
              }}
            />
          </FacetWrapper>
        ) : (
          ''
        );
      })}
    </div>
  );
};

export default compose(withQueryString)(Facets);
