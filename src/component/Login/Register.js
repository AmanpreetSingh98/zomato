import React,{Component} from 'react';
import Header from '../Header';
import './Register.css'
 
const registerurl = "https://loginoutlive.herokuapp.com/api/auth/register";

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            name:'',
            email:'',
            phone:'',
            password:''
        }
    }

    handleSubmit = () => {
        fetch(registerurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/login'))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    togpass = () => {
        let input = document.getElementById('password');
        let icon = document.getElementById('eye').classList
        if(input.type=='password'){
            input.type='text'
            icon.value='bi bi-eye eye-adj'
        }
        else{
            input.type='password'
            icon.value='bi bi-eye-slash eye-adj'
        }
    }
    render(){
        return(
            <>
                <Header/>
                <div className='container top-adj'>
                    <div className='card col-10 col-lg-6 m-auto border-top-green'>
                        <div className='card-header reg-btn mt-1'><h3 className='fs-2'>Sign Up</h3></div>
                        <div className='card-body'>
                            <div className='row g-2'>
                                
                                <div>
                                    <label htmlFor="name" className="font-cstm">Name</label>
                                    <input type="text" className='form-control' id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                                </div>
                                <div>
                                    <i className='bi bi-envelope'></i>
                                    <label className='font-cstm margin' htmlFor="email">Email</label>
                                    <input type="text" className='form-control' id="email" name="email" value={this.state.email} onChange={this.handleChange}required/>
                                </div>
                                <div>
                                    <i className='bi bi-telephone'></i>
                                    <label className='font-cstm margin' htmlFor="phone">Phone</label>
                                    <input type="text" className='form-control' id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}required/>
                                </div>
                                <div>
                                    <label className='font-cstm' htmlFor="password">Password</label><i className='bi bi-eye-slash eye-adj' id="eye" onClick={this.togpass}></i>
                                    <input type="password" className='form-control' id="password" name="password" value={this.state.password} onChange={this.handleChange}required/>
                                </div>

                                <div className='col mt-4'>
                                    <button className='btn btn-outline-primary fw-bold' onClick={this.handleSubmit}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register
