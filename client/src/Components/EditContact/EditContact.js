import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function EditContact({ editContactId, backEditClicked }) {
    let [name, setName] = useState("")
    let [number, setNumber] = useState("")
    let [mail, setMail] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/editcontactdata?id=${editContactId}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                if (res.data) {
                    setName(res.data.name)
                    setMail(res.data.mail)
                    setNumber(res.data.number)
                }
            })
            .catch(err => console.log(err))
    }, [editContactId])

    const backButtonClicked = () => {
        backEditClicked(true)
    }
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (name === '' || number === '' || mail === '') {
            return;
        } else {
            fetch(`http://127.0.0.1:3001/editcontact?id=${editContactId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    number,
                    mail
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status) {
                        setName("")
                        setNumber("")
                        setMail("")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    return (
        <div style={{ padding: '10px 0' }}>
            <FontAwesomeIcon icon={faAngleLeft} title="back" onClick={backButtonClicked} style={{ cursor: 'pointer', color: '#80a165', float: 'left', marginLeft: '10px', marginTop: '-15px', fontSize: '20px' }} />
            <Form style={{ color: '#fff', margin: '20px 10px', width: '300px' }} onSubmit={formSubmitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name ..." value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" name="phone" placeholder="+91 8788128536" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={mail} onChange={(e) => { setMail(e.target.value) }} />
                </Form.Group>

                <Button variant="primary" type="submit" title="save contact">
                    Edit Contact
                </Button>
            </Form>
        </div>
    )
}

export default EditContact
