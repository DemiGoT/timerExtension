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
        // body: JSON.stringify({ email: 'kozachok.anton@gmail.io', password: '123' })
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
            'Content-Type': 'application/json',
            'Csrftoken': 'QgLfAh9MfB9ZrMH89IiWyBCCI8CAuIuJelYgoQNJ4uA35itoiAZeCGJFOemtsUul'
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
            'Content-Type': 'application/json',
            'Csrftoken': 'QgLfAh9MfB9ZrMH89IiWyBCCI8CAuIuJelYgoQNJ4uA35itoiAZeCGJFOemtsUul'
        },
    })

    return response.json();
}

export const getLastActivitiesDescription = async (id) => {
    const response = await fetch(`https://timer.gearheart.io/api/subtask/${id}/`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Csrftoken': 'QgLfAh9MfB9ZrMH89IiWyBCCI8CAuIuJelYgoQNJ4uA35itoiAZeCGJFOemtsUul'
        },
    })

    return response.json();
}