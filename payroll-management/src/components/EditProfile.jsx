import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firebase functions
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "../css/EditProfile.css"; // Custom CSS for styling

const EditProfile = () => {
  const navigate = useNavigate();

  // Initial state for storing form data
  const [userData, setUserData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    address: "",
    phone: "",
    email: "",
    company: "",
    designation: "",
    department: "",
    joiningDate: "",
    employmentType: "",
    manager: "",
    workLocation: "",
    salary: "",
    bonus: "",
    salaryStructure: "",
    bankAccountDetails: "",
    leaveEntitlement: "",
    attendanceRecord: "",
    leaveHistory: "",
    qualifications: "",
    institutionName: "",
    yearOfGraduation: "",
    relevantSkills: "",
    previousEmployment: "",
    workExperience: "",
    panNumber: "",
    aadharNumber: "",
    pfNumber: "",
    gratuity: "",
    insurance: "",
    taxDeclaration: "",
    emergencyContact: "",
    performanceReviews: "",
    goalsAndKPIs: "",
    promotionHistory: "",
    trainingAndCertifications: "",
    achievements: "",
    resignationDate: "",
    exitInterview: "",
    lastWorkingDay: "",
    reasonForLeaving: "",
    healthAndSafety: "",
    accommodationDetails: "",
    workEquipmentIssued: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the user data when the component is mounted
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/"); // Redirect to login if no user is logged in
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "employees", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "employees", auth.currentUser.uid);
    try {
      await updateDoc(userRef, userData);
      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect to profile after updating
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Error updating profile.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
          />
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
          />
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          />
          <label>Marital Status:</label>
          <input
            type="text"
            name="maritalStatus"
            value={userData.maritalStatus}
            onChange={handleChange}
          />
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Employment Information</h3>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={userData.company}
            onChange={handleChange}
          />
          <label>Job Title/Designation:</label>
          <input
            type="text"
            name="designation"
            value={userData.designation}
            onChange={handleChange}
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={userData.department}
            onChange={handleChange}
          />
          <label>Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            value={userData.joiningDate}
            onChange={handleChange}
          />
          <label>Employment Type:</label>
          <input
            type="text"
            name="employmentType"
            value={userData.employmentType}
            onChange={handleChange}
          />
          <label>Manager/Supervisor:</label>
          <input
            type="text"
            name="manager"
            value={userData.manager}
            onChange={handleChange}
          />
          <label>Work Location:</label>
          <input
            type="text"
            name="workLocation"
            value={userData.workLocation}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Salary and Compensation</h3>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={userData.salary}
            onChange={handleChange}
          />
          <label>Bonus/Commission:</label>
          <input
            type="text"
            name="bonus"
            value={userData.bonus}
            onChange={handleChange}
          />
          <label>Salary Structure:</label>
          <input
            type="text"
            name="salaryStructure"
            value={userData.salaryStructure}
            onChange={handleChange}
          />
          <label>Bank Account Details:</label>
          <input
            type="text"
            name="bankAccountDetails"
            value={userData.bankAccountDetails}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Leave and Attendance</h3>
          <label>Leave Entitlement:</label>
          <input
            type="text"
            name="leaveEntitlement"
            value={userData.leaveEntitlement}
            onChange={handleChange}
          />
          <label>Attendance Record:</label>
          <input
            type="text"
            name="attendanceRecord"
            value={userData.attendanceRecord}
            onChange={handleChange}
          />
          <label>Leave History:</label>
          <input
            type="text"
            name="leaveHistory"
            value={userData.leaveHistory}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Education and Skills</h3>
          <label>Qualifications:</label>
          <input
            type="text"
            name="qualifications"
            value={userData.qualifications}
            onChange={handleChange}
          />
          <label>Institution Name:</label>
          <input
            type="text"
            name="institutionName"
            value={userData.institutionName}
            onChange={handleChange}
          />
          <label>Year of Graduation:</label>
          <input
            type="text"
            name="yearOfGraduation"
            value={userData.yearOfGraduation}
            onChange={handleChange}
          />
          <label>Relevant Skills:</label>
          <input
            type="text"
            name="relevantSkills"
            value={userData.relevantSkills}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Employment History</h3>
          <label>Previous Employment:</label>
          <input
            type="text"
            name="previousEmployment"
            value={userData.previousEmployment}
            onChange={handleChange}
          />
          <label>Work Experience:</label>
          <input
            type="text"
            name="workExperience"
            value={userData.workExperience}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Other Information</h3>
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNumber"
            value={userData.panNumber}
            onChange={handleChange}
          />
          <label>Aadhar Number:</label>
          <input
            type="text"
            name="aadharNumber"
            value={userData.aadharNumber}
            onChange={handleChange}
          />
          <label>PF Number:</label>
          <input
            type="text"
            name="pfNumber"
            value={userData.pfNumber}
            onChange={handleChange}
          />
          <label>Gratuity:</label>
          <input
            type="text"
            name="gratuity"
            value={userData.gratuity}
            onChange={handleChange}
          />
          <label>Insurance:</label>
          <input
            type="text"
            name="insurance"
            value={userData.insurance}
            onChange={handleChange}
          />
          <label>Tax Declaration:</label>
          <input
            type="text"
            name="taxDeclaration"
            value={userData.taxDeclaration}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Emergency Contact & Reviews</h3>
          <label>Emergency Contact:</label>
          <input
            type="text"
            name="emergencyContact"
            value={userData.emergencyContact}
            onChange={handleChange}
          />
          <label>Performance Reviews:</label>
          <input
            type="text"
            name="performanceReviews"
            value={userData.performanceReviews}
            onChange={handleChange}
          />
          <label>Goals and KPIs:</label>
          <input
            type="text"
            name="goalsAndKPIs"
            value={userData.goalsAndKPIs}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Exit Information</h3>
          <label>Resignation Date:</label>
          <input
            type="date"
            name="resignationDate"
            value={userData.resignationDate}
            onChange={handleChange}
          />
          <label>Exit Interview:</label>
          <input
            type="text"
            name="exitInterview"
            value={userData.exitInterview}
            onChange={handleChange}
          />
          <label>Last Working Day:</label>
          <input
            type="date"
            name="lastWorkingDay"
            value={userData.lastWorkingDay}
            onChange={handleChange}
          />
          <label>Reason for Leaving:</label>
          <input
            type="text"
            name="reasonForLeaving"
            value={userData.reasonForLeaving}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Health and Safety</h3>
          <label>Health and Safety:</label>
          <input
            type="text"
            name="healthAndSafety"
            value={userData.healthAndSafety}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Accommodation Details</h3>
          <label>Accommodation Details:</label>
          <input
            type="text"
            name="accommodationDetails"
            value={userData.accommodationDetails}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Work Equipment</h3>
          <label>Work Equipment Issued:</label>
          <input
            type="text"
            name="workEquipmentIssued"
            value={userData.workEquipmentIssued}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>

      <button onClick={() => navigate("/profile")} className="back-btn">
        Back to Profile
      </button>
    </div>
  );
};

export default EditProfile;
