import React, { useState } from 'react';
import axios from 'axios';

const AddStandard = () => {
    const [standardName, setStandardName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/add-standard', {
                standard_name: standardName,
            });
            console.log(response.data);  // Log the response for debugging
            setMessage(response.data.message);
            setStandardName('');
        } catch (error) {
            console.error('Error submitting the form:', error);  // Log the error for debugging
            setMessage('Error adding standard');
        }
    };

    
    
    return (
        <div>
            <h2>Add Standard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Standard Name:</label>
                    <input
                        type="text"
                        value={standardName}
                        onChange={(e) => setStandardName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Standard</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddStandard;
