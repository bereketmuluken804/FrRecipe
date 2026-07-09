import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/authService";
function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null);
	const {user, login} = useAuth();
	const navigate = useNavigate();

	function emailChange(e) {
		const value = e.target.value.trim();
		setEmail(value)
	}
	function passChange(e) {
		const value = e.target.value.trim();
		setPassword(value);

	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const userData = await loginUser({email, password});
			login(userData);
			navigate('/')
		} catch(err) {
			setError(err.message);
		}
		
	}
	return (<>
		<h1>Login Page</h1>
		{error && <p>{error}</p>}
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">Email: </label>
			<input type="text" value={email} onChange={emailChange} name="email" id="email"/>
			<br />
			<label htmlFor="password">Password</label>
			<input type="text" value={password} onChange={passChange}name="password" id="password"/>
			<br />
			<button type="submit">Login</button>
		</form>
	</>);
}

export default LoginPage;
