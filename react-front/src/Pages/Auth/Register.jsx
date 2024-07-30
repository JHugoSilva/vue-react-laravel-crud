import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../Context/AppContext"

export default function Register() {

    const { token, setToken } = useContext(AppContext)
    const navigate = useNavigate()
    const [ formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const [errors, setErrors] = useState({})

    async function handleRegister(e) {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
    
            const data = await res.json()
    
            console.log(data.errors);
            if (data.errors) {
                setErrors(data.errors)
            } else {
                setToken(data.token)
                localStorage.setItem('token', data.token)
                navigate('/')
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1 className="title">Register a new account</h1>
            { token }
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})}/>
                { errors.name && <p className="error">{ errors.name }</p> }
                </div>
                <div>
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})}/>
                    { errors.email && <p className="error">{ errors.email }</p> }
                </div>
                <div>
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
                    { errors.password && <p className="error">{ errors.password }</p> }
                </div>
                <div>
                    <input type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation:e.target.value})}/>
                </div>
                <div>
                    <button className="primary-btn">Register</button>
                </div>
            </form>
        </div>
    )
}