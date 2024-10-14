import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			thunkLogin({
				email,
				password,
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}
	};

	const demoLogin = async (e) => {
    e.preventDefault();

		const serverResponse = await dispatch(
			thunkLogin({
				email: "demo@aa.io",
				password: "password",
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}
	};

	return (
		<div className="login-modal">
			<h1>Log In</h1>
			<form className="login-form" onSubmit={handleSubmit}>
				<label>
					<input
						className="login-input"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p className="formerr">{errors.email}</p>}
				<label>
					<input
						className="login-input"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p className="formerr">{errors.password}</p>}
				<div>
					<button style={{ marginRight: "5px", width: "100px" }} type="submit">
						Log In
					</button>
					<button style={{ marginLeft: "5px" }} onClick={(e) => demoLogin(e)}>
						Demo User
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginFormModal;
