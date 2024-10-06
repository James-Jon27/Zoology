import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMarble } from "../../redux/lore";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./MarbleModal.css";

function MarbleModal({ id }) {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { closeModal } = useModal();
	const sessionUser = useSelector((state) => state.session.user);
	const marble = useSelector((state) => state.lore[id]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const fetchMarble = async (id) => {
			const serverRes = await dispatch(getMarble(id));
			if (serverRes) {
				console.log(serverRes);
			} else {
				setLoading(true);
			}
		};

		if (!isLoading) {
			fetchMarble(id);
		}
	});

	if (!isLoading || !marble) {
		return <h1 style={{ color: "white" }}>Collecting Marble No. ###...</h1>;
	}

	return (
		<div className="marbleModal">
			<div className="marbleAuthor">
				<div id="author">
					<h1 style={{ marginTop: "5px", marginBottom: "0" }}>{marble.title}</h1>
					<h6 style={{ marginTop: "5px", marginBottom: "0" }}>By {marble.user.username}</h6>
				</div>
				<div>
					{sessionUser.id == marble.userId && (
						<div>
							<button
								style={{
									border: "none",
									cursor: "pointer",
									margin: "25px",
									background: "none",
									color: "#ffd899",
								}}>
								<MdDelete style={{ width: "50px", height: "50px" }} />
							</button>
							<button
								style={{
									border: "none",
									cursor: "pointer",
									margin: "25px",
									background: "none",
									color: "#ffd899",
								}}
								onClick={(e) => {
									e.preventDefault(), nav(`/lore/${marble.id}`), closeModal();
								}}>
								<MdEditSquare style={{ width: "50px", height: "50px" }} />
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="marbleStory">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marble.story}</p>
			</div>
			{sessionUser && (
				<button
					className="cButton"
					style={{
						fontSize: "2rem",
						cursor: "pointer",
						background: "none",
						border: "none",
						color: "#ffc466",
						width: "100%",
					}}
					onClick={(e) => {
						e.preventDefault();
						nav(`creature/${marble.creatureId}/lore`);
						closeModal();
					}}>
					Add Some Lore
				</button>
			)}
		</div>
	);
}

export default MarbleModal;
