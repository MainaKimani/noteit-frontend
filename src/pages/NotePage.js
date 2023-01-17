import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = () => {

    const params = useParams()
    let noteId = params.id

    let [note, setNote] = useState(null)
    useEffect(() => {
        getNote()
    },[noteId])

    let getNote = async() => {
        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }


  return (
    <div className='note'>
      <div className='note-header'>
        <h2>
          <Link className='back-link' to="/">
            <ArrowLeft /> 
            <span>Back to Notes</span>
          </Link>
        </h2>
      </div>
        <textarea className='note-title' defaultValue={note?.title}></textarea>
        <textarea className='note-body' defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage