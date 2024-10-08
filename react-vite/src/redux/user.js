const GET_USER = "user/get";

const userGrab = (user) => {
	return { type: GET_USER, payload: user };
};

export const getUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)

    if(res.ok) {
        const data = await res.json()
        dispatch(userGrab(data))
    } else {
        const err = await res.json()
        return err
    }
}

export default function userReducer(state = {}, action) {
    switch(action.type){
        case GET_USER: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        }
        default: 
            return state
    }
}