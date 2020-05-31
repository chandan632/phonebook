import React, { useState } from "react";
import Search from "./Components/Search/Search.js";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Users from "./Components/Users/Users.js";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";

const App = () => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editContactId, setEditContactId] = useState("")
  function buttonClick() {
    setButtonClicked(!buttonClicked)
  }
  const backClicked = (click) => {
    setButtonClicked(!buttonClicked)
  }
  const backEditClicked = (click) => {
    setShowEditForm(false)
    setButtonClicked(false)
  }
  const editHandlerCall = (id) => {
    setShowEditForm(!showEditForm)
    setEditContactId(id)
  }
  const dataField = (data) => {
    console.log("from app js file" + data)
  }
  return (
    <div className="App">
      <div className="box">
        <h1 className="phonebook-title">PHONEBOOK</h1>
        {<>
          {
            showEditForm === true ? < EditContact editContactId={editContactId} backEditClicked={backEditClicked} /> :

              buttonClicked === false ? <>
                <Search />
                <Users editHandlerCall={editHandlerCall} dataField={dataField} />
                <FontAwesomeIcon icon={faPlusCircle} onClick={buttonClick} title="add contact" style={{ cursor: 'pointer' }} /> </> : <AddContact backClicked={backClicked} />

          }
        </>
        }
      </div>
    </div >
  )
}

export default App;