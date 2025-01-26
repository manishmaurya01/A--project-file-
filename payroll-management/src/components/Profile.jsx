import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firebase Firestore import
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { auth } from "../firebase"; // Firebase auth import
import { useNavigate } from "react-router-dom"; // React Router for navigation
import '../css/Profile.css'; // Custom CSS for styling

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "mauryamanish13678@gmail.com",
    fullName: "Manish Maurya",
    phone: "8877556677",
    address: "2233445544",
    company: "Not provided",
    designation: "Not provided",
    department: "Not provided",
    joiningDate: "Not provided",
    employmentType: "Not provided",
    manager: "Not provided",
    workLocation: "Not provided",
    salary: "Not provided",
    bonus: "Not provided",
    salaryStructure: "Not provided",
    bankAccountDetails: "Not provided",
    leaveEntitlement: "Not provided",
    attendanceRecord: "Not provided",
    leaveHistory: "Not provided",
    qualifications: "Not provided",
    institutionName: "Not provided",
    yearOfGraduation: "Not provided",
    relevantSkills: "Not provided",
    previousEmployment: "Not provided",
    workExperience: "Not provided",
    panNumber: "Not provided",
    aadharNumber: "Not provided",
    pfNumber: "Not provided",
    gratuity: "Not provided",
    insurance: "Not provided",
    taxDeclaration: "Not provided",
    emergencyContact: "Not provided",
    performanceReviews: "Not provided",
    goalsAndKPIs: "Not provided",
    promotionHistory: "Not provided",
    trainingAndCertifications: "Not provided",
    achievements: "Not provided",
    resignationDate: "Not provided",
    exitInterview: "Not provided",
    lastWorkingDay: "Not provided",
    reasonForLeaving: "Not provided",
    healthAndSafety: "Not provided",
    accommodationDetails: "Not provided",
    workEquipmentIssued: "Not provided",
  });

  const [loading, setLoading] = useState(true);

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
          const data = docSnap.data();
          setUserData({
            email: data.email || "Not provided",
            fullName: data.fullName || "Not provided",
            dob: data.dob || "Not provided",
            maritalStatus: data.maritalStatus || "Not provided",
            gender: data.gender || "Not provided",
            phone: data.phone || "Not provided",
            address: data.address || "Not provided",
            company: data.company || "Not provided",
            designation: data.designation || "Not provided",
            department: data.department || "Not provided",
            joiningDate: data.joiningDate || "Not provided",
            employmentType: data.employmentType || "Not provided",
            manager: data.manager || "Not provided",
            workLocation: data.workLocation || "Not provided",
            salary: data.salary || "Not provided",
            bonus: data.bonus || "Not provided",
            salaryStructure: data.salaryStructure || "Not provided",
            bankAccountDetails: data.bankAccountDetails || "Not provided",
            leaveEntitlement: data.leaveEntitlement || "Not provided",
            attendanceRecord: data.attendanceRecord || "Not provided",
            leaveHistory: data.leaveHistory || "Not provided",
            qualifications: data.qualifications || "Not provided",
            institutionName: data.institutionName || "Not provided",
            yearOfGraduation: data.yearOfGraduation || "Not provided",
            relevantSkills: data.relevantSkills || "Not provided",
            previousEmployment: data.previousEmployment || "Not provided",
            workExperience: data.workExperience || "Not provided",
            panNumber: data.panNumber || "Not provided",
            aadharNumber: data.aadharNumber || "Not provided",
            pfNumber: data.pfNumber || "Not provided",
            gratuity: data.gratuity || "Not provided",
            insurance: data.insurance || "Not provided",
            taxDeclaration: data.taxDeclaration || "Not provided",
            emergencyContact: data.emergencyContact || "Not provided",
            performanceReviews: data.performanceReviews || "Not provided",
            goalsAndKPIs: data.goalsAndKPIs || "Not provided",
            promotionHistory: data.promotionHistory || "Not provided",
            trainingAndCertifications: data.trainingAndCertifications || "Not provided",
            achievements: data.achievements || "Not provided",
            resignationDate: data.resignationDate || "Not provided",
            exitInterview: data.exitInterview || "Not provided",
            lastWorkingDay: data.lastWorkingDay || "Not provided",
            reasonForLeaving: data.reasonForLeaving || "Not provided",
            healthAndSafety: data.healthAndSafety || "Not provided",
            accommodationDetails: data.accommodationDetails || "Not provided",
            workEquipmentIssued: data.workEquipmentIssued || "Not provided",
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false); // Stop loading after data fetch attempt
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-table">
        {/* Personal Information */}
        <h3>Personal Information</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Full Name:</strong></td>
              <td>{userData.fullName}</td>
            </tr>
            <tr>
              <td><strong>Date of Birth:</strong></td>
              <td>{userData.dob}</td>
            </tr>
            <tr>
              <td><strong>Gender:</strong></td>
              <td>{userData.gender}</td>
            </tr>
            <tr>
              <td><strong>Marital Status:</strong></td>
              <td>{userData.maritalStatus}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>{userData.address}</td>
            </tr>
            <tr>
              <td><strong>Phone Number:</strong></td>
              <td>{userData.phone}</td>
            </tr>
            <tr>
              <td><strong>Email Address:</strong></td>
              <td>{userData.email}</td>
            </tr>
          </tbody>
        </table>

        {/* Employment Information */}
        <h3>Employment Information</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Company:</strong></td>
              <td>{userData.company}</td>
            </tr>
            <tr>
              <td><strong>Job Title/Designation:</strong></td>
              <td>{userData.designation}</td>
            </tr>
            <tr>
              <td><strong>Department:</strong></td>
              <td>{userData.department}</td>
            </tr>
            <tr>
              <td><strong>Joining Date:</strong></td>
              <td>{userData.joiningDate}</td>
            </tr>
            <tr>
              <td><strong>Employment Type:</strong></td>
              <td>{userData.employmentType}</td>
            </tr>
            <tr>
              <td><strong>Manager/Supervisor:</strong></td>
              <td>{userData.manager}</td>
            </tr>
            <tr>
              <td><strong>Work Location:</strong></td>
              <td>{userData.workLocation}</td>
            </tr>
          </tbody>
        </table>

        {/* Salary and Compensation */}
        <h3>Salary and Compensation</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Salary:</strong></td>
              <td>{userData.salary}</td>
            </tr>
            <tr>
              <td><strong>Bonus/Commission:</strong></td>
              <td>{userData.bonus}</td>
            </tr>
            <tr>
              <td><strong>Salary Structure:</strong></td>
              <td>{userData.salaryStructure}</td>
            </tr>
            <tr>
              <td><strong>Bank Account Details:</strong></td>
              <td>{userData.bankAccountDetails}</td>
            </tr>
          </tbody>
        </table>

        {/* Additional Details */}
        <h3>Additional Information</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Leave Entitlement:</strong></td>
              <td>{userData.leaveEntitlement}</td>
            </tr>
            <tr>
              <td><strong>Attendance Record:</strong></td>
              <td>{userData.attendanceRecord}</td>
            </tr>
            <tr>
              <td><strong>Leave History:</strong></td>
              <td>{userData.leaveHistory}</td>
            </tr>
            <tr>
              <td><strong>Qualifications:</strong></td>
              <td>{userData.qualifications}</td>
            </tr>
            <tr>
              <td><strong>Institution Name:</strong></td>
              <td>{userData.institutionName}</td>
            </tr>
            <tr>
              <td><strong>Year of Graduation:</strong></td>
              <td>{userData.yearOfGraduation}</td>
            </tr>
            <tr>
              <td><strong>Relevant Skills:</strong></td>
              <td>{userData.relevantSkills}</td>
            </tr>
            <tr>
              <td><strong>Previous Employment:</strong></td>
              <td>{userData.previousEmployment}</td>
            </tr>
            <tr>
              <td><strong>Work Experience:</strong></td>
              <td>{userData.workExperience}</td>
            </tr>
            <tr>
              <td><strong>PAN Number:</strong></td>
              <td>{userData.panNumber}</td>
            </tr>
            <tr>
              <td><strong>Aadhar Number:</strong></td>
              <td>{userData.aadharNumber}</td>
            </tr>
            <tr>
              <td><strong>PF Number:</strong></td>
              <td>{userData.pfNumber}</td>
            </tr>
            <tr>
              <td><strong>Gratuity:</strong></td>
              <td>{userData.gratuity}</td>
            </tr>
            <tr>
              <td><strong>Insurance:</strong></td>
              <td>{userData.insurance}</td>
            </tr>
            <tr>
              <td><strong>Tax Declaration:</strong></td>
              <td>{userData.taxDeclaration}</td>
            </tr>
            <tr>
              <td><strong>Emergency Contact:</strong></td>
              <td>{userData.emergencyContact}</td>
            </tr>
            <tr>
              <td><strong>Performance Reviews:</strong></td>
              <td>{userData.performanceReviews}</td>
            </tr>
            <tr>
              <td><strong>Goals and KPIs:</strong></td>
              <td>{userData.goalsAndKPIs}</td>
            </tr>
            <tr>
              <td><strong>Promotion History:</strong></td>
              <td>{userData.promotionHistory}</td>
            </tr>
            <tr>
              <td><strong>Training and Certifications:</strong></td>
              <td>{userData.trainingAndCertifications}</td>
            </tr>
            <tr>
              <td><strong>Achievements:</strong></td>
              <td>{userData.achievements}</td>
            </tr>
            <tr>
              <td><strong>Resignation Date:</strong></td>
              <td>{userData.resignationDate}</td>
            </tr>
            <tr>
              <td><strong>Exit Interview:</strong></td>
              <td>{userData.exitInterview}</td>
            </tr>
            <tr>
              <td><strong>Last Working Day:</strong></td>
              <td>{userData.lastWorkingDay}</td>
            </tr>
            <tr>
              <td><strong>Reason for Leaving:</strong></td>
              <td>{userData.reasonForLeaving}</td>
            </tr>
            <tr>
              <td><strong>Health and Safety:</strong></td>
              <td>{userData.healthAndSafety}</td>
            </tr>
            <tr>
              <td><strong>Accommodation Details:</strong></td>
              <td>{userData.accommodationDetails}</td>
            </tr>
            <tr>
              <td><strong>Work Equipment Issued:</strong></td>
              <td>{userData.workEquipmentIssued}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button to navigate to EditProfile component */}
      <button onClick={() => navigate("/edit-profile")} className="edit-btn">
        Edit Profile
      </button>
      
      {/* Button to navigate to Dashboard */}
      <button onClick={() => navigate("/dashboard")} className="back-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
