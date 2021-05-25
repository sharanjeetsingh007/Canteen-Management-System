import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CSelect,
  CFormGroup,
  CLabel,
  CRow,
  CCardFooter
} from '@coreui/react'

import ProductsDataService from '../../services/products.service';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../common';

class AddProduct extends Component
{
    constructor(props) {
        super(props);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImgUrl = this.onChangeImgUrl.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);

        this.state = {
            category: "",
            name: "",
            price: "",
            imgurl: "",
            description: "",
            submitted: false,
            error: null
        };

        this.state.category = "pizza";
    }

    onChangeCategory(e) {
        console.log(e.target.value);
        this.setState({
            category: e.target.value,
            error: null
        });
    }
    
    onChangeName(e) {
        this.setState({
            name: e.target.value,
            error: null
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
            error: null
        });
    }
    
    onChangeImgUrl(e) {
        this.setState({
            imgurl: e.target.value,
            error: null
        });
    }
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
            error: null
        });
    }

    onAddProduct() {
        let data = {
            category: this.state.category,
            name: this.state.name,
            price: this.state.price,
            imgurl: this.state.imgurl,
            description: this.state.description,
            trending: false,
        };

        ProductsDataService.create(data)
        .then(() => {
            this.setState({
                error: "Create new product successfully!"
            });

            
            this.setState({
                submitted: true
            });

            console.log("Create new product successfully!");
        })
        .catch((e) => {
            this.setState({
                error: e.message
            });

            this.setState({
                submitted: false
            });

            console.log(e.message);
        })
    }

    render() {
        const user = getUser();
        if (!user)
        {
            return (<Redirect to="/login" />);
        }

        return (
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="8">
                    <CCard className="p-4">
                        <CCardBody>
                            <CForm>
                                <h1>Add Product</h1>
                                <p className="text-muted">Please add new product</p>
                                <CFormGroup>
                                    <CLabel htmlFor="category">Category: </CLabel>
                                    <CSelect custom name="category" id="category" onChange={(e) => {
                                            this.onChangeCategory(e);
                                        }}>
                                        <option value="pizza">Pizza</option>
                                        <option value="pasta">Pasta</option>
                                        <option value="rice">Rice</option>
                                        <option value="drink">Drink</option>
                                        <option value="dessert">Dessert</option>
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="product-name">Name: </CLabel>
                                    <CInput type="text" placeholder="" name="productname" 
                                        onChange={(e) => {
                                            this.onChangeName(e);
                                        }}/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="price">Price: </CLabel>
                                    <CInput type="text" placeholder="" name="price" 
                                        onChange={(e) => {
                                            this.onChangePrice(e);
                                        }}/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="image-url">Image Url: </CLabel>
                                    <CInput type="text" placeholder="" name="imgurl" 
                                        onChange={(e) => {
                                            this.onChangeImgUrl(e);
                                        }} />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="description">Description: </CLabel>
                                    <CInput type="text" placeholder="" name="description" 
                                        onChange={(e) => {
                                            this.onChangeDescription(e);
                                        }} />
                                </CFormGroup>
                                <CRow>
                                    <CCol sm="12">
                                        <CButton color="primary" className="px-4" 
                                            onClick={() => {
                                                this.onAddProduct();
                                            }} >Add</CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        { this.state.error && 
                            <CCardFooter className="p-4">
                                <CRow>
                                    { this.state.submitted === true && <>
                                        <small style={{color: 'blue'}}>{this.state.error}</small>
                                    </>}
                                    { this.state.submitted === false && <>
                                        <small style={{color: 'red'}}>{this.state.error}</small>
                                    </>}
                                </CRow>
                            </CCardFooter>
                        }
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
        );
    }
    
}

export default AddProduct;