import React, { Component } from 'react';
import Header from '../Header';
import './Listing.css';
import ListingDisplay from './ListingDisplay';
import axios from 'axios';
import CuisineFilter from '../Filter/CuisineFilter';
import CostFilter from '../Filter/CostFilter';
import SortFilter from '../Filter/SortFilter';
import StateRest from '../Filter/StateRest';

const url ="https://zomatoabc.herokuapp.com/filter";

class Listing extends Component {
    constructor(){
        super()

        this.state = {
            restList:''
        }
    }

    setDataPerFilter = (data) => {
        this.setState({restList:data})
    }

    render(){
        return(
            <>
            <Header/>
            {window.scrollTo(0,0)}
            
                <div id="sec1">
                    {/* <span>Breakfast Places in Chandigarh</span> */}
                    <div id="filterdiv">                                            
                        <i className='bi bi-funnel filter'></i>
                        <span id="headingfilter" className='bi bi-funnel'>Filter</span>
                        <label className='form-label' id="location" htmlFor="list">Select Location</label>
                        <StateRest RestPerState = {(data) => {this.setDataPerFilter(data)}}/>
                        <hr/>
                            <CuisineFilter mealId={this.props.match.params.id}
                            restPerCuisine={(data) => {this.setDataPerFilter(data)}}/>
                        <hr/>
                            <CostFilter restPerCost={(data) => {this.setDataPerFilter(data)}}/>
                        <hr/>
                            <SortFilter restPerSort = {(data) => {this.setDataPerFilter(data)}}/>
                    </div>

                    <div id="rightdiv">                                            
                        <ListingDisplay restData={this.state.restList}/>
                    </div>
                </div>
            </>
        )
    }
    componentDidMount(){
        const mealId = this.props.match.params.id;
        sessionStorage.setItem('mealId',mealId)
        axios.get(`${url}/${mealId}`)
        .then((res) => {
            this.setState({restList:res.data})
        })
    }
}
export default Listing