import React from 'react';
import drinks from './drinks.jpg'
import './Body.css'

function Body() {
    return (
        
        <div className="main-footer" style={{ marginTop:'3%', height:'auto', width:'auto' }}>
        <div className="container" style={{ height:'auto', width:'auto' }}>
        <h4>Features Product</h4>
        <div className="row" style={{marginTop:'3%', height:'auto', width:'auto'}}>
            {/* Column 1 */}
            <div className="item col-5 col-md-2 col-sm-4 " style={{border:'solid', marginRight:'1.5%', marginLeft:'1.4%', marginTop:'2%', borderRadius:'5%'}}>
            <img src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
            <h4>Pav Bhaji</h4>
            <h5>Rs. 200</h5><button className='btn btn-primary' style={{borderRadius:'10px'}}>Order</button>
            </div><br/>
            {/* Column 2 */}
            <div className="item col-5 col-md-2 col-sm-4 " style={{border:'solid', marginRight:'1.5%', marginLeft:'1.4%', marginTop:'2%', borderRadius:'5%'}}>
            <img src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
            <h4>Pav Bhaji</h4>
            <h5>Rs. 200</h5><button className='btn btn-primary' style={{borderRadius:'10px'}}>Order</button>
            </div><br/>  
            { /* Column 3 */}
            <div className="item col-5 col-md-2 col-sm-4 " style={{border:'solid', marginRight:'1.5%', marginLeft:'1.4%', marginTop:'2%', borderRadius:'5%'}}>
            <img src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
            <h4>Pav Bhaji</h4>
            <h5>Rs. 200</h5><button className='btn btn-primary' style={{borderRadius:'10px'}}>Order</button>
            </div><br/>   
            { /* Column 4 */}
            <div className="item col-5 col-md-2 col-sm-4 " style={{border:'solid', marginRight:'1.5%', marginLeft:'1.4%', marginTop:'2%', borderRadius:'5%'}}>
            <img src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
            <h4>Pav Bhaji</h4>
            <h5>Rs. 200</h5><button className='btn btn-primary' style={{borderRadius:'10px'}}>Order</button>
            </div><br/>
            { /* Column 5 */}
            <div className="item col-5 col-md-2 col-sm-4 " style={{border:'solid', marginRight:'1.5%', marginLeft:'1.4%', marginTop:'2%', borderRadius:'5%'}}>
            <img src={drinks} style={{width:'90%', height:'48%', marginTop:'12%', borderRadius:'5%'}}/>
            <h4>Pav Bhaji</h4>
            <h5>Rs. 200</h5><button className='btn btn-primary' style={{borderRadius:'10px'}}>Order</button>
            </div><br/>
        </div>
        </div>
        </div>

        
    )
}

export default Body;