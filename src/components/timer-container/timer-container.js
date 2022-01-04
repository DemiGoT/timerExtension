import React from 'react'
import Header from "../header/header";

function TimerContainer({ handleLogout, monthTimeSpend, currentTimeSpend }) {

    return (
        <div className="container">
            <Header handleLogout={handleLogout} monthTimeSpend={monthTimeSpend} currentTimeSpend={currentTimeSpend} />
        </div>
    );
}

export default TimerContainer;
