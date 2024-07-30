import { useContext, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate } from "react-router-dom"

export default function Create() {

    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const {token} = useContext(AppContext)

    async function handleCreate(e) {
        e.preventDefault()
        const res = await fetch('/api/posts',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        
        if (data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/')
        }
    }
    return (
        <>
            <h1 className="title">Create a new post</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Post Title" />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div>
                    <textarea rows="6" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})}  placeholder="Post Content" ></textarea>
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>

                <div>
                    <button className="primary-btn">Create</button>
                </div>
            </form>
        </>
    )
}