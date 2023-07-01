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
      <form className="form-inline" onSubmit={handleOnSubmit}>
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="name"
          name="name"
          placeholder="Enter Your Name"
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
        />

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddContact;
