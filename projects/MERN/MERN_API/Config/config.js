database= require('./database');
config={
	port: 4242,
	hostname: 'localhost',
	key: 'ramdon_key',
	database: database,
	app: null,
	uploadPath: '/public/uploads/',
	dirname: __dirname.split("/Config")[0],
	ObjectId: require('mongoose').Types.ObjectId,
	express: require('express'),
	initApp: function(){
		/*
		*--------------------------------
		*	MIDDLEWARE INITIALIZATION
		*--------------------------------
		*/
		
		// Cross-origin resource sharing
		var cors = require('cors');
		// Cookie parser to save cookies 
		const cookieParser= require('cookie-parser');
		// Manage user session
		const session = require('express-session');
		// Add new routes to router
		const router= require('../Router/router');
		// bodyParser to get post data from request
		const bodyParser = require('body-parser');
		// SocketIO to create websocket between server-client
		// TODO: add functions to send messages 
		const http = require('http');
		const socketIo = require("socket.io");

		this.app= this.express();
		this.app.use(cors({
			//Only localhost access TODO: access for everyone
			origin: ['http://localhost:3000'],
			methods:["POST", "PUT", "OPTIONS", "DELETE", "GET"],
			credentials: true
		}));
		this.app.use(this.express.json());
		this.app.use(this.express.urlencoded({extended:true}));
		//this.app.use(bodyParser());
		

		// middleware to save session
		this.app.use(cookieParser());
		this.app.use(session({
			cookie: {
				path    : '/',
				httpOnly: false,
				maxAge  : 24*60*60*10
			},
			secret: 'amijosmios',
			resave: false,
			saveUninitialized: true
		}))
		this.app.use(router);
		let port = this.port;
		this.app.listen(port, function () {
			console.log('App listening on '+ port);
		});
		return this.app;
	}
}

module.exports=config;