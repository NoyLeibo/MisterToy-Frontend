import { toyService } from "../../services/toy.service.js"
import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials);
        store.dispatch({ type: 'SET_USER', user });
        return user;
    } catch (err) {
        console.log('user actions -> Cannot signup', err);
        throw err;
    }
}

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(user => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

export function setIsLoading() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
}