import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import "./AuthPage.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

function RegisterPage() {
	const [formData, SetFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);
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

		setLoading(true);
		try {
			const response = await registerUser({ name, email, password });
			setSuccessMessage(response.message);
			setError(null);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-card">
				<h1>Join Us</h1>

				{error && <p className="error-msg">{error}</p>}

				{successMessage ? (
					<div className="success-state">
						<p className="success-msg">{successMessage}</p>
						<button
							className="btn-primary"
							onClick={() => navigate("/login")}
						>
							Login
						</button>
					</div>
				) : (
					<>
						<form onSubmit={handleSubmit}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								onChange={handleChange}
								value={formData.name}
								id="name"
								name="name"
								disabled={loading}
							/>
							<br />
							<label htmlFor="email">Email</label>
							<input
								type="text"
								onChange={handleChange}
								value={formData.email}
								id="email"
								name="email"
								disabled={loading}
							/>
							<br />
							<label htmlFor="password">Password</label>
							<input
								type="password"
								onChange={handleChange}
								value={formData.password}
								id="password"
								name="password"
								disabled={loading}
							/>
							<br />
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								onChange={handleChange}
								value={formData.confirmPassword}
								id="confirmPassword"
								name="confirmPassword"
								disabled={loading}
							/>
							<br />
							<button type="submit" disabled={loading}>
								{loading ? "Registering..." : "Register"}
							</button>
						</form>
						<div style={{padding: "5px" }}>
							<GoogleLoginButton />
						</div>

				<p className="auth-switch">
					Already have an account? <Link to="/login">Login</Link>
				</p>
					</>
				)}
				<p className="auth-later">
					<Link to="/">Continue without an account</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;