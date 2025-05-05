import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchData from "../useFetchData";
import DateFormatter from "../Formatter/DateFormatter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ViewAssignment = () => {
    const navigate = useNavigate();
    const { data: fetchedAssignments } = useFetchData("/assignment/view");
    const [assignments, setAssignments] = useState(null);

    // Refreshes UI whenever new assignments are fetched
    useEffect(() => {
        if (fetchedAssignments) {
            setAssignments(fetchedAssignments)
        };
    }, [fetchedAssignments]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/assignment/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
    
            const message = await res.text(); 
            if (!res.ok) {
                alert(message);
                return;
            }

            // Shows assignments that have not been deleted 
            setAssignments(assignments.filter(assignment => assignment._id != id));
        } catch (error) {
            alert(error.message);
        }
    };
    

    return (
        <div className="assignment-list">
            <h2>Assignment Tracker</h2>

            {assignments && assignments.map(assignment => (
                <div className="assignment" key={assignment._id}>

                    <div className="assignment-content">
                        <h2>{assignment.assignmentDesc}</h2>
                        <p>Due Date: {DateFormatter(assignment.dueDate).formattedDate}</p>
                        <p>Time left: {DateFormatter(assignment.dueDate).timeRemaining}</p>
                        <FontAwesomeIcon
                            icon={assignment.status ? faCheckCircle : faTimesCircle}
                            style={{ color: assignment.status ? '#28a745' : '#dc3545', marginRight: '8px' }}
                        />
                    </div>

                    <div className="button-group">
                        <button /*onClick={() => toggleStatus(assignment)}*/ style={{
                            backgroundColor: assignment.status ? 'green' : '#f1356d',
                            color: 'white',
                            border: '0',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>
                            {assignment.status ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>

                        <button onClick={() => handleDelete(assignment._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <div className="assignment-button">
                <button onClick={() => navigate('/addassignment')}>Add new assignment</button>
            </div>
        </div>
    );
}

export default ViewAssignment;