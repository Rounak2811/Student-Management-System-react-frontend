import { useState } from "react";
import { getStudents, deleteStudent } from "../services/StudentService";

function StudentList({ onEdit}) {
  const [students, setStudents] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchStudents = () => {
    getStudents().then((res) => {
      setStudents(res.data);
      setVisible(true);
    });
  };

  const handleDelete = (id) => {
    deleteStudent(id).then(() => {
      fetchStudents();
    });
  };

  return (
    <div className="card p-3 mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Students</h4>

        <button className="btn btn-primary" onClick={fetchStudents}>
          View Students
        </button>
      </div>

      {visible && (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>

                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
