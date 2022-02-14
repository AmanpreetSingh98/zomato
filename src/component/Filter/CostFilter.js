import React, { Component } from 'react';
import axios from 'axios';

const url ="https://zomatoabc.herokuapp.com/filter";

class CostFilter extends Component {

    costFilter = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let cost = (event.target.value).split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let filterUrl;
        if(event.target.value == ""){
            filterUrl = `${url}/${mealId}`
        }
        else{
            filterUrl = `${url}/${mealId}?lcost=${lcost}&hcost=${hcost}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerCost(res.data)})
    }

    render(){
        return(
            <div id="sort">                                     
                <p className="leftheading">Cost</p>
                <div id="testbk" onChange={this.costFilter}>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="c1" name="cost" value=""/>
                        <label className='form-check-label' htmlFor="c1">All</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="c2" name="cost" value="100-300"/>
                        <label className='form-check-label' htmlFor="c2">100-300</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="c3" name="cost" value="301-500"/>
                        <label className='form-check-label' htmlFor="c3">301-500</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="c4" name="cost" value="501-700"/>
                        <label className='form-check-label' htmlFor="c4">501-700</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="c5" name="cost" value="701-1500"/>
                        <label className='form-check-label' htmlFor="c5">701-1500</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default CostFilter;