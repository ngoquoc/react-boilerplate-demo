import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import injectSheet from 'react-jss';
import { toMoneyFormat } from '../../../../utils';
import styles from './vehicleItemDetail.styles';

const propTypes = {
  item: PropTypes.shape({
    ImageLink: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Make: PropTypes.string.isRequired,
    Model: PropTypes.string.isRequired,
    OtherDescription: PropTypes.string,
    MainPrice: PropTypes.number.isRequired,
    SeoName: PropTypes.string,
    Address: PropTypes.string,
    IsFavorite: PropTypes.boolean
  }),
  onFavoriteClick: PropTypes.func.isRequired
};

const VehicleItemDetail = ({ item, onFavoriteClick, classes }) => (
  <Row gutter={12} className={classes.carItemDetail}>
    <Col span={6}>
      <img
        src={item.ImageLink ? item.ImageLink : 'assets/no-image.jpg'}
        alt="null"
      />
    </Col>
    <Col span={8} className={classes.carInfo}>
      <span className="h4 title">{item.Title}</span>
      <div className="info">Make: {item.Make}</div>
      <div className="info">Model: {item.Model}</div>
      <div className="info">{item.OtherDescription}</div>
    </Col>
    <Col span={4} className={classes.price}>
      <span className="h4">{toMoneyFormat(item.MainPrice)} €</span>
    </Col>
    <Col span={6} className={classes.vendorInfo}>
      <span className="h4 vendor-name">{item.SeoName}</span>
      <div>Address: {item.Address}</div>
    </Col>
    <div className={classes.actionBox}>
      <Button type="primary">Contact</Button>
      <Button
        icon="star"
        type={item.IsFavorite ? 'primary' : undefined}
        onClick={() => onFavoriteClick(item)}
      >
        {item.IsFavorite ? 'Favorited' : 'Mark as favorite'}
      </Button>
    </div>
  </Row>
);

VehicleItemDetail.propTypes = propTypes;

export default injectSheet(styles)(VehicleItemDetail);
