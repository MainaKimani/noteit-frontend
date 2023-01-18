import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as SaveIcon } from '../assets/save.svg'

const AddButton = () => {
  return (
    <div className='floating-button'>
        <SaveIcon />
    </div>
  )
}

export default AddButton