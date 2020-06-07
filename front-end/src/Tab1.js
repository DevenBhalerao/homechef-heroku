import React,{Component, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/js/dist/dropdown';
import { Carousel} from 'react-bootstrap'
import { Jumbotron } from 'react-bootstrap'
import first from './UI/banners/first.png'
import off from './UI/banners/off.PNG'
import delivery from './UI/banners/delivery.PNG'
import subs from './UI/banners/subs.PNG'
import tasty from './UI/tasty.png'
import home from './UI/home.png'
import background from './UI/background.jpg'
import Caro from './Caro'
import Body from './Body'
import sec from './UI/sec.jpg'

class Tab1 extends Component{

    
    render(){

        return (

            <div id="content" >
                    <div style={{ border:'solid', backgroundImage:`url(${background})`}}>
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

                    <Jumbotron style={{marginTop:'5%', marginLeft:'15%', marginRight:'15%', backgroundImage:`url(${sec})`,color:'#FFFFFF', boxShadow:'8px 8px 0px 0px rgb(0,0,0)'}}>
                        <h1 style={{color:'#FFFFFF'}}>WELCOME</h1>
                        <p><b>
                        Home-Chef is a platform which enables patrons to have homemade food from homemakers who want to spread their magic from kitchen. The sheer purpose of this platform is unleash the entrepreneur within women. Patrons have an opportunity to try out various secret recipes across India.
                        </b></p>
                    
                        <div className="Main-Container"> 
                        <div className="container">
                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={tasty} style={{width:'70%', height:'65%', borderRadius:'20%'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6 style={{color:'#FFFFFF'}}>Tasty Food</h6>
                            </div>
                            </div>
                            {/* Column 2 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={home} style={{width:'70%', height:'65%', borderRadius:'20%'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6 style={{color:'#FFFFFF'}}>Door Step Delivery</h6>
                            </div>
                            </div>  
                            { /* Column 3 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={home} style={{width:'70%', height:'65%', borderRadius:'20%'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6 style={{color:'#FFFFFF'}}>Home Made</h6>
                            </div>
                            </div>  
                            { /* Column 4 */}
                            <div className="col-md-3 col-sm-6" style={{textAlign:'center'}}>
                            <div>
                                <img src={home} style={{width:'70%', height:'65%', borderRadius:'20%'}}/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                            <h6 style={{color:'#FFFFFF'}}>Glocal Food</h6>
                            </div>
                            </div>
                        </div>

                        </div>    
                        </div>
                    </Jumbotron>
                    </div>

                    <Body />
                    <Caro />

                    </div>
        )

        }
    }

export default Tab1;