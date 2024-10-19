import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Footer() {

	return (
		<div className="footer">
			<NavLink to="https://github.com/James-Jon27" target="_blank">
				<FaGithub size="20px" style={{ textDecoration: "none", color: "#c3c9cd" }} />
			</NavLink>
			<NavLink to="https://linkedin.com/in/james-jones-770523315" target="_blank">
				<FaLinkedin size="20px" style={{ textDecoration: "none", color: "#c3c9cd" }} />
			</NavLink>
			<NavLink to="https://github.com/James-Jon27" target="_blank">
				<BiLogoGmail size="20px" style={{ textDecoration: "none", color: "#c3c9cd" }} />
			</NavLink>
		</div>
	);
}
