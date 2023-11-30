import React,{useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import notecontext from "../context/notes/noteContext"
const Noteitem = (props) => {
    const {note,updateNote}= props;
    const context = useContext(notecontext);
   const {DeleteNote}= context;
   
  return (
    <Card className="row-md-3 my-3">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <div className="d-flex">
        <Card.Title>{note.title}</Card.Title>
        <i className="fa-solid fa-pen-to-square mx-2"  onClick={()=>{updateNote(note._id,note.title,note.description,note.tag)}}></i>
        <i className="fa-solid fa-trash mx-2" onClick={()=>{DeleteNote(note._id);
        props.showNotification("Deleted successfully","success");
        }}></i>
            
        </div>
        <Card.Text>
          {note.description}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  )
}

export default Noteitem