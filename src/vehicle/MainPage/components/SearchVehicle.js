import React, { Component } from 'react';
import { Form, Select, Row, Col, Button } from 'antd';
import { MakeData } from '../../../shared/constants/api-data';
import { Field, reduxForm } from 'redux-form';
import { SelectFieldWrapper, TextFieldWrapper } from 'shared/components';

class SearchVehicle extends Component {
  renderMakeDropdown = () => {
    return (
      <Select placeholder="Select one">
        {MakeData.map((item, index) => {
          return (
            <Select.Option key={index} value={item.value}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row className="search-car-panel">
        <Col span={12}>
          <div className="h4" style={{ marginTop: '0px' }}>
            Search for your car
          </div>
          <Form
            layout="vertical"
            className="search-car-box"
            onSubmit={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Field
                  name="make"
                  component={SelectFieldWrapper}
                  label="Make"
                  placeholder="Select one"
                  data={MakeData}
                  keyName="name"
                />
              </Col>
              <Col span={12}>
                <Form.Item label="Model">
                  <Select placeholder="Select one" disabled>
                    <Select.Option value="Alta Romeo">500</Select.Option>
                    <Select.Option value="BMW">500C</Select.Option>
                    <Select.Option value="Audi">595</Select.Option>
                    <Select.Option value="Cadillac">695</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Field
                  name="firstRegistration"
                  component={TextFieldWrapper}
                  label="First Registration"
                  placeholder="Mounth"
                />
              </Col>
              <Col span={12}>
                <Field
                  name="power"
                  component={TextFieldWrapper}
                  label="Power"
                  placeholder="0"
                  addonAfter="kW"
                />
              </Col>
              <Col span={24}>
                <Form.Item label="Mileage">
                  <Row gutter={16}>
                    <Col span={12} className="inline-form-item">
                      <Field
                        name="powerFrom"
                        component={TextFieldWrapper}
                        label={<span className="custom-item-label">From</span>}
                        placeholder="0"
                        addonAfter="km"
                      />
                    </Col>
                    <Col span={12} className="inline-form-item">
                      <Field
                        name="powerTo"
                        component={TextFieldWrapper}
                        label={<span className="custom-item-label">To</span>}
                        placeholder="0"
                        addonAfter="km"
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Price">
                  <Row gutter={16}>
                    <Col span={12} className="inline-form-item">
                      <Field
                        name="priceFrom"
                        component={TextFieldWrapper}
                        label={<span className="custom-item-label">From</span>}
                        placeholder="0"
                        addonAfter="$"
                      />
                    </Col>
                    <Col span={12} className="inline-form-item">
                      <Field
                        name="priceTo"
                        component={TextFieldWrapper}
                        label={<span className="custom-item-label">To</span>}
                        placeholder="0"
                        addonAfter="$"
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col offset={18} span={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon="search"
                  style={{ width: '100%' }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12} className="advertise">
          <img
            src="https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/1939/2017/05/30154953/5726568942-933b34f713-b.jpeg"
            alt="advertise"
          />
        </Col>
      </Row>
    );
  }
}

export default reduxForm({
  form: 'searchMainPage',
})(SearchVehicle);
