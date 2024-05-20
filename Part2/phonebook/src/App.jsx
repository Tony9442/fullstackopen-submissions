import { useState, useEffect } from "react";
import phoneService from "./service/phonebookService";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Martin Fowler");
  const [newPhoneNumber, setNewPhoneNumber] = useState("0543111228");
  const [searchQuery, setSearchQuery] = useState("search bar");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // const addName = (event) => {
  //   event.preventDefault();

  //   // Check if the new name already exists in the phonebook
  //   const nameExists = persons.some((person) => person.name === newName);

  //   // // If the name already exists, alert the user and do not add the name
  //   if (nameExists) {
  //     alert(`${newName} is already in the phonebook.`);
  //     return;
  //   }

  //   // If the name does not exist, add it to the phonebook
  //   // const newPerson = {
  //   //   name: newName,
  //   //   phoneNumber: newPhoneNumber,
  //   // };
  //   // phoneService.create(newPerson).then((returnedPerson) => {
  //   //   setPersons([...persons, returnedPerson]);
  //   //   setNewName("");
  //   //   setNewPhoneNumber("");
  //   // });

  //   // Send a POST request to add the new contact to the backend
  //   // axios
  //   //   .post("http://localhost:3001/persons", {
  //   //     name: newName,
  //   //     phoneNumber: newPhoneNumber,
  //   //   })
  //   //   .then((response) => {
  //   //     // If the request is successful, update the state with the new contact
  //   //     setPersons([...persons, response.data]);
  //   //     setNewName("");
  //   //     setNewPhoneNumber("");
  //   //   })

  //   //    .catch(error => {
  //   //   // Handle error if the request fails
  //   //   console.error("Error adding new contact:", error);
  //   // });
  //   // Check if the new name already exists in the phonebook
  //   const existingPerson = persons.find((person) => person.name === newName);
  //   // If the name already exists, update the phone number
  //   if (existingPerson) {
  //     const updatedPerson = { ...existingPerson, phoneNumber: newPhoneNumber };
  //     phoneService
  //       .update(existingPerson.id, updatedPerson)
  //       .then(() => {
  //         setPersons(
  //           persons.map((person) =>
  //             person.id === existingPerson.id ? updatedPerson : person
  //           )
  //         );
  //         setNewName("");
  //         setNewPhoneNumber("");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating person:", error);
  //       });
  //   } else {
  //     // If the name does not exist, add it to the phonebook
  //     const newPerson = {
  //       name: newName,
  //       phoneNumber: newPhoneNumber,
  //     };
  //     phoneService.create(newPerson).then((returnedPerson) => {
  //       setPersons([...persons, returnedPerson]);
  //       setNewName("");
  //       setNewPhoneNumber("");
  //     })
  //     .catch((error) => {
  //       console.error("Error creating new person:", error);
  //       // Handle error creating the person
  //     });
  //   }
  // };

 const addName = (event) => {
   event.preventDefault();

   //   // Check if the new name already exists in the phonebook
    //  const nameExists = persons.some((person) => person.name === newName);

    // // If the name already exists, alert the user and do not add the name
    //  if (nameExists) {
    //    alert(`${newName} is already in the phonebook.`);
    //    return;
    //   }

   // Check if the name and phone number combination already exists in the phonebook
   const existingPersonIndex = persons.findIndex(
     (person) =>
       person.name === newName && person.phoneNumber === newPhoneNumber
   );

   // If the combination already exists, prompt the user to confirm updating the phone number
   if (existingPersonIndex !== -1) {
     const confirmUpdate = window.confirm(
       `The person ${newName} with the phone number ${newPhoneNumber} already exists. Do you want to update the phone number?`
     );

     // If the user confirms, update the phone number
      if (confirmUpdate) {
        const updatedPersons = [...persons];
        updatedPersons[existingPersonIndex].phoneNumber = newPhoneNumber;
        phoneService
          .update(
            updatedPersons[existingPersonIndex].id,
            updatedPersons[existingPersonIndex]
          )
          .then(() => {
            setPersons(updatedPersons);
            setNewName("");
            setNewPhoneNumber("");
            setSuccessMessage(`Phone number updated for ${newName}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
   } else {
     // If the combination does not exist, add it to the phonebook
     const newPerson = {
       name: newName,
       phoneNumber: newPhoneNumber,
     };
     phoneService
       .create(newPerson)
       .then((returnedPerson) => {
         setPersons([...persons, returnedPerson]);
         setNewName("");
         setNewPhoneNumber("");
         setSuccessMessage(`Added ${newName} to the phonebook`);
         setTimeout(() => {
           setSuccessMessage(null);
         }, 5000);
       })
       .catch((error) => {
         console.error("Error creating new person:", error);
       });
   }
 };




 const handleDelete = (id) => {
   if (window.confirm("Are you sure you want to delete this contact?")) {
     phoneService.remove(id)
       .then(() => {
         setPersons(persons.filter((person) => person.id !== id));
       })
       .catch((error) => {
         console.error("Error deleting person:", error);
         // Handle the error here, for example, by displaying an error message
         setErrorMessage("Error deleting person.")
         setTimeout(() => {
           setErrorMessage(null);
         }, 5000); // Clear the message after 5 seconds
       });
   }
 };


  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const changeNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Filter the persons array based on the search query

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} /> {/* Use errorMessage here */}
      {successMessage && <div className="success">{successMessage}</div>}
      <Filter value={searchQuery} onChange={handleSearchChange} />
      <h2>add new number</h2>
      <Form
        addName={addName}
        newName={newName}
        handleChange={handleChange}
        newPhoneNumber={newPhoneNumber}
        changeNumber={changeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} handleDeleteOf={handleDelete} />
    </div>
  );
};

export default App;
