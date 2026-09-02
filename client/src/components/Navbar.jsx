import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = (e) => {
		logout();
		navigate("/");
	};

	if (user) {
		return (
			<nav className="navbar">
			<Link to="/"><span className="brand">FrRecipe</span></Link>
				<ul>
					<li>
						<NavLink to="/">Recipes</NavLink>
					</li>
					<li>
						<NavLink to="/my-kitchen">Kitchen</NavLink>
					</li>
					<button onClick={handleLogout}>Logout</button>
				</ul>
			</nav>
		);
	}
	return (
		<nav className="navbar">
			<Link to="/"><span className="brand">FrRecipe</span></Link>
			<ul>
				<li>
					<NavLink to="/">Recipes</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
