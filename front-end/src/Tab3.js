import React from 'react'
import 'react-web-tabs/dist/react-web-tabs.css';
import girl from './UI/girl.jpg'
import { Button } from 'react-bootstrap';


class Tab3 extends React.Component{
  render(){
  return(
      <div  className="body-content" style={{marginLeft:'10%',marginTop:'2%',marginRight:'10%', border:'solid',borderRadius:'10px'}}>
      <h4><b>Add your Reviews</b></h4>
      <div className="row">
      {/* Column 1 */}
        <div className="col-md-3 col-sm-6" style={{textAlign:'left'}}>
          <img src={girl} style={{width:'60%', height:'90%', marginLeft:'20%', marginTop:'0%', borderRadius:'50%'}} alt='personimage'/>
        </div>

       {/* Column 2 */}
         <div className="col-lg-9" style={{textAlign:'left', marginTop:'3%', width:'auto', height:'auto'}}>
            <textarea style={{float:'center', width:'80%',height:'auto', borderRadius:'10px',border: '2px solid #888',resize: 'none' }}/>
            <br/> <Button className='btn btn-secondary' type='submit'  style={{float:'center', marginLeft:'3%'}}>Send Review</Button>
         </div>

        </div>     
      </div>


      );
  }
  }

export default Tab3; 