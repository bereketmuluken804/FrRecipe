import { GoogleLogin } from "@react-oauth/google";
const BaseAPI = import.meta.env.VITE_API_ENDPOINT;

export default function GoogleLoginButton({}) {
	const handleSuccess = async (credentialResponse) => {
		try {
			const res = await fetch(`${BaseAPI}/api/auth/google`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					credential: credentialResponse.credential,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Authentication failed");
			}

			console.log("Login successful:", data);
		} catch (error) {
			console.error("Google Sing-In Error", error.message);
		}
	};
	const handleError = () => {
		console.error("Google Sign-In failed on frontend");
	};
	return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
