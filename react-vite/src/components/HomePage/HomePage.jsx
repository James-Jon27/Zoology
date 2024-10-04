import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCreatures } from "../../redux/creature";
import "./HomePage.css";

export default function HomePage({ category }) {
	const dispatch = useDispatch();
	const creatureSelect = useSelector((state) => state.creature);
	const creatures = Object.values(creatureSelect);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			dispatch(getAllCreatures());
			setLoading(true);
		}
	}, [dispatch, setLoading, isLoading]);

	// const saveCreature = async (e) => {
	//     e.preventDefault()
	// }

	if (!isLoading) {
		return (
			<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
				Transporting to Containment Center...
			</h1>
		);
	}

	return (
		<div>
			{category ? (
				<div>
					<h1 style={{ textAlign: "center", fontSize: "3rem" }}>{category} Creatures</h1>
					{creatures &&
						creatures
							.filter((creature) => creature.category === category)
							.map((creature) => {
								return (
									<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
										<div className="cImage">
											<img src={creature.image} alt={`Image of ${creature.name}`} />
										</div>
										<div className="cDetails">
											<h1>{creature.name}</h1>
											<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
										</div>
										<div className="cWhereAbouts">
											<h3>{creature.category}</h3>
											<h3>{creature.origin}</h3>
										</div>
									</NavLink>
								);
							})}
				</div>
			) : (
				<div>
					<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
						All Creatures
					</h1>
					{creatures &&
						creatures.map((creature) => {
							return (
								<NavLink to={`/creature/${creature.id}`} key={creature.id} className="creature">
									<div className="cImage">
										<img src={creature.image} alt={`Image of ${creature.name}`} />
									</div>
									<div className="cDetails">
										<h1>{creature.name}</h1>
										<p style={{ fontSize: "1.7rem" }}>{creature.description}</p>
									</div>
									<div className="cWhereAbouts">
										<h3>{creature.category}</h3>
										<h3>{creature.origin}</h3>
									</div>
								</NavLink>
							);
						})}
				</div>
			)}
		</div>
	);
}
