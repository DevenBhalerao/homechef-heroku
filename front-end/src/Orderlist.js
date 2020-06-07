import React from 'react';
import Productlist from './Productlist'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import './Orderlist.css'

function Orderlist (props)  {
    
    return (   
                
                <div className="item" style={{border:'solid', marginRight:'1.5%', marginLeft:'1.5%', marginTop:'2%', paddingTop:'3%', borderRadius:'10px'}}>
                    <Route>
                    <p><b>Order Id : {props.id1}</b></p>
                    <p><b>Category : {props.id2}</b></p>
                    <p><b>Total Cost : {props.id6}</b></p>
                    <p><b>Payment Type : {props.id7}</b></p>
                    <Nav >
                    <p ><Link exact to={'/Productlist'} className="nav-link text-dark"><b>Close</b></Link></p>
                    <p ><Link exact to={'/'} className="nav-link "><b>details</b></Link></p>
                    </Nav>
                    <Switch>
                    <Route path='/Productlist' component={Productlist} />
                    <Route path='/' />
                      
                    </Switch>
                    </Route>
                </div>  
                

    )   
    
    }

export default Orderlist;

