import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firestore and auth
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // For tracking user authentication

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [user, setUser] = useState(null); // Track current logged-in user

  const userCollection = collection(db, "attendance");

  // Fetch attendance records and listen for authentication state change
  useEffect(() => {
    // Get the current user from Firebase Auth
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state when logged in
      } else {
        setUser(null); // Clear user state when logged out
      }
    });

    // Fetch attendance records in real-time
    const unsubscribeFirestore = onSnapshot(userCollection, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceRecords(records);
    });

    // Clean up both subscriptions
    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  // Handle punch-in action
  const handlePunchIn = async () => {
    if (!user) {
      alert("Please log in to punch in.");
      return;
    }

    const now = Timestamp.fromDate(new Date());
    const session = { userId: user?.uid, punchIn: now, punchOut: null };
    setCurrentSession(session);
    setIsPunchedIn(true);

    try {
      const docRef = await addDoc(userCollection, session);
      setCurrentSession({ ...session, id: docRef.id });
    } catch (error) {
      console.error("Error adding punch-in: ", error);
    }
  };

  // Handle punch-out action
  const handlePunchOut = async () => {
    if (!currentSession) return;

    const now = Timestamp.fromDate(new Date());
    try {
      const updatedSession = { ...currentSession, punchOut: now };
      await addDoc(userCollection, updatedSession);
      setIsPunchedIn(false);
      setCurrentSession(null);
    } catch (error) {
      console.error("Error adding punch-out: ", error);
    }
  };

  // Group attendance records by date
  const groupByDate = (records) => {
    const grouped = {};
    records.forEach((record) => {
      const date = record.punchIn?.toDate().toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(record);
    });
    return grouped;
  };

  // Get today's date in "MM/DD/YYYY" format
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString();
  };

  const groupedRecords = groupByDate(attendanceRecords);

  return (
    <div className="attendance">
      <h2>Track Your Attendance</h2>
      <div>
        {isPunchedIn ? (
          <button onClick={handlePunchOut}>Punch Out</button>
        ) : (
          <button onClick={handlePunchIn}>Punch In</button>
        )}
      </div>

      {/* Display Today's Attendance */}
      <h3>Today's Attendance</h3>
      {groupedRecords[getTodayDate()] ? (
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Duration (hh:mm:ss)</th>
            </tr>
          </thead>
          <tbody>
            {groupedRecords[getTodayDate()].map((record, index) => {
              const punchInTime = record.punchIn?.toDate();
              const punchOutTime = record.punchOut?.toDate();

              let duration = null;
              if (punchInTime && punchOutTime) {
                const diffInSeconds = Math.floor(
                  (punchOutTime - punchInTime) / 1000
                );
                const hours = Math.floor(diffInSeconds / 3600);
                const minutes = Math.floor((diffInSeconds % 3600) / 60);
                const seconds = diffInSeconds % 60;
                duration = `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
              }

              return (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{punchInTime?.toLocaleString()}</td>
                  <td>{punchOutTime?.toLocaleString() || "In Progress"}</td>
                  <td>{duration || "In Progress"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No attendance records for today.</p>
      )}

      {/* Display Attendance for Other Dates */}
      <h3>Attendance for Other Dates</h3>
      {Object.keys(groupedRecords).map((date) => {
        if (date !== getTodayDate()) {
          return (
            <div key={date}>
              <h4>{date}</h4>
              <table border="1">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Punch In</th>
                    <th>Punch Out</th>
                    <th>Duration (hh:mm:ss)</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedRecords[date].map((record, index) => {
                    const punchInTime = record.punchIn?.toDate();
                    const punchOutTime = record.punchOut?.toDate();

                    let duration = null;
                    if (punchInTime && punchOutTime) {
                      const diffInSeconds = Math.floor(
                        (punchOutTime - punchInTime) / 1000
                      );
                      const hours = Math.floor(diffInSeconds / 3600);
                      const minutes = Math.floor((diffInSeconds % 3600) / 60);
                      const seconds = diffInSeconds % 60;
                      duration = `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                    }

                    return (
                      <tr key={record.id}>
                        <td>{index + 1}</td>
                        <td>{punchInTime?.toLocaleString()}</td>
                        <td>{punchOutTime?.toLocaleString() || "In Progress"}</td>
                        <td>{duration || "In Progress"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Attendance;
