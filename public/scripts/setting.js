import { loadData } from "./handle_data.js"

const theme_options = document.querySelectorAll('.theme-container .option')
const reset_setting = document.querySelector('.reset-setting-container .reset-setting')
const reset_achievement = document.querySelector('.reset-achievement-container .reset-setting')
const modal_box = document.querySelector('#modal-box')

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

reset_setting.addEventListener('click', function() {
    
})

reset_achievement.addEventListener('click', function() {
    modal_box.classList.add('open')

    modal_box.querySelectorAll('.modal-container .options > div').forEach(i => {
        i.addEventListener('click', function() {
            if (this.classList.contains('yes')) {
                if (localStorage.getItem('data')) {
                    localStorage.removeItem('data')

                    location.reload()
                }
            } else {
                modal_box.classList.remove('open')
                console.log('cancel')
            }
        })
    })


})