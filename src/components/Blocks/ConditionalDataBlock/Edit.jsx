import { connectBlockToProviderData } from '@eeacms/volto-datablocks/hocs';
import { ConditionalDataBlockSchema } from './schema';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm, SidebarPortal, InlineForm } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';
import PropTypes from 'prop-types';
import EditBlockWrapper from '@eeacms/volto-group-block/components/manage/Blocks/Group/EditBlockWrapper';
import '@eeacms/volto-group-block/components/manage/Blocks/Group/editor.less';

const tweakSchema = (schema, provider_data) => {
  const choices = Object.keys(provider_data || {})
    .sort()
    .map((n) => [n, n]);
  ['column_data'].forEach((n) => (schema.properties[n].choices = choices));

  return schema;
};

const Edit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    manage,
    provider_data = {},
  } = props;

  const schema = tweakSchema(ConditionalDataBlockSchema(), provider_data);

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  React.useEffect(() => {
    if (
      isEmpty(data?.data?.blocks) &&
      properties.blocks_layout.items[0] !== selectedBlock
    ) {
      setSelectedBlock(properties.blocks_layout.items[0]);
      onChangeBlock(block, {
        ...data,
        data: properties,
      });
    }
  }, [
    onChangeBlock,
    properties,
    selectedBlock,
    block,
    data,
    data?.data?.blocks,
  ]);

  const blockState = React.useRef({});

  // console.log('props', properties); // props.data,

  return (
    <fieldset className="section-block">
      <legend
        onClick={() => {
          setSelectedBlock();
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Conditional group'}
      </legend>
      <BlocksForm
        metadata={metadata}
        properties={properties}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        allowedBlocks={data.allowedBlocks}
        title={data.placeholder}
        onSelectBlock={setSelectedBlock}
        onChangeFormData={(newFormData) => {
          console.log('onchangeformdata', newFormData);
          onChangeBlock(block, {
            ...data,
            data: newFormData,
          });
        }}
        onChangeField={(id, value) => {
          console.log('onchangefield', data);
          if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
            blockState.current[id] = value;
            onChangeBlock(block, {
              ...data,
              data: {
                ...data.data,
                ...blockState.current,
              },
            });
          } else {
            onChangeField(id, value);
          }
        }}
        pathname={pathname}
      >
        {({ draginfo }, editBlock, blockProps) => (
          <EditBlockWrapper
            draginfo={draginfo}
            blockProps={blockProps}
            disabled={data.disableInnerButtons}
          >
            {editBlock}
          </EditBlockWrapper>
        )}
      </BlocksForm>

      <SidebarPortal selected={selected && !selectedBlock}>
        {!data?.readOnlySettings && (
          <InlineForm
            schema={schema}
            title={schema.title}
            formData={data}
            onChangeField={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                [id]: value,
              });
            }}
          />
        )}
      </SidebarPortal>
    </fieldset>
  );
};

Edit.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};

export default connectBlockToProviderData(Edit);
