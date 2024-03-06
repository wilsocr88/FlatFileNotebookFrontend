import { useState } from "react";
import { createList, deleteList } from "./api/notesAPI";
import { Modal } from "react-bootstrap";

export default function Notebooks(props) {
    const [newName, setNewName] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleAddButton = () => setShowModal(true);

    // called by onInput of modal text field
    const handleInput = e => setNewName(e.target.value);

    // called by modal save button
    const createNewNotebook = () => {
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
        deleteList(props.currentNotebook).then(() => {
            props.setCurrentNotebook(null);
            props.getFiles();
        });
    };

    const renderList = () => {
        return props.notebooks.map((notebook, i) => (
            <a
                href="/#"
                onClick={() => {
                    props.setCurrentNotebook(notebook);
                }}
                key={i}
            >
                <li key={notebook}>
                    <p>{notebook}</p>
                    <button onClick={deleteNotebook}>DELETE</button>
                </li>
            </a>
        ));
    };

    const renderModal = () => (
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

    return (
        <>
            {renderModal()}
            <section className="display">
                <button onClick={handleAddButton} className="add-button">
                    + New Notebook
                </button>
                <ul id="notebooks-list">{renderList()}</ul>
            </section>
        </>
    );
}
