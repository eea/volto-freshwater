import React from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';

import ContentEmbedView from './ContentView';
import schema from './schema';

const ContentBlockEdit = (props) => {
  const { selected, onChangeBlock, data = {}, block } = props;
  return (
    <>
      <ContentEmbedView {...props} />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema(props)}
          title={schema.title}
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

export default ContentBlockEdit;
