import React from 'react';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import Schema from './schema';
import SearchBlockView from './SearchBlockView';
import { SidebarPortal } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';

const SearchBlockEdit = (props) => {
  const { block, onChangeBlock, data, selected } = props;
  const schema = Schema({ data });
  return (
    <>
      <SearchBlockView
        {...props}
        path={getBaseUrl(props.pathname)}
        mode="edit"
      />
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default SearchBlockEdit;
