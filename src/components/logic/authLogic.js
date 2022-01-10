/*global chrome*/

const keyTokenName = 'keyTimerToken';

export const getToken = async (value) => {

    const response = await fetch('https://timer.gearheart.io/api/users/login/', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });

    return response.json();
}

export const getUserInformation = async () => {
    const response = await fetch('https://timer.gearheart.io/api/users/me/', {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Csrftoken': 'QgLfAh9MfB9ZrMH89IiWyBCCI8CAuIuJelYgoQNJ4uA35itoiAZeCGJFOemtsUul'
        },
    })

    return response.json();
}

export const getTimeSpend = async () => {
    const response = await fetch('https://timer.gearheart.io/api/time-entries/tracking_state/', {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
    })

    return response.json();
}

export const setTokenStorage = (token) => {
    const tokenObj = {};
    tokenObj[keyTokenName] = token;
    chrome.storage.sync.set(tokenObj);
}

export const getTokenFromStorage = (callback) => {
    chrome.storage.sync.get([keyTokenName], (result) => {
        callback(result[keyTokenName]);
    });
}

export const getLastActivities = async () => {
    const response = await fetch('https://timer.gearheart.io/api/workspace/1/my_last_activities/', {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
    })

    return response.json();
}

export const getTaskDescription = async (id) => {
    const response = await fetch(`https://timer.gearheart.io/api/subtask/${id}/`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
    })

    return response.json();
}

export const getTrackingState = async () => {
    const response = await fetch('https://timer.gearheart.io/api/time-entries/tracking_state/', {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
    })

    return response.json();
}

export const startTrackingTask = async (value) => {

    const response = await fetch('https://timer.gearheart.io/api/time-entries/start_tracking/', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Csrftoken': 'QgLfAh9MfB9ZrMH89IiWyBCCI8CAuIuJelYgoQNJ4uA35itoiAZeCGJFOemtsUul'
        },
        body: JSON.stringify(value)
    });

    return response.json();
}

export const stopTrackingTask = async () => {

    const response = await fetch('https://timer.gearheart.io/api/time-entries/stop_tracking/', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
    });

    return response.json();
}