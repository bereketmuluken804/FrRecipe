const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export async function loginUser(credentials) {
	const response = await fetch(`${BASE_URL}/api/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}

export async function registerUser(userData) {
	const response = await fetch(`${BASE_URL}/api/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}
