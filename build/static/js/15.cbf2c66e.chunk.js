(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[15],{634:function(e,t,n){"use strict";var c=n(157),r=n(158),i=n(630).c.collection("/products"),o=function(){function e(){Object(c.a)(this,e)}return Object(r.a)(e,[{key:"getAll",value:function(){return i}},{key:"create",value:function(e){return i.add(e)}},{key:"update",value:function(e,t){return i.doc(e).update(t)}},{key:"delete",value:function(e){return i.doc(e).delete()}}]),e}();t.a=new o},686:function(e,t,n){"use strict";n.r(t);var c=n(157),r=n(158),i=n(161),o=n(163),s=n(162),a=n(1),d=n(634),u=n(627),l=(n(628),n(20)),g=n(629),h=n(17),m=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).refreshList=r.refreshList.bind(Object(i.a)(r)),r.setActiveProduct=r.setActiveProduct.bind(Object(i.a)(r)),r.onDataChange=r.onDataChange.bind(Object(i.a)(r)),r.onRemoveProduct=r.onRemoveProduct.bind(Object(i.a)(r)),r.onAddTrendingProduct=r.onAddTrendingProduct.bind(Object(i.a)(r)),r.onRemoveTrendingProduct=r.onRemoveTrendingProduct.bind(Object(i.a)(r)),r.state={products:[],trending_products:[],currentProduct:null,currentIndex:-1},r.unsubscribe=void 0,r}return Object(r.a)(n,[{key:"onRemoveTrendingProduct",value:function(e){var t=this,n=[],c=e.id;n.push({category:e.category,name:e.name,price:e.price,imgurl:e.imgurl,description:e.description,trending:!1}),d.a.update(c,n[0]).then((function(){console.log("Update a product successfully!"),t.unsubscribe=d.a.getAll().orderBy("name","asc").onSnapshot(t.onDataChange)})).catch((function(e){console.log(e.message)}))}},{key:"onAddTrendingProduct",value:function(e){var t=this,n=[],c=e.id;n.push({category:e.category,name:e.name,price:e.price,imgurl:e.imgurl,description:e.description,trending:!0}),d.a.update(c,n[0]).then((function(){console.log("Update a product successfully!"),t.unsubscribe=d.a.getAll().orderBy("name","asc").onSnapshot(t.onDataChange)})).catch((function(e){console.log(e.message)}))}},{key:"onRemoveProduct",value:function(e){var t=this;d.a.delete(e).then((function(){console.log("Remove a product successfully!"),t.unsubscribe=d.a.getAll().orderBy("name","asc").onSnapshot(t.onDataChange)})).catch((function(e){console.log(e.message)}))}},{key:"componentDidMount",value:function(){this.unsubscribe=d.a.getAll().orderBy("name","asc").onSnapshot(this.onDataChange)}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"onDataChange",value:function(e){var t=[],n=[];e.forEach((function(e){var c=e.id,r=e.data();t.push({id:c,category:r.category,name:r.name,price:r.price,imgurl:r.imgurl,description:r.description,trending:r.trending}),r.trending&&n.push({id:c,category:r.category,name:r.name,price:r.price,imgurl:r.imgurl,description:r.description,trending:r.trending})})),this.setState({products:t,trending_products:n})}},{key:"refreshList",value:function(){this.setState({currentProduct:null,currentIndex:-1})}},{key:"setActiveProduct",value:function(e,t){this.setState({currentProduct:e,currentIndex:t})}},{key:"render",value:function(){var e=this;return Object(g.g)()?Object(h.jsxs)(u.Q,{children:[Object(h.jsx)(u.l,{xl:6,children:Object(h.jsxs)(u.g,{children:[Object(h.jsx)(u.k,{children:"All Foods"}),Object(h.jsx)(u.h,{children:Object(h.jsx)(u.o,{items:this.state.products,fields:[{key:"name",_classes:"font-weight-bold"},"category","price","imgurl","description","action"],hover:!0,striped:!0,clickableRows:!0,scopedSlots:{action:function(t){return Object(h.jsxs)("td",{children:[Object(h.jsx)(u.d,{color:"danger",style:{width:120},onClick:function(n){e.onRemoveProduct(t.id)},children:Object(h.jsx)("small",{children:"Remove"})}),Object(h.jsx)(u.d,{color:"primary",style:{width:120},onClick:function(n){e.onAddTrendingProduct(t)},children:Object(h.jsx)("small",{children:"Trending"})})]})},imgurl:function(e){return Object(h.jsx)("td",{children:""!==e.imgurl&&Object(h.jsx)("div",{className:"cart-img",children:Object(h.jsx)(u.z,{src:e.imgurl,className:"cart-img"})})})}}})})]})}),Object(h.jsx)(u.l,{xl:6,children:Object(h.jsxs)(u.g,{children:[Object(h.jsx)(u.k,{children:"Trending Foods"}),Object(h.jsx)(u.h,{children:Object(h.jsx)(u.o,{items:this.state.trending_products,fields:[{key:"name",_classes:"font-weight-bold"},"category","price","imgurl","description","action"],hover:!0,striped:!0,clickableRows:!0,scopedSlots:{action:function(t){return Object(h.jsx)("td",{children:Object(h.jsx)(u.d,{color:"danger",style:{height:36},onClick:function(n){e.onRemoveTrendingProduct(t)},children:Object(h.jsx)("small",{children:"Remove"})})})},imgurl:function(e){return Object(h.jsx)("td",{children:""!==e.imgurl&&Object(h.jsx)("div",{className:"cart-img",children:Object(h.jsx)(u.z,{src:e.imgurl,className:"cart-img"})})})}}})})]})})]}):Object(h.jsx)(l.a,{to:"/login"})}}]),n}(a.Component);t.default=m}}]);
//# sourceMappingURL=15.cbf2c66e.chunk.js.map