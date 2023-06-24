import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import "../styles/contact.css";
import AddContact from "./AddContact";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  //async function to call json placeholder

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(users);
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

  const updateContact = async (contact) => {
    console.log("inside update");
  };

  return (
    <>
      <AddContact addContact={addContact} />
      <div className="grid-container">
        {users.map((user) => (
          <ContactCard
            key={user.id}
            id={user.id}
            contact={user}
            deleteContact={deleteContact}
            updateContact={updateContact}
          />
        ))}
      </div>
    </>
  );
};

export default Contacts;
