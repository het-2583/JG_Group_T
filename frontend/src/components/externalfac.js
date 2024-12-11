import React, { useState } from "react";  // Ensure useState is imported

const ExternalFacultyForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    faculty_name: "",
    faculty_subject: "",
    student_count: "",
    total_fees: "",
    payable_fees: "",
    paid_amount: "",
    remaining_amount: "",
  });

  // State for faculty data table
  const [facultyData, setFacultyData] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate remaining amount
    const updatedFormData = {
      ...formData,
      remaining_amount: formData.payable_fees - formData.paid_amount,
    };

    console.log("Submitting data:", updatedFormData); // Log data before sending

    try {
      const response = await fetch("http://localhost:3001/add-faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      
      console.log("API response status:", response.status);  // Log response status
      console.log("API response:", await response.text());   // Log the full response body
      
      if (response.ok) {
        alert("Faculty data added successfully!");
        setFacultyData([...facultyData, updatedFormData]);
        setFormData({
          faculty_name: "",
          faculty_subject: "",
          student_count: "",
          total_fees: "",
          payable_fees: "",
          paid_amount: "",
          remaining_amount: "",
        });
      } else {
        alert("Failed to add faculty data.");
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding faculty data.");
    }
  };

  return (
    <div className="faculty-form-container">
      <h2>External Faculty Form</h2>
      <form className="faculty-form" onSubmit={handleSubmit}>
        <label>
          Faculty Name:
          <input
            type="text"
            name="faculty_name"
            value={formData.faculty_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Faculty Subject:
          <input
            type="text"
            name="faculty_subject"
            value={formData.faculty_subject}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Student Count:
          <input
            type="number"
            name="student_count"
            value={formData.student_count}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Total Fees:
          <input
            type="number"
            name="total_fees"
            value={formData.total_fees}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Payable Fees:
          <input
            type="number"
            name="payable_fees"
            value={formData.payable_fees}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Paid Amount:
          <input
            type="number"
            name="paid_amount"
            value={formData.paid_amount}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Faculty</button>
      </form>

      <h3>Faculty Data</h3>
      {facultyData.length > 0 ? (
        <table className="faculty-table">
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>Faculty Subject</th>
              <th>Student Count</th>
              <th>Total Fees</th>
              <th>Payable Fees</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
            </tr>
          </thead>
          <tbody>
            {facultyData.map((data, index) => (
              <tr key={index}>
                <td>{data.faculty_name}</td>
                <td>{data.faculty_subject}</td>
                <td>{data.student_count}</td>
                <td>{data.total_fees}</td>
                <td>{data.payable_fees}</td>
                <td>{data.paid_amount}</td>
                <td>{data.remaining_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No faculty data available.</p>
      )}
    </div>
  );
};

export default ExternalFacultyForm;
