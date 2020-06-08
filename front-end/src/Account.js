import React, {Component} from 'react' 
import axios from 'axios'
import Accountlist from './Accountlist'

class Account extends Component {
    
    constructor(){
        super();
        this.state = {
            items: [],
        }
    }


    componentDidMount() {
        
        axios.get('http://localhost:5000/users/profile', {
            headers: {
              'auth-token': localStorage.usertoken
            }})
         .then(res => {
             console.log(res)
             console.log(res.data.data)
             if(res.data.status==true){
                this.setState({items: res.data.data})
            }
            else if(res.data.status==false){
                alert(res.data.error)
            } 
         }
         )
         .catch(error => {
            alert("login first");
        })
    }

    render() {

        
	
            return <Accountlist
                     name={this.state.items.name}
                     username={this.state.items.username}
                     address={this.state.items.address} 
                     email={this.state.items.email}	
                />
        
 
        
        
        return (
            <div>
            </div>
           
        )
    }
    
}
    



export default Account;