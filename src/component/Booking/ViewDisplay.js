import React from "react";

const ViewDisplay = (props) => {
    
    const renderTable = ({bookData}) => {
        if(bookData){
            return bookData.map((item) => {
                return(
                    <tr key={item._id}>
                        <td>{item.id}</td>
                        <td>{item.rest_name}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.cost}</td>
                        <td>{item.date}</td>
                        <td>{item.bank}</td>
                        <td>{item.bank_status}</td>
                    </tr>
                )
            })
        }
    }
    
    return(
        <div className="top-adj-order px-4">
            <div className="card">
                <div className="card-header">
                    <p className="fs-5 fw-bold">Orders List</p>
                </div>
                <div className="card-body overflow-auto">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>OrderId</th>
                                <th>RestName</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Cost</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>BankName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(props)}
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}
export default ViewDisplay;

