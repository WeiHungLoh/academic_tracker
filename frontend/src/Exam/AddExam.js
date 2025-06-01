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
        const [year, month, day, hour, minute] = dueDate.split(/[-T:]/);
        // Decrements month by 1 since month starts from 0
        const localDate = new Date(year, month - 1, day, hour, minute);

        if (examDesc === '' || dueDate === '' || duration === '') {
            alert('Please enter assignment description, its due date and duration before adding')
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/exam/add`,
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ examDesc, dueDate: localDate, duration })
                }
            );
            const message = res.text();
            setNotification(message);

            // Resets exam form after successfully adding a new exam
            setExamDesc("");
            setDueDate("");
            setDuration("");

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