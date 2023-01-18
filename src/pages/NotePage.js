import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import SaveButton from '../components/SaveButton'

const NotePage = () => {

    const params = useParams()
    let noteId = params.id

    let [note, setNote] = useState(null)
    useEffect(() => {
        getNote()
    },[noteId])

    //fetch note data
    let getNote = async() => {
        if (noteId==='new') 
          return
        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    //create notes functionality 
    let createNote = async() => {
      fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
    }

    //update notes functionality 
    let updateNote = async() => {
      fetch(`/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
    }

    //event handler for update and create btns
    const history = useNavigate();
    let handleSubmit = (e) => {
      if (noteId !== 'new' && note.body === '' && note.title === '' ) {
        deleteNote()
      } else if (noteId !== 'new') {
        updateNote()
      } else if (noteId === 'new' && note !== null) {
        createNote()
      }
      e.preventDefault();
      history('/')
    }

    //Delete notes functionality
    let deleteNote = async() => {
      fetch(`/api/notes/${noteId}/delete`, {
              method: 'DELETE',
              'headers': {'Content-Type': ' application/json'},
          })
          history('/');
          }
    

  return (
    <div className='note'>
      <div className='note-header'>
        <h2 className='back-link' onClick ={handleSubmit}>     
            <ArrowLeft /> 
        </h2>
        {noteId !== 'new' ? 
          (<button onClick={deleteNote}>Delete</button>):(<div></div>)
        }
      </div>
        <textarea className='note-title' placeholder="Title..." 
          onChange={(e) => {
            setNote({...note, 'title':e.target.value})
            }} value={note?.title}></textarea>

        <textarea className='note-body' placeholder="Write the content here..." 
          onChange={(e) => {setNote({...note, 'body':e.target.value})
            }} value={note?.body}></textarea>
        <div onClick={handleSubmit} >
          <SaveButton />
        </div>
    </div>
  )
}

export default NotePage