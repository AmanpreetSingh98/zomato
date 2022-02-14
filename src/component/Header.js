import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";
import { withRouter } from 'react-router-dom';

const url ="https://loginoutlive.herokuapp.com/api/auth/userInfo";

class Header extends Component {
    constructor(props){
        super()

        this.state = {
            userdata:''
        }
    }

    handleLogout = () => {
        this.setState({userdata:''})
        localStorage.removeItem('userdata')
        localStorage.removeItem('ltk')
        localStorage.removeItem('ccount')
        this.props.history.push('/')
    }

    conditionHeader = () => {
        let info = localStorage.getItem('userdata');
        if(this.state.userdata.name || info){
            let data = this.state.userdata;
            let outArray =[data.name,data.email,data.phone,data.role]
            localStorage.setItem('userdata',outArray)
            return(
                <>
                    <Link to="/" className="nav-link active"><i className='bi bi-person'/>{outArray[0]}</Link>
                    <p id="line">|</p>
                    <Link to="/" className="nav-link active" onClick={this.handleLogout}>Logout</Link>
                    <Link to={`/placeOrder/${localStorage.getItem('restname')}`} className='nav-link active'>
                        <i className='bi bi-cart3 fs-3 count'>
                            <div className='cart-icon'>{localStorage.getItem('ccount')?localStorage.getItem('ccount'):'0'}</div>
                        </i>
                    </Link>
                </>
            )
        }

        else{
            return(
                <>
                    <Link to="/login" className="nav-link active"><i className='bi bi-person'/>Login</Link>
                    <p id="line">|</p>
                    <Link to="/register" className="nav-link active"><i className='bi bi-person-plus'></i>Signup</Link>
                    <Link to={`/placeOrder/${localStorage.getItem('restname')}`} className='nav-link active cart-hfix'>
                        <i className='bi bi-cart3 fs-3 count'>
                            <div className='cart-icon'>{localStorage.getItem('ccount')?localStorage.getItem('ccount'):'0'}</div>
                        </i>
                    </Link>
                </>
            )
            
        }
    }
    changenav = () => {
        if(document.documentElement.scrollTop > 35){
            document.getElementsByClassName('navbar')[0].style.backgroundColor='black';
            document.getElementsByClassName('navbar')[0].style.paddingBottom='0px';
            document.getElementsByClassName('navbar')[0].style.paddingTop='0px';
            document.getElementsByClassName('navbar-nav')[0].style.transform='scale(0.9)';
            document.getElementById('logo-circle').style.transform='scale(0.9)';
        }
        else{
            document.getElementsByClassName('navbar')[0].style.backgroundColor='rgb(5 0 0 / 43%)';
            document.getElementsByClassName('navbar')[0].style.paddingBottom='0.5rem';
            document.getElementsByClassName('navbar')[0].style.paddingTop='0.5rem';
            document.getElementsByClassName('navbar-nav')[0].style.transform='scale(1)';
            document.getElementById('logo-circle').style.transform='scale(1)';
        }
    }

    fade = () => {
        document.getElementById("fade-screen").classList.toggle("fadeit");
        document.body.classList.toggle("scroll-on");
        document.getElementsByClassName('navbar')[0].classList.toggle("nav-white");
    }
    render(){
        return(
            <header>
                {window.onscroll=(this.changenav)}
                <nav className="navbar navbar-expand-sm navbar-dark position-fixed" style={{width:'100%'}}>
                    <div className="container">
                        <Link to="/" id="logo-circle">
                            <span className="logo-word">Z</span>
                        </Link>
                        <button className="navbar-toggler" onClick={this.fade} type="button" data-bs-toggle="collapse" data-bs-target="#navlinks">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end mt-2" id="navlinks">
                            <div className="navbar-nav">
                                {this.conditionHeader()}
                            </div>
                        </div>
                    </div>
                </nav>
                <div id="fade-screen"></div>
            </header>
    )}
    componentDidMount(){
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':localStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({userdata:data})
        })
    }
    
}

export default withRouter(Header);