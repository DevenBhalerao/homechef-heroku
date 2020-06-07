import React from 'react';
import drinks from './drinks.jpg'
import './Body.css'


function Arraylis (props)  {
    function handleClick() {
        console.log('Button click ...');
        localStorage.setItem('items',props.itemId)
        localStorage.setItem('cat',props.subcategaryName)
        localStorage.setItem('price',props.price)
      }

      
    
    return (   
                
                <div className="item col-md-2 col-sm-4"  style={{border:'solid', marginRight:'1.5%', marginLeft:'1.5%', marginTop:'2%', borderRadius:'5%'}}>
                    <img id={props.id} src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
                    <p><b>{props.itemId}</b></p>
                    <p><b>{props.subcategaryName}</b></p>
                    <p>Rs.{props.price}  <button type="button" onClick={handleClick}  variant="primary" style={{borderRadius:'10px',width:'auto',height:'auto'}}>Add</button></p> 
                </div>  

    )   
    
    }

export default Arraylis;