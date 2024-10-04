const ALL_CREATURES = "creatures/all";
const ONE_CREATURE = "creature/one";

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

export const getAllCreatures = () => async (dispatch) => {
	const res = await fetch(`/api/creatures`);

	if (res.ok) {
		const data = await res.json();
		dispatch(getCreatures(data.creatures));
	} else {
		const err = await res.json();
		return err;
	}
};

export const getOneCreature = (id) => async (dispatch) => {
	const res = await fetch(`/api/creatures/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(oneCreature(data));
	} else {
		const err = await res.json();
		return err;
	}
};

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
		default:
			return state;
	}
}
