import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

//<NavLink className="signOut" style={linkStyle} to="sign-out">Sign Out</NavLink>
const authenticatedOptions = (
	<>
		<NavLink className="signOut" style={linkStyle} to="sign-out">Sign Out</NavLink>
		<NavLink className="dashboard" style={linkStyle} to="/dashboard">Dashboard</NavLink>
		<NavLink className="changepassword" style={linkStyle} to="change-password">Change Password</NavLink>
	</>
)

const unauthenticatedOptions = (
	<>
		<NavLink className="signup" style={linkStyle} to="sign-up">Sign Up</NavLink>
		<NavLink className="signin" style={linkStyle} to="sign-in">Sign In</NavLink>
	</>
)

const alwaysOptions = (
	<>
		<NavLink className="home" style={linkStyle} to="/">Home</NavLink>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                CryptoBytes
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.fullName}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
