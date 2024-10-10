import React  from 'react';
import DeleteModal from "../components/DeleteModal";
export default function Noteitem(props) {
    const { note } = props;
    // console.log("note title " +note.title); //clarifying that what note props conataining.
    return (
        <>
            <div className='col-md-3' style={{ display: "flex", justifyContent: "center", }}>
                <div className="card mx-3 my-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title" style={{ margin: "0" }}>{note.title}</h5>
                            <i data-bs-toggle="modal" data-bs-target={`#deleteModal-${note._id}`} className="fa-regular fa-trash-can mx-2"></i>
                            <i className="fa-regular fa-pen-to-square mx-2"></i>
                        </div>
                        <p className="card-text">Description : {note.description}</p>
                        <h6 className="card-text">Tag : {note.tag}</h6>
                    </div>
                </div>
            </div>
            <DeleteModal note={note}  modalId={`deleteModal-${note._id}`} />
        </>
    )
}
