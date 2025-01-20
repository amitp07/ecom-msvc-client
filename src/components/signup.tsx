import { ActionDispatch, Dispatch, FormEvent, SetStateAction, useState } from "react"
const AUTH_URL = "http://localhost:5000/v1/users";

export default ({ setShowSignup }: { setShowSignup: Dispatch<SetStateAction<boolean>> }) => {

    const [isSaving, setIsSaving] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsSaving(true)
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const jsonData = {} as any;
        formData.forEach((value, key) => jsonData[key] = value)
        console.log(jsonData)

        fetch(`${AUTH_URL}/create`, { method: "POST", body: JSON.stringify(jsonData) })
            .then(r => r.text()).then(r => {
                console.log(r);
                setIsSaving(false)
                setShowSignup(false);
            })
    }


    return <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: '5rem' }}>
        <div>
            <input type="text" placeholder="User name" required name="username" size={50} />
        </div>
        <div>
            <input type="text" required placeholder="Password" name="password" size={50} />
        </div>
        <div>
            <input type="email" required placeholder="Email" name="email" size={50} />
        </div>
        {isSaving && <div>
            <span style={{color: "green"}}>
                Please Wait while we save your details...
            </span>
        </div>}
        <div>
            <button> Save </button>
        </div>
    </form>
}