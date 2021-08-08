import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [openOrders, setOpenOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [closedOrders, setClosedOrders] = useState([]);
    const [returnedOrders, setReturnedOrders] = useState([]);

    const getOpenOrders = (data) => {

        const open = data.filter(obj1 => {
            return obj1.orderStatus === 'open'
        });

        setOpenOrders([...open]);
        console.log("1", open)
        console.log("1", openOrders)
    }

    const getCancelledOrders = (data) => {

        const cancelled = data.filter(obj1 => {
            return obj1.orderStatus === 'cancelled'
        });

        setCancelledOrders([...cancelled]);
        console.log("2", closedOrders)
    }

    const getClosedOrders = (data) => {
        console.log("3")
        const closed = data.filter(obj1 => {
            return obj1.orderStatus === 'closed'
        });

        setClosedOrders([...closed]);
    }

    const getReturnedOrders = (data) => {
        console.log("4")
        const returned = data.filter(obj1 => {
            return obj1.orderStatus === 'returned'
        });

        setReturnedOrders([...returned]);
    }

    const getData = async () => {
        console.log("useEffects ran")
        const { data } = await api.get(`/myorders`);
        console.log("0", data)

        setOrders(data);
        console.log("0", orders)
        getOpenOrders(data);
        getCancelledOrders(data);
        getClosedOrders(data);
        getReturnedOrders(data);
    }



    useEffect(() => {
        //const loginStatus = sessionStorage.getItem('loginStatus');
        getData();
    }, []);

    return (
        <div className="container mt-5">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="open-tab" data-bs-toggle="tab" data-bs-target="#open" type="button" role="tab" aria-controls="open" aria-selected="true">Open Orders</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="closed-tab" data-bs-toggle="tab" data-bs-target="#closed" type="button" role="tab" aria-controls="closed" aria-selected="false">Closed Orders</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="cancelled-tab" data-bs-toggle="tab" data-bs-target="#cancelled" type="button" role="tab" aria-controls="cancelled" aria-selected="false">Cancelled Orders</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="returned-tab" data-bs-toggle="tab" data-bs-target="#returned" type="button" role="tab" aria-controls="returned" aria-selected="false">Returned Orders</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="open-tab">{openOrders.length > 0 ? openOrders.map(order => <OpenOrders order={order} key={order.orderid} />) : <NoOrders />}</div>
                <div className="tab-pane fade" id="closed" role="tabpanel" aria-labelledby="closed-tab">{closedOrders.length > 0 ? closedOrders.map(order => <ClosedOrders order={order} key={order.orderid} />) : <NoOrders />}</div>
                <div className="tab-pane fade" id="cancelled" role="tabpanel" aria-labelledby="cancelled-tab">{cancelledOrders.length > 0 ? cancelledOrders.map(order => <CancelledOrders order={order} key={order.orderid} />) : <NoOrders />}</div>
                <div className="tab-pane fade" id="returned" role="tabpanel" aria-labelledby="returned-tab">{returnedOrders.length > 0 ? returnedOrders.map(order => <ReturnedOrders order={order} key={order.orderid} />) : <NoOrders />}</div>
            </div>
        </div>
    )
}

export default MyOrders;

const NoOrders = () => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Products</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}

const OpenOrders = ({ order }) => {

    // const [isCancelled, setIsCancelled] = useState(false);

    // useEffect(() => {
    //     api.patch(`/myorders/${order.orderid}`, { orderStatus: "cancelled" }).then((res) => {
    //         setIsBookingConfirmed(true);
    //     }).catch(err => console.log(err));
    // })

    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Products</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td>{order.orderid}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.cardType}</td>
                    <td>{order.product}</td>
                    <td><button className="btn btn-danger" >Cancel</button></td>
                </tr>
            </tbody>
        </table>
    )
}

const CancelledOrders = ({ order }) => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Products</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td>{order.orderid}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.cardType}</td>
                    <td>{order.product}</td>
                </tr>
            </tbody>
        </table>
    )
}

const ClosedOrders = ({ order }) => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Products</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td>{order.orderid}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.cardType}</td>
                    <td>{order.product}</td>
                    <td><button className="btn btn-info">Review</button></td>
                </tr>
            </tbody>
        </table>
    )
}

const ReturnedOrders = ({ order }) => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Products</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td>{order.orderid}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.cardType}</td>
                    <td>{order.product}</td>
                </tr>
            </tbody>
        </table>
    )
}