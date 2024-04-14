import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit]);


    function handleChange({ target }) {
        let { value, name, type } = target;

        if (type === 'number') {
            value = +value; // Convert to number
            if (value < 0) value = 0; // Ensure value is not less than 0
            // If value starts with 0 and has more than one character, remove leading zeros
            if (value.toString().startsWith('0') && value.toString().length > 1) {
                value = parseInt(value.toString().replace(/^0+/, ''), 10);
            }
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }));
    }

    function filterByLabel(newLabel) {
        setFilterByToEdit(prevFilter => {
            if (newLabel === 'all') {
                return toyService.getDefaultFilter();
            }
            // בדיקה אם ה-label כבר נמצא במערך
            const isLabelExist = prevFilter.label.includes(newLabel);

            return {
                ...prevFilter,
                label: isLabelExist
                    ? prevFilter.label.filter(label => label !== newLabel) // הסרת ה-label אם הוא כבר קיים
                    : [...prevFilter.label, newLabel] // הוספת ה-label החדש אם הוא לא קיים
            };
        });
    }


    function filterByStock(inStock) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock, }));
    }
    return (
        <section className="car-filter full main-layout">
            <div className="search-container">
                <form>
                    {/* <input
                        type="number"
                        className="search-input"
                        placeholder="Price"
                        onChange={handleChange}
                        value={filterByToEdit.price || 0}
                        name="price" // Make sure to include this
                    /> */}
                </form>
                <div className="dropdown">
                    <button className="dropbtn">
                        <i className="fa-solid fa-bars fa-lg"> by labels</i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" className="search-item" onClick={() => filterByLabel('all')}>All</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Art')}>Art</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Doll')}>Doll</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Baby')}>Baby</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Puzzle')}>Puzzle</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Outdoor')}>Outdoor</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Box-game')}>Box-game</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('On-wheels')}>On-wheels</a>
                        <a href="#" className="search-item" onClick={() => filterByLabel('Battery-powered')}>Battery-powered</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">
                        <i className="fa-solid fa-bars fa-lg"> in stock</i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" className="search-item" onClick={() => filterByStock(true)}>Yes</a>
                        <a href="#" className="search-item" onClick={() => filterByStock(false)}>No</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
