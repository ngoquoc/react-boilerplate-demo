export default theme => ({
  '@global': {
    '.ant-menu-item': {
      marginBottom: '4px',
      '&:hover': {
        background: theme.primaryColor
      }
    },

    '@media (min-width: 768px)': {
      '.ant-menu-sub': {
        width: '720px'
      }
    },
    '@media (min-width: 992px)': {
      '.ant-menu-sub': {
        width: '940px',
        left: '381.5px',
        top: '305px'
      }
    },
    '@media (min-width: 1200px)': {
      '.ant-menu-sub': {
        width: '1140px'
      }
    }
  },
  pageHeader: {
    borderBottom: 'none !important',
    '& h1': {
      height: '41px',
      backgroundSize: 'auto 41px',
      margin: '80px 0 20px 0'
    }
  },

  categoriesNavbar: {
    overflow: 'hidden',
    '& ul': {
      width: '100%'
    },
    '& li': {
      fontSize: '18px',
      fontWeight: '600',
      width: '20%',
      textAlign: 'center'
    }
  }
});
