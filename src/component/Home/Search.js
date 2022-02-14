import React,{Component} from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom';

const locationUrl = "https://zomatoabc.herokuapp.com/location"
const restUrl = "https://zomatoabc.herokuapp.com/restaurants/"

class Search extends Component {

    constructor(){
        
        super()
        
        this.state={
            locations:'',
            restaurants:''
        }
    }
    renderCity = (data) => {
        if(data){
            return data.map( (item) => {
                return(
                    <option key={item.location_id} value={item.state_id}>
                        {item.state}
                    </option>
                )
            })
        }
    }
    renderRestaurants = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option key={item.restaurant_id} value={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }
    
    handleRest = (event) => {
        fetch(`${restUrl}${event.target.value}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurants:data})
        })
    }

    handleDetails = (event) => {
        this.props.history.push(`/details/${event.target.value}`)
    }
    render(){
        {window.scrollTo(0,0)}
        return(
                <div id="bg-img">
                    
                    <div id="bts-wrapper">        {/*Brand to Search */}                                  
                        <p id="brand-name">Zomato</p> 
                        <div id="best-place">
                            Find the Best Places Near You
                        </div>
                        <div className="container mt-4">
                            <div className="row justify-content-center">

                                <div className="g-0 col-3 col-xl-2">
                                    <div className="input-group mb-4">
                                        <i className='bi bi-geo-alt-fill loc-icon input-group-text'/>
                                        <select className="form-select border-start-0 border-fix" onChange={this.handleRest}>
                                            <option hidden>select city</option>
                                            {this.renderCity(this.state.locations)}
                                        </select>
                                    </div>
                                </div>
                            
                                <div className="g-0 col-8 col-lg-6 col-xl-4">
                                    <select className="form-select border-fx" onChange={this.handleDetails}>
                                        {/* <option hidden>Select Restaurant</option> */}
                                        {this.renderRestaurants(this.state.restaurants)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
    componentDidMount(){
        fetch(locationUrl,{metod:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({locations:data})
        })
    }    
}

export default withRouter(Search);