import React, { useState } from 'react';
import { ChooseToyLabels } from '../cmps/ChooseToyLabels.jsx';

export function AddNewToy() {
    const [toyName, setToyName] = useState('');
    const [toyPrice, setToyPrice] = useState('');

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
                type="number"
                className='form-input'
                value={toyPrice}
                onChange={e => setToyPrice(e.target.value)}
            />
            <ChooseToyLabels />
            <button className='form-button'>Submit</button>
        </main>
    );
}
