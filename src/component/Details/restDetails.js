import React,{Component,Fragment} from 'react';
import Header from '../Header';
import './Details.css';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuDisplay from './menuDisplay';

const url = "https://zomatoabc.herokuapp.com/restaurant";
const menuUrl = "https://zomatoabc.herokuapp.com/menu";

class Details extends Component {
    constructor(){
        super()

        this.state={
            details:'',
            menuList:'',
            userItem:''
        }
    }

    
    addToCart = (data) => {
        sessionStorage.setItem('menu', data);
        this.setState({userItem:data})
    }

    proceed = () => {
        var item = localStorage.getItem('ccount')
        if(item == 0){
            alert('Add items')
        }
        else{
            localStorage.setItem('restname',this.state.details.restaurant_name)
            this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`)
        }
        
    }

    getImage = (details) => {
        if(details){
            var a = Object.values(details.image_gallery);
            return a.filter((item, index) => index < 2).map((item, index) => {
                return(
                    <div className="carousel-item" key={index}>
                        <img src={item} className="d-block w-100 carousel-ih" alt="..."/>
                    </div>
                )
            })
        }
    }

    render(){
        
        var {details} = this.state;
        
        return(
            <>  
                <Header/>
                <div id="mar-top">
                    <div className='container'>
                        <div className='wrapper mb-5'>
                            <div className='rest-img rounded-3 border'>
                                <img className='restimg' src={details.restaurant_thumb}></img>
                            </div>
                            <div className='rest-text'>
                                <div className='fw-normal fs-2'>{details.restaurant_name}</div>
                                <div className='text-muted fs-5'>{details.address}</div>
                                <hr className='border border-3'/>
                                <div className='fs-6 mt-1 text-success'>Open now</div>
                                <p><b>₹ </b><strong className='display-6 fw-normal text-danger'>{details.cost}</strong> <strike>₹{`${details.cost+50}`}</strike> </p>
                                <span className='badge rounded-pill bg-success rating-box'> {details.average_rating} 
                                <i className='bi bi-star-fill text-warning mx-2'></i></span>
                                <span className='badge rounded-pill bg-light text-dark border border-secondary mx-2'>{details.rating_text}</span>
                                <div className='ship-box'>
                                    <figure className="figure">
                                        <img src="/Images/shipping.png" className="figure-img img-fluid rounded ship" alt="..."/>
                                        <figcaption className="figure-caption text-center text-success">Free</figcaption>
                                    </figure>
                                    <figure className="figure">
                                        <img src="/Images/contactless.png" className="figure-img img-fluid rounded ship mx-4" alt="..."/>
                                        <figcaption className="figure-caption text-center text-success">Contactless</figcaption>
                                    </figure>
                                    <figure className="figure">
                                        <img src="/Images/hygienic.png" className="figure-img img-fluid rounded ship" alt="..."/>
                                        <figcaption className="figure-caption text-center text-success">Hygienic</figcaption>
                                    </figure> 
                                </div>
                                <button className='btn btn-primary checkout' onClick={this.proceed}>Checkout</button>
                            </div>
                        </div>
                        <Tabs>
                            <TabList>
                                <Tab><i className='bi bi-images text-primary'></i> Image Gallery</Tab>
                                <Tab><i className='bi bi-telephone text-primary'></i> Contact</Tab>
                                <Tab><i className='bi bi-journal-text text-primary'></i> Menu</Tab>
                            </TabList>

                            <TabPanel>
                                <div className='resImg'><i className='bi bi-image mx-1'/>Images</div>
                                <div id="bars" className="carousel slide mt-5 carousel-h" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#bars" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#bars" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#bars" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={details.restaurant_thumb} className="d-block w-100 carousel-ih" alt="..."/>
                                        </div>
                                        {this.getImage(details)}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#bars" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#bars" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='px-4 py-4'>
                                    <h5 className=''>Address: <i className='h6'>{details.address}</i></h5>
                                    <h5 className=''>Contact: <i className='h6'>{details.contact_number?details.contact_number:'+91 9530983754'}</i></h5>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <MenuDisplay menuData={this.state.menuList}
                                finalOrder = {(data) => {this.addToCart(data)}}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </>
        )
    }
    async componentDidMount(){
        const restId = this.props.match.params.id;
        const response = await axios.get(`${url}/${restId}`)
        const menuRes = await axios.get(`${menuUrl}/${restId}`)
        this.setState({details:response.data[0], menuList:menuRes.data})
    }
}

export default Details;
