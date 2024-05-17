import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

// const TOYS_KEY = 'TOYS_KEY'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    console.log('------------');
    console.log('before api:', toyId)
    return httpService.get(BASE_URL + toyId);
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy);
    } else {
        return httpService.post(BASE_URL, toy);
    }
}

function remove(toyId) {
    return httpService.remove(BASE_URL, toyId);
}

function getDefaultFilter() {
    return { label: '', inStock: '', price: 0 }
}

function getEmptyToy() { // לתקן 
    return {
        'name': '',
        'price': 0,
        'labels': [],
        'createdAt': Date.now(),
        'inStock': true,
        'toyOwner': {
            '_id': '',
            'username': '',
        },
    }
}

function getLabels() { // נוחות בשבילי לדעת מה כל הLabels
    return (['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'])
}