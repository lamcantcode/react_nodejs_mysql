import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [authState, setAuthState] = useState({
		username: "",
		id: 0,
		status: false,
	});
	//let history = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:3001/auth/auth", {
				headers: {
					accessToken: localStorage.getItem("accessToken"),
				},
			})
			.then((Respon) => {
				if (Respon.data.error) {
					setAuthState({ ...authState, status: false });
				} else {
					setAuthState({
						username: Respon.data.username,
						id: Respon.data.id,
						status: true,
					});
				}
			});
	}, []);

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState({ username: "", id: 0, status: false });
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					<div className="navbar">
						<Link to="/"> Home</Link>
						<Link to="/createpost"> Create A Post</Link>
						{!authState.status ? (
							<>
								<Link to="/login"> Login </Link>
								<Link to="/registration"> Registration </Link>
							</>
						) : (
							<button onClick={logout}>logout</button>
						)}

						<h1>{authState.username}</h1>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createpost" element={<CreatePost />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
					</Routes>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
