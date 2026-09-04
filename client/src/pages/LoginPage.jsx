import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./AuthPage.css";
function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { login } = useAuth();
	const navigate = useNavigate();

	function emailChange(e) {
		const value = e.target.value.trim();
		setEmail(value);
	}
	function passChange(e) {
		const value = e.target.value.trim();
		setPassword(value);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			if (!(email && password)) {
				setError("Please fill all the fields");
				return;
			}
			const userData = await loginUser({ email, password });
			console.log(userData);
			login(userData);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	}
	return (
		<div className="auth-page">
			<div className="auth-card">
				<h1>Welcome Back</h1>
				{error && <p className="error-msg">{error}</p>}
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email </label>
					<input
						type="text"
						value={email}
						onChange={emailChange}
						name="email"
						id="email"
					/>
					<br />
					<label htmlFor="password">Password</label>
					<input
						type="password"
						value={password}
						onChange={passChange}
						name="password"
						id="password"
					/>
					<br />
					<button type="submit">Login</button>
				</form>
				<p className="auth-switch">
					Don't have an account? <Link to="/register">Register</Link>
				</p>
				<p className="auth-later">
					<Link to="/">Continue without an account →</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
