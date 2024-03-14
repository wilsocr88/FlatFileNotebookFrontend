import { useState, useEffect } from "react";
import "./App.css";
import ComposeBox from "./ComposeBox";
import Notes from "./Notes";
import Notebooks from "./Notebooks";
import { Container, Row, Col } from "react-bootstrap";
import { listFiles, saveItem, getList } from "./api/notesAPI";
import { checkAuth } from "./api/authAPI";
import Login from "./Login";
import Signup from "./Signup";

export default function App(props) {
    const [authorized, setAuthorized] = useState("");
    const [editing, setEditing] = useState(null);
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

    const logout = () => {
        window.localStorage.removeItem("token");
        doCheckAuth();
    };

    const doCheckAuth = () =>
        checkAuth()
            .then(r => setAuthorized(r))
            .catch(e => {
                setAuthorized(false);
                setLoading(false);
            });

    useEffect(() => {
        doCheckAuth();
    }, []);

    useEffect(() => {
        if (authorized) {
            getFiles();
        }
    }, [authorized]);

    return (
        <main>
            {loading && <h1>Loading...</h1>}
            {isError ? (
                <h1>ERROR</h1>
            ) : authorized ? (
                !loading &&
                !isError && (
                    <Container>
                        <a style={{ float: "right" }} href="#" onClick={logout}>
                            Logout
                        </a>
                        <Row>
                            <Col md>
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
                                <Col md>
                                    <h3 id="notebook-name">
                                        {currentNotebook}
                                    </h3>
                                    {editing === null && (
                                        <ComposeBox
                                            title={title}
                                            text={text}
                                            setTitle={setTitle}
                                            setText={setText}
                                            saveNote={saveNote}
                                        />
                                    )}
                                    <Notes
                                        title={title}
                                        text={text}
                                        notes={notes}
                                        editing={editing}
                                        setEditing={setEditing}
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
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            {props.route === "/signup" ? (
                                <Signup />
                            ) : (
                                props.route === "/" && (
                                    <Login setAuthorized={setAuthorized} />
                                )
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </main>
    );
}
