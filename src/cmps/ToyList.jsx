import { ToyPreview } from "./ToyPreview.jsx";
// import PropTypes from 'prop-types'

export function ToyList({ toys, onEditToy }) {

    return (
        <ul className="toy-list flex">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onEditToy={onEditToy}
                />
            )}
        </ul>
    )
}
