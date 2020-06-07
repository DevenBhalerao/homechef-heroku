import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

import { register } from './components/login/UserFunctions';

import logi from './login.svg'

import Signin from './Signin'

import './Signup.css';

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
          username:'',
          phone:'',
          email: '',
          password:'',
          name:'',
          address:'',
          city:'',
          State:'',
          zip:'',
          status:'',
    
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
    
      onChange(e){
        this.setState({[e.target.name]: e.target.value})
      }
    
      onSubmit(e){
        e.preventDefault()
    
        const user = {
          username: this.state.username,
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          address: this.state.address + this.state.city +  this.state.State + this.state.Zip,
          status: this.state.status,
        }
    
        register(user).then(res => { if(res) {
            this.props.history.push('/Signin')
        }
      }) 

      }
    
    render() {
    
    return (
    
    <div>
    
    <div className="container">
    
    <div className="row">

    <div className="col-md-4 login-sec">
    
    <h2 className="text-center">Signup</h2>
    
    <Form onSubmit={this.onSubmit}>
    
    <FormGroup>
    
    <Label for="exampleName">User Name</Label>
    
    <Input type="text" name="username" value={this.state.username} onChange={this.onChange} required placeholder="Enter username" />
    
    </FormGroup>

    <FormGroup>
    
    <Label for="exampleName">Name</Label>
    
    <Input type="text" name="name" value={this.state.name} onChange={this.onChange} required placeholder="Enter name" />
    
    </FormGroup>
    
    <FormGroup>
    
    <Label>Mobile No.</Label>
    
    <Input type="text" name="phone" value={this.state.phone} onChange={this.onChange} required placeholder="Enter Mobile No." />
    
    </FormGroup>
    
    <FormGroup>
    
    <Label>Email</Label>
    
    <Input type="email" name="email" value={this.state.email} onChange={this.onChange} required placeholder="Enter email" />
    
    </FormGroup>
    
    <FormGroup>
    
    <Label >Password</Label>
    
    <Input type="password" name="password" value={this.state.password} onChange={this.onChange} required placeholder="Enter password" />
    
    </FormGroup>

    <FormGroup>
    
    <Label >Address</Label>
    
    <Input type="text" name="address"  value={this.state.address} onChange={this.onChange} placeholder="Address" />
    
    </FormGroup>

    <FormGroup>
    
    <Label >City</Label>
    
    <Input type="text" name="city" value={this.state.city} onChange={this.onChange} required placeholder="City Name" />
    
    </FormGroup>

    <FormGroup>

    <FormGroup>
    
    <Label >State</Label>
    
    <Input type="text" name="state" value={this.state.state} onChange={this.onChange} required placeholder="State" />
    
    </FormGroup>

    <FormGroup>
    
    <Label >Zip</Label>
    
    <Input type="text" name="zip" value={this.state.zip} onChange={this.onChange} required placeholder="Enter zip code" />
    
    </FormGroup>

    <FormGroup>
    
    <Label >Status</Label>
    
    <Input type="text" name="status" value={this.state.status} onChange={this.onChange} required placeholder="e.g. customer/homechef/serviceboy" />
    
    </FormGroup>
    
    
    </FormGroup>
    
    <div className="d-flex justify-content-center mt-3 login_container">
    
    <Button type="submit" className="btn btn-login">Register</Button>
    
    </div>
    
    <div className="mt-4">
    
    <div className="d-flex justify-content-center links">
    
    <Link href="/Signin" to="/Signin" className="linka">Already Account Login </Link>
    
    </div>

    </div>
    
    </Form>
    
    </div>

    <div className="col-md-8 banner-sec"><img src={logi} alt='login image' style={{width:'80%', paddingTop:'20%',height:'60%', borderRadius:'10px' }}/></div>

    </div>

    </div>
    
    </div>
    
    
    
    )
    
    }
    
    }