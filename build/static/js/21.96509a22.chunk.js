(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[21],{647:function(e,t,r){"use strict";t.a=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:3,name:"Chetan Mohamed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:4,name:"Derick Maximinus",registered:"2018/03/01",role:"Member",status:"Pending"},{id:5,name:"Friderik D\xe1vid",registered:"2018/01/21",role:"Staff",status:"Active"},{id:6,name:"Yiorgos Avraamu",registered:"2018/01/01",role:"Member",status:"Active"},{id:7,name:"Avram Tarasios",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:8,name:"Quintin Ed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:9,name:"En\xe9as Kwadwo",registered:"2018/03/01",role:"Member",status:"Pending"},{id:10,name:"Agapetus Tade\xe1\u0161",registered:"2018/01/21",role:"Staff",status:"Active"},{id:11,name:"Carwyn Fachtna",registered:"2018/01/01",role:"Member",status:"Active"},{id:12,name:"Nehemiah Tatius",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:13,name:"Ebbe Gemariah",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:14,name:"Eustorgios Amulius",registered:"2018/03/01",role:"Member",status:"Pending"},{id:15,name:"Leopold G\xe1sp\xe1r",registered:"2018/01/21",role:"Staff",status:"Active"},{id:16,name:"Pompeius Ren\xe9",registered:"2018/01/01",role:"Member",status:"Active"},{id:17,name:"Pa\u0109jo Jadon",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:18,name:"Micheal Mercurius",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:19,name:"Ganesha Dubhghall",registered:"2018/03/01",role:"Member",status:"Pending"},{id:20,name:"Hiroto \u0160imun",registered:"2018/01/21",role:"Staff",status:"Active"},{id:21,name:"Vishnu Serghei",registered:"2018/01/01",role:"Member",status:"Active"},{id:22,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:23,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:42,name:"Ford Prefect",registered:"2001/05/25",role:"Alien",status:"Don't panic!"}]},684:function(e,t,r){"use strict";r.r(t);var s=r(164),a=r(1),i=r(20),n=r(627),d=r(647),c=r(17),u=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}};t.default=function(){var e=Object(i.g)(),t=Object(i.h)().search.match(/page=([0-9]+)/,""),r=Number(t&&t[1]?t[1]:1),o=Object(a.useState)(r),m=Object(s.a)(o,2),l=m[0],g=m[1];return Object(a.useEffect)((function(){r!==l&&g(r)}),[r,l]),Object(c.jsx)(n.Q,{children:Object(c.jsx)(n.l,{xl:6,children:Object(c.jsxs)(n.g,{children:[Object(c.jsxs)(n.k,{children:["Users",Object(c.jsx)("small",{className:"text-muted",children:" example"})]}),Object(c.jsxs)(n.h,{children:[Object(c.jsx)(n.o,{items:d.a,fields:[{key:"name",_classes:"font-weight-bold"},"registered","role","status"],hover:!0,striped:!0,itemsPerPage:5,activePage:l,clickableRows:!0,onRowClick:function(t){return e.push("/users/".concat(t.id))},scopedSlots:{status:function(e){return Object(c.jsx)("td",{children:Object(c.jsx)(n.a,{color:u(e.status),children:e.status})})}}}),Object(c.jsx)(n.O,{activePage:l,onActivePageChange:function(t){r!==t&&e.push("/users?page=".concat(t))},pages:5,doubleArrows:!1,align:"center"})]})]})})})}}}]);
//# sourceMappingURL=21.96509a22.chunk.js.map