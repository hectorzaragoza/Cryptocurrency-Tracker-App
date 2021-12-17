
// import React, { Component, Fragment } from 'react'
import React, { useState, useEffect, Fragment } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { createFollowedCoin, getFollowedCoins, deleteCoin } from "./api/coindb"


// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Dashboard from './components/Dashboard'
import EachCoin from './components/EachCoin'
import Contact from './components/Contact'
require('dotenv').config()
const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	let [coins, setCoins] = useState([])
	let [showCoin, setShowCoin] = useState([])
	let [usersSavedCoins, setUsersSavedCoins] = useState([])
	let [usersCoins, setUsersCoins] = useState([])
	let url = "http://localhost:8000"

	useEffect(() => {
		getCoins()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const getCoins = () => {
		fetch(url, {
			method: 'GET',
			credentials: 'omit',
			redirect: 'follow'
		})
			.then(response => response.json())
			.then((coinData) => {
				coinData = Object.values(coinData)
				console.log('Spam????');
				setCoins(coinData[0])
			})
			.catch(err => console.log(err))
	}

	// This Function is to POST coins to the saved collection in the database
	const addCoin = (info) => {
		createFollowedCoin(info, user)
			.then(res => {
				getFollowedCoins(user)
					.then(res => {
						res = Object.values(res.data.coins)
						console.log('res spam');
						setUsersSavedCoins(res)
					})
			})
	}

	// This Function is to DELETE coins from the saved collection in the database
	const removeCoin = (s) => {
		deleteCoin(s._id)
			.then(res => {
				getFollowedCoins(user)
					.then(res => {
						res = Object.values(res.data.coins)
						console.log('res spam');
						setUsersSavedCoins(res)
					})

			})
	}
	// TRY OUT ON CLICK FUNCTION ON ADD TO FAVORITES TO SETSTATE OF FOLLOWEDCOINS TO UPDATED COINS
	let allCoins = coins.map((c, i) => {
		return (
			<li key={i}>
				<div className="coinsFromAPI">
					<Link to={`${c.id}`}>{c.name}</Link>
					{c.symbol}
					${Number(c.priceUsd).toFixed(2)}
					<button onClick={() => addCoin(c)}>Favorite</button>
				</div>
			</li>
		)
	})

	usersCoins = usersSavedCoins.map((s, i) => {
		return (
			<li key={i}>
				<div>
					<Link to={`${s.id}`}>{s.name}</Link>
					<button onClick={() => removeCoin(s)}>Remove Coin</button>
				</div>
			</li>
		)

	})

	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}
	// Function to set show coin to the database
	const addShowCoin = (e) => {
		setShowCoin([...showCoin, e])
	}



	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/dashboard'
					element={
						<RequireAuth user={user}>
							<Dashboard
								msgAlert={msgAlert}
								usersCoins={usersCoins}
								allCoins={allCoins}
								user={user} />
						</RequireAuth>
					}
				/>
				<Route path="/dashboard/:id" element={<EachCoin coinData={coins} />}></Route>
				<Route path="/contacts" element={<Contact />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>

	)
}

export default App
