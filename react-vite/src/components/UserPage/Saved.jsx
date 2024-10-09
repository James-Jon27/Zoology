import { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export default function Saved({ saved }) {
	const [showMenu, setShowMenu] = useState(false);
    const {id} = useParams()
	const user = useSelector((state) => state.user[id]);
	const ulRef = useRef();

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
				<ul className={"saved-creatures"} ref={ulRef}>
					<h1>{user.username}&apos;s Saved Creatures</h1>
					{saved.length === 0 && <h1>No Creatures Saved</h1>}
					{saved.map((creature) => {
							return (
								<NavLink
									onClick={closeMenu}
									to={`/creature/${creature.id}`}
									key={creature.id}
									className="creature">
									<div className="cDetails" style={{ padding: "5px" }}>
										<h1>{creature.name}</h1>
										<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
									</div>
								</NavLink>
							);
						})}
				</ul>
			)}
		</>
	);
}
