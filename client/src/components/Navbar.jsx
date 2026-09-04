import { Link, NavLink, useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
const Navbar = () => {
	const { user, logout } = useAuth();
	const [menuOpen, setMenuOpen] = useState(false);

	const navigate = useNavigate();

	const handleLogout = (e) => {
		logout();
		navigate("/");
	};

	return (
		<nav className="navbar">
			<Link to="/">
				<span className="brand">FrRecipe</span>
			</Link>
			<ul id="nav-desktop">
					<li>
						<NavLink to="/">Recipes</NavLink>
					</li>
					{user ? (
						<>
							<li>
								<NavLink to="/my-kitchen">Kitchen</NavLink>
							</li>
							<button onClick={handleLogout}>Logout</button>
						</>
					) : (
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
					)}
				</ul>
				<button className="hamburger" onClick={()=> setMenuOpen(!menuOpen)}>{ menuOpen ? "X" : "☰" }</button>
				{menuOpen && <>
				<div className="nav-backdrop" onClick={()=> setMenuOpen(false)}></div>
				<ul className="nav-mobile" onClick={() => setMenuOpen(false)}>
					
					<li>
					<NavLink to="/">Recipes</NavLink>
				</li>
				{user ? (
					<>
						<li>
							<NavLink to="/my-kitchen">Kitchen</NavLink>
						</li>
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
				)}
				</ul>
				</>}
		</nav>
	);
};

export default Navbar;
