import { Fragment, useState } from 'react';
import { Card, Tabs, PageHeader, Row, Col } from 'antd';

import { Icon } from '@iconify/react';
import CompanyDetail from './CompanyDetail';



// Your components


const { TabPane } = Tabs;

export default function CompanyProfile() {
  const [currentTab, setCurrentTab] = useState('CompanyDetail');

  const ACCOUNT_TABS = [

    {
      value: 'CompanyDetail',
      icon: <Icon icon="mingcute:building-1-line" style={{ marginBottom: 0, verticalAlign: 'middle', fontSize:'20px' }} />,
      text: 'Company Detail',
      component: <CompanyDetail/>,
    },

    // { value: 'CompanyOrders', icon: <ShipOutlined />, component: <CompanyOrderListing /> },
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
