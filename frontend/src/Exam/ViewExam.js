import './ViewExam.css'
import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import DateFormatter from '../Formatter/DateFormatter.js'
import ShowNotesButton from '../Icons/ShowNotesButton.js'
import useFetchData from '../useFetchData.js'
import { useNavigate } from 'react-router-dom'

const ViewExam = () => {
    const navigate = useNavigate()
    const { data: exams, refetch } = useFetchData(`${process.env.REACT_APP_API_URL}/exam/view`)
    const [toggleNotes, setToggleNotes] = useState(false)
    const [status, setStatus] = useState('Show All')
    const [notes, setNotes] = useState({})
    const showTimeout = useRef({})

    const headers = [
        { label: 'Exam', key: 'examDesc' },
        { label: 'Exam Date', key: 'dueDate' },
        { label: 'Exam Duration', key: 'duration' },
        { label: 'Status', key: 'status' },
        { label: 'Notes', key: 'notes' },
    ]

    const filteredExams = (exams ?? []).filter(exam => {
        if (status === 'Show All') {
            return true
        } else if (status === 'Completed') {
            return exam.status
        } else {
            return !exam.status
        }
    })

    const data = filteredExams.map(exam => ({
        ...exam,
        dueDate: DateFormatter(exam.dueDate).formattedDate,
        notes: exam.notes ? exam.notes : 'N/A',
        status: exam.status ? 'Completed' : 'Incomplete'
    }))

    const handleDelete = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            // Refreshes UI to show remaining undeleted exams
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/deleteall`,
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

    const toggleStatus = async (exam) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/togglestatus`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ exam })
            })

            // Refreshes UI to show exams with new completion status
            refetch()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleEditNotes = (examId, editedNotes) => {
        setNotes({ ...notes, [examId]: editedNotes })

        const taskId = showTimeout.current[examId]
        if (taskId) {
            clearTimeout(taskId)
        }

        showTimeout.current[examId] = setTimeout(async () => {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/exam/editnotes`,
                    {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ examId, notes: editedNotes })
                    }
                )
            } catch (error) {
                alert(error.message)
            }
        }, 500)
    }

    const checkStatus = (exam) => {
        return exam.status ? 'Completed' : 'Incomplete'
    }

    const showAddExamMessage = (exams) => {
        return exams && exams.length === 0
    }

    const hasExams = (exams) => {
        return exams && exams.length > 0
    }

    return (
        <div className='exam-list'>
            <h2>Exam Viewer</h2>

            <div className='filter-option'>
                <div>Filter by</div>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value='Show All'>Show All</option>
                    <option value='Completed'>Completed</option>
                    <option value='Incomplete'>Incomplete</option>
                </select>
            </div>

            {hasExams(filteredExams) &&
                <ShowNotesButton toggled={toggleNotes} onToggle={() => setToggleNotes(!toggleNotes)}
                />}

            {showAddExamMessage(filteredExams) && <div>No exam with that status found. Start adding one now!</div>}

            {filteredExams && filteredExams.map((exam, index) => (
                <div className='exam' key={exam._id}>

                    <div className='exam-content'>
                        <h2>{index + 1}. {exam.examDesc}</h2>
                        <p>Due Date: {DateFormatter(exam.dueDate).formattedDate}</p>
                        <p>Duration: {exam.duration} minutes</p>
                        <p>Time left: {DateFormatter(exam.dueDate).timeRemaining}</p>
                        <p className={exam.status ? 'complete' : 'incomplete'}>
                            Status: {checkStatus(exam)}
                        </p>
                    </div>

                    <div className='button-group'>
                        <button
                            onClick={() => toggleStatus(exam)}
                            style={{ backgroundColor: exam.status ? 'green' : '#f1356d' }}>
                            {exam.status ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>
                        <button onClick={() => handleDelete(exam._id)}>
                            Delete
                        </button>
                    </div>

                    {toggleNotes &&
                        <div className='notes'>
                            <textarea
                                value={notes[exam._id] ?? exam.notes}
                                onChange={e => handleEditNotes(exam._id, e.target.value)}
                                placeholder='Add your notes here'
                            />
                        </div>
                    }
                </div>
            ))}

            <div className='exam-button'>
                <button onClick={() => navigate('/addexam')}>Add new exam</button>
                {hasExams(filteredExams) && <>
                    <button onClick={() => handleDeleteAll()}>Delete all exams</button>
                    <button>
                        <CSVLink
                            data={data}
                            headers={headers}
                            filename={'exam-list.csv'}
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

export default ViewExam
