import React, {Component} from 'react'
import Arraylis from './Arraylis'  
import axios from 'axios'
import tp1 from './pics/thai/tp1.jpg'
import tp2 from './pics/thai/tp2.jpg'
import tp3 from './pics/thai/tp3.jpg'
import tp4 from './pics/thai/tp4.jpg'
import tp5 from './pics/thai/tp5.jpg'


class Vtab5 extends Component {
    
    state = {
        items: [],
    };
    
    componentDidMount() {
        axios.get('/menu/Thai')
         .then(res => {
             console.log(res)
             this.setState({items: res.data})
         })
         .catch(error => {
             console.log(error)
         })
    }
    
    
    render() {

        const images = [
            { id: 1, src: tp1 },
            { id: 1, src: tp2 },
            { id: 1, src: tp3 },
            { id: 1, src: tp4 },
            { id: 1, src: tp5 },
          ];
        
        const arr = this.state.items.map( (item, index) => {
            
            return <Arraylis 
                     itemId={item.products.itemId}
                     catogary={item.products.catogary}
                     subcategaryName={item.products.subcatogaryName}
                     price={item.products.price} 	
                />
        
        } )

        const ar = images.map( (sr,id) => {
	
                return <Arraylis 
                     id={sr.id}	
                     src={sr.src}
                />
        
        } )

        return (
            <div className="main-footer" style={{ marginTop:'3%', height:'auto', width:'auto' }}>
            <div className="container" style={{ height:'auto', width:'auto' }}>
                <div className="row" style={{marginTop:'3%', height:'auto', width:'auto'}}>
                {arr}
                </div>
            </div>
            </div>
        )
    }
}


export default Vtab5;