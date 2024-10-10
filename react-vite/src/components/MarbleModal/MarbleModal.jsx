import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { chuckMarble, getMarble } from "../../redux/lore";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { MdEditSquare, MdDelete, MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { getOneCreature } from "../../redux/creature";
import { SyncLoader } from "react-spinners";
import "./MarbleModal.css";

function MarbleModal({ marbleId }) {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { id } = useParams();
	const { closeModal } = useModal();
	const sessionUser = useSelector((state) => state.session.user);
	const marble = useSelector((state) => state.lore[marbleId]);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		const fetchMarble = async (marbleId) => {
			const serverRes = await dispatch(getMarble(marbleId));
			if (serverRes) {
				setErrors(serverRes);
				return errors;
			} else {
				setLoading(true);
			}
		};

		if (!isLoading) {
			fetchMarble(marbleId);
		}
	}, [dispatch, isLoading, marbleId, errors]);

	const handleDelete = async (e) => {
		e.preventDefault();

		const res = await dispatch(chuckMarble(marbleId));
		if (res) {
			setErrors(res);
			return errors;
		} else {
			await dispatch(getOneCreature(id));
			closeModal();
		}
	};

	const handleClickAway = () => {
		if (confirmDelete) {
			setConfirmDelete(false);
		}
	};

	const deleteSafety = (bool) => {
		if (!bool) {
			return (
				<div>
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "25px",
							background: "none",
							color: "#c3c9cd",
						}}
						onClick={(e) => {
							e.preventDefault(), setConfirmDelete(true);
						}}>
						<MdDelete style={{ width: "50px", height: "50px" }} />
					</button>
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "25px",
							background: "none",
							color: "#c3c9cd",
						}}
						onClick={(e) => {
							e.preventDefault(), nav(`/lore/${marble.id}`), closeModal();
						}}>
						<MdEditSquare style={{ width: "50px", height: "50px" }} />
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "25px",
							background: "none",
							color: "#c3c9cd",
						}}
						onClick={handleDelete}>
						<MdOutlineCheckCircle style={{ width: "50px", height: "50px" }} />
					</button>
					<button
						style={{
							border: "none",
							cursor: "pointer",
							margin: "25px",
							background: "none",
							color: "#c3c9cd",
						}}
						onClick={(e) => {
							e.preventDefault(), setConfirmDelete(false);
						}}>
						<MdOutlineCancel style={{ width: "50px", height: "50px" }} />
					</button>
				</div>
			);
		}
	};

	if (!isLoading || !marble) {
		return (
			<h1 style={{ color: "white", display: "flex" }}>
				Collecting Marble No. ###
				<SyncLoader color="white" />
			</h1>
		);
	}

	return (
		<div className="marbleModal" onClick={handleClickAway}>
			<div className="marbleAuthor">
				<div id="author">
					<h1 style={{ marginTop: "5px", marginBottom: "0" }}>{marble.title}</h1>
					<h6
						style={{ marginTop: "5px", marginBottom: "0", cursor: "pointer" }}
						onClick={() => {
							nav(`/user/${marble.user.id}`), closeModal();
						}}>
						By {marble.user.username}
					</h6>
				</div>
				<div>{sessionUser && sessionUser.id == marble.userId && deleteSafety(confirmDelete)}</div>
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
						color: "#c3c9cd",
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
