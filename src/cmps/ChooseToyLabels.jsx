import { toyService } from "../services/toy.service";

export function ChooseToyLabels({ clickedLabels, setClickedLabels }) {

    const labels = toyService.getLabels();

    function onClickLabel(label) {
        if (clickedLabels.includes(label)) {
            const newLabels = clickedLabels.filter(labelToSave => labelToSave !== label);
            setClickedLabels(newLabels);
        } else {
            setClickedLabels(prevLabels => [...prevLabels, label]);
        }
    }

    return (
        <section className="flex column align-center">
            <h2 className="underline bold">Labels:</h2>
            <div className="labels-container">
                {labels.map((label, index) => (
                    <div className="label-card pointer flex column justify-evenly align-center" onClick={() => onClickLabel(label)} key={index}>
                        <div>{label}</div>
                        {clickedLabels.includes(label) ? (
                            <i className="fa fa-square-check fa-xl icon-active"></i>
                        ) : (
                            <i className="fa fa-square fa-xl icon-inactive"></i>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
