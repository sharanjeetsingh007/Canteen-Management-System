import React, { Component } from 'react';
import ProductsDataService from '../../services/products.service';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CCol,
    CRow,
    CButton,
    CImg
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../common';

class AllProducts extends Component
{
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.onRemoveProduct = this.onRemoveProduct.bind(this);
        this.onAddTrendingProduct = this.onAddTrendingProduct.bind(this);
        this.onRemoveTrendingProduct = this.onRemoveTrendingProduct.bind(this);
        this.state = {
            products: [],
            trending_products: [],
            currentProduct: null,
            currentIndex: -1
        };

        this.unsubscribe = undefined;
    }

    onRemoveTrendingProduct(product) {
        let items = [];
        let id = product.id;
        items.push({
            category: product.category,
            name: product.name,
            price: product.price,
            imgurl: product.imgurl,
            description: product.description,
            trending: false
        });
        
        ProductsDataService.update(id, items[0])
        .then(()=>
        {
            console.log("Update a product successfully!");
            this.unsubscribe = ProductsDataService.getAll()
            .orderBy("name", "asc")
            .onSnapshot(this.onDataChange);
        })
        .catch((e) => {
            console.log(e.message);
        })
    }

    onAddTrendingProduct(product) {
        let items = [];
        let id = product.id;
        items.push({
            category: product.category,
            name: product.name,
            price: product.price,
            imgurl: product.imgurl,
            description: product.description,
            trending: true
        });
        
        ProductsDataService.update(id, items[0])
        .then(()=>
        {
            console.log("Update a product successfully!");
            this.unsubscribe = ProductsDataService.getAll()
            .orderBy("name", "asc")
            .onSnapshot(this.onDataChange);
        })
        .catch((e) => {
            console.log(e.message);
        })
    }

    onRemoveProduct(pid) {
        ProductsDataService.delete(pid)
        .then(() => {
            console.log("Remove a product successfully!");
            this.unsubscribe = ProductsDataService.getAll()
            .orderBy("name", "asc")
            .onSnapshot(this.onDataChange);
        })
        .catch((e) => {

            console.log(e.message);
        })
    }

    componentDidMount() {
        this.unsubscribe = ProductsDataService.getAll()
        .orderBy("name", "asc")
        .onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let products = [];
        let trending = [];
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

            if (data.trending)
            {
                trending.push({
                    id: id,
                    category: data.category,
                    name: data.name,
                    price: data.price,
                    imgurl: data.imgurl,
                    description: data.description,
                    trending: data.trending
                });
            }
        });

        this.setState({
            products: products,
            trending_products: trending,
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

    render ()
    {
        const user = getUser();
        if (!user)
        {
            return (<Redirect to="/login" />);
        }
        return (
            <CRow>
                <CCol xl={6}>
                    <CCard>
                        <CCardHeader>
                            All Foods
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={this.state.products}
                                fields={[
                                    { key: 'name', _classes: 'font-weight-bold' },
                                    'category', 
                                    'price', 
                                    'imgurl', 
                                    'description',
                                    'action'
                                ]}
                                hover
                                striped
                                clickableRows
                                scopedSlots = {{
                                    'action':
                                        (item)=>(
                                            <td>
                                                <CButton color='danger' style={{height:36}, {width:120}} onClick={(e) => {
                                                        this.onRemoveProduct(item.id);
                                                    }}>
                                                    <small>Remove</small>
                                                </CButton>
                                                <CButton color='primary' style={{height:36}, {width:120}} onClick={(e) => {
                                                        this.onAddTrendingProduct(item);
                                                    }}>
                                                    <small>Trending</small>
                                                </CButton>
                                            </td>
                                      ),
                                      'imgurl':
                                        (item)=>(
                                            <td>
                                                {
                                                    item.imgurl !== "" &&
                                                    <div className="cart-img">
                                                        <CImg
                                                            src={item.imgurl}
                                                            className="cart-img"
                                                        />
                                                    </div>
                                                }
                                            </td>
                                        ),
                                  }}
                                />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xl={6}>
                    <CCard>
                        <CCardHeader>
                            Trending Foods
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={this.state.trending_products}
                                fields={[
                                    { key: 'name', _classes: 'font-weight-bold' },
                                    'category', 
                                    'price', 
                                    'imgurl', 
                                    'description',
                                    'action'
                                ]}
                                hover
                                striped
                                clickableRows
                                scopedSlots = {{
                                    'action':
                                      (item)=>(
                                        <td>
                                            <CButton color='danger' style={{height:36}} onClick={(e) => {
                                                    this.onRemoveTrendingProduct(item);
                                                }}>
                                                <small>Remove</small>
                                            </CButton>
                                        </td>
                                      ),
                                      'imgurl':
                                    (item)=>(
                                        <td>
                                            {
                                                item.imgurl !== "" &&
                                                <div className="cart-img">
                                                    <CImg
                                                        src={item.imgurl}
                                                        className="cart-img"
                                                    />
                                                </div>
                                            }
                                        </td>
                                    ),
                                  }}
                                />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

export default AllProducts;