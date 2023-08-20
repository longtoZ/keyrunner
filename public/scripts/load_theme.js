import { randint } from './format.js'


function loadTheme() {
    const body = document.querySelector('body')
    const data_theme = localStorage.getItem('theme')
    const html_theme = document.documentElement

    // Reset all to default
    if (document.querySelector('#gradient-area')) { document.querySelector('#gradient-area').remove()}
    if (document.querySelector('#shapes-area')) { document.querySelector('#shapes-area').remove()}

    html_theme.setAttribute('theme', data_theme)

    if (data_theme == 'glassmorphism') {
        const gradient_area = document.createElement('div')

        gradient_area.setAttribute('id', 'gradient-area')
        gradient_area.style.backgroundImage = `url(../img/gradient${randint(0,6)}.jpg)`

        body.appendChild(gradient_area)
    } else if (data_theme == 'neumorphism') {
        const shapes_area = document.createElement('div')

        shapes_area.setAttribute('id', 'shapes-area')

        for (let i=0; i<randint(5,15); i++) {
            const shape = document.createElement('div')

            shape.setAttribute('class', `shape`)

            const shape_size = randint(20, 100)
            shape.style.top= '50%'
            shape.style.left = `${randint(0, 100)}%`
            shape.style.width = `${shape_size}px`
            shape.style.height = `${shape_size}px`
            shape.style.animationDelay = `${randint(0,5)}s`
            shape.style.animationDuration = `${randint(20,30)}s`

            shapes_area.appendChild(shape)

        }

        body.appendChild(shapes_area)

    }
}

window.addEventListener('load', loadTheme)

if (document.querySelector('.theme__box .option')) {
    document.querySelectorAll('.theme__box .option').forEach(i => {
        i.addEventListener('click', loadTheme)
    })
}
