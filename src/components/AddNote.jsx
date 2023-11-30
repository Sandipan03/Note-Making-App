import React, {useContext,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import notecontext from "../context/notes/noteContext"
const AddNote = (props) => {
    const context = useContext(notecontext);
   const {AddNote}= context;
   const [note, setNote] = useState({title:"",description:"",tag:""})
   const handleAdd=(e)=>{
    e.preventDefault();
    AddNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showNotification("Added successfully","success");
   }
   const handleChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
   }
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
    <Form className="my-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" id="title" value={note.title} minLength={5} required onChange={handleChange} placeholder="Enter Title" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" id="description" value={note.description} minLength={5} required onChange={handleChange} placeholder="Enter Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" name="tag" id="tag" value={note.tag} onChange={handleChange} placeholder="Enter Tag" />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary"  onClick={handleAdd}  disabled={note.title.length<5 || note.description.length<5} type="submit">
        Add Note
      </Button>
    </Form>
    </div>
  )
}

export default AddNote