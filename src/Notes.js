import { useEffect, useState } from "react";
import { deleteItem, editItem } from "./api/notesAPI";

export default function Notes(props) {
    const [editing, setEditing] = useState(null);

    const handleTitleInput = e => props.setTitle(e.target.value);
    const handleTextInput = e => props.setText(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        editItem(editing, props.currentNotebook, props.title, props.text)
            .then(r => {
                props.setTitle("");
                props.setText("");
                setEditing(null);
                props.getNotes();
            })
            .catch(e => console.log(e));
    };

    const handleEditButton = i => {
        props.setTitle(props.notes[i].title);
        props.setText(props.notes[i].body);
        setEditing(i);
    };

    const deleteNote = id => {
        deleteItem(id, props.currentNotebook).then(() => props.getNotes());
    };

    const renderList = () => {
        if (props.notes.length === 0) return <li>No notes found</li>;
        return props.notes.map((note, i) => (
            <li key={i}>
                {editing !== null ? (
                    <form onSubmit={handleSubmit} id="new-note-form">
                        <input
                            id="title-input"
                            className="title-input"
                            type="text"
                            onInput={handleTitleInput}
                            value={props.title}
                            placeholder="Title (optional)"
                        />
                        <textarea
                            rows="4"
                            id="body-input"
                            className="body-input"
                            onInput={handleTextInput}
                            value={props.text}
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
                        <p>{note.body}</p>
                        <button onClick={() => handleEditButton(i)}>
                            Edit
                        </button>
                        <button
                            className="cancel-button"
                            onClick={() => deleteNote(i)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </li>
        ));
    };

    useEffect(() => {
        if (props.currentNotebook === null) return;
        props.getNotes();
    }, [props.currentNotebook]);

    return (
        <section className="note-display">
            <ul id="notes-list">{renderList()}</ul>
        </section>
    );
}
