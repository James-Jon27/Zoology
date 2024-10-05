const GET_MARBLE = "lore/grab";

const oneMarble = (marble) => {
	return {
		type: GET_MARBLE,
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
        body: marble
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getMarble(data))
    } else {
        const err = await res.json()
        return err
    }
}

export default function loreReducer(state = {}, action) {
	switch (action.type) {
		case GET_MARBLE: {
			const newState = { ...state };
			newState[action.payload.id] = action.payload;
			return newState;
		}
		default:
			return state;
	}
}
