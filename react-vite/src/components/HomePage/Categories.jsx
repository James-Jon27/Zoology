import { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Categories() {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const nav = useNavigate();

	const toggleMenu = (e) => {
		e.stopPropagation();
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

	return (
		<>
			<button style={{ background: "none", border: "none", width: "100px" }} onClick={toggleMenu}>
				<MdArrowDropDown style={{ height: "40px", width: "40px", cursor: "pointer" }} />
			</button>
			{showMenu && (
				<ul className={"categories"} ref={ulRef}>
					<h1 style={{ margin: "0" }}>Categories</h1>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/`), closeMenu();
						}}>
						All
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/Mythological`), closeMenu();
						}}>
						Mythological
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/Creepypasta`), closeMenu();
						}}>
						Creepypasta
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/Cryptid`), closeMenu();
						}}>
						Cryptid
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/SCP`), closeMenu();
						}}>
						SCP
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/Folklore`), closeMenu();
						}}>
						Folklore
					</li>
					<li
						style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
						onClick={(e) => {
							e.preventDefault(), nav(`/Other`), closeMenu();
						}}>
						Other
					</li>
				</ul>
			)}
		</>
	);
}
