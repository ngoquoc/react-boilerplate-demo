import React from 'react';
import { Form, Select } from 'antd';
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
  return options.map(item => (
    <option
      key={keyName ? item[keyName] : item.key}
      value={keyName ? item[keyName] : item.key}
    >
      {valueName ? item[valueName] : item.value}
    </option>
  ));
};

export const SelectFieldWrapper = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  data,
  placeholder,
  keyName,
  valueName,
  disabled = false,
  loading,
}) => {
  let validateStatus = '';
  if (touched) {
    if (error) {
      validateStatus = 'error';
    } else if (warning) {
      validateStatus = 'warning';
    } else if (loading) {
      validateStatus = 'validating';
    } else {
      validateStatus = 'success';
    }
  }
  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={validateStatus ? validateStatus : undefined}
      help={touched && error ? error : undefined}
    >
      <Select placeholder={placeholder}>
        {renderOptions(data, keyName, valueName)}
      </Select>
    </Form.Item>
  );
};
