import React, { Component } from 'react';
import axios from 'axios';

const url ="https://zomatoabc.herokuapp.com/filter";

class CuisineFilter extends Component {

    cuisineFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let filterUrl;
        if(cuisineId == ""){
            filterUrl = `${url}/${mealId}`
        }
        else{
            filterUrl = `${url}/${mealId}?cuisine=${cuisineId}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerCuisine(res.data)})
    }

    render(){
        return(
            <div id="checkbox">                                     
                <p className="leftheading">Cuisine</p>
                <div id="testbk" onChange={this.cuisineFilter}>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r1" name="cuisine" value=""/>
                        <label className='form-check-label' htmlFor="r1">All</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r2" name="cuisine" value="1"/>
                        <label className='form-check-label' htmlFor="r2">North Indian</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r3" name="cuisine" value="2"/>
                        <label className='form-check-label' htmlFor="r3">South Indian</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r4" name="cuisine" value="3"/>
                        <label className='form-check-label' htmlFor="r4">Chinese</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r5" name="cuisine" value="4"/>
                        <label className='form-check-label' htmlFor="r5">Fast Food</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id="r6" name="cuisine" value="5"/>
                        <label className='form-check-label' htmlFor="r6">Street Food</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default CuisineFilter;