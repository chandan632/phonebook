import React, { useState, useEffect } from "react";
import { Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Users = ({ editHandlerCall }) => {
    let [contacts, setContacts] = useState([])
    useEffect(() => {
        fetch("https://prasantaphonebookwebapp.herokuapp.com/contacts", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(res => {
                if (res.contacts) {
                    setContacts(res.contacts)
                }
            })
            .catch(err => { console.log(err) })
    }, [])
    const deleteHandler = (e) => {
        let id = ""
        if (e.target.id === "") {
            id = e.target.parentElement.id
        } else {
            id = e.target.id
        }
        fetch(`https://prasantaphonebookwebapp.herokuapp.com/deletecontact?id=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    const newContacts = contacts.filter(contact => contact._id !== id)
                    setContacts(newContacts)
                }
            })
            .catch(err => console.log(err))
    }
    const editHandler = (e) => {
        let id = ""
        if (e.target.id === "") {
            id = e.target.parentElement.id
        } else {
            id = e.target.id
        }
        editHandlerCall(id)
    }
    return (<>
        {
            contacts.length === 0 ? <p style={{ color: '#fff' }}>Loading ... </p> : <>

                {
                    <Accordion defaultActiveKey="0" style={{ margin: '20px 10px' }}>
                        {
                            contacts.map((contact, index) => {
                                return (<Card key={contact._id}>
                                    <Accordion.Toggle as={Card.Header} eventKey={index} style={{ color: 'Blue', textAlign: 'left' }}>
                                        {contact.name}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <Card.Body>
                                            <div className="card-text" style={{ textAlign: 'left', display: 'flex' }}>
                                                <small style={{ color: 'blue', margin: '0 5px' }}>{contact.number}</small>
                                                <small style={{ color: 'blue', margin: '0 15px' }}>{contact.mail}</small>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <FontAwesomeIcon icon={faEdit} id={contact._id} style={{ color: 'green', margin: '0 10px', cursor: 'pointer' }} onClick={editHandler} />
                                                <FontAwesomeIcon icon={faTrash} id={contact._id} style={{ color: 'red', margin: '0 10px', cursor: 'pointer' }} onClick={deleteHandler} />
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>)
                            })
                        }
                    </Accordion>
                }
            </>
        }
    </>
    )
}

export default Users;