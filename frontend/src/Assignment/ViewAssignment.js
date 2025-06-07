import { useNavigate } from 'react-router-dom'
import useFetchData from '../useFetchData.js'
import DateFormatter from '../Formatter/DateFormatter.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ViewAssignment = () => {
    const navigate = useNavigate()
    const { data: assignments, refetch } = useFetchData(`${process.env.REACT_APP_API_URL}/assignment/view`)

    const handleDelete = async (assignmentId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignment/${assignmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            // Refreshes UI to show remaining undeleted assignments
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignment/deleteall`,
                {
                    method: 'DELETE',
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            refetch()
        } catch (error) {
            alert(error.message)
        }
     }

    const toggleStatus = async (assignment) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignment/togglestatus`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ assignment })
            })

            // Refreshes UI to show assignments with new completion status
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const showAddAssignmentMessage = (assignments) => {
        return assignments && assignments.length === 0
    }

    return (
        <div className='assignment-list'>
            <h2>Assignment Tracker</h2>

            {showAddAssignmentMessage(assignments) && <div>No assignment found. Start adding one now! </div>}

            {assignments && assignments.map(assignment => (
                <div className='assignment' key={assignment._id}>

                    <div className='assignment-content'>
                        <h2>{assignment.assignmentDesc}</h2>
                        <p>Due Date: { DateFormatter(assignment.dueDate).formattedDate }</p>
                        <p>Time left: { DateFormatter(assignment.dueDate).timeRemaining }</p>
                        <FontAwesomeIcon
                            icon={ assignment.status ? faCheckCircle : faTimesCircle }
                            style={{ color: assignment.status ? '#28a745' : '#dc3545', marginRight: '8px' }}
                        />
                    </div>

                    <div className='button-group'>
                        <button onClick={() => toggleStatus(assignment)}>
                            {assignment.status ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>
                        <button onClick={() => handleDelete(assignment._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <div className='assignment-button'>
                <button onClick={() => navigate('/addassignment')}>Add new assignment</button>
                <button onClick={() => handleDeleteAll()}>Delete all assignments</button>
            </div>
        </div>
    )
}

export default ViewAssignment
