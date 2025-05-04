import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAssignment = () => {
    const [assignment, setAssignment] = useState('');
    const [assignmentDueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleAdd = async e => {
        e.preventDefault();
        const assignmentDesc = assignment.trim();
        const dueDate = assignmentDueDate.trim();

        if (assignmentDesc === '' || assignmentDueDate === '') {
            alert('Please enter assignment description and its due date before adding')
        }

        try {
            const res = await fetch('/assignment/add', 
                {
                    method: "POST",
                    headers: 
                    { 
                        "Content-Type": "application/json", 
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ assignmentDesc, dueDate })
                }
            );
            
            const message = res.text();
            if (!res.ok) {
                alert("Failed to add an assignment: " + message);
            }
            navigate("/viewassignment");
        } catch (error) {
            alert("Failed to add an assignment: " + error.message);
        }
    }
 
    return (
        <div className="add-assignment">
            <h2>Welcome to Assignment Tracker</h2>

            <label>Input assignment description</label>
            <input 
                value={assignment}
                onChange={e => setAssignment(e.target.value)}
                placeholder='Type your assignment description here'
                required
            />

            <label>Input due date and time</label>
            <input 
                value={assignmentDueDate}
                onChange={e => setDueDate(e.target.value)}
                type='datetime-local'
                required
            />

            <div className="submit-button">
                <button onClick={handleAdd}>Add assignment</button>
                <button onClick={() => navigate('/viewassignments')}>View assignments</button>
            </div>
        </div>
    )
}

export default AddAssignment;