import { useState } from "react";

import AllOrders from "../../components/orders/all-orders";
import OrdersInquiry from "../../components/orders/orders-inquiry";

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

const OrdersPage = (props) => {
  const { axiosWithToken } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
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
        >
          <Tab label='All Orders' />
          <Tab label='Order Inquiry' />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <AllOrders axiosWithToken={axiosWithToken} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrdersInquiry />
      </TabPanel>
    </div>
  );
};

export default OrdersPage;
