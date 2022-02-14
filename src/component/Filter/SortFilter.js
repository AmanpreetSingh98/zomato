import React, { Component } from 'react';
import axios from 'axios';

const url ="https://zomatoabc.herokuapp.com/filter";

class SortFilter extends Component {

    SortFilter = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let sortId = event.target.value;
        let filterUrl;
        if(sortId == ""){
            filterUrl = `${url}/${mealId}`
        }
        else{
            filterUrl = `${url}/${mealId}?sortkey=${sortId}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerSort(res.data)})
    }

    render(){
        return(
            <div id="radio">                                     
                <p className="leftheading"><p id="sort-l">Sort Filter</p><p id="sort-s">Filter</p></p>
                <div id="testbk" onChange={this.SortFilter}>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="s1" name="cuisine" value="-1"/>
                        <label className='form-check-label' htmlFor="s1">High to Low</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="s2" name="cuisine" value="1"/>
                        <label className='form-check-label' htmlFor="s2">Low to High</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortFilter;