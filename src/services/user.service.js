import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyUser
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

function login({ username, password }) {

    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

async function signup({ username, password, fullname, isAdmin = false, score = 1000, toys = {} }) {
    const user = { username, password, fullname, isAdmin, score, toys }
    console.log('before sending to API(and then MONGO)', user);
    const newUser = await httpService.post(BASE_URL + 'signup', user)
    if (newUser) return _setLoggedinUser(newUser)
    else return Promise.reject('Invalid signup')
}

function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    return httpService.put('user/', { diff })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        isAdmin: user.isAdmin,
        score: user.score,
        toys: user.toys,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        score: 0,
        isAdmin: false,
        toys: {}
    }
}


// Test Data
// userService.signup({ username: 'muki', password: 'muki1', fullname: 'Muki Ja' })
// userService.login({ username: 'muki', password: 'muki1' })