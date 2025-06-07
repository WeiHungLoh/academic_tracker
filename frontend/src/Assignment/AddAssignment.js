import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../Notification.js'

const AddAssignment = () => {
    const [assignmentDesc, setAssignmentDesc] = useState('')
    const [dueDate, setDueDate] = useState('')
    const navigate = useNavigate()
    const [notification, setNotification] = useState(null)

    // datetime-local displays in the format of YYYY-MM-DDThh:mm:sssZ
    const [year, month, day, hour, minute] = dueDate.split(/[-T:]/)
    // Decrements month by 1 since month starts from 0
    const localDate = new Date(year, month - 1, day, hour, minute)

    const handleAdd = async e => {
        e.preventDefault()

        if (assignmentDesc === '' || dueDate === '') {
            alert('Please enter assignment description and its due date before adding')
            return
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/assignment/add`,
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ assignmentDesc, dueDate: localDate })
                }
            )
            const message = res.text()
            setNotification(message)

            // Resets assignment form after successfully adding a new assignment
            setAssignmentDesc('')
            setDueDate('')

            // Removes notification bar after 2 seconds
            setTimeout(() => {
                setNotification(null)
            }, 2000)
        } catch (error) {
            alert('Failed to add an assignment: ' + error.message)
        }
    }

    return (
        <div className='add-assignment'>
            <h2>Welcome to Assignment Tracker</h2>

            <label>Input assignment description</label>
            <input
                value={assignmentDesc}
                onChange={e => setAssignmentDesc(e.target.value)}
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

            <div className='submit-button'>
                <button onClick={handleAdd}>Add assignment</button>
                <button onClick={() => navigate('/viewassignments')}>View assignments</button>
            </div>
            <Notification message={notification} />
        </div>
    )
}

export default AddAssignment
