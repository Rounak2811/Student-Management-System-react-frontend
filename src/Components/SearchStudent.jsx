import { useState } from "react";
import { deleteStudent, searchStudentByName } from "../services/StudentService.js"
import EditStudent from "./EditStudent";

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
function SearchStudent({ onEdit }) {

    const [searchText, setSearchText] = useState('');
    const getSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const [studentList, setStudentList] = useState([]);
    const [activeComponent, setActiveComponent] = useState('table');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchSearchStudentDetails = () => {
        setActiveComponent("spinner");
        searchStudentByName(searchText).then((res) => {
            setStudentList(res.data);
            console.log(res.data);
            setActiveComponent('table');
        });

    }
    const handleDelete = (id) => {
        setActiveComponent('spinner');
        deleteStudent(id).then(() => {
            setActiveComponent('component');
            setVisible(true);
            fetchStudents();
        });
    };
    return (
        <>
            <h2 className="text-white">Search Student Here</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label text-white">Search Input</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com/Peter" onChange={getSearchText} />
            </div>
            <button type="button" className="btn btn-outline-info" onClick={fetchSearchStudentDetails}>Search</button>
            {activeComponent === "table" && (
                studentList.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <div className="fw-semibold">No students found with such property</div>
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
                                {studentList.map((student) => (
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
            {activeComponent === "spinner" && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </>
    )
}

export default SearchStudent;