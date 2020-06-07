import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebookSquare } from 'react-icons/fa';
import girl from './UI/girl.jpg'
import back1 from './UI/back1.PNG'
import Commentt from './Commentt'
import './Footer.css';
function Footer() {
    return (


        <div className="main-footer" >

        <div  className="body-content" style={{marginTop:'2%',marginLeft:'10%',marginRight:'10%', border:'solid',borderRadius:'10px'}}>
        <h4><b>Reviews</b></h4>
        <p>What our customers have to say about us....</p>
        <div className="row">
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6" style={{textAlign:'left'}}>
                <img src={girl} style={{width:'60%', height:'90%', marginLeft:'20%', marginTop:'0%', borderRadius:'50%'}} alt='personimage'/>
            </div>

             {/* Column 2 */}
             <div className="col-lg-9" style={{textAlign:'left', marginTop:'3%', width:'auto', height:'auto'}}>
                    <h4><i>"Home Chef is the platform that helped ,e in turning my passion into buisness without anyconsiderable investment. Thank you Home-Chef."</i></h4>
                    <h4>- Sneha Parekh</h4>
             </div>

        </div>

        </div>
        

        <div style={{marginTop:'20px'}}>
        <p style={{backgroundColor:'#19075E', textDecorationColor:'#19075E'}}>1</p>
        </div>
        <div className="container">
        <div className="row">
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6" style={{textAlign:'left'}}>
            <h4>Information</h4>
            <ul className="list-unstyled">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
            </ul>
            </div>
            {/* Column 2 */}
            <div className="col-md-3 col-sm-6" style={{textAlign:'left'}}>
            <h4>Support</h4>
            <ul className="list-unstyled">
            <li>Contact Us</li>
            </ul>
            </div>   
            { /* Column 3 */}
            <div className="col-md-3 col-sm-6" style={{textAlign:'left'}}>
            <h4>Yes we are social</h4>
            <ul className="list-unstyled">
            <FaInstagram size='2rem' className="FaInstagram" />
            <FaWhatsapp size='2rem' style={{marginLeft:'10%'}} className="FaWhatsapp"/>
            <FaFacebookSquare size='2rem' style={{marginLeft:'10%'}} className="FaFacebookSquare"/>
            </ul>
            </div>   
        </div>

        <div className="footer-bottom" >
                <p className="text-xs-center">
                    <b>&Copyright;{ new Date().getFullYear() } - Home-Chef | Erfinden Technologies Pvt.Ltd.</b>
                </p>
        </div>

        </div>    
        </div>
        
        
    )
}

export default Footer;