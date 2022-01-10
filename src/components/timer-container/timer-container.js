import React from 'react'
import Header from "../header/header";

function TimerContainer({ handleLogout, monthTimeSpend, currentTimeSpend, activities, lastActivities, currentTask }) {

    return (
        <div className="container">
            <Header handleLogout={handleLogout} monthTimeSpend={monthTimeSpend} currentTimeSpend={currentTimeSpend} activities={activities} lastActivities={lastActivities} currentTask={currentTask} />
        </div>
    );
}

export default TimerContainer;
