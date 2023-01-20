import React, { useContext, useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import AuthContext from '../context/AuthContext'

const NotesListPage = () => {

  let{logout,authTokens}=useContext(AuthContext)

  let [notes, setNotes] = useState([])

  useEffect(()=> {
    getNotes()
  },[])


  let getNotes = async()=>{
    let response = await fetch('/api/notes/',{
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
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage