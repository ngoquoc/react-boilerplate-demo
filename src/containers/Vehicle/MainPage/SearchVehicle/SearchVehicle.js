import React, { Component } from 'react';
import { Form, Select, Row, Col, Button, Input } from 'antd';
import { Field, reduxForm } from 'redux-form';
import injectSheet from 'react-jss';
import { MOCK_VEHICLE_DATA } from '../../../../mockData';
import styles from './searchVehicle.styles';

class SearchVehicle extends Component {
  renderMakeDropdown = () => {
    return (
      <Select placeholder="Select one">
        {MOCK_VEHICLE_DATA.map((item, index) => {
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
    const { handleSubmit, classes } = this.props;
    return (
      <Row className={classes.searchCarPanel}>
        <Col span={12}>
          <div className="h4" style={{ marginTop: '0px' }}>
            Search for your car
          </div>
          <Form
            layout="vertical"
            className={classes.searchCarBox}
            onSubmit={handleSubmit}
          >
            <Row gutter={16}>
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
                  component={Input}
                  name="firstRegistration"
                  label="First Registration"
                  placeholder="Mounth"
                />
              </Col>
              <Col span={12}>
                <Field
                  component={Input}
                  name="power"
                  label="Power"
                  placeholder="0"
                  // addonAfter="kW"
                />
              </Col>
              <Col span={24}>
                <Form.Item label="Mileage">
                  <Row gutter={16}>
                    <Col span={12} className={classes.inlineFormItem}>
                      <Field
                        component={Input}
                        name="powerFrom"
                        label={
                          <span className={classes.customItemLabel}>From</span>
                        }
                        placeholder="0"
                        // addonAfter="km"
                      />
                    </Col>
                    <Col span={12} className={classes.inlineFormItem}>
                      <Field
                        component={Input}
                        name="powerTo"
                        label={
                          <span className={classes.customItemLabel}>To</span>
                        }
                        placeholder="0"
                        // addonAfter="km"
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Price">
                  <Row gutter={16}>
                    <Col span={12} className={classes.inlineFormItem}>
                      <Field
                        component={Input}
                        name="priceFrom"
                        label={
                          <span className={classes.customItemLabel}>From</span>
                        }
                        placeholder="0"
                        // addonAfter="$"
                      />
                    </Col>
                    <Col span={12} className={classes.inlineFormItem}>
                      <Field
                        component={Input}
                        name="priceTo"
                        label={
                          <span className={classes.customItemLabel}>To</span>
                        }
                        placeholder="0"
                        // addonAfter="$"
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
        <Col span={12} className={classes.advertise}>
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
  form: 'searchMainPage'
})(injectSheet(styles)(SearchVehicle));
