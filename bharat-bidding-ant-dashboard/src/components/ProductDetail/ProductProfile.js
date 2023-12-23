import { Fragment, useState } from 'react';
import { Card, Tabs, PageHeader, Row, Col } from 'antd';
import { UserOutlined, HomeOutlined, FileOutlined, ShipOutlined } from '@ant-design/icons';
import ProductDetail from './ProductDetail';
import UserProfile from '../User/userProfile';

// Your components


const { TabPane } = Tabs;

export default function ProductProfile() {
  const [currentTab, setCurrentTab] = useState('userProfile');

  const ACCOUNT_TABS = [
    { value: 'userProfile',  icon: <HomeOutlined />, text: 'User Profile', component: <UserProfile /> },
    { value: 'profileDetail', icon: <UserOutlined />, text: 'Profile Detail', component: <ProductDetail /> },
    // { value: 'kycDocuments', icon: <FileOutlined />, component: <BuyerKYCDocs /> },
    // { value: 'buyerOrders', icon: <ShipOutlined />, component: <BuyerOrderListing /> },
  ];

  return (
    <Fragment>
         <Row gutter={16} justify="space-evenly" >
                <Col xs={24} sm={24} md={24} lg={22} xl={22}>
    <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
      {ACCOUNT_TABS.map((tab) => (
        <TabPane tab={<span>{tab.icon} {tab.text}</span>} key={tab.value} />
      ))}
    </Tabs>
    </Col>
    </Row>
    {ACCOUNT_TABS.map((tab) => {
      const isMatched = tab.value === currentTab;
      return isMatched && <div key={tab.value}>{tab.component}</div>;
    })}
   
  </Fragment>
  );
}
