/*
**********************************************************
*   Main Router, include here the new routers you create *
**********************************************************
*/
const router=require('express').Router();

//-- Router for Login/Register
const AuthRouter = require('./AuthRouter');
router.use(AuthRouter);
//-- Router for User related routes
const UserRouter = require('./UserRouter');
router.use(UserRouter);
//-- Router for Post related routes
const PostRouter = require('./PostRouter');
router.use(PostRouter);
//-- Router for Product related routes
const ProductRouter = require('./ProductRouter');
router.use(ProductRouter);
//-- Router for Category related routes
const CategoryRouter = require('./CategoryRouter');
router.use(CategoryRouter);
//-- Router for Order related routes
const OrderRouter = require('./OrderRouter');
router.use(OrderRouter);
//-- Router for readme
const ReadmeRouter = require('./ReadmeRouter');
router.use(ReadmeRouter);

module.exports=router;