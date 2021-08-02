import React from "react";
import { useState, ChangeEvent } from "react";

import AllOrders from "../../components/orders/all-orders";
import OrdersQuery from "../../components/orders/orders-query";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const Orders = () => {
  const [value, setValue] = useState(2);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='main-container'>
      <h1>Orders</h1>

      <Paper square>
        <Tabs
          value={value}
          indicatorColor='secondary'
          textColor='secondary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='全部订单' />
          <Tab label='订单查询' />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <AllOrders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrdersQuery />
      </TabPanel>
    </div>
  );
};

export default Orders;
