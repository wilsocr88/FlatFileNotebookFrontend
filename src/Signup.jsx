import { useState } from "react";
import { createUser } from "./api/authAPI";
import { FormControl, Button } from "react-bootstrap";

export default function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleClick = () => {
        setError("");
        createUser(email, password)
            .then(r => {
                if (r) {
                    window.location.pathname = "/";
                } else {
                    setError(
                        "Couldn't create account. Does this user already exist?"
                    );
                }
            })
            .catch(e => {
                setError("Something went wrong. Please try again later.");
            });
    };

    return (
        <section style={{ textAlign: "center" }}>
            <label htmlFor="email">Email address</label>
            <FormControl
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
            />
            <br />

            <label htmlFor="password">Create a password</label>
            <FormControl
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
            />

            <p style={{ color: "red" }}>{error}</p>
            <Button className="add-button block-button" onClick={handleClick}>
                Signup
            </Button>
            
            <p>
                <a href="/">Login</a>
            </p>
        </section>
    );
}
