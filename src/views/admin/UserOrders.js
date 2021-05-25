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

class UserOrders extends Component
{
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.state = {
            orders: [],
            user: getUser(),
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
            
            if (data.uid === this.state.user.uid)
            {
                orders.push({
                    id: id,
                    uid: data.uid,
                    username: data.username,
                    date: data.date,
                    status: data.status,
                    total: data.total,
                    order: data.order,
                });
            }
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
                    My Orders
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={this.state.orders}
                        fields={[
                            { key: 'date', _classes: 'font-weight-bold' },
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
                                            (item.status === "cancel") && <>
                                            <CButton color='danger' style={{height:36}, {width:120}} onClick={(e) => {
                                                                    OrdersDataService.delete(item.id);
                                                                }}>
                                                <small>Remove</small>
                                            </CButton></>
                                        }
                                        {
                                            (item.status === "pending") && <>
                                            <CButton color='danger' style={{height:36}, {width:120}} onClick={(e) => {
                                                                    OrdersDataService.delete(item.id);
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

export default UserOrders;