import React, { useEffect, useState } from "react";
import "../styles/contact.css";
import Table from "react-bootstrap/Table";
import AddContact from "./AddContact";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  //async function to call json placeholder

  const fetchData = async () => {
    setLoading(true);
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setUsers((users) => [...users, data]);
        console.log("add user to list========>", data);
      })
      .catch((err) => {
        console.log("error------->", err);
      });
  };

  const renderTableRows = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button
              onClick={() => deleteContact(user.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setUser(user);
              }}
              className="btn btn-success"
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  };

  const deleteContact = async (id) => {
    console.log("inside delete contact");
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    editContact(user);
  };

  const editContact = async (updatedData) => {
    console.log("inside editcontact--->", updatedData);
    await fetch(
      `https://jsonplaceholder.typicode.com/users/${updatedData.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        console.log("updated user========>", data);
        const newContacts = users.map((item) => {
          if (item.id === data.id) {
            const t = {
              id: data.id,
              ...data,
            };
            console.log("tttt", t);
            return t;
          }
          return item;
        });
        console.log("newContacts------->", newContacts);
        setUsers(newContacts);
        setShowAdd(true);
      })
      .catch((err) => {
        console.log("error------->", err);
      });
  };

  return (
    <>
      {showAdd ? (
        <AddContact addContact={addContact} />
      ) : (
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
              placeholder="Enter Your id"
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
              onChange={(e) =>
                setUser({
                  name: e.target.value,
                  email: user.email,
                  id: user.id,
                })
              }
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
              onChange={(e) =>
                setUser({
                  email: e.target.value,
                  name: user.name,
                  id: user.id,
                })
              }
            />

            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </>
      )}
      {loading ? (
        <h1>Loading</h1>
      ) : users.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </Table>
      ) : (
        <div>No Users</div>
      )}
    </>
  );
};

export default Contacts;
