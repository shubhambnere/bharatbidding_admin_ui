import { Fragment, useState } from 'react';
import { Card, Tabs, PageHeader, Row, Col } from 'antd';
import { UserOutlined, HomeOutlined, FileOutlined, ShipOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import BuyerDetail from './BuyerDetail';
import BuyerCompanyDetail from './BuyerCompany/BuyerDetail';
import CompanyBuyerList from './BuyerCompanysList/CompanyBuyerList';


// Your components


const { TabPane } = Tabs;

export default function BuyerProfile() {
  const [currentTab, setCurrentTab] = useState('BuyerDetail');

  const ACCOUNT_TABS = [

    { value: 'BuyerDetail', icon: <UserOutlined />, text: 'Buyer Detail', component: <BuyerDetail /> },
    {
      value: 'BuyerCompany',
      icon: <Icon icon="mingcute:building-1-line" style={{ marginBottom: 0, verticalAlign: 'middle', fontSize:'20px' ,marginRight:8}} />,
      text: 'Company',
      component: <BuyerCompanyDetail />,
    },
    { value: 'listedCompany', icon: <Icon icon="fluent-mdl2:company-directory" style={{ marginBottom: 3,marginRight:8, verticalAlign: 'middle', fontSize:'16px' }} />, text: 'Listed Company', component: <CompanyBuyerList /> },
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
