import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
			thunkSignup({
				email,
				username,
				password,
				first_name: firstName,
				last_name: lastName,
			})
		);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

	return (
		<div className="sign-modal">
			{errors.server && <p className="formerr">{errors.server}</p>}
			<h2>Sign Up</h2>
			<form className="sign-form" onSubmit={handleSubmit}>
				<label>
					<input
						className="sign-input"
						type="first name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="First Name"
					/>
				</label>
				{errors.firstName && <p className="formerr">{errors.firstName}</p>}
				<label>
					<input
						className="sign-input"
						type="last name"
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						required
						placeholder="Last Name"
					/>
				</label>
				{errors.lastName && <p className="formerr">{errors.lastName}</p>}
				<label>
					<input
						className="sign-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				{errors.email && <p className="formerr">{errors.email}</p>}
				<label>
					<input
						className="sign-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				{errors.username && <p className="formerr">{errors.username}</p>}
				<label>
					<input
						className="sign-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				{errors.password && <p className="formerr">{errors.password}</p>}
				<label>
					<input
						className="sign-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				{errors.confirmPassword && <p className="formerr">{errors.confirmPassword}</p>}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
