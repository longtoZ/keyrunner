import { loadData } from "./handle_data.js"

const theme_options = document.querySelectorAll('.theme-container .option')

window.addEventListener('load', function() {
    const data_theme = localStorage.getItem('theme') == null ? 'default' : localStorage.getItem('theme') 
    const theme_select = document.querySelector(`.theme-container .${data_theme}`)

    theme_options.forEach(i => {i.classList.remove('active')})
    theme_select.classList.add('active')

    const data_obj = loadData()
    document.querySelector('.total-time .description').textContent = data_obj.time 
    document.querySelector('.total-words .description').textContent = data_obj.words
    document.querySelector('.total-race .description').textContent = data_obj.race
    document.querySelector('.average-accuracy .description').textContent = data_obj.accuracy
    document.querySelector('.average-speed .description').textContent = data_obj.speed
    document.querySelector('.highest-speed .description').textContent = data_obj.highest

})

theme_options.forEach(i => {
    i.addEventListener('click', function() {
        theme_options.forEach(j => {j.classList.remove('active')})

        this.classList.add('active')
        localStorage.setItem('theme', this.textContent.toLowerCase())

        location.reload()
    })
})