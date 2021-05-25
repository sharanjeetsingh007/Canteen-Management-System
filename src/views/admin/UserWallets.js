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

class UserWallets extends Component
{
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.state = {
            wallets: [],
            user: getUser()
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
            
            if (data.uid === this.state.user.uid)
            {
                wallets.push({
                    id: id,
                    uid: data.uid,
                    username: data.username,
                    total: data.total,
                    payment: data.payment,
                });
            }
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
                    My Wallets
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={this.state.wallets}
                        fields={[
                            { key: 'total', _classes: 'font-weight-bold' },
                            'payment', 
                        ]}
                        hover
                        striped
                        clickableRows
                        scopedSlots = {{
                            'total':
                                (item) => (
                                    <td>${item.total}</td>
                                ),
                            }}
                        />
                </CCardBody>
            </CCard>
        )
    }
}

export default UserWallets;