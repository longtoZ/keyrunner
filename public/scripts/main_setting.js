function showPreview(event) {
    if(event.target.files.length > 0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.querySelector(".upload-img-preview");
        var body = document.querySelector('body')

        preview.src = src
        preview.style.display = "block"
        body.style.backgroundImage = `url(${src})`
        body.classList.add('background-show')

        const image_reader = new FileReader();

        image_reader.addEventListener('load', function() {
            console.log(image_reader.result)
            localStorage.setItem('uploaded-img', image_reader.result)
        })

        image_reader.readAsDataURL(event.target.files[0])
    }
}

// Close box when user click outside
function close_box() {
    document.querySelector('#modal-box').classList.remove('open')
} 

// Do not close box when user click inside
document.querySelector('.modal-container').addEventListener('click', function(event) {
    event.stopPropagation()
})