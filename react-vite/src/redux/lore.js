const GET_MARBLE = "lore/grab";
const ADD_MARBLE = "lore/add"
const REMOVE_MARBLE = "lore/remove"

const oneMarble = (marble) => {
	return {
		type: GET_MARBLE,
		payload: marble,
	};
};

const addMarble = (marble) => {
	return {
		type: ADD_MARBLE,
		payload: marble,
	};
};



export const getMarble = (id) => async (dispatch) => {
	const res = await fetch(`/api/lore/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(oneMarble(data));
	} else {
		const err = await res.json();
		return err;
	}
};

export const postMarble = (id, marble) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}/lore`, {
		method: "POST",
		body: marble,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(addMarble(data));
	} else {
		const err = await res.json();
		return err.errors;
	}
};

export default function loreReducer(state = {}, action) {
	switch (action.type) {
		case GET_MARBLE: {
			const newState = { ...state };
			newState[action.payload.id] = action.payload;
			return newState;
		}
        case ADD_MARBLE : {
            const  newState = {...state, [action.payload.id]: action.payload}
            return newState;
        }
		default:
			return state;
	}
}
