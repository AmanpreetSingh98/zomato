import React, { Component } from 'react';
import axios from 'axios';

const locationUrl = "https://zomatoabc.herokuapp.com/location";
const Resturl = "https://zomatoabc.herokuapp.com/restaurants";

class StateRest extends Component {
    constructor(){
        super()

        this.state = {
            States:''
        }
    }

    renderStates = (data) => {
        if(data)
        return data.map((item) => {
            return(
                <option key={item._id} value={item.state_id}>
                    {item.state}
                </option>
            )
        })
    }

    showChange = (event) => {
        let state_id = event.target.value;
        axios.get(`${Resturl}/${state_id}`)
        .then((res) => {this.props.RestPerState(res.data)})
    }

    render(){
        return(
            <div id="citylist">
                <select className='form-select' onChange={this.showChange}>
                    <option hidden>Select State</option>
                    {this.renderStates(this.state.States)}
                </select>
            </div>
        )
    }
    componentDidMount(){
        axios.get(locationUrl)
        .then((res) => {
            this.setState({States:res.data})
        })
    }
}

export default StateRest;