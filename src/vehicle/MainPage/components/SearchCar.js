import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Button } from 'antd';
import { MakeData } from '../../../shared/constants/api-data';

const MakeDropdown = () => {
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

class SearchCar extends Component {
  render() {
    return (
      <Row className="search-car-panel">
        <Col span={12}>
          <div className="h4" style={{ marginTop: '0px' }}>
            Search for your car
          </div>
          <Form layout="vertical" className="search-car-box">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Make">
                  <MakeDropdown />
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
                <Form.Item label="First Registration">
                  <Input placeholder="Mounth" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Power">
                  <Input placeholder="0" addonAfter="kW" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mileage">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label={<span className="custom-item-label">From</span>}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ display: 'flex' }}
                      >
                        <Input placeholder="0" addonAfter="km" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={<span className="custom-item-label">To</span>}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ display: 'flex' }}
                      >
                        <Input placeholder="0" addonAfter="km" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Price">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label={<span className="custom-item-label">From</span>}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ display: 'flex' }}
                      >
                        <Input placeholder="0" addonAfter="$" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={<span className="custom-item-label">To</span>}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ display: 'flex' }}
                      >
                        <Input placeholder="0" addonAfter="$" />
                      </Form.Item>
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
          <img src="https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/1939/2017/05/30154953/5726568942-933b34f713-b.jpeg" />
        </Col>
      </Row>
    );
  }
}

export default SearchCar;
