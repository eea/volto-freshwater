import React from 'react';
import { compose } from 'redux';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { connectToProviderData } from '@eeacms/volto-datablocks/hocs';
import View from './View';
import countryNames from './data/countries';
import { CountryHeaderDataBlockSchema } from './schema';

class Edit extends React.Component {
  getSchema = () => {
    const provider_data = this.props.provider_data || {};
    const schema = CountryHeaderDataBlockSchema();

    schema.properties.country_flag.choices = Object.keys(
      countryNames,
    ).map((k) => [k, countryNames[k]]);

    const choices = Object.keys(provider_data)
      .sort()
      .map((n) => [n, n]);

    ['column_data'].forEach((n) => (schema.properties[n].choices = choices));

    return schema;
  };

  render() {
    const { block, data, selected, onChangeBlock } = this.props;

    const schema = this.getSchema();

    return (
      <>
        <View {...this.props} />

        <SidebarPortal selected={selected}>
          <InlineForm
            schema={schema}
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
  }
}

export default compose(
  connectToProviderData((props) => {
    return {
      provider_url: props.data?.provider_url,
    };
  }),
)(Edit);
