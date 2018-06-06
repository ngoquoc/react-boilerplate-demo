export default theme => ({
  searchCarPanel: {
    marginTop: 20,
    padding: theme.defaultPadding,
    background: '#fff',
    border: '1px solid #d9d9d9',
    '.ant-form-item': {
      marginBottom: '0px'
    },
    '.ant-form-item-label': {
      paddingBottom: '0px !important'
    }
  },
  searchCarBox: {
    padding: '10px',
    background: '#f5f5f5',
    border: '1px solid #d9d9d9',
    borderRadius: '4px'
  },
  customItemLabel: {
    fontWeight: '400',
    marginLeft: '8px',
    lineHeight: '28px'
  },
  inlineFormItem: {
    '& .ant-form-item': {
      display: 'flex',
      '& .ant-form-item-label': {
        width: '25%'
      },
      '& .ant-form-item-control-wrapper': {
        width: '75%'
      }
    }
  },
  advertise: {
    paddingLeft: '24px',
    cursor: 'pointer',
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    }
  }
});
