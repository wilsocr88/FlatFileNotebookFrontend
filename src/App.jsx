import { useState, useEffect, useCallback } from "react";
import "./App.css";
import ComposeBox from "./ComposeBox";
import Notes from "./Notes";
import Notebooks from "./Notebooks";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { listFiles, saveItem, getList } from "./api/notesAPI";
import { checkAuth } from "./api/authAPI";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";

export default function App(props) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [editing, setEditing] = useState(null);
    const [currentNotebook, setCurrentNotebook] = useState(null);
    const [isError, setIsError] = useState(false);
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

    const getNotes = useCallback(() => {
        getList(currentNotebook).then(res => {
            setNotes(res.items);
            // Re-render list of notes after new note
            setEditing(!!editing);
        });
    }, [currentNotebook, editing]);

    const saveNote = () => {
        saveItem(currentNotebook, title, text).then(() => getNotes());
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
        setLoading(true);
        doCheckAuth();
    }, []);

    useEffect(() => {
        if (authorized) {
            getFiles();
        }
    }, [authorized]);

    return (
        <main>
            {loading && <Container><Row><Col className="m-5 p-5"><center><Spinner /></center></Col></Row></Container>}
            {isError ? (
                <h1>ERROR</h1>
            ) : authorized ? ( 
                    <Container>
                        <Link style={{ float: "right" }} onClick={logout}>
                            Logout
                        </Link>
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
                                        currentNotebook={currentNotebook}
                                        setEditing={setEditing}
                                        setTitle={setTitle}
                                        setText={setText}
                                        getNotes={getNotes}
                                        setIsError={setIsError}
                                    />
                                </Col>
                            )}
                        </Row>
                    </Container>
            ) : !loading && (
                <Container>
                    <Row>
                        <Col className="my-5 py-5" md={{ span: 6, offset: 3 }}>
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
