import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import "./AuthPage.css";

function RegisterPage() {
	const [formData, SetFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState(null);
	const { login } = useAuth();
	const navigate = useNavigate();

	function handleChange(e) {
		const inputName = e.target.name;
		const value = e.target.value;

		SetFormData({ ...formData, [inputName]: value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const { name, email, password, confirmPassword } = formData;
		if (!(email && name && confirmPassword && password)) {
			setError("Please fill all the fields");
			return;
		}
		if (password !== confirmPassword) {
			setError("Password mismatch");
			return;
		}

		try {
			const userData = await registerUser({ name, email, password });
			login(userData);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	}
	return (
		<div className="auth-page">
			<div className="auth-card">
				<h1>Join Us</h1>
				{error && <p className="error-msg">{error}</p>}
				<form onSubmit={handleSubmit}>
					<label htmlFor="">Name </label>
					<input
						type="text"
						onChange={handleChange}
						value={formData.name}
						id="name"
						name="name"
					/>
					<br />
					<label htmlFor="">Email</label>
					<input
						type="text"
						onChange={handleChange}
						value={formData.email}
						id="email"
						name="email"
					/>
					<br />
					<label htmlFor="">Password</label>
					<input
						type="password"
						onChange={handleChange}
						value={formData.password}
						id="password"
						name="password"
					/>
					<br />
					<label htmlFor="">Confirm Password</label>
					<input
						type="password"
						onChange={handleChange}
						value={formData.confirmPassword}
						id="confirmPassword"
						name="confirmPassword"
					/>
					<br />
					<button type="submit">Register</button>
				</form>
				<p className="auth-switch">
					Already have an account? <Link to="/login">Login</Link>
				</p>
				<p className="auth-later">
					<Link to="/">Continue without an account →</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
