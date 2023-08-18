import { resetMetric } from './format.js'

restart_race.addEventListener('click', function() {
    // End interval and reset all values to default
    resetMetric()
    document.querySelector('.modes__selection .active').click()
    document.querySelector('.show > :not(.modes__selection):not(.words-source__selection) > .active').click()
    restart_race.classList.toggle('rotate')
})

modes_selection.forEach(i => {
    i.addEventListener('click', function() {

        text_container.classList.remove('hide')
        measure.classList.add('hide')
        modes_selection.forEach(j => {j.classList.remove('active')})

        this.classList.add('active')
        time_selection.classList.remove('show')
        word_source_selection.classList.remove('show')
        word_selection.classList.remove('show')
        quotes_selection.classList.remove('show')
        wikis_selection.classList.remove('show')

        if (this.classList.contains('time')) {

            time_elapsed.classList.remove('hide')
            word_elapsed.classList.add('hide')

            time_selection.classList.add('show')
            time_selection.querySelector('.selection').classList.add('active')

        } else if (this.classList.contains('word')) {

            time_elapsed.classList.add('hide')
            word_elapsed.classList.remove('hide')

            word_source_selection.classList.add('show')
            word_source_selection.querySelector('.selection').classList.add('active')
            word_selection.classList.add('show')
            word_selection.querySelector('.selection').classList.add('active')
        } else if (this.classList.contains('quote')) {

            time_elapsed.classList.add('hide')
            word_elapsed.classList.remove('hide')

            quotes_selection.classList.add('show')
            quotes_selection.querySelector('.selection').classList.add('active')
        } else if (this.classList.contains('wiki')) {
            console.log(this.classList)
            time_elapsed.classList.add('hide')
            word_elapsed.classList.remove('hide')

            wikis_selection.classList.add('show')
            wikis_selection.querySelector('.selection').classList.add('active')
        }


    })
})

selection.forEach(i => {
    i.addEventListener('click', function() {

        text_container.classList.remove('hide')
        measure.classList.add('hide')
        selection.forEach(j => {j.classList.remove('active')})

        if (!this.classList.contains('custom-number')) {
            custom__selection.classList.add('hide')
            options_container.classList.remove('expand')
        }

        this.classList.add('active')
    })
})

custom_number.forEach(i => {
    i.addEventListener('click', function() {
        custom__selection.classList.toggle('hide')
        options_container.classList.toggle('expand')
    })
})

options_minimize.addEventListener('click', function() {
    options_minimize.classList.toggle('close')
    options_container.classList.toggle('close')
})

window.addEventListener('load', () => restart_race.click())