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
            shape.style.top= '60%'
            shape.style.left = `${randint(0, 100)}%`
            shape.style.width = `${shape_size}px`
            shape.style.height = `${shape_size}px`
            shape.style.animationDelay = `${randint(0,5)}s`
            shape.style.animationDuration = `${randint(20,30)}s`

            shapes_area.appendChild(shape)

        }

        body.appendChild(shapes_area)

    } else if (data_theme == 'background') {
        if (document.querySelector('.background-upload-container')) {
            document.querySelector('.background-upload-container').classList.remove('hide')
        }

        const uploaded_img = localStorage.getItem('uploaded-img')

        if (uploaded_img) {
            const body = document.querySelector('body')
            const preview = document.querySelector(".upload-img-preview");

            if(preview) {
                preview.src = uploaded_img
                preview.style.display = "block"
            }

            body.style.backgroundImage = `url(${uploaded_img})`
            body.classList.add('background-show')
        }
    }
}

window.addEventListener('load', loadTheme)
