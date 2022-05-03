import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthState } = useContext(AuthContext);
	let history = useNavigate();

	const login = () => {
		const data = { username: username, password: password };
		axios.post("http://localhost:3001/auth/login", data).then((respon) => {
			if (respon.data.error) {
				alert(respon.data.error);
			} else {
				localStorage.setItem("accessToken", respon.data.token);
				setAuthState({
					username: respon.data.username,
					id: respon.data.id,
					status: true,
				});
				history("/");
			}
		});
	};
	return (
		<div className="loginContainer">
			<label>Username:</label>
			<input
				type="text"
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<label>Password:</label>
			<input
				type="password"
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<button onClick={login}> Login </button>
		</div>
	);
};

export default Login;
