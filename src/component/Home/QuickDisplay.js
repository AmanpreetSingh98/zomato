import React from 'react';
import {Link} from 'react-router-dom';
import './QuickDisplay.css';


const QuickDisplay = (props) => {
    
    const renderMeal = ({quickData}) => {
        if(quickData){
            return quickData.map((item) => {
                return(

                    <Link to={`/list/${item.mealtype_id}`} key={item.mealtype_id}>
                        <div className="col">
                            <div className="card">
                                <div id="bg-gradient">
                                    <img src={item.meal_image} className="card-img-top h-fix" alt={item.mealtype}/>
                                </div>
                                <div className="card-body black">
                                    <h5 className="card-title">{item.mealtype}</h5>
                                    <p className="card-text">{item.content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    }

    return(   
                <div className='container px-5'>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {renderMeal(props)}
                    </div>
                </div>   
    )
}

export default QuickDisplay