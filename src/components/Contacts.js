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
      <div className="App">
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
      </div>
    </>
  );
};

export default Contacts;
