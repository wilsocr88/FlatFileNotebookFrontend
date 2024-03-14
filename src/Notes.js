import { useEffect, useState } from "react";
import { deleteItem, editItem } from "./api/notesAPI";
import { Modal } from "react-bootstrap";
import Showdown from "showdown";

export default function Notes(props) {
    const [editTitle, setEditTitle] = useState("");
    const [editText, setEditText] = useState("");
    const [currentId, setCurrentId] = useState(null);
    const [showAreYouSure, setShowAreYouSure] = useState(false);
    const converter = new Showdown.Converter();

    const handleTitleInput = e => setEditTitle(e.target.value);
    const handleTextInput = e => setEditText(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        editItem(props.editing, props.currentNotebook, editTitle, editText)
            .then(r => {
                setEditTitle("");
                setEditText("");
                props.setEditing(null);
                props.getNotes();
            })
            .catch(e => console.log(e));
    };

    const handleEditButton = i => {
        setEditTitle(props.notes[i].title);
        setEditText(props.notes[i].body);
        props.setEditing(i);
    };

    const areYouSure = id => {
        setCurrentId(id);
        setShowAreYouSure(true);
    };

    const deleteNote = () => {
        setShowAreYouSure(false);
        deleteItem(currentId, props.currentNotebook).then(() => {
            setCurrentId(null);
            props.getNotes();
        });
    };

    const renderList = () => {
        if (props.notes.length === 0) return <li>No notes found</li>;
        return props.notes.map((note, i) => (
            <li key={i}>
                {props.editing !== null && props.editing === i ? (
                    <form onSubmit={handleSubmit} id="new-note-form">
                        <input
                            id="title-input"
                            className="title-input"
                            type="text"
                            onInput={handleTitleInput}
                            value={editTitle}
                            placeholder="Title (optional)"
                        />
                        <textarea
                            rows="4"
                            id="body-input"
                            className="body-input"
                            onInput={handleTextInput}
                            value={editText}
                            placeholder="Note"
                        ></textarea>
                        <button id="save-button" className="save-button">
                            Save
                        </button>
                    </form>
                ) : (
                    <>
                        {note.title && <h4>{note.title}</h4>}
                        <br />
                        <p
                            dangerouslySetInnerHTML={{
                                __html: converter.makeHtml(note.body),
                            }}
                        ></p>
                        <button
                            style={{ marginBottom: "-9px" }}
                            onClick={() => handleEditButton(i)}
                        >
                            Edit
                        </button>
                        <button
                            className="cancel-button delete-button"
                            onClick={() => areYouSure(i)}
                        >
                            X
                        </button>
                    </>
                )}
            </li>
        ));
    };

    const renderAreYouSure = () => (
        <Modal show={showAreYouSure}>
            <Modal.Body>
                Are you sure you want to delete this note? This cannot be
                undone.
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => {
                        setShowAreYouSure(false);
                        setCurrentId(null);
                    }}
                >
                    No
                </button>
                <button className="cancel-button" onClick={deleteNote}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    );

    useEffect(() => {
        if (props.currentNotebook === null) return;
        props.getNotes();
    }, [props]);

    return (
        <section className="note-display">
            {renderAreYouSure()}
            <ul id="notes-list">{renderList()}</ul>
        </section>
    );
}
