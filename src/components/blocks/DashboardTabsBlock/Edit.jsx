import React from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import DashboardTabsBlockView from './View';
import schema from './schema';

const ContentBlockEdit = (props) => {
  const { selected, onChangeBlock, data = {}, block } = props;
  const [refresh, forceRefresh] = React.useState(0);

  const { tabs = [] } = data;

  React.useEffect(() => {
    tabs.forEach((el, index) => {
      if (!el.title && el.source?.length) {
        el.title = el.source[0].title;
        el.description = el.source[0].description;
        // TODO: save dashboard URL ?
        forceRefresh(refresh + 1);
      }
      if ((el.title || el.description) && !el.source?.length) {
        el.title = null;
        el.description = null;
        forceRefresh(refresh + 1);
      }
    });
  }, [tabs, refresh]);

  return (
    <>
      <DashboardTabsBlockView {...props} />
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
