import { useState } from "react";
import { createList, deleteList } from "./api/notesAPI";
import { Modal } from "react-bootstrap";

export default function Notebooks(props) {
    const [newName, setNewName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAreYouSure, setShowAreYouSure] = useState(false);

    const handleAddButton = () => setShowModal(true);

    // called by onInput of modal text field
    const handleInput = e => setNewName(e.target.value);

    // called by modal save button
    const createNewNotebook = () => {
        if (newName.trim() === "") return;
        createList(newName).then(r => {
            handleClose();
            props.getFiles();
        });
    };

    const handleClose = () => {
        setShowModal(false);
        setNewName("");
    };

    const deleteNotebook = () => {
        setShowAreYouSure(false);
        deleteList(props.currentNotebook).then(() => {
            props.setCurrentNotebook(null);
            props.getFiles();
        });
    };

    const nameStyle = {
        fontSize: "1.25em",
        display: "inline-block",
        margin: 0,
    };

    const renderList = () =>
        props.notebooks.map((notebook, i) => (
            <a
                href="/#"
                onClick={() => {
                    props.setCurrentNotebook(notebook);
                }}
                key={i}
            >
                <li key={notebook}>
                    <p style={nameStyle}>{notebook + " →"}</p>
                    <button
                        className="cancel-button delete-button"
                        onClick={() => setShowAreYouSure(true)}
                    >
                        X
                    </button>
                </li>
            </a>
        ));

    const renderNew = () => (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>
                <h3>Name of new notebook:</h3>
                <input
                    placeholder="Name"
                    className="modal-input"
                    onInput={handleInput}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="cancel-button" onClick={handleClose}>
                    Cancel
                </button>
                <button onClick={createNewNotebook}>Create</button>
            </Modal.Footer>
        </Modal>
    );

    const renderAreYouSure = () => (
        <Modal show={showAreYouSure}>
            <Modal.Body>
                Are you sure you want to delete this notebook and all of its
                notes? This cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => {
                        setShowAreYouSure(false);
                    }}
                >
                    No
                </button>
                <button className="cancel-button" onClick={deleteNotebook}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {renderNew()}
            {renderAreYouSure()}
            <section className="display">
                <button onClick={handleAddButton} className="add-button">
                    + New Notebook
                </button>
                <ul id="notebooks-list">{renderList()}</ul>
            </section>
        </>
    );
}
