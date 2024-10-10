import React, { useContext, useEffect } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';

export default function Notes() {

    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, [getNotes])

    return (<div className='container'>
        <AddNote />
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}></Noteitem>
            })}
        </div>
    </div>
    )
}
