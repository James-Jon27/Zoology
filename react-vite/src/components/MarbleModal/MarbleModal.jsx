import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { chuckMarble, getMarble } from "../../redux/lore";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./MarbleModal.css";
import { getOneCreature } from "../../redux/creature";
import { SyncLoader } from "react-spinners";

function MarbleModal({ marbleId }) {
	const dispatch = useDispatch();
	const nav = useNavigate();
    const {id} = useParams()
	const { closeModal } = useModal();
	const sessionUser = useSelector((state) => state.session.user);
	const marble = useSelector((state) => state.lore[marbleId]);
	const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchMarble = async (marbleId) => {
			const serverRes = await dispatch(getMarble(marbleId));
			if (serverRes) {
				setErrors(serverRes)
                return errors
			} else {
				setLoading(true);
			}
		};

		if (!isLoading) {
			fetchMarble(marbleId);
		}
	}, [dispatch, isLoading, marbleId, errors]);

    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await dispatch(chuckMarble(marbleId))
        if(res){
            setErrors(res)
            return errors;
        } else {
            await dispatch(getOneCreature(id))
            closeModal()
        }
    }

	if (!isLoading || !marble) {
		return <h1 style={{ color: "white", display: "flex" }}>Collecting Marble No. ###<SyncLoader color="white"/></h1>;
	}

	return (
		<div className="marbleModal">
			<div className="marbleAuthor">
				<div id="author">
					<h1 style={{ marginTop: "5px", marginBottom: "0" }}>{marble.title}</h1>
					<h6 style={{ marginTop: "5px", marginBottom: "0", cursor: "pointer" }} onClick={() => {nav(`/user/${marble.user.id}`), closeModal()}}>By {marble.user.username}</h6>
				</div>
				<div>
					{sessionUser && sessionUser.id == marble.userId && (
						<div>
							<button
								style={{
									border: "none",
									cursor: "pointer",
									margin: "25px",
									background: "none",
									color: "#ffd899",
								}}
                                onClick={handleDelete}    
                            >
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
