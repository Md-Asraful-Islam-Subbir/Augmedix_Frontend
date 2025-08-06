import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DoctorSchedulePage.css'
const DoctorSchedulePage = () => {
  const { doctorId } = useParams();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/doctor/${doctorId}/schedule`);
        if (!res.ok) throw new Error("Failed to fetch schedule");
        const data = await res.json();
        setSchedules(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchedule();
  }, [doctorId]);

  return (
    <div className="doctor-schedule-page">
      <h2>Doctor Schedule</h2>
      {schedules.length === 0 ? (
        <p>No schedule found for this doctor.</p>
      ) : (
        schedules.map((schedule) => (
          <div key={schedule._id} className="schedule-card">
            <p>
              <strong>Valid From:</strong> {new Date(schedule.validFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Valid To:</strong> {new Date(schedule.validTo).toLocaleDateString()}
            </p>
            <p>
              <strong>Slot Duration:</strong> {schedule.slotDuration} min
            </p>

            <div className="days-list">
              {schedule.days.map((day, idx) => (
                <div key={idx} className="day-item">
                  {day.day && <strong>{day.day}:</strong>}{" "}
                  {day.startTime} - {day.endTime}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorSchedulePage;
