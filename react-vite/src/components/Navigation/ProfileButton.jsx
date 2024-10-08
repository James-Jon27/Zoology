import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((store) => store.session.user);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(thunkLogout());
		closeMenu();
	};

	return (
		<>
			<button style={{ background: "none", border: "none", width: "100px" }} onClick={toggleMenu}>
				<FaUserCircle style={{ height: "40px", width: "40px", cursor: "pointer" }} />
			</button>
			{showMenu && (
				<ul className={"profile-dropdown"} ref={ulRef}>
					{user ? (
						<div className="userIn">
							<li className="profModal">{user.username}</li>
							<li className="profModal">{user.email}</li>
							<li className="profModal">
								<button
									style={{
										background: "none",
										border: "solid 1px white",
										color: "white",
										fontWeight: "bold",
										cursor: "pointer",
									}}
									onClick={logout}>
									Log Out
								</button>
							</li>
						</div>
					) : (
						<div className="userIn">
							<li className="profModal" style={{ cursor: "pointer" }}>
								<OpenModalMenuItem
									itemText="Log In"
									onItemClick={closeMenu}
									modalComponent={<LoginFormModal />}
								/>
							</li>
							<li className="profModal" style={{ cursor: "pointer" }}>
								<OpenModalMenuItem
									itemText="Sign Up"
									onItemClick={closeMenu}
									modalComponent={<SignupFormModal />}
								/>
							</li>
						</div>
					)}
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
