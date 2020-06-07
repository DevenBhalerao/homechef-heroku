import React, {Component} from 'react' 
import axios from 'axios'
import Orderlist from './Orderlist'

class Orders extends Component {
    
    constructor(){
        super();
        this.state = {
            orders: [],

        }
    }


    componentDidMount() {   
        
        axios.get('https://homechef-mern.herokuapp.com/users/orders', {
            headers: {
              'auth-token': localStorage.usertoken
            }})
         .then(res => { 
             if(res.data.status==true){
                this.setState({orders: res.data.data})
                }
                else if(res.data.status==false){
                    alert("Login First");
                } 
         })
         .catch(err => {
            alert("Login First!!")
        })
    }
    
    render() {
        
        const arr = this.state.orders.map( (order, index) => {
	
            return <Orderlist 
                     id1={order.orderid}
                     id2={order.catogary}
                     id6={order.totalCost}
                     id7={order.paymentType}
                />
        
        } )
        
        return (

            <div>
            <div className="main-footer" style={{ marginTop:'3%', height:'auto', width:'auto' }}>
            <div className="container" style={{ height:'auto', width:'auto', borderRadius:'10px' }}>
                <h5>Past Orders :</h5>
                <div style={{marginTop:'3%', height:'auto', width:'auto'}}>
                   {arr} 
                </div>
            </div>
            </div>
            </div>
        )
    }
}
    



export default Orders;