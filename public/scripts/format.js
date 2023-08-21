import { saveData } from "./handle_data.js"

export function translateQuoteLength(type) {
    if (type == 'short') {
        return [0,50]
    } else if (type == 'medium') {
        return [50,100]
    } else {
        return [100,9999]
    }
}

export function randint(min, max) {
    return Math.floor(Math.random()*(max-min) + min)
}

export function formatSecond(s) {
    const minute = Math.floor(s / 60) < 10 ? `0${Math.floor(s/60)}` : Math.floor(s/60).toString()
    const second = Math.floor(s % 60) < 10 ? `0${Math.floor(s%60)}` : Math.floor(s%60).toString()

    return `${minute}:${second}`
}

export function formatTotalTime(s) {
    const hour = Math.floor(s / 3600) < 10 ? `0${Math.floor(s/3600)}` : Math.floor(s/3600).toString()
    const minute = Math.floor((s % 3600) / 60) < 10 ? `0${Math.floor((s%3600)/60)}` : Math.floor((s%3600)/60).toString()
    const second = Math.floor((s % 3600) % 60) < 10 ? `0${Math.floor((s%3600)%60)}` : Math.floor((s%3600)%60).toString()

    return `${hour}:${minute}:${second}`
}

export function average(lst) {
    return Math.round(lst.reduce((total, current) => total+current, 0) / lst.length)
}

export function resetMetric() {

    end_interval = true

    console.log(end_interval, ' in reset')

    metric.wpm = 0
    metric.cpm = 0
    metric.typed_chars_raw = 0
    metric.incorrect_raw = 0
    metric.typed_chars = 0
    metric.typed_words = 0
    metric.incorrect = 0
    metric.second = 0
    metric.speed_wpm = []
    metric.speed_cpm = []
    metric.accuracy = 100

    number_of_words = 0
    number_of_times = 0
    number_of_sentences = 0

    previous_position = 0
    scroll_times = 0

    quote_length = ''
    runner_type = 'word'

    words_display = []



}

export function updateMetric(type) {
    let second = 0
    if (type == 'word') {
        second = 0.5
        document.querySelector('.time-elapsed').classList.add('hide')
        document.querySelector('.word-elapsed').classList.remove('hide')
    } else if (type == 'time') {
        second = 1
        document.querySelector('.time-elapsed').classList.remove('hide')
        document.querySelector('.word-elapsed').classList.add('hide')
    }

    measure.classList.remove('finish')
    measure.style.width = ''

    document.querySelector('.accuracy').classList.add('hide')

    const interval = setInterval(function() {

        if (type == 'time' && (metric.second == number_of_times)) {
            end_interval = true
        }

        if (end_interval) {


            clearInterval(interval)
            end_interval = false

            // Hide text container
            text_container.classList.add('hide')

            // Open options panel
            options_minimize.click()

            // Enlarge the measure container
            measure.classList.add('finish')
            measure.style.width = '70%'

            // Print out the average result
            document.querySelector('.wpm b').textContent = average(metric.speed_wpm)
            document.querySelector('.cpm b').textContent = average(metric.speed_cpm)
            document.querySelector('.accuracy b').textContent = `${metric.accuracy}%`
            document.querySelector('.accuracy').classList.remove('hide')
            document.querySelector('.time-elapsed b').textContent = formatSecond(metric.second)
            document.querySelector('.word-elapsed b').textContent = metric.typed_words
            document.querySelector('.time-elapsed').classList.remove('hide')
            document.querySelector('.word-elapsed').classList.remove('hide')

            saveData(metric.second, metric.typed_words, metric.accuracy, average(metric.speed_wpm))

            // Reset to default
            resetMetric()

        }
    
        if (metric.second != 0) {
            metric.accuracy = Math.round((1 - (metric.incorrect_raw / metric.typed_chars_raw))*100)

            metric.wpm = Math.round(((metric.typed_chars-metric.incorrect) / 5) / (metric.second/60))
            metric.cpm = Math.round((metric.typed_chars-metric.incorrect) / (metric.second/60))

            metric.speed_wpm.push(metric.wpm)
            metric.speed_cpm.push(metric.cpm)
    
            document.querySelector('.wpm b').textContent = metric.wpm
            document.querySelector('.cpm b').textContent = metric.cpm
            document.querySelector('.incorrect-char b').textContent = metric.incorrect
            document.querySelector('.time-elapsed b').textContent = formatSecond(number_of_times - metric.second)
    
        }
    
        metric.second += second
    }, second*1000)
}