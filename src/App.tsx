import { FormEvent, useEffect, useState } from "react";
import Home from "./components/home";
import Signup from "./components/signup";

const AUTH_URL = "http://localhost:5000/v1/users";

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [showSignup, setShowSignup] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData: any = {}
        data.forEach((val, key) => { jsonData[key] = val });

        fetch(`${AUTH_URL}/login`, { method: "POST", body: JSON.stringify(jsonData) })
            .then(r => {
                if (r.status >= 400) {
                    throw r.text();
                }
                return r.json();
            }).then(r => {
                setIsLoggedIn(true);
            }).catch(err => err.then(setError));
    }

    useEffect(() => {
        fetch(`${AUTH_URL}/1`).then(r => r.json()).then(console.log)
    }, [])


    return (
        <div>
            {isLoggedIn && !showSignup ? <Home /> : showSignup ? <Signup setShowSignup={setShowSignup} /> :
                <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: '5rem' }}>
                    <div>
                        <input type="text" placeholder="User name" required name="username" size={50} />
                    </div>
                    <div>
                        <input type="text" required placeholder="Password" name="password" size={50} />
                    </div>
                    <div>
                        <button> Login </button>
                        {error && <button type="button" onClick={() => { setError(""); setShowSignup(true) }}> Sign-up</button>}
                    </div>
                    <div>
                        <span style={{ color: 'red' }}>{error}</span>
                    </div>
                </form>
            }
        </div>
    )
}