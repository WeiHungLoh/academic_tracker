import './ViewAssignment.css'
import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import DateFormatter from '../Formatter/DateFormatter.js'
import ShowNotesButton from '../Icons/ShowNotesButton.js'
import useFetchData from '../useFetchData.js'
import { useNavigate } from 'react-router-dom'

const ViewAssignment = () => {
    const navigate = useNavigate()
    const { data: assignments, refetch } = useFetchData(`${process.env.REACT_APP_API_URL}/assignments`)
    const [toggleNotes, setToggleNotes] = useState(false)
    const [status, setStatus] = useState('Show All')
    const [notes, setNotes] = useState({})
    const showTimeout = useRef({})

    const headers = [
        { label: 'Assignment', key: 'assignmentDesc' },
        { label: 'Assignment Due Date', key: 'dueDate' },
        { label: 'Status', key: 'status' },
        { label: 'Notes', key: 'notes' },
    ]

    const filteredAssignments = (assignments ?? []).filter(assignment => {
        if (status === 'Show All') {
            return true
        } else if (status === 'Completed') {
            return assignment.status
        } else {
            return !assignment.status
        }
    })

    const data = filteredAssignments.map(assignment => ({
        ...assignment,
        dueDate: DateFormatter(assignment.dueDate).formattedDate,
        notes: assignment.notes ? assignment.notes : 'N/A',
        status: assignment.status ? 'Completed' : 'Incomplete'
    }))

    const handleDelete = async (assignmentId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignments/${assignmentId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            // Refreshes UI to show remaining undeleted assignments
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignments`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            )

            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const toggleStatus = async (assignment) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/assignments/edit-status/${assignment._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ assignment })
            })

            // Refreshes UI to show assignments with new completion status
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleEditNotes = (assignmentId, editedNotes) => {
        setNotes({ ...notes, [assignmentId]: editedNotes })

        const taskId = showTimeout.current[assignmentId]
        if (taskId) {
            clearTimeout(taskId)
        }

        showTimeout.current[assignmentId] = setTimeout(async () => {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/assignments/edit-notes/${assignmentId}`,
                    {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ notes: editedNotes })
                    }
                )
            } catch (error) {
                alert(error.message)
            }
        }, 500)
    }

    const showAddAssignmentMessage = (assignments) => {
        return assignments && assignments.length === 0
    }

    const hasAssignments = (assignments) => {
        return assignments && assignments.length > 0
    }

    const checkStatus = (assignment) => {
        return assignment.status ? 'Completed' : 'Incomplete'
    }

    return (
        <div className='assignment-list'>
            <h2>Assignment Viewer</h2>

            <div className='filter-option'>
                <div>Filter by</div>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value='Show All'>Show All</option>
                    <option value='Completed'>Completed</option>
                    <option value='Incomplete'>Incomplete</option>
                </select>
            </div>

            {hasAssignments(filteredAssignments) &&
                <ShowNotesButton toggled={toggleNotes} onToggle={() => setToggleNotes(!toggleNotes)}
                />}

            {showAddAssignmentMessage(filteredAssignments) && <div>No assignment with that status found. Start adding one now! </div>}

            {filteredAssignments && filteredAssignments.map((assignment, index) => (
                <div className='assignment' key={assignment._id}>

                    <div className='assignment-content'>
                        <h2>{index + 1}. {assignment.assignmentDesc}</h2>
                        <p>Due Date: {DateFormatter(assignment.dueDate).formattedDate}</p>
                        <p>Time left: {DateFormatter(assignment.dueDate).timeRemaining}</p>
                        <p className={assignment.status ? 'complete' : 'incomplete'}>
                            Status: {checkStatus(assignment)}
                        </p>
                    </div>

                    <div className='button-group'>
                        <button onClick={() => toggleStatus(assignment)}
                            style={{ backgroundColor: assignment.status ? 'green' : '#f1356d' }}>
                            {assignment.status ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>
                        <button onClick={() => handleDelete(assignment._id)}>
                            Delete
                        </button>
                    </div>

                    {toggleNotes &&
                        <div className='notes'>
                            <textarea
                                value={notes[assignment._id] ?? assignment.notes}
                                onChange={e => handleEditNotes(assignment._id, e.target.value)}
                                placeholder='Add your notes here'
                            />
                        </div>
                    }
                </div>
            ))}

            <div className='assignment-button'>
                <button onClick={() => navigate('/addassignment')}>Add new assignment</button>
                {hasAssignments(filteredAssignments) && <>
                    <button onClick={() => handleDeleteAll()}>Delete all assignments</button>
                    <button>
                        <CSVLink
                            data={data}
                            headers={headers}
                            filename={'assignment-list.csv'}
                            style={{ color: 'white', textDecoration: 'none' }}
                        >
                            Export as CSV
                        </CSVLink>
                    </button>
                </>
                }
            </div>
        </div>
    )
}

export default ViewAssignment
