import React, { Component } from 'react';
import WalletsDataService from '../../services/wallets.service';
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

class AllWallets extends Component
{
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.state = {
            wallets: [],
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = WalletsDataService.getAll()
            .onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let wallets = [];
        items.forEach(item => {
            let id = item.id;
            let data = item.data();
            
            wallets.push({
                id: id,
                uid: data.uid,
                username: data.username,
                total: data.total,
                payment: data.payment,
            });
        });

        this.setState({
            wallets: wallets,
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
                    All Wallets
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={this.state.wallets}
                        fields={[
                            { key: 'username', _classes: 'font-weight-bold' },
                            'total', 
                            'payment', 
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
                                (item)=>(
                                    <td>
                                        <CButton color='info' style={{width:120}} onClick={(e) => {
                                                const value = window.prompt("Input the value to charge: ");
                                                if (value !== null && parseInt(value))
                                                {
                                                    WalletsDataService.update(item.id, {
                                                        uid: item.uid,
                                                        username: item.username,
                                                        total: parseInt(item.total) + parseInt(value),
                                                        payment: item.payment,
                                                    });
                                                }
                                            }}>
                                            <small>Charge</small>
                                        </CButton>
                                    </td>
                                ),
                            }}
                        />
                </CCardBody>
            </CCard>
        )
    }
}

export default AllWallets;