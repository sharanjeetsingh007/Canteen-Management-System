import React, { Component } from 'react';
import OrdersDataService from '../../services/orders.service';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CButton,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../common';

class AllOrders extends Component
{
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.state = {
            orders: [],
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = OrdersDataService.getAll()
            .orderBy("date", "desc")
            .onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let orders = [];
        let order_id = 1;
        items.forEach(item => {
            let id = item.id;
            let data = item.data();
            
            orders.push({
                id: id,
                uid: data.uid,
                username: data.username,
                date: data.date,
                status: data.status,
                total: data.total,
                order: data.order,
            });
        });

        this.setState({
            orders: orders,
        });
    }

    render ()
    {
        const user = getUser();
        if (!user)
        {
            return (<Redirect to="/login" />);
        }

        return (
            <CCard>
                <CCardHeader>
                    All Orders
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={this.state.orders}
                        fields={[
                            { key: 'username', _classes: 'font-weight-bold' },
                            'date', 
                            'status', 
                            'total', 
                            'order',
                            'action'
                        ]}
                        hover
                        striped
                        clickableRows
                        scopedSlots = {{
                            'total':
                                (item) => (
                                    <td>${item.total}</td>
                                ),
                            'action':
                                (item) => (
                                    <td>
                                        {
                                            item.status === "pending" && <>
                                            <CButton color='primary' style={{height:36}, {width:120}} onClick={(e) => {
                                                                    OrdersDataService.update(item.id, {
                                                                        uid: item.uid,
                                                                        username: item.username,
                                                                        date: item.date,
                                                                        status: "accept",
                                                                        total: item.total,
                                                                        order: item.order,
                                                                    })
                                                               }}>
                                                <small>Accept</small>
                                            </CButton>
                                            <CButton color='danger' style={{height:36}, {width:120}} onClick={(e) => {
                                                                    OrdersDataService.update(item.id, {
                                                                        uid: item.uid,
                                                                        username: item.username,
                                                                        date: item.date,
                                                                        status: "cancel",
                                                                        total: item.total,
                                                                        order: item.order,
                                                                    })
                                                                }}>
                                                <small>Cancel</small>
                                            </CButton></>
                                        }
                                    </td>
                                )
                            }}
                        />
                </CCardBody>
            </CCard>
        )
    }
}

export default AllOrders;