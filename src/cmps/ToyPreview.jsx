import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ToyPreview({ toy, onEditToy }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const { name, price, labels, inStock, _id } = toy;

    // useEffect(() => {
    //     console.log(loggedInUser);
    // }, [])

    return (
        <li className="toy-preview">
            <h3>Toy name: {name}</h3>
            <div className="toy-img">
                <img src="../public/abc.jpg" />
            </div>
            <h4>Price: {price}$</h4>
            <h4>Labels: [{labels.join(', ')}].</h4>
            <h4>
                In stock: {inStock ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}
            </h4>
            <div className="flex justify-center">
                {loggedInUser.isAdmin && <button onClick={() => onEditToy(_id)} className="preview-btn">Edit</button>}
                <button onClick={() => onEditToy(_id)} className="preview-btn">Details</button>
                {/* <button className="preview-btn">Buy</button> */}
            </div>
        </li>
    )
}    
