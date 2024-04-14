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
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(75, 200),
    }
}