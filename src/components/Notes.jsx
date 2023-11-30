import React , {useContext,useEffect} from 'react'
import notecontext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const navigate = useNavigate();
    const context = useContext(notecontext);
   const {notes,GetNotes,EditNote}= context;
   const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); }
  const handleShow = () => setShow(true);
  const ref=useRef(null);
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
   useEffect(() => {
    if(localStorage.getItem('token')){
      GetNotes()
      console.log(localStorage.getItem('token'));
    }
     else{
      navigate("/login");
     }
   }, [])
   const handleAdd=(e)=>{
    //  e.preventDefault();
    console.log("Inside handleAdd"+note.id);
    EditNote(note.id,note.etitle,note.edescription,note.etag);
    props.showNotification("Updated successfully","success");
    refClose.current.click();
    // setShow(false);
   }
   const updateNote=(fid,ftitle,fdescription,ftag)=>{
        ref.current.click();
        setNote({id:fid,etitle:ftitle,edescription: fdescription,etag:ftag})
        console.log("Updating"+fid);
       
   }
   const handleChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
   }
  return (
    <>
    <AddNote showNotification={props.showNotification}/>
    <Button ref={ref} variant="primary" onClick={handleShow} className='d-none'>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="my-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="etitle" id="etitle" minLength={5} required value={note.etitle} onChange={handleChange} placeholder="Enter Title" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="edescription" id="edescription" minLength={5} required value={note.edescription} onChange={handleChange} placeholder="Enter Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword"> 
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" name="etag" id="etag"  value={note.etag} onChange={handleChange} placeholder="Enter Tag" />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      {/* <Button variant="primary"  onClick={handleAdd} type="submit">
        Add Note
      </Button> */}
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"   onClick={handleAdd}  disabled={note.etitle.length<5 || note.edescription.length<5}>
           Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="container">
      <h1>Your notes</h1>
      <div className="container">
        {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} updateNote={updateNote} showNotification={props.showNotification}/>;
      })}
    </div>
    </>
  )
}

export default Notes