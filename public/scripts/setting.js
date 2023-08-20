const theme_options = document.querySelectorAll('.theme__box .option')

window.addEventListener('load', function() {
    const data_theme = localStorage.getItem('theme') == null ? 'default' : localStorage.getItem('theme') 
    const theme_select = document.querySelector(`.theme__box .${data_theme}`)

    theme_options.forEach(i => {i.classList.remove('active')})
    theme_select.classList.add('active')
})

theme_options.forEach(i => {
    i.addEventListener('click', function() {
        theme_options.forEach(j => {j.classList.remove('active')})

        this.classList.add('active')
        localStorage.setItem('theme', this.textContent.toLowerCase())
    })
})