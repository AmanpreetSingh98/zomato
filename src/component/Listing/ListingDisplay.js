import React from 'react';
import {Link} from 'react-router-dom';
import ReactStars from 'react-stars';

const ListingDisplay = (props) => {

    const sup = () => {
        window.scrollTo(0,0)
    }
    const renderData = ({restData}) => {

        if(restData){
            if(restData.length>0){
                return restData.map((item) => {
                    return(
                        <div className="tiles" key={item.restaurant_id}>                                         
                            <div className="part1">
                                <div className="respic">
                                    <Link to={`/details/${item.restaurant_id}`} onClick={sup}>
                                        <img className="images" src={item.restaurant_thumb} alt={item.restaurant_name}/>
                                    </Link>
                                </div>
                                <div className="tiletext">
                                    <Link to={`/details/${item.restaurant_id}`} onClick={sup}>
                                        <p className="text1 text-dark">{item.restaurant_name}</p>
                                    </Link>
                                    <p className="text3">{item.address}</p>
                                    <h6 className="cost"><span className='text-danger'>₹{item.cost}</span></h6>
                                    <span className='star'>
                                        <
                                            ReactStars
                                            edit={false}
                                            count={5}
                                            value={item.average_rating}
                                            size={24}
                                            color={'rgb(255 230 15)'} 
                                        />
                                    </span>
                                        
                                        <span className="badge rounded-pill bg-success rating">{item.average_rating}</span>
                                        <div id="meals">
                                            <div className='fs-5 res-badge1'>
                                                <span className='badge bg-info'>{item.mealTypes[0].mealtype_name}</span>
                                                <span className='badge bg-success ml'>{item.mealTypes[1].mealtype_name}</span>
                                            </div>
                                            <div className='fs-5 res-badge2'>
                                                <span className='badge bg-warning'>{item.cuisines[0].cuisine_name}</span>
                                                <span className='badge bg-pink ml'>{item.cuisines[1].cuisine_name}</span>
                                            </div>
                                        </div>
                                                                        
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else{
                return(
                    <div className='d-flex flex-column align-items-center w-auto'>
                        <img className='w-50' src='https://i.ibb.co/n8VkzfL/097297f8e21d501ba45d7ce437ed77bd.gif' alt="No data"/>
                        <div className=''>Oops! No Match</div>
                    </div>
                )
            }
        }

        else{
            return(
                <div>
                    <img src="/Images/loader.gif" alt="loading..."></img>
                </div>
            )
        }
    }
    return(
        <>
            {renderData(props)}
        </>
    )
}
export default ListingDisplay;