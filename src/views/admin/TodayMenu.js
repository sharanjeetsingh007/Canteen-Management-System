import React, { Component } from 'react'
import Cards from 'react-credit-cards';
import moment from 'moment';
import {
    CButton,
    CCol,
    CBadge,
    CJumbotron,
    CRow,
    CImg,
    CHeaderNav,
    CHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CDataTable,
    CFormGroup,
    CInput,
    CInputRadio,
    CLink,
    CLabel,
    CDropdownToggle
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { Redirect } from 'react-router-dom';

import ProductsDataService from '../../services/products.service';
import OrdersDataService from '../../services/orders.service';
import WalletsDataService from '../../services/wallets.service';

import { 
    addProductToCart, 
    getCartCount, 
    removeAllProductFromCart, 
    getCartItem,
    getTotalPrice,
    getCartsToString,
    removeProductFromCart
} from '../../common';

import { getUser } from '../../common';

class TodayMenu extends Component
{
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.refreshCartCount = this.refreshCartCount.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            cartcount: getCartCount(),
            carts: [],
            totalPrice: 0,
            showCart: false,
            showPayment: false,
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            isPayPal: false,
            isCreditCard: false,
        };

        this.unsubscribe = undefined;
    }



    refreshCartCount() {
        this.setState({
            cartcount: getCartCount()
        });
    }

    componentDidMount() {
        this.unsubscribe = ProductsDataService.getAll()
        .orderBy("trending", "desc")
        .onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let products = [];
        items.forEach(item => {
            let id = item.id;
            let data = item.data();
            products.push({
                id: id,
                category: data.category,
                name: data.name,
                price: data.price,
                imgurl: data.imgurl,
                description: data.description,
                trending: data.trending
            });
        });

        this.setState({
            products: products
        });
    }

    refreshList() {
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(product, index) {
        this.setState({
            currentProduct: product,
            currentIndex: index,
        });
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    render() 
    {
        const user = getUser();
        if (!user)
        {
            return (<Redirect to="/login" />);
        }

        return (
            <>
            <CHeader withSubheader>  
                <CHeaderNav className="px-3">
                    <CButton
                        onClick={()=>{ 
                            this.setState({
                                showCart: true,
                                carts: getCartItem(),
                                totalPrice: getTotalPrice()
                            });
                    }}>
                        <CIcon name="cil-cart" size="2xl" /><CBadge shape="pill" color="info" >{this.state.cartcount}</CBadge>                                
                    </CButton>
                </CHeaderNav>
            </CHeader>
            
            <CJumbotron className="background-main">
                <div className="container-fluid text-center">
                    <h1 className="display-x text-white hero-h1">Canteen</h1>
                    <p className="text-white">We are closed for the moment, but we will still deliver food at your place!</p>
                    <CButton className="menu-background" size="lg">View Today's Menu</CButton>
                </div>
            </CJumbotron>
            {this.state.products.map((data, id) => {
                return (   
                    <CRow key={id} style={{justifyContent:"center", alignItems:"center"}}>
                        <CCol xl={8}>
                            <div className="item row align-items-center">
                                <div className="col-sm-2 pr-5">
                                    {data.imgurl && <img className="product-img" src={data.imgurl} alt="" />}
                                </div>
                                <div className="details col-sm-10">
                                    <div className="item__header">
                                        <h3 className="item__title">{data.name}({data.category})</h3>
                                        {data.trending === true && 
                                            <CBadge color="danger">Trending</CBadge>
                                        }
                                        <span className="item__dots"></span>
                                        <span className="item__price">${data.price}</span>
                                    </div>
                                    <p className="item__description">{data.description}</p>
                                    <CButton className="btn btn-sm btn-outline-primary my-cart-btn" onClick={(e) => {
                                                    addProductToCart(data.id, data.name, data.price, data.imgurl);
                                                    this.setState({
                                                        cartcount: getCartCount()
                                                    });
                                                }}>Add to cart</CButton>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                );
            })}
            
            
            <CModal show={this.state.showCart} onClose={() => this.setState({
                                showCart: !this.state.showCart
                            })} color="info">
                <CModalHeader closeButton>
                    <CModalTitle>My Cart</CModalTitle>
                </CModalHeader>
                <CModalBody>
                     <CDataTable items={this.state.carts}
                        fields={['imgurl', { key: 'name', _classes: 'font-weight-bold' }, 'price', 'count', 'total', '']}
                        hover striped clickableRows
                        scopedSlots = {{
                            'imgurl': (item) => (
                                <td>{
                                    item.imgurl !== "" &&
                                    <div className="cart-img">
                                        <CImg src={item.imgurl} className="cart-img" />
                                    </div>
                                }</td>
                            ),
                            
                            'price': (item) => (
                                <td>
                                    ${item.price}
                                </td>
                            ),
                            
                            'total': (item) => (
                                <td>
                                    ${item.total}
                                </td>
                            ),

                            '': (item) => (
                                <td>
                                    <CButton color='danger' style={{height:36}, {padding:2}} onClick={(e) => {
                                                    removeProductFromCart(item.pid);
                                                    console.log(item.pid);
                                                    this.setState({
                                                        showCart: true,
                                                        carts: getCartItem(),
                                                        totalPrice: getTotalPrice(),
                                                        cartcount: getCartCount()
                                                    });
                                                }}>
                                        <small>Remove</small>
                                    </CButton>
                                </td>
                            ),
                        }}
                    />
                    <CRow>
                        <CCol xl={12}>
                            <h5>Total Price: ${this.state.totalPrice}</h5>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => this.setState({
                                showCart: false
                            })}>
                        Close
                    </CButton>
                    { getCartCount() > 0 &&
                        <CButton color="info" onClick={() => {
                                    this.setState({
                                        showCart: false,
                                        showPayment: true
                                    });
                                }}>
                            Checkout
                        </CButton>
                    }
                </CModalFooter>
            </CModal>
            
            <CModal show={this.state.showPayment} size="lg"
                    onClose={() => this.setState({
                        showPayment: !this.state.showPayment
                    })} 
                    color="info">
                <CModalHeader closeButton>
                    <CModalTitle>Payment</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup style={{margin: 10}}>
                    <CRow>
                        <CFormGroup variant="checkbox"  style={{margin: 10}}>
                            <CInputRadio className="form-check-input" id="creditcard" 
                                    name="payment" value="creditcart"
                                    onChange={(e) => {
                                        if(e.target.checked)
                                        {
                                            this.setState({
                                                isPayPal: false,
                                                isCreditCard: true
                                            });
                                        }
                                    }}
                                    />
                            <CLabel variant="checkbox" htmlFor="radio">Credit Card</CLabel>
                        </CFormGroup>
                    </CRow>
                    <CRow>
                    <CCol xs="10" sm="6">
                        <Cards cvc={ this.state.cvc }
                                expiry={this.state.expiry}
                                focused={this.state.focus}
                                name={this.state.name}
                                number={this.state.number}
                        />
                    </CCol>
                    <CCol xs="10" sm="6">
                        <CRow>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CInput id="number" name="number" placeholder="Card Number" required 
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                    <CLabel color="gray">E.g.: 49..., 51..., 36..., 37...</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CInput id="name" name="name" placeholder="Name" required
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="7">
                                <CFormGroup>
                                    <CInput id="expiry" name="expiry" placeholder="Valid Thru" required 
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="5">
                                <CFormGroup>
                                    <CInput id="cvc" name="cvc" placeholder="CVC" required
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCol>
                    </CRow>
                    <CRow>
                        <CFormGroup variant="checkbox"  style={{margin: 10}}>
                            <CInputRadio className="form-check-input" id="paypal" 
                                name="payment" value="paypal" 
                                onChange={(e) => {
                                    if(e.target.checked)
                                        {
                                            this.setState({
                                                isPayPal: true,
                                                isCreditCard: false
                                            });
                                        }
                                }}
                                />
                            <CLabel variant="checkbox" htmlFor="radio">PayPal</CLabel>
                        </CFormGroup>
                    </CRow>
                    </CFormGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => this.setState({
                                showPayment: false
                            })}>
                        Close
                    </CButton>

                    {this.state.isCreditCard && !this.state.isPayPal &&
                        <CButton color="info" onClick={() => {
                                    this.setState({
                                        showCart: false,
                                        showPayment: false
                                    });
                                    
                                    OrdersDataService.create({
                                        uid: user.uid,
                                        username: user.displayName,
                                        date: moment().format("YYYY-MM-DD hh:mm:ss"),
                                        status: 'pending',
                                        total: getTotalPrice(),
                                        order: getCartsToString()
                                    });

                                    var totalP = getTotalPrice();
                                    WalletsDataService.getAll()
                                    .where('uid', '==', user.uid).get()
                                    .then(function(querySnapshot) {
                                        querySnapshot.forEach(function(doc) {
                                            console.log(doc.id, " => ", doc.data());
                                            var item = doc.data();
                                            item.total -= totalP;
                                            console.log(item);
                                            WalletsDataService.update(doc.id, item); 
                                        });
                                    })
                                    .catch(function(error) {
                                        console.log("Error getting documents: ", error);
                                    });

                                    removeAllProductFromCart();
                                    this.refreshCartCount();
                                }}>
                            Pay
                        </CButton>
                    }
                    {!this.state.isCreditCard && this.state.isPayPal &&
                        <CLink 
                            href='https://www.paypal.com'
                            rel="noreferrer noopener" 
                            target="_blank" 
                            className="card-header-action"  
                        >
                            <CButton color="info" onClick={() => {
                                        this.setState({
                                            showCart: false,
                                            showPayment: false
                                        });

                                        removeAllProductFromCart();
                                        this.setState({
                                            cartcount: getCartCount()
                                        });
                                    }}>
                                PayPal
                            </CButton>
                        </CLink>
                    }
                </CModalFooter>
            </CModal>
            </>
        )
    }
}

export default TodayMenu
