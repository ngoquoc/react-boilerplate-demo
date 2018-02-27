import React from 'react';
import { PageHeader } from 'react-bootstrap';

const Header = () => {
  return (
    <PageHeader>
      <h1
        style={{
          background: 'url(assets/index_oglasi_logo.svg) no-repeat top center',
        }}
      />
    </PageHeader>
  );
};

export default Header;
