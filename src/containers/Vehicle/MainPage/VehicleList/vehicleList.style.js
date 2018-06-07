export default theme => ({
  carListContainer: {
    marginTop: '20px',
    '& .ant-tabs-bar': {
      marginBottom: '0px',
      '& .ant-tabs-tab': {
        borderRadius: 'inherit !important',
        marginRight: '-1px !important',
      },
    },

    '& .ant-tabs-tabpane': {
      padding: theme.defaultPadding,
      background: theme.white,
      minHeight: '300px',
    },
  },
});
