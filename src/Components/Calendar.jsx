import React, { useState } from "react";
import styles from "./calendar.scss";

export default function Calendar({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    const currentDate = selectedDate;
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const currentDate = selectedDate;
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderDays = () => {
    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() - monthStart.getDay());
    const endDate = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate() + (6 - monthEnd.getDay()));
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    }
    return days.map((day) => {
      const classNames = ["day"];
      if (day.getMonth() !== selectedDate.getMonth()) {
        classNames.push("day--inactive");
      }
      if (day.getTime() === new Date().setHours(0, 0, 0, 0)) {
        classNames.push("day--today");
      }
      if (day.getTime() === selectedDate.getTime()) {
        classNames.push("day--selected");
      }
      return (
        <div className={classNames.join(" ")} key={day.getTime()} onClick={() => {
          handleDateClick(day);
          onChange(day);
        }}>
          {day.getDate()}
        </div>
      );
    });
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__prev" onClick={handlePrevMonth}>
          &#8249;
        </div>
        <div className="calendar__current">
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </div>
        <div className="calendar__next" onClick={handleNextMonth}>
          &#8250;
        </div>
      </div>
      <div className="calendar__weekdays">
        {weekdays.map((weekday) => (
          <div className="weekday" key={weekday}>
            {weekday}
          </div>
        ))}
      </div>
      <div className="calendar__days">{renderDays()}</div>
      {selectedDate && <div>Выбранная дата: {selectedDate.toLocaleDateString()}</div>}
    </div>
  );
};

