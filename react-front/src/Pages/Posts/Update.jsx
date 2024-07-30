import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate, useParams } from "react-router-dom"

export default function Update() {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const {token, user} = useContext(AppContext)

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`,{
            method: 'GET'
        })
        const data = await res.json()

        if (res.ok) {

            if (data.post.user_id !== user.id) {
                navigate('/')
            }
            setFormData({
                title: data.post.title,
                body: data.post.body
            })
        }
    }

    async function handleUpdate(e) {
        e.preventDefault()
        const res = await fetch(`/api/posts/${id}`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
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

    useEffect(()=>{
        getPost()
    },[])
    return (
        <>
            <h1 className="title">Update post</h1>

            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Post Title" />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div>
                    <textarea rows="6" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})}  placeholder="Post Content" ></textarea>
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>

                <div>
                    <button className="primary-btn">Update</button>
                </div>
            </form>
        </>
    )
}