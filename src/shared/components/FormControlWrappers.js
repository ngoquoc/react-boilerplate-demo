import React from 'react';
import { Form, Select, Input } from 'antd';

const validateStatusCalculate = (
  touched,
  error,
  warning,
  loading,
  showValidateSuccess,
) => {
  let validateStatus = undefined;
  if (touched) {
    if (error) {
      validateStatus = 'error';
    } else if (warning) {
      validateStatus = 'warning';
    } else if (loading) {
      validateStatus = 'validating';
    } else {
      validateStatus = showValidateSuccess ? 'success' : undefined;
    }
  }
  return validateStatus;
};

/**
 * To render options for a select control
 *
 * @param {array} options List of options
 * @param {string} [keyName] Key field name
 * @param {string} [valueName] Value field name
 * @returns
 */
const renderOptions = (options, keyName?, valueName?) => {
  if (!options || options.length === 0) {
    return '';
  }
  return options.map((item, index) => (
    <Select.Option value={valueName ? item[valueName] : item.value} key={index}>
      {keyName ? item[keyName] : item.name}
    </Select.Option>
  ));
};

export const SelectFieldWrapper = ({
  input,
  label,
  meta: { touched, error, warning },
  data,
  keyName,
  valueName,
  disabled = false,
  loading,
  showValidateSuccess = false,
  ...extra
}) => {
  let validateStatus = validateStatusCalculate(
    touched,
    error,
    warning,
    loading,
    showValidateSuccess,
  );

  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={validateStatus}
      help={touched && error ? error : undefined}
    >
      <Select
        {...input}
        value={input.value === '' ? undefined : input.value}
        {...extra}
      >
        {renderOptions(data, keyName, valueName)}
      </Select>
    </Form.Item>
  );
};

export const TextFieldWrapper = ({
  input,
  label,
  meta: { touched, error, warning },
  disabled = false,
  loading,
  showValidateSuccess = false,
  ...extra
}) => {
  let validateStatus = validateStatusCalculate(
    touched,
    error,
    warning,
    loading,
    showValidateSuccess,
  );
  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={validateStatus}
      help={touched && error ? error : undefined}
    >
      <Input {...input} disabled={disabled} {...extra} />
    </Form.Item>
  );
};
