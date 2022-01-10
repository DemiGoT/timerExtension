/*global chrome*/

import React, { useState, useEffect } from 'react'
import Auth from "../auth/auth";
import TimerContainer from '../timer-container/timer-container';
import { getTokenFromStorage, getToken, setTokenStorage, getUserInformation, getTimeSpend, getLastActivities, getTaskDescription, getTrackingState, startTrackingTask } from '../logic/authLogic';

function TimerContainerWrapper() {

    const [logged, setLogged] = useState(false);
    const [monthTimeSpend, setMonthTimeSpend] = useState(null);
    const [currentTimeSpend, setCurrentTimeSpend] = useState(null);
    const [lastActivities, setLastActivities] = useState([])
    const [currentTask, setCurrentTast] = useState(null);

    useEffect(() => {
        getUserInformation().then((response) => {
            console.log('User information: ', response);
        });

        getTimeSpend().then((response) => {
            setCurrentTimeSpend(secondsTohhmm(response.seconds_today));
            setMonthTimeSpend(secondsTohhmm(response.seconds_month));
        });

        showCurrentTask();

    }, [])

    const showCurrentTask = () => {
        getTrackingState().then((response) => {
            getTaskDescription(response.target.id).then((value) => {
                const item = {
                    activity: response.activity,
                    name: value.name
                }
                setCurrentTast(item);
            })
        }).catch((error) => {
            console.log("Error: ", error);
        })
    }

    const activities = () => {
        getLastActivities().then((response) => {
            Promise.all(response.map((item) => getTaskDescription(item.id))).then((data) => {
                const activitiesList = response.map((el) => {
                    el.name = data.find((act) => act.id === el.id).name;
                    return el;
                })
                setLastActivities(activitiesList);
            })
        })
    }

    // const startTracking = (item) => {
    //     const newObj = {
    //         activity: item.activity,
    //         target: {
    //             type: item.type,
    //             id: item.id
    //         }
    //     }

    //     console.log("currentTask: ", newObj);

    //     startTrackingTask(newObj).then((response) => {
    //         console.log("response: ", response)
    //     })

    // }

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
            <TimerContainer handleLogout={handleLogout} monthTimeSpend={monthTimeSpend} currentTimeSpend={currentTimeSpend} activities={activities} lastActivities={lastActivities} currentTask={currentTask} />
        </div>
    );
}

export default TimerContainerWrapper;
