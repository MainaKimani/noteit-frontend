import React, { useContext, useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const NotesListPage = () => {

  let{logout,authTokens}=useContext(AuthContext)

  let [notes, setNotes] = useState([])

  useEffect(()=> {
    getNotes()
  })

  let proxy = 'https://noteit-staging.mainakimani.com'

  let getNotes = async()=>{
    let response = await fetch(`${proxy}/api/notes/`,{
      method: 'GET',
      headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
              }

    })
    let data = await response.json()

    if (response.status === 200) {
      setNotes(data) 
    }else if (response.statusText === 'Unauthorized'){
      logout()
    }
    
  }

  let navigate = useNavigate()
  let createNote = () => {
    navigate('/note/new')
  }
 
  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className="notes-title">&#9782; Notes</h2>
        {(notes.length > 0) &&
          <p className='notes-count'>{notes.length}</p> 
          } 
      </div>
      <div className="notes-list">
        {notes.map((note, index)=>(
          <ListItem key={index} note={note} />
        ))}
        </div >
      <div onClick={createNote}> 
        <AddButton />
      </div>
    </div>
  )
}

export default NotesListPage