import React from 'react';
import { selectTheme, customSelectStyles } from './SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import withQueryString from './withQueryString';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';

const Facets = ({ reactSelect, querystring, data, facets, setFacets }) => {
  const Select = reactSelect.default;
  const colWidth = 3;

  return (
    <div className="search-facets">
      {data.facets?.map((facet) => {
        const index = querystring.indexes[facet?.field?.value] || {};
        const { values = {} } = index;
        const choices = Object.keys(values).map((name) => ({
          value: name,
          label: values[name].title,
        }));
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
        return (
          <Grid.Column key={facet['@id']} width={Math.min(3, colWidth)}>
            {choices.length ? (
              <Select
                placeholder={facet?.title || 'select...'}
                className="react-select-container"
                classNamePrefix="react-select"
                options={choices}
                styles={customSelectStyles}
                theme={selectTheme}
                components={{ DropdownIndicator, Option }}
                onChange={(data) => {
                  setFacets({
                    ...facets,
                    [facet.field.value]: isMulti
                      ? data.map(({ value }) => value)
                      : data.value,
                  });
                }}
                isMulti={facet.multiple}
                value={value}
              />
            ) : (
              ''
            )}
          </Grid.Column>
        );
      })}
    </div>
  );
};

export default compose(injectLazyLibs('reactSelect'), withQueryString)(Facets);
