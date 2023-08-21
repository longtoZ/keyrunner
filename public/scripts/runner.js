import { translateQuoteLength, randint, formatSecond, updateMetric, resetMetric } from "./format.js"
import { getRandomPage, getPageIntro } from './wikipedia.js'

time_option.forEach(i => {
    i.addEventListener('click', function() {
        resetMetric()
        runner_type = 'time'
        text_display.innerHTML = ''

        // Generate random number of words
        if (this.classList.contains('random')) {
            number_of_times = randint(20, 60)
        } else if (this.classList.contains('custom-number')) {
            number_of_times = parseInt(custom_input.value)
        } else {
            number_of_times = parseInt(this.textContent)
        }

        if (number_of_times != 0) {
            
            // Set total time
            document.querySelector('.time-elapsed b').textContent = formatSecond(number_of_times)

            // Add cursor
            const cursor = document.createElement('div')
            cursor.setAttribute('class', 'cursor')
            text_display.appendChild(cursor)

            // Choose words from data array
            fetch('../data/words.json').then((res) => res.json()).then((json) => {
                const dict_lst = json.dictionary
                const dict_length = json.dictionary.length
                for (let j=0; j<init_word_for_time; j++) {
                    words_display.push(dict_lst[randint(0, dict_length+1+1)])
                }

            }).then(() => {
                // Assign words to element
                for (const j of words_display) {
                    const word = document.createElement('div')
                    word.setAttribute('class', 'word')

                    for (const k of j.split('')) {
                        const letter = document.createElement('letter')
                        letter.textContent = k.trim().toLowerCase()
                        word.appendChild(letter)
                    }

                    text_display.appendChild(word)
                }

                // Set active for first word
                document.querySelector('.text__display .word').classList.add('word-active')
            })

            
        }
    })
})

word_source_option.forEach(i => {
    i.addEventListener('click', function() {
        word_source_option.forEach(j => {j.classList.remove('active')})
        this.classList.add('active')

        if (this.classList.contains('from-dictionary')) {
            source_type = "dictionary"
        } else if (this.classList.contains('from-google')) {
            source_type = "google"
        }
    })
})

word_option.forEach(i => {
    i.addEventListener('click', function() {
        resetMetric()
        text_display.innerHTML = ''

        // Generate random number of words
        if (this.classList.contains('random')) {
            number_of_words = randint(20, 50)
        } else if (this.classList.contains('custom-number')) {
            number_of_words = parseInt(custom_input.value)
        } else {
            number_of_words = parseInt(this.textContent)
        }

        if (number_of_words != 0) {
            
            // Set total words
            document.querySelector('.word-elapsed b').textContent = `0/${number_of_words}`

            // Add cursor
            const cursor = document.createElement('div')
            cursor.setAttribute('class', 'cursor')
            text_display.appendChild(cursor)

            // Choose words from data array
            fetch('../data/words.json').then((res) => res.json()).then((json) => {
                if (source_type == 'dictionary') {
                    const dict_lst = json.dictionary
                    const dict_length = json.dictionary.length
                    for (let j=0; j<number_of_words; j++) {
                        words_display.push(dict_lst[randint(0, dict_length+1+1)])
                    }
                } else if (source_type == 'google') {
                    const google_lst = json.google
                    for (let j=0; j<number_of_words; j++) {
                        let length_choice = randint(0, 3) // return 0 or 1 or 2
        
                        if (length_choice == 0) {
                            words_display.push(google_lst.short[randint(0, google_lst.short.length+1)])
                        } else if (length_choice == 1) {
                            words_display.push(google_lst.medium[randint(0, google_lst.medium.length+1)])
                        } else {
                            words_display.push(google_lst.long[randint(0, google_lst.long.length+1)])
                        }
                    }
                }
            }).then(() => {
                for (const j of words_display) {
                    const word = document.createElement('div')
                    word.setAttribute('class', 'word')
    
                    for (const k of j.split('')) {
                        const letter = document.createElement('letter')
                        letter.textContent = k.trim().toLowerCase()
                        word.appendChild(letter)
                    }
    
                    text_display.appendChild(word)
                }
    
                // Set active for first word
                document.querySelector('.text__display .word').classList.add('word-active')
            })

            
        }
    })
})

custom_input.addEventListener('keypress', function(key) {
    if (key.code == 'Enter') {
        number_of_words = custom_input.value
        document.querySelector('.custom-number.active').click()
        document.activeElement.blur()  
    }

})

quote_option.forEach(i => {
    i.addEventListener('click', function() {
        resetMetric()
        text_display.innerHTML = ''

        // Generate random number of words
        if (this.classList.contains('random')) {
            quote_length = quote_lst[randint(0,3)]
        } else {
            quote_length = this.textContent
        }

        // Get random quote from json file
        fetch('../data/quotes.json').then((res) => res.json()).then((json) => {
            while (true) {
                const random_quote = json[randint(0, json.length+1)]
                const random_quote_content = random_quote['text']
                const random_quote_author = random_quote['author']
                const translated_length = translateQuoteLength(quote_length)

                if (random_quote_content.length >= translated_length[0] && random_quote_content.length <= translated_length[1]) {
                    
                    words_display = `${random_quote_content} ${random_quote_author}`.split(' ')

                    number_of_words = words_display.length
                    
                    // Set total words
                    document.querySelector('.word-elapsed b').textContent = `0/${number_of_words}`

                    // Add cursor
                    const cursor = document.createElement('div')
                    cursor.setAttribute('class', 'cursor')
                    text_display.appendChild(cursor)
                    break
                }

            }

        }).then(() => {
            for (const j of words_display) {
                const word = document.createElement('div')
                word.setAttribute('class', 'word')

                for (const k of j.split('')) {
                    const letter = document.createElement('letter')
                    letter.textContent = k.trim()
                    word.appendChild(letter)
                }

                text_display.appendChild(word)
            }

            // Set active for first word
            document.querySelector('.text__display .word').classList.add('word-active')
        })


    })
})

wiki_option.forEach(i => {
    i.addEventListener('click', function() {
        resetMetric()
        text_display.innerHTML = ''

        // Generate random number of words
        if (this.classList.contains('random')) {
            number_of_sentences = randint(20, 60)
        } else if (this.classList.contains('custom-number')) {
            number_of_sentences = parseInt(custom_input.value)
        } else {
            number_of_sentences = parseInt(this.textContent)
        }

        if (number_of_sentences != 0) {
            
            // Add cursor
            const cursor = document.createElement('div')
            cursor.setAttribute('class', 'cursor')
            text_display.appendChild(cursor)

            const getPageContent = async function() {
                const pageid = await getRandomPage()
                const page_intro = await getPageIntro(pageid, number_of_sentences)

                return page_intro
            }

            getPageContent().then(content => {
                // Get content from random page
                words_display = content.split(' ')

                // Set total time
                number_of_words = words_display.length
                document.querySelector('.word-elapsed b').textContent = `0/${number_of_words}`
                
                // Assign words to element
                for (const j of words_display) {
                    const word = document.createElement('div')
                    word.setAttribute('class', 'word')

                    for (const k of j.split('')) {
                        const letter = document.createElement('letter')
                        letter.textContent = k.trim().replace('–', '-')
                        word.appendChild(letter)
                    }

                    text_display.appendChild(word)
                }

                // Set active for first word
                document.querySelector('.text__display .word').classList.add('word-active')
        
            }).catch(
                console.error
            )


        }
    })
})


document.addEventListener('keydown', function(key) {
    // Start interval again when user starts typing
    end_interval = false

    // Check if user is typing in custom number input box
    if (document.activeElement !== custom_input && (!key.code.includes('Shift'))) {

        // Automatically move cursor to input field
        text_input.focus()

        const cursor = document.querySelector('.cursor')
        const word_active = document.querySelector('.word-active')
        const letters = word_active.querySelectorAll('letter')

        if (key.code == 'Backspace') {
            let all_not_typed = true

            // Remove previous letter
            for (let i=letters.length-1; i>=0; i--) {
                if (letters[i].classList != '') {

                    cursor.style.left = `${letters[i].offsetLeft}px`
                    cursor.style.top = `${letters[i].offsetTop + 5 - scroll_times}px`
                    
                    metric.typed_chars -= 1

                    if (letters[i].classList.contains('incorrect')) {
                        metric.incorrect -= 1
                    }

                    letters[i].classList.remove('correct')
                    letters[i].classList.remove('incorrect')
                    all_not_typed = false
                    break
                }
            }

            // Check if previous word whose all letters are correct
            if (all_not_typed && !word_active.previousElementSibling.classList.contains('finished')) {

                metric.typed_words -= 1
                document.querySelector('.word-elapsed b').textContent = `${metric.typed_words}/${number_of_words}`

                if (word_active.previousElementSibling.offsetLeft - word_active.offsetLeft > 200) {
                    text_display.scroll(0, scroll_times - 50)

                    scroll_times -= 50
                }

                word_active.previousElementSibling.classList.add('word-active')
                word_active.classList.remove('word-active')
            }

        } else if (key.code == 'Space') {
            let all_correct = true
            let all_typed = true 

            for (let i of letters) {
                if (i.classList.contains('incorrect')) {
                    all_correct = false
                    break
                }
            }

            // Check availabity to go to next word
            for (let i of letters) {
                if(i.classList == '') {
                    all_typed = false
                    break
                }
            }

            // Check if all letters in word are correct and assign 'finished' tag
            if (all_typed) {

                metric.typed_words += 1
                word_elapsed_b.textContent = `${metric.typed_words}/${number_of_words}`

                if (all_correct) {
                    word_active.classList.add('finished')
                }
        
                word_active.nextElementSibling.classList.add('word-active')
                word_active.classList.remove('word-active')

                
                // Add one word right after user finish typing one word
                if (runner_type == 'time') {
                    fetch('../data/words.json').then((res) => res.json()).then((json) => {
                        const word = document.createElement('div')
                        word.setAttribute('class', 'word')
    
                        for (const k of json.dictionary[randint(0, json.dictionary.length+1)].split('')) {
                            const letter = document.createElement('letter')
                            letter.textContent = k.trim().toLowerCase()
                            word.appendChild(letter)
                        }
    
                        text_display.appendChild(word)
                    })

                }


                const next_word = document.querySelector('.word-active letter')

                // Compare with scroll previous position
                console.log(text_display.scrollTop, text_display.scrollHeight, text_display.offsetHeight)
                const scroll_compare = (text_display.scrollHeight - text_display.offsetHeight) - text_display.scrollTop
                if (scroll_compare > 10) {
                    if (word_active.offsetLeft - next_word.offsetLeft > 200) {
                        text_display.scroll(0, 50 + scroll_times)
    
                        previous_position = 0
                        scroll_times += 50
                    } else {
                        previous_position = word_active.offsetLeft
                    }
                } else {
                    // Ensure to scroll to the bottom
                    text_display.scroll(0, 50 + scroll_times + 10)

                }

                cursor.style.left = `${next_word.offsetLeft}px`
                cursor.style.top = `${next_word.offsetTop + 5 - scroll_times}px`
                

            } else {
                key.preventDefault();
            }


        } else {
            for (let i=0; i<letters.length; i++) {
                if (letters[i].classList == '') {
        
                    cursor.style.left = `${letters[i].offsetLeft + letters[i].offsetWidth}px`
                    cursor.style.top = `${letters[i].offsetTop + 5 - scroll_times}px`
        
                    // One char typed
                    metric.typed_chars += 1
                    metric.typed_chars_raw += 1
        
                    // Check for first letter
                    if (!word_active.previousElementSibling.classList.contains('word') && letters[i].previousElementSibling == null) {

                        // close options panel and show metric panel
                        options_container.classList.add('close')
                        measure.classList.remove('hide')
                        updateMetric(runner_type)
                    }
        
                    // Check if user typed the correct letter
                    if (key.key == letters[i].textContent) {
                        letters[i].setAttribute('class', 'correct')
        
                        // Check for the last letter (correct one)
                        if (word_active.nextElementSibling == null && letters[i].nextElementSibling == null) {
                            console.log(metric)
                            end_interval = true
                            break
                        }
                    } else {
                        metric.incorrect += 1
                        metric.incorrect_raw += 1
        
                        letters[i].setAttribute('class', 'incorrect')
                    }
                    break
                }
            }
        }

    }

})