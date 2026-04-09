import { useState } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const triggerRefresh = () => setRefreshCounter(refreshCounter + 1);

  return (
    // This centers everything on the screen
    <div className="d-flex flex-column align-items-center mt-4 w-100">
      {/* This wrapper keeps the cards a nice, readable size */}
      <div className="w-100" style={{ maxWidth: "700px" }}>
        {/* 1. Add Student is on top */}
        <AddStudent refresh={triggerRefresh} />

        {/* 2. Edit Student appears here if a student is clicked */}
        {selectedStudent && (
          <EditStudent
            selectedStudent={selectedStudent}
            clearSelection={() => setSelectedStudent(null)}
            refreshList={triggerRefresh}
          />
        )}

        {/* 3. Student List is directly below */}
        <StudentList key={refreshCounter} onEdit={setSelectedStudent} />
      </div>
    </div>
  );
}

export default Dashboard;
