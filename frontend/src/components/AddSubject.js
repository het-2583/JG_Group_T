import React, { useState } from 'react';
import axios from 'axios';

const AddSubject = () => {
    const [subjectName, setSubjectName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/add-subject', {
                subject_name: subjectName
            });
            console.log(response.data);  // Log the response data
            setMessage(response.data.message);
            setSubjectName('');
        } catch (error) {
            console.error('Error submitting the form:', error);  // Log the error
            setMessage('Error adding subject');
        }
    };
    
    

    return (
        <div>
            <h2>Add Subject</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject Name:</label>
                    <input
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Subject</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSubject;
