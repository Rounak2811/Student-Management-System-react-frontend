// import { useState } from "react";
// import StudentList from "./StudentList";
// import AddStudent from "./AddStudent";
// import EditStudent from "./EditStudent";

// function Dashboard() {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [refreshCounter, setRefreshCounter] = useState(0);

//   const triggerRefresh = () => setRefreshCounter(refreshCounter + 1);

//   return (
//     // This centers everything on the screen
//     <div className="d-flex flex-column align-items-center mt-4 w-100">
//       {/* This wrapper keeps the cards a nice, readable size */}
//       <div className="w-100" style={{ maxWidth: "700px" }}>
//         {/* 1. Add Student is on top */}
//         <AddStudent refresh={triggerRefresh} />

//         {/* 2. Edit Student appears here if a student is clicked */}
//         {selectedStudent && (
//           <EditStudent
//             selectedStudent={selectedStudent}
//             clearSelection={() => setSelectedStudent(null)}
//             refreshList={triggerRefresh}
//           />
//         )}

//         {/* 3. Student List is directly below */}
//         <StudentList key={refreshCounter} onEdit={setSelectedStudent} />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useState, useEffect } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import { getStudents } from "../services/StudentService"; // <-- Import the API service

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Centralized fetch function
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the Dashboard first loads
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    // This centers everything on the screen
    <div className="d-flex flex-column align-items-center mt-4 w-100">
      {/* This wrapper keeps the cards a nice, readable size */}
      <div className="w-100" style={{ maxWidth: "700px" }}>
        {/* 1. Add Student is on top */}
        {/* Pass fetchStudents so the list updates after a new student is added */}
        <AddStudent refreshList={fetchStudents} />

        {/* 2. Edit Student appears here if a student is clicked */}
        {selectedStudent && (
          <EditStudent
            selectedStudent={selectedStudent}
            clearSelection={() => setSelectedStudent(null)}
            refreshList={fetchStudents}
          />
        )}

        {/* 3. Student List with Loading Spinner */}
        <div className="mt-4">
          <h3 className="mb-3">Students</h3>

          {isLoading ? (
            <div className="d-flex flex-column align-items-center justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Fetching students...</p>
            </div>
          ) : (
            <StudentList students={students} onEdit={setSelectedStudent} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
