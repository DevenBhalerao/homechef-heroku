import React,{Component, useState} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/js/dist/dropdown';
import Navbar from 'react-bootstrap/Navbar'
import { Button, Carousel} from 'react-bootstrap'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import drinks from './drinks.jpg'
import { FaShoppingCart, FaUserCircle, FaSearchLocation } from 'react-icons/fa' 
import first from './UI/banners/first.png'
import off from './UI/banners/off.PNG'
import delivery from './UI/banners/delivery.PNG'
import subs from './UI/banners/subs.PNG'
import tasty from './UI/tasty.png'
import home from './UI/home.png'
import glocal from './UI/glocal.jpg'
import background from './UI/background.jpg'
import Erfinden from './UI/Erfinden.png'
import logo1 from './UI/logo1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Caro from './Caro'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'



class Header extends Component{

    
    render(){

        return (
            <div>
                

                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <a class="navbar-brand" href="#"><img src={logo1} alt='logo' style={{width:'110px', padding:'1px', borderRadius:'10px' }}/></a>
                        </Nav>
                        
                        <Nav>
                        <Nav.Link href="#deets" type="submit"><FaSearchLocation size='1rem'/></Nav.Link>
                        <Nav.Link href="#deets" type="submit"><FaUserCircle size='1rem'/></Nav.Link>
                        <Nav.Link href="#deets" type="submit"><FaShoppingCart size='1rem'/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>   

                <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{marginTop:'2px',marginRight:'10px',marginLeft:'10px', border:'solid',borderRadius:'10px'}}>  

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav m-auto">
                        <li class="nav-item active">
                            <a class="nav-link text-uppercae ml-5" href="#">HOME<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-uppercae ml-5" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Shop By
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Indian</a>
                            <a className="dropdown-item" href="#">Chinese</a>
                            <a className="dropdown-item" href="#">Italian</a>
                            <a className="dropdown-item" href="#">Mexican</a>
                            <a className="dropdown-item" href="#">Thai</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercae ml-5" href="/Caro">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercae ml-5" href="">Your Account</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercae ml-5" href="#">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercae ml-5" href="#">Support</a>
                        </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    </nav> 

                    





                    <div id="content">
                    <Carousel style={{marginRight:'25%', marginLeft:'25%', marginTop:'3%', border:'solid'}}>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={first} 
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={off} 
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={delivery} 
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={subs} 
                            alt="Fourth slide"
                            />
                        </Carousel.Item>
                    </Carousel>

                    <Jumbotron style={{marginTop:'50px', marginLeft:'200px', marginRight:'200px'}}>
                        <h1>WELCOME</h1>
                        <p>
                        Home-Chef is a platform which enables patrons to have homemade food from homemakers who want to spread their magic from kitchen. The sheer purpose of this platform is unleash the entrepreneur within women. Patrons have an opportunity to try out various secret recipes across India.
                        </p>
                    
                        <div className="Main-Container">
                        <div className="container">
                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={tasty} style={{width:'200px', height:'150px'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6>Tasty Food</h6>
                            </div>
                            </div>
                            {/* Column 2 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={home} style={{width:'200px', height:'150px'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6>Door Step Delivery</h6>
                            </div>
                            </div>  
                            { /* Column 3 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={home} style={{width:'200px', height:'150px'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6>Home Made</h6>
                            </div>
                            </div>  

                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={glocal} style={{width:'200px', height:'150px'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6>Glocal Food</h6>
                            </div>
                            </div>
                        </div>

                        </div>    
                        </div>
                    </Jumbotron>

                    </div>
  
            </div>
        )
    }
}



export default Header;