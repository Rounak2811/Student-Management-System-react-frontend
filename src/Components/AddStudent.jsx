// import { useState } from "react";
// import { createStudent } from "../services/StudentService";

// function AddStudent({ refresh }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [spinnerVisibility, setSpinnerVisibility] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSpinnerVisibility(true);
//     const student = { name, email };

//     createStudent(student).then(() => {
//       setSpinnerVisibility(false);
//       setName("");
//       setEmail("");
//       refresh();
//     });
//   };

//   return (
//     <div className={`card p-3 mb-4 text-primary`}>
//       {spinnerVisibility && <div class="spinner-border text-primary" role="status">
//         <span class="visually-hidden">Loading...</span>
//       </div>}
//       <h4>Add Student</h4>

//       <form onSubmit={handleSubmit}>
//         <input
//           className="form-control mb-2"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="btn btn-primary">Add Student</button>
//       </form>
//     </div>
//   );
// }

// export default AddStudent;

import { useState } from "react";
import { createStudent } from "../services/StudentService";

function AddStudent({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinnerVisibility(true);
    const student = { name, email };

    createStudent(student).then(() => {
      setSpinnerVisibility(false);
      setName("");
      setEmail("");
      refresh();
    });
  };

  return (
    <div className="ledger-card p-3 mb-4">
      <span className="ledger-eyebrow">New entry</span>
      <h4>Add Student</h4>

      {spinnerVisibility && (
        <div className="spinner-row">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Saving…
        </div>
      )}

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
