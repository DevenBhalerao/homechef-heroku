import React from "react";
import loginImg from "../../login.svg";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './UserFunctions';

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password:'',
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
      password: this.state.password,
      status: this.state.status,
    }

  login(user).then(res => {
      if(res) {
      this.props.history.push('/Main')
      }
    })
  }

  render() {
    return (
        
      <div className="base-container" ref={this.props.containerRef}>
        <div className="content">
        <div className="form"> 
        <div className="header"><h4>Login</h4></div>
          <div className="image">
            <img src={loginImg} />
          </div>
          <Form onSubmit={this.onSubmit}  style={{ marginTop:'5%' }}>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" id="username" value={this.state.username} onChange={this.onChange} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" id="password" value={this.state.password} onChange={this.onChange} required/>
            </Form.Group>

            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Role 
              </Form.Label>
              <Col sm={30} style={{textAlign:'left'}}>
                <Form.Check
                  type="radio"
                  label="Customer"
                  name="status"
                  id="formHorizontalRadios1"
                  value={this.state.role} onChange={this.onChange}
                />
                <Form.Check
                  type="radio"
                  label="Home-Chef"
                  name="status"
                  id="formHorizontalRadios2"
                  value={this.state.role} onChange={this.onChange}
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
            Login
          </Button>
          </div>
        </Form>
        </div>
        </div>
      </div>
    );
 }

}
