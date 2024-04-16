import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export function ToysDetails() {
    const [toy, setToy] = useState(null);
    const { toyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadToys();
    }, [toyId]);

    async function loadToys() { // תמשיך אחרי זה לסדר את הפונקציה עם await
        toyService.getById(toyId)
            .then((toy) => {
                // console.log('toy', toy);
                if (!toy) navigate('/');
                setToy(toy);
            })
            .catch((err) => {
                showErrorMsg('Cannot load toy');
                // navigate('/');
            });
    }

    if (!toy) return (
        <div className="loading-container">
            <div className="loader"></div>
        </div>)

    return (
        <section className="flex align-items flex-column">
            <KeyboardBackspaceIcon />

            <ul className="toy-list flex">
                <li className="toy-preview">
                    <h3>Toy id: {toy._id}</h3>
                    <h3>Toy name: {toy.name}</h3>
                    <div className="toy-img">
                        <img src="../public/abc.jpg" />
                    </div>
                    <h4>Price: {toy.price}$</h4>
                    <h4>Labels: [{toy.labels.join(', ')}].</h4>
                    <h4>Created at: {new Date(toy.createdAt).toString()} </h4>
                    <h4>
                        In stock: {
                            toy.inStock
                                ?
                                <div className="flex align-center justify-center">
                                    <i className="fa-solid fa-check" aria-label="In stock"></i>
                                    <span className="marginleft10 pointer">Buy Now</span>
                                </div>
                                :
                                <i className="fa-solid fa-x" aria-label="Out of stock"></i>
                        }
                    </h4>
                </li>
            </ul>
        </section>
    );
}
