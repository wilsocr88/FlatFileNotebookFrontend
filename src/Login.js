import { useState } from "react";
import { login } from "./api/authAPI";
import { FormControl, Button } from "react-bootstrap";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleClick = () => {
        login(email, password)
            .then(r => {
                window.localStorage.setItem("token", r.token);
                props.setAuthorized(r.success);
            })
            .catch(e => {
                props.setAuthorized(false);
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
            <label htmlFor="password">Password</label>

            <FormControl
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <Button className="add-button block-button" onClick={handleClick}>
                Login
            </Button>
            <p>
                <a href="/signup">Signup</a>
            </p>
        </section>
    );
}
