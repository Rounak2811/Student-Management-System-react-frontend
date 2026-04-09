import { useState, useEffect } from "react";
import { updateStudent } from "../services/StudentService";

function EditStudent({ selectedStudent, clearSelection, refreshList }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setEmail(selectedStudent.email);
    }
  }, [selectedStudent]);

  if (!selectedStudent) return null;

  const handleUpdate = (e) => {
    e.preventDefault();

    updateStudent(selectedStudent.id, {
      name: name,
      email: email,
    }).then(() => {
      alert("Student updated successfully");
      refreshList();
      clearSelection();
    });
  };

  return (
    <div className="card p-3 mt-4">
      <h4>Edit Student</h4>
  
      <form onSubmit={handleUpdate}>
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-success">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
