import React from 'react';
import { compose } from 'redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { selectTheme, customSelectStyles } from './SelectStyling';

const SelectFacet = (props) => {
  const { facet, choices, reactSelect, isMulti, onChange, value } = props;
  const Select = reactSelect.default;

  return (
    <Select
      placeholder={facet?.title || 'select...'}
      className="react-select-container"
      classNamePrefix="react-select"
      options={choices}
      styles={customSelectStyles}
      theme={selectTheme}
      components={{ DropdownIndicator, Option }}
      onChange={(data) => {
        onChange(
          facet.field.value,
          isMulti ? data.map(({ value }) => value) : data.value,
        );
      }}
      isMulti={facet.multiple}
      value={value}
    />
  );
};

export default compose(injectLazyLibs('reactSelect'))(SelectFacet);
