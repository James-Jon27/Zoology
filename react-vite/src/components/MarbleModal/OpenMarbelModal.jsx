import { useModal } from "../../context/Modal";
import "./MarbleModal.css"

function OpenMarbleModal({
	modalComponent, // component to render inside the modal
	marble,
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return (
		<div onClick={onClick} style={{ cursor: "pointer" }} className="marble">
			<h2>{marble.title}</h2>
			<p>{marble.story}</p>;
		</div>
	);
}

export default OpenMarbleModal;
