import React,{Component} from 'react';
import './QuickSearch.css';
import QuickDisplay from './QuickDisplay';

const url = "https://zomatoabc.herokuapp.com/mealtypes";

class QuickSearch extends Component {
    constructor() {
        super()

        this.state = {
            mealType:''
        }
    }

    render(){
        return(
            <>
                <div id="bg-fix-img" className='mb-5'>
                    <div id="quick-head">
                        Discover Restaurants By Type
                    </div>
                </div>
                <QuickDisplay quickData={this.state.mealType}/>  
            </>
        )
    }
    componentDidMount(){
        fetch(url,{method:'GET'})
        .then((res) => res.json()
        .then((data) => {
            this.setState({mealType:data})
        }))
    }
}

export default QuickSearch