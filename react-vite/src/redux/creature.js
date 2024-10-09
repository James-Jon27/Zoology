const ALL_CREATURES = "creatures/all";
const ONE_CREATURE = "creature/one";
const ADD_CREATURE = "creature/add";
const UPDATE_CREATURE = "creature/update";
const REMOVE_CREATURE = "creature/remove";

const getCreatures = (creatures) => {
	return {
		type: ALL_CREATURES,
		payload: creatures,
	};
};

const oneCreature = (creature) => {
	return {
		type: ONE_CREATURE,
		payload: creature,
	};
};

const addCreature = (creature) => {
	return {
		type: ADD_CREATURE,
		payload: creature,
	};
};

const updateCreature = (creature) => {
	return {
		type: UPDATE_CREATURE,
		payload: creature,
	};
};

const removeCreature = (creature) => {
	return {
		type: REMOVE_CREATURE,
		payload: creature,
	};
};

export const CATEGORIES = ["Mythological", "Creepypasta", "Cryptid", "SCP", "Folklore", "Other"];

export const getAllCreatures = () => async (dispatch) => {
	const res = await fetch(`/api/creatures`);

	if (res.ok) {
		const data = await res.json();
		dispatch(getCreatures(data.creatures));
	} else {
		const err = await res.json();
		return err.errors;
	}
};

export const getSavedCreatures = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}/creatures`);

	if (res.ok) {
		const data = await res.json();
		dispatch(getCreatures(data.creatures));
	} else {
		const err = await res.json();
		return err.errors;
	}
};

export const getOneCreature = (id) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(oneCreature(data));
	} else {
		const err = await res.json();
		return err.errors;
	}
};

export const addACreature = (creature) => async (dispatch) => {
	const res = await fetch(`/api/creatures`, {
		method: "POST",
		body: creature,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(addCreature(data));
		return data;
	} else {
		const err = await res.json();
		return err;
	}
};

export const updateACreature = (id, creature) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}`, {
		method: "PUT",
		body: creature,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(updateCreature(data));
		return data
	} else {
		const err = await res.json();
		return err;
	}
};

export const removeACreature = (id) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}`, {
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(removeCreature(id));
	} else {
		const err = await res.json();
		return err;
	}
};

export const saveACreature = (id) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}/save`, {method: "POST"})

	if(res.ok) {
		const data = await res.json()
		dispatch(updateCreature(data))
	}else {
		const err = await res.json()
		return err
	}
}

export const unsaveACreature = (id) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}/save`, {method: "DELETE"})

	if(res.ok) {
		const data = await res.json()
		dispatch(updateCreature(data))
	}else {
		const err = await res.json()
		return err
	}
}

export default function creaturesReducer(state = {}, action) {
	switch (action.type) {
		case ALL_CREATURES: {
			const newState = { ...action.payload, ...state };
			return newState;
		}
		case ONE_CREATURE: {
			const newState = { ...state };
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case ADD_CREATURE: {
			const newState = { ...state, [action.payload.id]: action.payload };
			return newState;
		}
		case UPDATE_CREATURE: {
			const newState = { ...state };
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case REMOVE_CREATURE: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}
		default:
			return state;
	}
}
