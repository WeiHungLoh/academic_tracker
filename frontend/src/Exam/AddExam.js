import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from "../Notification";

const AddAssignment = () => {
    const [examDesc, setExamDesc] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    const handleAdd = async e => {
        e.preventDefault();

        if (examDesc === '' || dueDate === '') {
            alert('Please enter assignment description and its due date before adding')
            return;
        }

        try {
            const res = await fetch('/exam/add',
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ examDesc, dueDate, duration })
                }
            );
            const message = res.text();
            setNotification(message);

            // Removes notification bar after 2 seconds
            setTimeout(() => {
                setNotification(null);
            }, 2000)
        } catch (error) {
            alert("Failed to add an assignment: " + error.message);
        }
    }

    return (
        <div className="add-exam">
            <h2>Welcome to Exam Tracker</h2>

            <label>Input exam description</label>
            <input
                value={examDesc}
                onChange={e => setExamDesc(e.target.value)}
                placeholder='Type your assignment description here'
                required
            />

            <label>Input due date and time</label>
            <input
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                type='datetime-local'
                required
            />

            <label>Input exam duration</label>
            <input
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder='Enter duration in minutes'
                type='number'
                required
            />

            <div className="submit-button">
                <button onClick={handleAdd}>Add exam</button>
                <button onClick={() => navigate('/viewexams')}>View exams</button>
            </div>
            <Notification message={notification} />
        </div>
    )
}

export default AddAssignment;