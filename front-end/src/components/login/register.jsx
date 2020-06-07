import React from "react";
import loginImg from "../../login.svg";
import { Button,Row,Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { register } from "../../serviceWorker";
import login from './login'

export class Register extends React.Component {
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
      address: this.state.address + this.state.city +  this.state.State + this.state.Zip + this.state.status,
    }

    register(user).then(res => {
          this.props.history.push('/login')
    })
  }


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
      <div className="content">
        <div className="header"><h4>Register</h4></div>
          <div style={{ marginTop:'5%' }}>
          <Form >

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={this.state.username} onChange={this.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="text" placeholder="phone" name="phone" value={this.state.phone} onChange={this.onChange} required/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter Name" name="name" value={this.state.name} onChange={this.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main..."  name="address" value={this.state.address} onChange={this.onChange} required/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="City..." name="city" value={this.state.city} onChange={this.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" value="Choose..." value={this.state.state} onChange={this.onChange}>
                <option>Maharastra</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control name="zip" value={this.state.zip} onChange={this.onChange} required/>
            </Form.Group>
          </Form.Row>

          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Role 
              </Form.Label>
              <Col sm={10} style={{textAlign:'left'}}>
                <Form.Check
                  type="radio"
                  label="Customer"
                  name="status"
                  id="formHorizontalRadios1"
                  value={this.state.status} onChange={this.onChange}
                />
                <Form.Check
                  type="radio"
                  label="Home-Chef"
                  name="status"
                  id="formHorizontalRadios2"
                  value={this.state.status} onChange={this.onChange}
                />
                <Form.Check
                  type="radio"
                  label="Delivery Partner"
                  name="status"
                  id="formHorizontalRadios3"
                  value={this.state.status} onChange={this.onChange}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <div className="footer">
          <Button variant="primary" type="submit">
            Register
          </Button>
          </div>
        </Form>
        </div>
      </div>
      </div>
    );
  }
}
