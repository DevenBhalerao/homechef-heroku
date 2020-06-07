import React, {Component} from 'react'
import Arraylis from './Arraylis' 
import axios from 'axios'

class Vtab1 extends Component {
    
    constructor(){
        super();
        this.state = {
            items: [],
            cart: {
                itemId:"indian"
            }   
        }
    }


    componentDidMount() {
        
        axios.get('http://localhost:5000/menu/Indian', {
            headers: {
              'auth-token': localStorage.usertoken
            }})
         .then(res => {
             console.log(res)
             this.setState({items: res.data})
         })
         .catch(error => {
             alert("Pls Login first");
         })
    }
    
    render() {
        
        const arr = this.state.items.map( (item, index) => {
	
            return <Arraylis 
                     itemId={item.products.itemId}
                     catogary={item.products.catogary}
                     subcategaryName={item.products.subcatogaryName}
                     price={item.products.price} 	
                />
        
        } )
        
        return (

            <div>
            <div className="main-footer" style={{ marginTop:'3%', height:'auto', width:'auto' }}>
            <div className="container" style={{ height:'auto', width:'auto' }}>
                <div className="row" style={{marginTop:'3%', height:'auto', width:'auto'}}>
                   {arr} 
                </div>
            </div>
            </div>
            </div>
        )
    }
}
    



export default Vtab1;