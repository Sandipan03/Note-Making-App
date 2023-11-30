const express= require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser= require('./middleware/fetchuser');
const Notes= require('./models/Notes');
// Route 1: Fetch user notes
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})
// Router 2: Add notes for a user
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min: 3, max:60}),
    body('description','Description must be at least 5 characters').isLength({min:5})
] , async(req,res)=>{
    try {
        const {title,description,tag} = req.body ;

        const errors= validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const notes= new Notes({
            title,description,tag, user: req.user.id 
        })
        const savednote = await notes.save();
        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})

// Route 3: Update notes
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}= req.body;
    // create a newnote <object data="" type=""></object>
    try {
        
    
    const newNote= {};
     if (title) { newNote.title= title}
     if (description) { newNote.description= description}
     if (tag) { newNote.tag= tag}

    //  find the note to be updated and update it, find using id in given in request, this is the id of the note, not the user
    let notes= await Notes.findById(req.params.id);
    if (!notes){
        return res.status(404).send("Not Found");
    }
    // check if the user's id in the note found and the id of the user requesting to update are the same 
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    notes = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new: true});
    res.json({notes});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})
// Route 4: Delete notes
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    
    // create a newnote object
    try {
    //  find the note to be deleted and delete it, find using id in given in request, this is the id of the note, not the user
    let notes= await Notes.findById(req.params.id);
    if (!notes){
        return res.status(404).send("Not Found");
    }
    // check if the user's id in the note found and the id of the user requesting to update are the same 
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been delted", notes: notes});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})
module.exports= router