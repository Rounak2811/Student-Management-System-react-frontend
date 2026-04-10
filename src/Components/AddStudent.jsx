import { useState } from "react";
import { createStudent } from "../services/StudentService";

function AddStudent({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const student = { name, email };

    createStudent(student).then(() => {
      setName("");
      setEmail("");
      refresh();
    });
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Add Student</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
