import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { Radio, TextArea } from 'semantic-ui-react';

import './style.less';

export default (props) => {
  const { value = 'eea', onChange, id } = props;
  const [otherValue, setOtherValue] = React.useState();

  React.useEffect(() => {
    if (value !== 'eea') {
      setOtherValue(true);
    } else {
      setOtherValue(false);
    }
  }, [value]);

  return (
    <FormFieldWrapper {...props} className="copyright-widget-wrapper">
      <Radio
        label="EEA Copyright Creative Commons CC-by licence"
        value="eea"
        checked={value === 'eea'}
        onChange={(evt, data) => {
          onChange(id, data.value);
        }}
      />
      <Radio
        label="Other"
        value="other"
        checked={otherValue}
        onChange={(evt, data) => {
          setOtherValue(true);
          onChange(id, null);
        }}
      />
      {otherValue && (
        <TextArea
          value={value}
          placeholder="Copyright"
          onChange={(evt, data) => {
            onChange(id, data.value);
          }}
        />
      )}
    </FormFieldWrapper>
  );
};
