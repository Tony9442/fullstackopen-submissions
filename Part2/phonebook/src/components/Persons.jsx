import React from "react";

const Person = ({ persons, handleDeleteOf }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id} className="note">
          {person.name} - {person.phoneNumber}{" "}
          <button onClick={handleDeleteOf}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Person;
