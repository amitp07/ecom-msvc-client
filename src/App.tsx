import { FormEvent } from "react";

export default function App() {
    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: '5rem' }}>
                <div>
                    <input type="text" name="username" size={50} />
                </div>
                <div>
                    <input type="text" name="password" size={50} />
                </div>
                <div>
                    <button> Login </button>
                </div>
            </form>
        </div>
    )
}