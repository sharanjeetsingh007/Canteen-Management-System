(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[14],{634:function(e,t,n){"use strict";var c=n(157),r=n(158),a=n(630).c.collection("/products"),i=function(){function e(){Object(c.a)(this,e)}return Object(r.a)(e,[{key:"getAll",value:function(){return a}},{key:"create",value:function(e){return a.add(e)}},{key:"update",value:function(e,t){return a.doc(e).update(t)}},{key:"delete",value:function(e){return a.doc(e).delete()}}]),e}();t.a=new i},687:function(e,t,n){"use strict";n.r(t);var c=n(157),r=n(158),a=n(161),i=n(163),o=n(162),s=n(1),l=n(627),u=n(634),d=n(20),h=n(629),j=n(17),g=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).onChangeCategory=r.onChangeCategory.bind(Object(a.a)(r)),r.onChangeName=r.onChangeName.bind(Object(a.a)(r)),r.onChangePrice=r.onChangePrice.bind(Object(a.a)(r)),r.onChangeImgUrl=r.onChangeImgUrl.bind(Object(a.a)(r)),r.onChangeDescription=r.onChangeDescription.bind(Object(a.a)(r)),r.onAddProduct=r.onAddProduct.bind(Object(a.a)(r)),r.state={category:"",name:"",price:"",imgurl:"",description:"",submitted:!1,error:null},r.state.category="pizza",r}return Object(r.a)(n,[{key:"onChangeCategory",value:function(e){console.log(e.target.value),this.setState({category:e.target.value,error:null})}},{key:"onChangeName",value:function(e){this.setState({name:e.target.value,error:null})}},{key:"onChangePrice",value:function(e){this.setState({price:e.target.value,error:null})}},{key:"onChangeImgUrl",value:function(e){this.setState({imgurl:e.target.value,error:null})}},{key:"onChangeDescription",value:function(e){this.setState({description:e.target.value,error:null})}},{key:"onAddProduct",value:function(){var e=this,t={category:this.state.category,name:this.state.name,price:this.state.price,imgurl:this.state.imgurl,description:this.state.description,trending:!1};u.a.create(t).then((function(){e.setState({error:"Create new product successfully!"}),e.setState({submitted:!0}),console.log("Create new product successfully!")})).catch((function(t){e.setState({error:t.message}),e.setState({submitted:!1}),console.log(t.message)}))}},{key:"render",value:function(){var e=this;return Object(h.g)()?Object(j.jsx)(l.m,{children:Object(j.jsx)(l.Q,{className:"justify-content-center",children:Object(j.jsx)(l.l,{md:"8",children:Object(j.jsxs)(l.g,{className:"p-4",children:[Object(j.jsx)(l.h,{children:Object(j.jsxs)(l.v,{children:[Object(j.jsx)("h1",{children:"Add Product"}),Object(j.jsx)("p",{className:"text-muted",children:"Please add new product"}),Object(j.jsxs)(l.w,{children:[Object(j.jsx)(l.H,{htmlFor:"category",children:"Category: "}),Object(j.jsxs)(l.R,{custom:!0,name:"category",id:"category",onChange:function(t){e.onChangeCategory(t)},children:[Object(j.jsx)("option",{value:"pizza",children:"Pizza"}),Object(j.jsx)("option",{value:"drink",children:"Drink"}),Object(j.jsx)("option",{value:"dessert",children:"Dessert"})]})]}),Object(j.jsxs)(l.w,{children:[Object(j.jsx)(l.H,{htmlFor:"product-name",children:"Name: "}),Object(j.jsx)(l.A,{type:"text",placeholder:"",name:"productname",onChange:function(t){e.onChangeName(t)}})]}),Object(j.jsxs)(l.w,{children:[Object(j.jsx)(l.H,{htmlFor:"price",children:"Price: "}),Object(j.jsx)(l.A,{type:"text",placeholder:"",name:"price",onChange:function(t){e.onChangePrice(t)}})]}),Object(j.jsxs)(l.w,{children:[Object(j.jsx)(l.H,{htmlFor:"image-url",children:"Image Url: "}),Object(j.jsx)(l.A,{type:"text",placeholder:"",name:"imgurl",onChange:function(t){e.onChangeImgUrl(t)}})]}),Object(j.jsxs)(l.w,{children:[Object(j.jsx)(l.H,{htmlFor:"description",children:"Description: "}),Object(j.jsx)(l.A,{type:"text",placeholder:"",name:"description",onChange:function(t){e.onChangeDescription(t)}})]}),Object(j.jsx)(l.Q,{children:Object(j.jsx)(l.l,{sm:"12",children:Object(j.jsx)(l.d,{color:"primary",className:"px-4",onClick:function(){e.onAddProduct()},children:"Add"})})})]})}),this.state.error&&Object(j.jsx)(l.i,{className:"p-4",children:Object(j.jsxs)(l.Q,{children:[!0===this.state.submitted&&Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("small",{style:{color:"blue"},children:this.state.error})}),!1===this.state.submitted&&Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("small",{style:{color:"red"},children:this.state.error})})]})})]})})})}):Object(j.jsx)(d.a,{to:"/login"})}}]),n}(s.Component);t.default=g}}]);
//# sourceMappingURL=14.cf6c78bf.chunk.js.map