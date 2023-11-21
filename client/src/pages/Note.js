import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Note = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState([])
    const [done, setIsDone] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();


        const response = await axios.post("http://localhost:4000/notes/create", { title, description, }, { withCredentials: true }).
            then((resp) => {
                alert(resp.data.message)
                setIsDone(true)
            }).
            catch((error) => {
                alert(error.response.data.message)
            })

        setTitle("")
        setDescription("")
    }



    useEffect(() => {

        async function data() {
            const response = await axios.get("http://localhost:4000/notes/getNotes", { withCredentials: true }).
                then((resp) => {
                    setNotes(resp.data.notes)
                }).catch((error) => {
                    alert(error.response.data.message)
                })
        }

        data();
        setIsDone(false);
    }, [done])



    return (
        <>

            <form onSubmit={submitHandler}>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                <input type="submit" value="create" />
            </form>


            <div className="container">
                {notes && notes.length != 0 ? notes.map((note) => (
                    <div className="notes" key={note._id} >
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                    </div>
                )) : <h1>No notes found</h1>}
            </div>
        </>
    )
}

export default Note