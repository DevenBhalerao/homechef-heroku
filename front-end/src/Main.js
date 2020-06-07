import React,{Component, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/js/dist/dropdown';
import Navbar from 'react-bootstrap/Navbar'
import { Button, Carousel} from 'react-bootstrap'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaShoppingCart, FaUserCircle, FaSearchLocation } from 'react-icons/fa' 
import logo1 from './UI/logo1.png'
import Tab2 from './Tab2'
import Tab1 from './Tab1'
import Tab3 from './Tab3'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Maps from './Maps'
import Cart from './Cart'
import Signup from './Signup'
import Signin from './Signin'
import Orders from './Orders'
import Account from './Account'
import './Main.css'



class Main extends Component{

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
    } 

    render(){

        return (  
            
            <div>

                <Router>
                <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark" style={{ marginTop:'8px',marginRight:'10px',marginLeft:'10px', border:'solid',borderRadius:'10px'}}>
                    <Navbar.Brand href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{borderColor:'#000000'}}/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <a class="navbar-brand" href="#"><img className="logo" src={logo1} alt='logo' style={{width:'110px', padding:'1px', borderRadius:'10px' }}/></a>
                        </Nav>
                        
                        <Nav>
                        <ul className="navbar-nav mr-auto">
                            <li><Link exact to={'/Maps'} className="nav-link text-dark "><b>Location</b></Link></li>
                            <li><Link exact to={'/Signin'} className="nav-link text-dark"><b>Login in</b></Link></li>
                            <li><Link exact to={'/Signup'} className="nav-link text-dark"><b>Register</b></Link></li>
                            <li><Link exact to={'/'} onClick={this.logOut.bind(this)} className="nav-link text-dark"><b>Logout</b></Link></li>
                            <li><Link exact to={'/'} className="nav-link text-dark"><b>Close</b></Link></li>
                        </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path='/Maps' component={Maps} />
                    <Route path='/Signin' component={Signin} />
                    <Route path='/Signup' component={Signup} />
                    <Route path='/' />
                    <Route path='/' />
                </Switch>

                
                <hr style={{ height:'5px',borderColor:'black' }}/>

               
                <Tabs>
                    <TabList style={{marginTop:'10px', fontFamily:'serif',color:'grey', height:'auto',width:'auto'}}>
                    <b>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Home</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Shop By</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Blog</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Your Account</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Contact Us</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Support</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Cart</Tab>
                    <Tab style={{paddingRight:'3%', paddingLeft:'3%', paddingTop:'15px',paddingBottom:'15px'}}>Orders</Tab>
                    </b>
                    </TabList>

                    
                
                    <TabPanel>
                        <Tab1 />
                    </TabPanel>

                    <TabPanel>
                        <div style={{border:'solid',borderRadius:'10px',marginTop:'30px', marginLeft:'2%',marginRight:'2%',paddingBottom:'30px'}}>
                        <Tab2 />
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <Tab3 />
                    </TabPanel>

                    <TabPanel>
                        <Account />
                    </TabPanel>

                    <TabPanel>
                    
                    </TabPanel>

                    <TabPanel>
                    
                    </TabPanel>

                    <TabPanel>
                        <Cart />
                    </TabPanel>

                    <TabPanel>
                        <Orders />
                    </TabPanel>
                </Tabs>
                
 
                
                </Router>      
  
            </div>
            
        )
    }
}



export default Main;