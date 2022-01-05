/*global chrome*/

import React, { useState, useEffect } from 'react'
import Auth from "../auth/auth";
import TimerContainer from '../timer-container/timer-container';
import { getTokenFromStorage, getToken, setTokenStorage, getUserInformation, getTimeSpend, getLastActivities, getLastActivitiesDescription } from '../logic/authLogic';

function TimerContainerWrapper() {

    const [logged, setLogged] = useState(false);
    const [monthTimeSpend, setMonthTimeSpend] = useState(null);
    const [currentTimeSpend, setCurrentTimeSpend] = useState(null);
    const [lastActivities, setLastActivities] = useState([])

    useEffect(() => {
        getUserInformation().then((response) => {
            console.log('User information: ', response);
        });

        getTimeSpend().then((response) => {
            setCurrentTimeSpend(secondsTohhmm(response.seconds_today));
            setMonthTimeSpend(secondsTohhmm(response.seconds_month));
        });

    }, [])

    const activities = () => {
        getLastActivities().then((response) => {
            Promise.all(response.map((item) => getLastActivitiesDescription(item.id))).then((data) => {
                const activitiesList = response.map((el) => {
                    el.name = data.find((act) => act.id === el.id).name;
                    return el;
                })
                setLastActivities(activitiesList);
            })
        });

    }

    const secondsTohhmm = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);

        let result = (hours < 10 ? "0" + hours : hours);
        result += ":" + (minutes < 10 ? "0" + minutes : minutes);
        return result;
    }

    const handleParentClick = (inputValue) => {
        getToken(inputValue).then((response) => {
            // if(!response.ok){
            //     throw new Error(`Error: ${response.detail}`);
            // }
            setTokenStorage(response);
            setLogged(true);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleLogout = () => {
        setLogged(false);
        chrome.storage.sync.clear();
    }

    getTokenFromStorage((token) => {
        if (token) {
            setLogged(true);
        }
    });

    return (
        <div className="timer-container">
            {!logged &&
                <Auth handleParentClick={handleParentClick} />
            }
            <TimerContainer handleLogout={handleLogout} monthTimeSpend={monthTimeSpend} currentTimeSpend={currentTimeSpend} activities={activities} lastActivities={lastActivities} />
        </div>
    );
}

export default TimerContainerWrapper;
