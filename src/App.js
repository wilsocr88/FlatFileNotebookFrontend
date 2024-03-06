import { useState, useEffect } from "react";
import "./App.css";
import ComposeBox from "./ComposeBox";
import Notes from "./Notes";
import Notebooks from "./Notebooks";
import { Container, Row, Col } from "react-bootstrap";
import { listFiles, saveItem, getList } from "./api/notesAPI";

export default function App() {
    const [currentNotebook, setCurrentNotebook] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notebooks, setNotebooks] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [notes, setNotes] = useState([]);

    const getFiles = () => {
        listFiles()
            .then(res => {
                setNotebooks(res.files);
                setLoading(false);
            })
            .catch(e => {
                setIsError(true);
                setLoading(false);
            });
    };

    const getNotes = () => {
        getList(currentNotebook).then(res => setNotes(res.items));
    };

    const saveNote = () => {
        saveItem(currentNotebook, title, text).then(getNotes);
    };

    useEffect(getFiles, []);

    return (
        <main>
            {loading && <h1>Loading...</h1>}
            {isError ? (
                <h1>ERROR</h1>
            ) : (
                !loading &&
                !isError && (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Notebooks
                                    getFiles={getFiles}
                                    notebooks={notebooks}
                                    setLoading={setLoading}
                                    setIsError={setIsError}
                                    currentNotebook={currentNotebook}
                                    setCurrentNotebook={setCurrentNotebook}
                                />
                            </Col>
                            {currentNotebook !== null && (
                                <Col>
                                    <h1 id="notebook-name">
                                        {currentNotebook}
                                    </h1>
                                    <ComposeBox
                                        title={title}
                                        text={text}
                                        setTitle={setTitle}
                                        setText={setText}
                                        saveNote={saveNote}
                                    />
                                    <Notes
                                        title={title}
                                        text={text}
                                        notes={notes}
                                        setTitle={setTitle}
                                        setText={setText}
                                        getNotes={getNotes}
                                        currentNotebook={currentNotebook}
                                    />
                                </Col>
                            )}
                        </Row>
                    </Container>
                )
            )}
        </main>
    );
}
