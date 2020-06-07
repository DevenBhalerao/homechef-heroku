import React, {Component} from 'react'
import axios from 'axios'
import Cartlist from './Cartlist'
import Button from 'react-bootstrap/Button'
 
class Cart extends Component { 
  
    handle() {
        console.log("clicked");
        axios.post('https://homechef-mern.herokuapp.com/order/add',
        {
            "orderid": "forder55",
            "catogary": "Indian",
                    "product": [
                        {
                           
                            "itemid": "item5",
                            "quantity": 2,
                            "totalprice": 60,
                            "detailsifany": "no"
                        },
                        {
                           
                            "itemid": "item7",
                            "quantity": 2,
                            "totalprice": 60,
                            "detailsifany": "no"
                        }
                        ],
                        "paymentType": "cash",
                    "totalCost": 120
        },
        {
            headers: {
              'auth-token': localStorage.usertoken
            }},
            )
            .then(res => {
                alert('order!')
            })
            .catch(err => {
                console.log("err")
            })
      }


    render() {

       const items  = [ 
        
            {
                id:'',
                item:"",
                categary:"",
                subcategary:"",
                price:""
            },
            
        ]

        const arr = items.map( (arraycard, i) => {
	
            return <Cartlist 
                     id={items[i].id}
                     item={items[i].item}
                     categary={items[i].categary}
                     subcategary={items[i].subcategary}
                     price={items[i].price} 	
                />
        
        } )

    return (
        
        <div style={{border:'solid', borderRadius:'10px',marginLeft:'10%',marginRight:'10%'}}>
        <h2>Cart</h2>
        <div style={{marginLeft:'0.5%', marginTop:'1%',marginRight:'0.5%',marginBottom:'15%'}}>
        <h3 style={{textAlign:'left',marginLeft:'0.5%'}}> Selected Items : </h3>
        <div style={{border:'solid', borderRadius:'10px',marginLeft:'0.5%',marginRight:'0.5%',boxShadow:'7px 7px rgb(167,167,167)'}}>
            {arr} 
        </div>
        <div style={{marginLeft:'5%',marginRight:'5%',marginTop:'3%'}}>
            <button type="button" onClick={this.handle} variant="secondary" style={{float:'right', borderRadius:'10px'}}>Place Order</button>
        </div>
        </div>
        </div>
    )
    }
}
  

export default Cart;
