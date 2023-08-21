import { formatTotalTime } from "./format.js"

export function saveData(time, words, accuracy, speed) {
    let data_obj = {
        time: 0,
        words: 0,
        race: 0,
        accuracy: 0,
        speed: 0,
        highest: 0
    }
    
    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', JSON.stringify(data_obj))
    } else {
        data_obj = JSON.parse(localStorage.getItem('data'))
    }

    data_obj.time = parseInt(data_obj.time) + time
    data_obj.words = parseInt(data_obj.words) + words
    data_obj.race = parseInt(data_obj.race) + 1
    data_obj.accuracy = parseInt(data_obj.accuracy) == 0 ? accuracy : Math.round((parseInt(data_obj.accuracy) + accuracy)/2)
    data_obj.speed = parseInt(data_obj.speed) == 0 ? speed : Math.round((parseInt(data_obj.speed) + speed)/2)
    if (speed > data_obj.highest) { data_obj.highest = speed }

    localStorage.setItem('data', JSON.stringify(data_obj))
}

export function loadData() {
    let data_obj = {
        time: '0',
        words: '0',
        race: '0',
        accuracy: '0',
        speed: '0',
        highest: '0'
    }

    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', JSON.stringify(data_obj))
    } else {
        data_obj = JSON.parse(localStorage.getItem('data'))
        console.log(JSON.parse(localStorage.getItem('data')))
    }

    console.log(data_obj)
    data_obj.time = formatTotalTime(data_obj.time)

    return data_obj
}