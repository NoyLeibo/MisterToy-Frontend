import { userService } from "../../services/user.service.js"

/// user
export const SET_USER = 'SET_USER'

const initialState = {
    count: 101,
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {

    switch (action.type) {
        // user
        case SET_USER:
            return { ...state, loggedInUser: action.user }
        default:
            return state
    }
}
