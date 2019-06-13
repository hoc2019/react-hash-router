# react-hash-router
基于react的hash路由

# 使用方法
	//npm run build之后lib文件夹中的index.js文件 放入自己的项目文件中
	
	//引用该文件
	
	//Menu 和 MainLayout 是外层布局
	
	import React from 'react';
	import { Router , Route , dispatchRouter , listenPath , listenAll } from 'xxxx/index.js';
	
	listenPath('#/login', () => {
		console.info('listenPath login')
	})

	listenPath('#/abort', () => {
		console.info('listenPath abort')
	})

	listenAll((pathname) => {
		if(pathname === '#/login'){
			console.info('listenAll login')
		}
	})

	listenAll((pathname) => {
		if(pathname === '#/abort'){
			console.info('listenAll abort')
		}
	})

	const Routers = [
		{ path : '#/login' , menu : 'login' , component : () => Login({ bread : '#/login' }) },
		{ path : '#/abort' , menu : 'abort' , component : <Abort bread = { '#/abort' }/> },
	]

	function Menu({ routers }){
		return(
			<div>
				{ routers && routers.map((item, index) => {
					let { path , menu , component } = item;
					return(
						<div key = { path } style = {{ cursor : 'pointer' }} onClick = {() => dispatchRouter({ path , query : { id : 1 , name : 2 } })}><a>{ menu }</a></div>
					)
				}) }
			</div>
		)
	}

	function MainLayout({ children }){
		return(
			<div>
				{ children }
			</div>
		)
	}
	class EasyRouter extends React.Component{
		render() {
			return(
				<Router>
					<Menu routers = { Routers }/>
					<MainLayout>
						{ Routers && Routers.map((item, index) => (<Route path = { item.path } key = { index } component = { item.component }/>)) }
					</MainLayout>
				</Router>
			)
		}
	}