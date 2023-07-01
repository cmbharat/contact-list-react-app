import React from "react";

const AddContact = ({ addContact }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addContact(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <>
      <h1 style={{ marginLeft: 100 }}>Add Contact</h1>
      <form
        className="form-inline"
        onSubmit={handleOnSubmit}
        style={{ width: 500 }}
      >
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          required
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
          required
        />

        <button type="submit" className="btn btn-primary mb-2">
          Add
        </button>
      </form>
    </>
  );
};

export default AddContact;
