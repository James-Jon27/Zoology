import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from "./zoology-removebg-preview.png";
import "./Navigation.css";

function Navigation() {
  return (
		<ul
			className="navbar"
			style={{
				display: "flex",
				justifyContent: "space-between",
				listStyle: "none",
				padding: "0",
				margin: "0",
			}}>
			<li>
				<NavLink to="/">
					<img
						src={logo}
						alt="Zoology Logo"
						style={{ color: "white", width: "100px", height: "100px" }}
					/>
				</NavLink>
			</li>
			<h1 style={{ margin: "0", cursor: "default", fontSize: "5rem"}}>
				Zoology
			</h1>
			<li>
				<ProfileButton />
			</li>
		</ul>
	);
}

export default Navigation;
