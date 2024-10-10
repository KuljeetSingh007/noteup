import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function DeleteModal(props) {
    const { note, modalId } = props;
    // console.log('title '+note.title);
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const handleDeleteNote = () => {
        console.log("Note deleted with id" + note._id + " and with title " + note.title);
        deleteNote(note._id, note.title);
    }
    return (
        <>
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure to delete the note titled {note.title} permanently.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleDeleteNote} type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
