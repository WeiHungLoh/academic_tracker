import { useNavigate } from 'react-router-dom';
import useFetchData from "../useFetchData";
import DateFormatter from "../Formatter/DateFormatter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ViewExam = () => {
    const navigate = useNavigate();
    const { data: exams, refetch } = useFetchData(`${process.env.REACT_APP_API_URL}/exam/view`);
 
    const handleDelete = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Refreshes UI to show remaining undeleted exams
            refetch();
        } catch (error) {
            alert(error.message);
        }
    };

     const handleDeleteAll = async() => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/deleteall`,
                {
                    method: 'DELETE',
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            
            refetch();
        } catch (error) {
            alert(error.message);
        }
     }

    const toggleStatus = async (exam) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/exam/togglestatus`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ exam })
            });

            // Refreshes UI to show exams with new completion status
            refetch();
        } catch (error) {
            alert(error.message);
        }
    };

    const showAddExamMessage = (exams) => {
        return exams && exams.length === 0;
    }
    
    return (
        <div className="exam-list">
            <h2>Exam Tracker</h2>

            {showAddExamMessage(exams) && <div>No exam found. Start adding one now!</div>}

            {exams && exams.map(exam => (
                <div className="exam" key={exam._id}>

                    <div className="exam-content">
                        <h2>{exam.examDesc}</h2>
                        <p>Due Date: { DateFormatter(exam.dueDate).formattedDate }</p>
                        <p>Duration: { exam.duration } minutes</p>
                        <p>Time left: { DateFormatter(exam.dueDate).timeRemaining }</p>
                        <FontAwesomeIcon
                            icon={ exam.status ? faCheckCircle : faTimesCircle }
                            style={{ color: exam.status ? '#28a745' : '#dc3545', marginRight: '8px' }}
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={() => toggleStatus(exam)}>
                            {exam.status ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>
                        <button onClick={() => handleDelete(exam._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <div className="exam-button">
                <button onClick={() => navigate('/addexam')}>Add new exam</button>
                <button onClick={() => handleDeleteAll()}>Delete all exams</button>
            </div>
        </div>
    );
}

export default ViewExam;