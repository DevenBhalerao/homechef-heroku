import React, {Component} from 'react' 
import axios from 'axios'
import Arrayproduct from './Arrayproduct'

class Productlist extends Component {
    
    constructor(){
        super();
        this.state = {
            orders: [],

        }
    }


    componentDidMount() {   
        
        axios.get('/users/orders', {
            headers: {
              'auth-token': localStorage.usertoken
            }})
         .then(res => {
             if(res.data.status==true){
                this.setState({orders: res.data.data.product})
                }
                else if(res.data.status==false){
                    alert(res.data.error)
                } 
         })
    }
    
    render() {
        
        const arr = this.state.orders.map( (order, index) => {
	
            return <Arrayproduct 
                     id3={order.itemid} 
                     id4={order.quantity}
                     id5={order.totalprice}
                />
        
        } )
        
        return (

            <div>
            <div className="main-footer" style={{ marginTop:'3%', height:'auto', width:'auto' }}>
            <div className="container" style={{ height:'auto', width:'auto' }}>
                <div style={{marginTop:'3%', height:'auto', width:'auto'}}>
                   {arr} 
                </div>
            </div>
            </div>
            </div>
        )
    }
}
    



export default Productlist;