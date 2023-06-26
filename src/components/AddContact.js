import React from "react";

const AddContact = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addContact(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  const addContact = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        console.log("add user to list========>", data);
      })
      .catch((err) => {
        console.log("error------->", err);
      });
  };

  return (
    <>
      <form className="form-inline" onSubmit={handleOnSubmit}>
        <label className="sr-only" for="inlineFormInputName2">
          Name
        </label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id="name"
          name="name"
          placeholder="Enter Your Name"
        />
        <label className="sr-only" for="inlineFormInputName2">
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
