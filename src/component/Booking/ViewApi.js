import React,{Component} from 'react';
import axios from 'axios';
import ViewDisplay from './ViewDisplay';
import Header from '../Header';

let mail = localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[1]:'';
const url = "https://zomatoabc.herokuapp.com/orders";
const putUrl = "https://zomatoabc.herokuapp.com/updateStatus";
const murl = `${url}?email=${mail}`

class ViewApi extends Component {
    constructor(){
        super()

        this.state = {
            orders:'',
            status:'pending'
        }
    }

    render(){
        return(
            <>
                <Header/>
                <ViewDisplay bookData={this.state.orders}/>
            </>
        )
    }
    componentDidMount(){
        if(this.props.location){
            var qparams = this.props.location.search;
            if(qparams){
                var data = {
                    "date":qparams.split('&')[2].split('=')[1],
                    "bank_status":qparams.split('&')[0].split('=')[1],
                    "bank":qparams.split('&')[3].split('=')[1],
                }
                if(data.bank_status == 'TXN_SUCCESS'){
                    localStorage.removeItem('restname')
                    localStorage.removeItem('ccount')
                }
                var id = qparams.split('&')[1].split('=')[1].split('_')[1]
                fetch(`${putUrl}/${id}`,{
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
                .then((res) => res.json())
                .then(() => {
                    this.setState({status:'Delivered'})
                })
            }
        }
        axios.get(murl)
        .then((res) => {
            this.setState({orders:res.data})
        })
    }
}

export default ViewApi;