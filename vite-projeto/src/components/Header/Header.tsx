import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';


const items: MenuProps['items'] = [
  {
    label: <a href="/">Home</a>,
    key: 'home',
  },
  {
    label: <a href="/sobre">Sobre</a>,
    key: 'sobre',
  },
  {
    label: <a href="/contato">Contato</a>,
    key: 'contato',
  },
];

const Header: React.FC = () => (
  <div style={{ height: 72, padding: "16px", display: 'flex', alignItems: 'center', background: "#d3dadaff", borderRadius: 20, fontFamily: 'Arial, sans-serif', marginBottom: 20 }}>
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Menu
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  </div>
);

export default Header;