import React from 'react';
import { withQueryString } from '../hocs';
import { compose } from 'redux';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';

const Facets = (props) => {
  const {
    querystring,
    data,
    facets,
    setFacets,
    facetWrapper,
    isEditMode,
  } = props;
  const { searchBlock } = config.blocks.blocksConfig;

  const FacetWrapper = facetWrapper;

  return (
    <>
      {data.facets?.map((facet) => {
        const index = querystring.indexes[facet?.field?.value] || {};
        const { values = {} } = index;

        const choices = Object.keys(values).map((name) => ({
          value: name,
          label: values[name].title,
        }));

        const isMulti = facet.multiple;
        const selectedValue = facets[facet?.field?.value];

        // TODO :handle changing the type of facet (multi/nonmulti)

        let value = selectedValue
          ? isMulti
            ? Array.isArray(selectedValue)
              ? selectedValue.map((v) => ({
                  value: v,
                  label: index.values?.[v]?.title,
                }))
              : []
            : {
                value: selectedValue,
                label: index.values?.[selectedValue]?.title,
              }
          : [];

        const { view: FacetWidget } = resolveExtension(
          'type',
          searchBlock.extensions.facetWidgets.types,
          facet,
        );

        const {
          rewriteOptions = (name, options) => options,
        } = searchBlock.extensions.facetWidgets;

        return FacetWrapper && Object.keys(values).length ? (
          <FacetWrapper key={facet['@id']}>
            <FacetWidget
              facet={facet}
              choices={rewriteOptions(facet?.field?.value, choices)}
              isMulti={isMulti}
              value={value}
              onChange={(id, value) => {
                !isEditMode && setFacets({ ...facets, [id]: value });
              }}
            />
          </FacetWrapper>
        ) : (
          ''
        );
      })}
    </>
  );
};

export default compose(withQueryString)(Facets);
