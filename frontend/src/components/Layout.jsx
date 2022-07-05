import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  EuroOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './layout.css';

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <h2 className='logo-title'>KT POS</h2>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key='/' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='/bills' icon={<EuroOutlined />}>
            <Link to='/bills'>Bills</Link>
          </Menu.Item>
          <Menu.Item key='/products' icon={<ShopOutlined />}>
            <Link to='/products'>Products</Link>
          </Menu.Item>
          <Menu.Item key='/customers' icon={<UserSwitchOutlined />}>
            <Link to='/customers'>Customers</Link>
          </Menu.Item>
          <Menu.Item key='/customers' icon={<LogoutOutlined />}>
            <Link to='/customers'>LogOut</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
          <div className='cart-items'>
            <ShoppingCartOutlined />
            <span className='cart-badge'>{cartItems.length}</span>
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;