import React, { useEffect, useState } from 'react';
import { ChooseToyLabels } from '../cmps/ChooseToyLabels.jsx';
import { toyService } from '../services/toy.service.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function AddNewToy() {
    const [toyName, setToyName] = useState('');
    const [toyPrice, setToyPrice] = useState(0);
    const [clickedLabels, setClickedLabels] = useState([]);
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/toy')
        }
    }, [])

    function onSubmit() {
        if (!toyName) {
            alert('Please enter a toy name.');
            return;
        }
        else if (!toyPrice) {
            alert('Please enter a toy price.');
            return;
        }
        else if (+toyPrice === 0) {
            alert('The toy price cannot be zero.');
            return;
        }
        else if (!clickedLabels.length) {
            alert('Please select at least one label.');
            return;
        }

        const newToy = toyService.getEmptyToy();
        newToy.labels = clickedLabels;
        newToy.name = toyName;
        newToy.price = +toyPrice;
        newToy.owner = loggedInUser?.username;
        toyService.save(newToy)
    }

    function handlePriceChange(e) {
        const value = e.target.value;
        // This regex will allow only numbers
        if (value === "" || /^[0-9]+$/.test(value)) {
            setToyPrice(value);
        }
    }


    return (
        <main className='flex column align-center justify-center'>
            <label htmlFor="toy-name" className='form-label'>Toy name:</label>
            <input
                id="toy-name"
                type="text"
                className='form-input'
                value={toyName}
                onChange={e => setToyName(e.target.value)}
                maxLength={10}
            />
            <label htmlFor="toy-price" className='form-label'>Toy price:</label>
            <input
                id="toy-price"
                type="text"
                className='form-input'
                value={toyPrice}
                onChange={handlePriceChange}
                min="0"
            />
            <ChooseToyLabels clickedLabels={clickedLabels} setClickedLabels={setClickedLabels} />
            <button onClick={() => onSubmit()} className='form-button'>Submit</button>
        </main>
    );
}
