import React, { useState, useEffect } from "react";
import axios from "axios";

const CollegeForm = () => {
  const [colleges, setColleges] = useState([]); 
  const [selectedCollege, setSelectedCollege] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
  });

  useEffect(() => {
    axios.get("https://college-api-p2wx.onrender.com/api/colleges")
      .then((response) => {
        console.log(response.data.allCollege); 
        setColleges(response.data.allCollege); 
       
      })
      .catch((error) => {
        console.error("Error fetching colleges:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected College:", selectedCollege);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>College Enrollment Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Choose College:</label>
          <select
            name="college"
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            required
          >
            <option value="">-- Select College --</option>
            {colleges.length > 0 ? (
              colleges.map((college) => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))
            ) : (
              <option disabled>Loading colleges...</option>
            )}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CollegeForm;
