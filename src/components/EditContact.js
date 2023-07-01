import React, { useState } from "react";

const EditContact = ({ editContact, user }) => {
  const [name, setName] = useState("");
  // setName(user.name);

  const [email, setEmail] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: e.target.name.value,
      email: e.target.email.value,
      id: e.target.id.value,
    };

    // editContact(name, email, contactid);
    editContact(updatedData);
  };

  return (
    <>
      <form className="form-inline" onSubmit={handleOnSubmit}>
        <label className="sr-only" htmlFor="id">
          Id
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="id"
          name="id"
          placeholder="Enter Your Name"
          value={user.id || ""}
          disabled="disabled"
        />

        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          value={user.name || ""}
          onChange={(e) => {
            console.log("inside onchange");
            user.name = e.target.value;
            setName(e.target.value);
          }}
        />
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={user.email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default EditContact;
