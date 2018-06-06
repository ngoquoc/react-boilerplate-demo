import React from 'react';
import { Menu } from 'antd';
import unauthenticated from '../../../HOCs/auth/unauthenticated';

const LoginMenuItem = props => <Menu.Item {...props}>Login</Menu.Item>;
export default unauthenticated(LoginMenuItem);
