import React, { useEffect, useState } from "react";
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
      })
      .catch((err) => {
        console.log("error------->", err);
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

  const editContact = async (updatedData) => {
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
        const newContacts = users.map((item) => {
          if (item.id === data.id) {
            const updatedContact = {
              id: data.id,
              ...data,
            };
            return updatedContact;
          }
          return item;
        });
        setUsers(newContacts);
        setShowAdd(true);
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
            {showAdd ? (
              <button
                onClick={() => deleteContact(user.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            ) : (
              <></>
            )}
            &nbsp;&nbsp;
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    editContact(user);
  };

  return (
    <>
      {showAdd ? (
        <AddContact addContact={addContact} />
      ) : (
        <>
          <h1 style={{ marginLeft: 100 }}>Edit Contact</h1>
          <form
            className="form-inline"
            onSubmit={handleOnSubmit}
            style={{ width: 500 }}
          >
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
              Update
            </button>
          </form>
        </>
      )}
      <div className="contacts">
        <h1 className="contacts__title">My contacts</h1>

        {loading ? (
          <h1>Loading</h1>
        ) : users.length > 0 ? (
          <section className="contacts__section">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </Table>
          </section>
        ) : (
          <h2 className="contacts__title">No Users to Show....</h2>
        )}
      </div>
    </>
  );
};

export default Contacts;
