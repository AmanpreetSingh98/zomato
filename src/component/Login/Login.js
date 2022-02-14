import React,{Component} from 'react';
import Header from '../Header';
import './Login.css'
 
const loginurl = "https://loginoutlive.herokuapp.com/api/auth/login";

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email:'',
            password:'',
            message:''
        }
    }

    handleSubmit = () => {
        console.log(this.state)
        fetch(loginurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false){
                this.setState({message:data.token});
            }
            else{
                localStorage.setItem('ltk',data.token)
                this.props.history.push('/')
            }
        })
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
        console.log(this.state)
        return(
            <>
                <Header/>
                <div className='container top-adj adj'>
                    <div className='card col-10 col-lg-6 m-auto border-top-green'>
                        <div className='card-header'><h3>Login</h3></div>
                        <div className='card-body'>
                            <div className='row'>
                                <h4 className="text-danger">{this.state.message}</h4>
                                <div>
                                    <label className='font-cstm' htmlFor="email">Email</label>
                                    <input type="text" className='form-control' id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="yourid@gmail.com" required/>
                                </div>
                                <div>
                                    <label className='font-cstm mt-4' htmlFor="password">Password</label> <i className='bi bi-eye-slash eye-adj' id="eye" onClick={this.togpass}></i>
                                    <input type="password" className='form-control' id="password" name="password" value={this.state.password} onChange={this.handleChange}required/>
                                </div>
                                <div className='col mt-3'>
                                    <button className='btn btn-success w-25 fw-bold' onClick={this.handleSubmit}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;
