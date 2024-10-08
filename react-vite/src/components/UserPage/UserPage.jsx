import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../redux/user";
import { getSavedCreatures } from "../../redux/creature";
import Saved from "./Saved";
import "./UserPage.css";

export default function UserPage() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const user = useSelector((state) => state.user[id]);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchMe = async () => {
			const res = await dispatch(getUser(id));
			if (res) {
				setLoading(true);
				return;
			} else {
				await dispatch(getSavedCreatures(id));
				setLoading(true);
			}
		};

		if (!isLoading) {
			fetchMe();
		}
	}, [dispatch, id, isLoading]);

	if (!isLoading) {
		return <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Calling Zookeeper...</h1>;
	}

	if (!user && isLoading) {
		return <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Zookeeper Not Found</h1>;
	}

	const lore = Object.values(user.lore);
	const saved = Object.values(user.saved);

	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<div className="userCircle">{user.username[0]}</div>
				<div style={{ display: "flex" }}>
					<h1 style={{ fontSize: "3rem", marginTop: "0" }}>{user.username}</h1>
					<div>
						<Saved saved={saved} />
					</div>
				</div>
			</div>
			<div className="marbleContainer">
				{lore &&
					lore.map((marble) => {
						return (
							<div key={marble.id}>
								<div
									onClick={() => nav(`/creature/${marble.creatureId}`)}
									style={{ cursor: "pointer" }}
									className="marble">
									<h2>{marble.title}</h2>
									<p>{marble.story}</p>;
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
