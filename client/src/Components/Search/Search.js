import React, { useState, useEffect } from 'react';
import './Search.css';
import ReactSearchBox from 'react-search-box';

const Search = () => {
    const [contacts, setContacts] = useState([])
    const [searchContact, setSearchContact] = useState("")
    let [data, setData] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:3001/contact", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(res => {
                if (res.contacts) {
                    setContacts(res.contacts)
                    setData(contacts.map((contact, index) => { return { key: contact.name, value: contact.name + " " + contact.number + " " + contact.mail } }))
                }
            })
            .catch(err => { console.log(err) })
    }, [data, contacts])

    return (
        < ReactSearchBox
            data={data}
            placeholder="Search by name ..."
            inputBoxFontSize="20px"
            onChange={(value) => setSearchContact(value)}
        />
    )
}

export default Search;