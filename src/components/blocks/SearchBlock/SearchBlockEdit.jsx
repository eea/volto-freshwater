import React from 'react';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import Schema from './schema';
import SearchBlockView from './SearchBlockView';
import { SidebarPortal } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const SearchBlockEdit = (props) => {
  const { block, onChangeBlock, data, selected, intl } = props;
  let schema = Schema({ data });
  schema = addExtensionFieldToSchema({
    schema,
    name: 'listingBlockTemplate',
    items: config.blocks.blocksConfig.listing.variations,
    intl,
    title: { id: 'Listing template' },
  });
  return (
    <>
      <SearchBlockView
        {...props}
        path={getBaseUrl(props.pathname)}
        mode="edit"
      />
      <SidebarPortal selected={selected}>
        <BlockDataForm
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
