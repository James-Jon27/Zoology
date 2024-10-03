import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
		<ul
			className="navbar" style={{ display: "flex", justifyContent: "space-between", listStyle: "none", padding: "0", margin: "0"}}>
			<li>
				<NavLink to="/">
					<img src="./zoology-removebg-preview.png" style={{ color: "white", width: "100px", height: "100px" }} />
				</NavLink>
			</li>
      <h1 style={{margin: "0", cursor:"default", fontSize: "3.5rem"}}>Zoology</h1>
			<li>
				<ProfileButton />
			</li>
		</ul>
	);
}

export default Navigation;
