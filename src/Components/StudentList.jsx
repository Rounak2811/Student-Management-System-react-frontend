// import { useState } from "react";
// import { getStudents, deleteStudent } from "../services/StudentService";

// function StudentList({ onEdit }) {
//   const [students, setStudents] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [spinnerVisibility,setSpinnerVisibility]=useState(false);


//   const fetchStudents = () => {
//     setSpinnerVisibility(true);
//     setVisible(false);
//     getStudents().then((res) => {
//       setSpinnerVisibility(false);
//       setVisible(true);
//       setStudents(res.data);
//       setVisible(true);
//     });
//   };

//   const handleDelete = (id) => {
//     setSpinnerVisibility(true);
//     setVisible(false);
//     deleteStudent(id).then(() => {
//       setSpinnerVisibility(false);
//       setVisible(true);
//       fetchStudents();
//     });
//   };

//   return (
//     <div className="card p-3 mt-4">
//       <div className="d-flex justify-content-between mb-3 text-primary">
//         <h4>Students</h4>

//         <button className="btn btn-primary" onClick={fetchStudents}>
//           View Students
//         </button>
//       </div>
//       {spinnerVisibility && <div class="spinner-border text-primary" role="status">
//         <span class="visually-hidden">Loading...</span>
//       </div>}

//       {visible && (
//         <table className="table table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>

//                 <td>
//                   <button
//                     className="btn btn-warning me-2"
//                     onClick={() => onEdit(student)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(student.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default StudentList;

import { useState } from "react";
import { getStudents, deleteStudent } from "../services/StudentService";

const AVATAR_COLORS = ["#1f4b3f", "#c9a227", "#4c9a6a", "#b23a2e", "#6e7a70"];

function colorForName(name) {
  if (!name) return AVATAR_COLORS[0];
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function initialsForName(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [activeComponent, setActiveComponent] = useState('component');


  const fetchStudents = () => {
    setActiveComponent('spinner');
    getStudents().then((res) => {
      setActiveComponent('table');
      setStudents(res.data);
    });
  };

  const handleDelete = (id) => {
    setActiveComponent('spinner');
    deleteStudent(id).then(() => {
      setActiveComponent('component');
      setVisible(true);
      fetchStudents();
    });
  };

  return (
    <div className="ledger-card p-3 mt-4">
      {activeComponent === "component" && <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="ledger-eyebrow">Registry</span>
          <h4 className="mb-0">Students</h4>
        </div>

        <button className="btn btn-primary" onClick={fetchStudents}>
          View Students
        </button>
      </div>}

      {activeComponent === "spinner" && (
        <div className="spinner-row">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading students…
        </div>
      )}

      {activeComponent === "table" && (
        students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="fw-semibold">No students on record yet</div>
            <div className="small">Add your first student to get started.</div>
          </div>
        ) : (
          <div className="student-table-wrap">
            <table className="table student-table mb-0">
              <thead>
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
                    <td className="student-id-cell">#{student.id}</td>
                    <td>
                      <div className="student-name-cell">
                        <span
                          className="avatar-badge"
                          style={{ backgroundColor: colorForName(student.name) }}
                        >
                          {initialsForName(student.name)}
                        </span>
                        {student.name}
                      </div>
                    </td>
                    <td className="student-email-cell">{student.email}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => onEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default StudentList;

