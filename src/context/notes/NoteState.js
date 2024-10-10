import { useCallback, useState } from "react";
import NoteContext from "./noteContext";

export default function NoteState(props) {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes from mongodb server ..
  // const getNotes = async () => {
  //   console.log("msg from getNotes function")
  //   // Api call
  //   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYTY0YzcyNTI3OGE5ZDM0YmYwMjZmIn0sImlhdCI6MTcyMjQ0Mjk1MX0.troCI_XvYwqZMElLdRjx6xtaeOMRKAEeIK_9dsHxCVM"
  //     }
  //   });
  //   const json = await response.json();
  //   console.log("iam json in getting note function", json)
  //   setNotes(json)
  // }


  const getNotes = useCallback(async () => {
    console.log("msg from getNotes function");
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYTY0YzcyNTI3OGE5ZDM0YmYwMjZmIn0sImlhdCI6MTcyMjQ0Mjk1MX0.troCI_XvYwqZMElLdRjx6xtaeOMRKAEeIK_9dsHxCVM"
        }
    });
    const json = await response.json();
    console.log("iam json in getting note function", json);
    setNotes(json);
}, [host]); // 'host' is a dependency if it's a variable, ensure it's defined


  const addNote = async (title, description, tag) => {
    console.log("You have Added a note : " + title)
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYTY0YzcyNTI3OGE5ZDM0YmYwMjZmIn0sImlhdCI6MTcyMjQ0Mjk1MX0.troCI_XvYwqZMElLdRjx6xtaeOMRKAEeIK_9dsHxCVM"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("iam json in Addnote function", json)

    // setidNo(idNo++);
    const note = {
      "title": title,
      "description": description,
      "tag": tag
    }
    // setidNo(idNo++);
    setNotes(notes.concat(note))
  }

  // Edit Note 
  const editNote = async (id, title, description, tag) => {
    // need Api call
    console.log("Editing note :" + title);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYTY0YzcyNTI3OGE5ZDM0YmYwMjZmIn0sImlhdCI6MTcyMjQ0Mjk1MX0.troCI_XvYwqZMElLdRjx6xtaeOMRKAEeIK_9dsHxCVM"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log("iam json in edit note function", json)
    // logic to edit note in client side.. 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  // Delete Note 
  const deleteNote = async (id, title) => {

    console.log("Deleted : note who's id :" + id);

    // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYTY0YzcyNTI3OGE5ZDM0YmYwMjZmIn0sImlhdCI6MTcyMjQ0Mjk1MX0.troCI_XvYwqZMElLdRjx6xtaeOMRKAEeIK_9dsHxCVM"
      },
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    console.log("You have deleted : " + title);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}