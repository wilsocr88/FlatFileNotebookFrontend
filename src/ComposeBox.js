import { useEffect, useState } from "react";
export default function ComposeBox(props) {
    const [height, setHeight] = useState(128);
    const [style, setStyle] = useState({ height: height + "px" });

    const handleTitleInput = e => props.setTitle(e.target.value);
    const handleTextInput = e => {
        props.setText(e.target.value);
        setHeight(e.target.scrollHeight);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (props.text.trim() !== "" || props.title.trim() !== "")
            props.saveNote();
        props.setTitle("");
        props.setText("");
        setHeight(128);
    };

    useEffect(() => setStyle({ height: height + "px" }), [height]);

    return (
        <section className="new-note">
            <form onSubmit={handleSubmit} id="new-note-form">
                <input
                    id="title-input"
                    className="title-input"
                    type="text"
                    onInput={handleTitleInput}
                    value={props.title}
                    placeholder="New title (optional)"
                />
                <textarea
                    rows="4"
                    id="body-input"
                    className="body-input"
                    onInput={handleTextInput}
                    style={style}
                    value={props.text}
                    placeholder="New note"
                ></textarea>
                <button id="save-button" className="save-button">
                    Create
                </button>
            </form>
        </section>
    );
}
