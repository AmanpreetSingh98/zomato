import React,{Component} from 'react';
import Header from '../Header';
import './PlaceOrder.css';
 
const menuUrl = "https://zomatoabc.herokuapp.com/menuitem";
const placeOrder = "https://zomatoabc.herokuapp.com/placeorder";

class PlaceOrder extends Component {
    constructor(props){
        super(props)

        this.state = {
            id:Math.floor(Math.random()*10000),
            rest_name:this.props.match.params.restName,
            name:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[0]:'',
            phone:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[2]:'',
            email:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[1]:'',
            cost:0,
            address:'',
            menuItems:''

        }
    }

    handleSubmit = () => {
        var obj = this.state;
        obj.details = sessionStorage.getItem('menu');
        delete obj.menuItems;
        fetch(placeOrder,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        // .then(this.props.history.push('/viewBooking'))
        .then(console.log('goto Payment'))
        
    }
    renderItems = (data) => {
        if(data){
            return data.map((item, index) => {
                return(
                    <div className='col-6 col-md-3'>
                        <div className='card' key={index}>
                            <img className='card-img-top selected-img' src={item.img} alt={item.name}/>
                            <div className='card-body h-adj'>
                                <p className='card-text'>{item.name}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        if(localStorage.getItem('ltk') == null){
            this.props.history.push('/login')
        }
        return(
            <>
                <Header/>
                <div className='container top-adj col-md-10 col-lg-8 col-xl-8 col-xxl-6'>
                    <div className='card body-primary bg-success'>
                        <div className='card-header bg-success'><h3 className='text-light kabrio-font'>Place Order</h3></div>
                        <div className='card-body cstm-body'>
                            <form action="https://paytm-online.herokuapp.com/paynow" class="row g-2" method="POST">
                                
                                <div>
                                    <label className="font-cstm margin" htmlFor="name">Name</label>
                                    <input type="text" className='form-control' id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                                </div>
                                <div>
                                    <label className='font-cstm margin' htmlFor="email">Email</label>
                                    <input type="text" className='form-control' id="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                                </div>
                                <div>
                                    <label className='font-cstm margin' htmlFor="phone">Phone</label>
                                    <input type="text" className='form-control' id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} required/>
                                </div>
                                <div>
                                    <label className='font-cstm margin' htmlFor="address">Address</label>
                                    <input type="text" className='form-control' id="address" name="address" value={this.state.address} onChange={this.handleChange} required/>
                                </div>
                                <input className='form-control' type="hidden" name="cost" value={this.state.cost}/>
                                <input className='form-control' type="hidden" name="id" value={this.state.id}/>
                                <input className='form-control' type="hidden" name="rest_name" value={this.state.rest_name}/>

                                <div>
                                    <button className='btn btn-outline-success mt-4' type="submit" onClick={this.handleSubmit}>PlaceOrder</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className='border border-success selected my-3'>
                        <h4 className='card-header'>Items Selected</h4>
                        <div className='row g-2 py-3'>
                            {this.renderItems(this.state.menuItems)}
                        </div>
                        <hr/>
                        <div className='cost-btn'>
                            Total Cost: <b>{this.state.cost}</b>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    componentDidMount(){
        let menuItems = sessionStorage.getItem('menu');
        let menuIds = [];
        menuItems.split(',').map((item) => {
            menuIds.push(parseInt(item))
            return 'ok'
        })
        fetch(menuUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(menuIds)
        })
        .then((res) => res.json())
        .then((data) => {
            let menuDetails = [];
            let totalPrice = 0;
            data.map( (item) => {
                var myObj = {}
                totalPrice = totalPrice + parseInt(item.menu_price)
                myObj.name = item.menu_name
                myObj.img= item.menu_image
                menuDetails.push(myObj);
                return 'ok'
            })
            this.setState({cost:totalPrice,menuItems:menuDetails})
        })
    }
}

export default PlaceOrder
