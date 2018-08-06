// <!-- eject:replace with='export default {' -->
export default theme => ({
  // <!-- /eject:replace -->
  // <!-- eject:remove -->
  '@global': {
    '.ant-layout-footer': {
      background: theme.black,
      color: 'white',
    },
  },
  // <!-- /eject:remove -->
  footer: {
    // <!-- eject:remove -->
    marginTop: '60px',
    backgroundColor: theme.panelColor,
    border: '1px solid transparent',
    // <!-- /eject:remove -->
    minHeight: '150px',
  },
  // <!-- eject:replace with='};' -->
});
// <!-- /eject:replace -->
