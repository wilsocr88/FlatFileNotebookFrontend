import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-bootstrap/cjs";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App route="/" />,
    },
    {
        path: "/signup",
        element: <App route="/signup" />,
    },
    {
        path: "/*",
        element: <App route="/" />,
        errorElement: <App route="/" />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
