export default theme => ({
  '@global': {
    '.ant-menu.ant-menu-dark': {
      fontSize: '16px',
      position: 'relative',
      '& li': {
        marginBottom: 0
      },
      '& li:hover,& .ant-menu-item:hover': {
        backgroundColor: theme.primaryColor
      }
    }
  },
  logo: {
    width: 200,
    height: 20,
    margin: 20,
    float: 'left'
  }
});
