import React from 'react';

function Accountlist (props)  {

    
    return (   
                
                <div className=""  style={{border:'solid', marginRight:'10%', marginLeft:'10%', marginTop:'2%', borderRadius:'10px', boxShadow:'7px 7px rgb(167,167,167)'}}>
                    <h5><b>Profile :</b></h5>
                    <div style={{marginLeft:'20%', textAlign:'left',marginTop:'2%'}}>
                    <p><b>Name : {props.name}</b></p>
                    <p><b>Username : {props.username}</b></p>
                    <p><b>Address : {props.address}</b></p> 
                    <p><b>Email : {props.email}</b></p> 
                    </div>
                </div>  

    )   
    
    }

export default Accountlist;