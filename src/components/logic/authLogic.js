/*global chrome*/

export const getToken = (value) => {

    return new Promise((resolve, reject) => {
        if (value.email === 'admin@gmail.com' && value.password === '111') {
            resolve('09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611');
        } else {
            reject(alert('Wrong password'));
        }
    })
}

export const storageWorker = (token) => {
    return chrome.storage.sync.set({ key: token }, function () {
        console.log('Value is set to ' + token);
    });
}