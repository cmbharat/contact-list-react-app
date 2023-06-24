import React from "react";
import "../styles/contact.css";

const ContactCard = ({ id, contact, deleteContact, updateContact }) => {
  //   console.log(contact);

  const handleDelete = () => {
    deleteContact(id);
  };
  const handleUpdate = () => {
    updateContact({ contact });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{contact.email}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{contact.phone}</h6>
        {/* <p className="card-text">{contact.address}</p> */}
        <button onClick={handleUpdate} className="btn btn-primary">
          Update
        </button>
        &nbsp;
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
