import React from 'react';
import 'tachyons';
import Table from 'react-bootstrap/Table'
import { FaEdit } from 'react-icons/fa'


function handleClick() {
    console.log('Button click ...');
    localStorage.removeItem("items");
    localStorage.removeItem("cat");
    localStorage.removeItem("price");
    window.location.reload(1000);
  }

const Cartlist = (props) => {

    
    return (  
        
        <div >
          
          <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Cat</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{localStorage.items}</td>
                    <td>{localStorage.cat}</td>
                    <td>{localStorage.price}</td>
                    <td><button type="button" onClick={handleClick}  variant="primary" ><FaEdit/></button></td>
                    </tr>
                </tbody>
            </Table>
            
        </div>
        
                                     
            
    )
}

export default Cartlist;