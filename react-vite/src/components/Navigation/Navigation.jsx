import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from "../../../dist/zoology-removebg-preview.png";
import { useEffect } from "react";
import "./Navigation.css";

function Navigation() {
	useEffect(() => {
		const footy = document.createElement("script");
		footy.src = "https://chatbolt.ai/widget/4f9b703c-cd93-4051-a560-fd063ac6be57.js";
		footy.async = true;
		document.body.appendChild(footy);

		return () => {
			document.body.removeChild(footy);
		};
	}, []);

	return (
		<div>
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
				<h1 style={{ margin: "0", cursor: "default", fontSize: "5rem" }}>Zoology</h1>
				<li>
					<ProfileButton />
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
