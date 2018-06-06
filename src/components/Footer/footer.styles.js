export default theme => ({
  '@global': {
    '.ant-layout-footer': {
      background: theme.black,
      color: 'white'
    }
  },
  footer: {
    marginTop: '60px',
    backgroundColor: theme.panelColor,
    minHeight: '150px',
    border: '1px solid transparent'
  }
});
