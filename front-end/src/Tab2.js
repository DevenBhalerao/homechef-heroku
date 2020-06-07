import React from 'react'
import 'react-web-tabs/dist/react-web-tabs.css';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import Vtab1 from './Vtab1'
import Vtab2 from './Vtab2'
import Vtab3 from './Vtab3'
import Vtab4 from './Vtab4'
import Vtab5 from './Vtab5'



class Tab2 extends React.Component{
  render(){
  return(
      <div>
    
      <Tabs defaultTab="vertical-tab-one" vertical >
          
          <TabList style={{marginTop:'50px', width:'auto'}}>
              
              <Tab disabled></Tab>
              <Tab disabled></Tab>
              <Tab disabled></Tab>
              <Tab disabled></Tab>  
              <Tab disabled></Tab>  
              <Tab disabled></Tab>
              <Tab disabled></Tab>
              <Tab disabled></Tab>
              <Tab disabled></Tab>
              <Tab tabFor="vertical-tab-one" style={{ textAlign:'left' }}><b>Indian</b></Tab>
              <Tab tabFor="vertical-tab-two" style={{ marginTop:'20px', textAlign:'left' }}><b>Chinese</b></Tab>
              <Tab tabFor="vertical-tab-three" style={{ marginTop:'20px', textAlign:'left' }}><b>Italian</b></Tab>
              <Tab tabFor="vertical-tab-four" style={{ marginTop:'20px',textAlign:'left' }}><b>Mexican</b></Tab>
              <Tab tabFor="vertical-tab-five" style={{ marginTop:'20px', textAlign:'left' }}><b>Thai</b></Tab>
              
          </TabList>
        

          
          <TabPanel tabId="vertical-tab-one" style={{marginTop:'60px',marginLeft:'1%'}}>
            <Vtab1 />
          </TabPanel>
          
          <TabPanel tabId="vertical-tab-two" style={{marginTop:'60px',marginLeft:'1%'}}>
             <Vtab2 />
          </TabPanel>
  
          <TabPanel tabId="vertical-tab-three" style={{marginTop:'60px',marginLeft:'1%'}}>
              <Vtab3 />
          </TabPanel>

          <TabPanel tabId="vertical-tab-four" style={{marginTop:'60px',marginLeft:'1%'}}>
              <Vtab4 />
          </TabPanel>

          <TabPanel tabId="vertical-tab-five" style={{marginTop:'60px',marginLeft:'1%'}}>
              <Vtab5 />
              
          </TabPanel>

      </Tabs>
      </div>
      );
  }
  }

export default Tab2;