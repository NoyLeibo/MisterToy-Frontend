import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
// import { func } from 'prop-types'

import { loadToys, setFilterBy, setIsLoading } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { NavLink, useNavigate } from 'react-router-dom'


export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const navigate = useNavigate()

    useEffect(() => {
        loadToys()
            .catch(() => {
                console.log('toys problem | no toys')
                navigate('/')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onEditToy(toyId) {
        navigate(`/toy/${toyId}`)
    }

    // function onRemoveToy(toyId) {
    //     removeToyOptimistic(toyId)
    //         .then(() => {
    //             showSuccessMsg('Toy removed')
    //         })
    //         .catch(err => {
    //             console.log('Cannot remove Toy', err)
    //         })
    // }

    function onAddToy() {
        navigate('/toy/add')
        //     const ToyToSave = toyService.getEmptyToy()
        //     saveToy(ToyToSave)
        //         .then((savedToy) => {
        //             console.log('savedToy:', savedToy)
        //             showSuccessMsg(`Toy added (vendor: ${savedToy.vendor})`)
        //             // dispatch({ type: ADD_TOY, toy: savedToy })
        //         })
        //         .catch(err => {
        //             console.log('Cannot add toy', err)
        //             showErrorMsg('Cannot add toy')
        //         })
    }

    // if (!toys.length) {
    //     onSetFilter = useRef(utilService.debounce(onSetFilter))
    //     console.log(toyService.getDefaultFilter());
    //     onSetFilter.current(toyService.getDefaultFilter())
    //     console.log('break point');
    // }
    if (!toys.length) {
        setIsLoading()
    }

    return (
        <main>
            {isLoading && (
                <div className="loading-container">
                    <div className="loader"></div>
                </div>
            )}
            {!isLoading && toys.length && (
                <>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onAddToy={onAddToy} />
                    <ToyList toys={toys} onEditToy={onEditToy} />
                </>
            )}
        </main>
    );
}