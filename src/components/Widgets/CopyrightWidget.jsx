import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { Radio, TextArea } from 'semantic-ui-react';

import './style.less';

export default (props) => {
  const { value = 'EEA', onChange, id } = props;
  const [otherValue, setOtherValue] = React.useState();

  React.useEffect(() => {
    if (value !== 'EEA') {
      setOtherValue(true);
    } else {
      setOtherValue(false);
    }
  }, [value]);

  return (
    <FormFieldWrapper {...props} className="copyright-widget-wrapper">
      <Radio
        label="EEA Copyright Creative Commons CC-by licence"
        value="EEA"
        checked={value === 'EEA'}
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
