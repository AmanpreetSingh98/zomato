import React,{Component} from 'react';

class MenuDisplay extends Component{

    orderId = [];

    veg = (type) => {
        if(type === 'vegetarian'){
            return(
                <img className="veg-img my-2" src="/Images/veg.png" alt="veg"/>
            )
        }
        else{
            return(
                <img className='veg-img my-2' src="/Images/nonveg.png" alt="nonveg"/>
            )
        }
    }

    addItem = (id) => {
        document.getElementById(id).style.background="#c2c2c2";
        this.orderId.push(`${id}`)
        localStorage.setItem('ccount',this.orderId.length)
        this.props.finalOrder(this.orderId)
    }
    
    removeItem = (id) => {
        document.getElementById(id).style.background="#00000014"
        this.orderId.splice(this.orderId.indexOf(id.toString()),1)
        localStorage.setItem('ccount',this.orderId.length)
        this.props.finalOrder(this.orderId)
    }

    // renderCart = (orders) => {
    //     if(orders){
    //         return orders.map((item,index) => {
    //             return (
    //                 <b key={index}>{item}, </b>
    //             )
    //         })
    //     }
    // }

    scrollMenu = () => {
        if(window.innerWidth < 990){
            window.scrollTo(0,780)
        }
        else{
            window.scrollTo(0,450)
        }
    }
    
    renderMenu = ({menuData}) => {
        if(menuData){
            return menuData.map((item) => {
                return(
                    <div key={item.menu_id} id={item.menu_id} className='menu-sbox my-2'>
                        
                        <div className='menu-img-box rounded-3 border'>
                            <img className='menu-img' src={item.menu_image} alt={item.menu_name}/>
                        </div>
                        <div className='fs-5 lg-hide'>{item.menu_name}</div>
                        <div className='ml'>
                            <div className='fs-5 sm-show'>{item.menu_name}</div>
                            {this.veg(item.menu_type)}
                            <div className='text-success fw-bold price'>₹{item.menu_price}</div>
                        </div>
                        <div className='menu-btn'>
                            <button className='btn btn-primary text-light rounded-pill' 
                            onClick={ () => {this.addItem(item.menu_id)} }><i className='bi bi-plus-circle text-light'></i> Add</button>

                            <button className='btn btn-danger ml rounded-circle' 
                            onClick={ () => {this.removeItem(item.menu_id)}}><i className='bi bi-trash'></i></button>
                        </div>
                    </div> 
                )
            })
        }
    }
    render(){
        return(
            <div className='menu-box px-5'>
                <h2 className='my-4'><i className='bi bi-clipboard'></i>Menu List</h2>
                {/* {this.renderCart(this.orderId)} */}
                {this.renderMenu(this.props)}
                {this.scrollMenu()}
            </div>
        )
    }
}
export default MenuDisplay;