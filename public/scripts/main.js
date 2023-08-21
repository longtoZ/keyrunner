// Options
const modes_selection = document.querySelectorAll('.modes__selection .selection')
const time_selection = document.querySelector('.options .times')
const word_source_selection = document.querySelector('.options .words-source')
const word_selection = document.querySelector('.options .words')
const quotes_selection = document.querySelector('.options .quotes')
const wikis_selection = document.querySelector('.options .wikis')


const selection = document.querySelectorAll(':not(.modes__selection):not(.words-source__selection) > .selection')

const options_minimize = document.querySelector('.options-container .minimize i')
const options_container = document.querySelector('.options-container')

const time_elapsed = document.querySelector('.time-elapsed')
const word_elapsed = document.querySelector('.word-elapsed')

const custom_number = document.querySelectorAll('.custom-number')
const custom__selection = document.querySelector('.custom')

const text_container = document.querySelector('.text-container')

const restart_race = document.querySelector('.restart i')
const next_race = document.querySelector('.next i')

const measure = document.querySelector('.measure-container')

// Runner
const text_display = document.querySelector('.text__display')
const text_input = document.querySelector('.text__input input')

const time_option = document.querySelectorAll('.times__selection .selection')
const time_option_select = document.querySelector('.times__selection .selection.active')

const word_source_option = document.querySelectorAll('.words-source__selection .selection')
const word_option = document.querySelectorAll('.words__selection .selection')

const quote_option = document.querySelectorAll('.quotes__selection .selection')

const wiki_option = document.querySelectorAll('.wikis__selection .selection')
const wiki_option_select = document.querySelector('.wikis__selection .selection.active')

const custom_input = document.querySelector('.custom__selection input')

const word_elapsed_b = document.querySelector('.word-elapsed b')

const special_keys = [
    'Tab',
    'Enter',
    'ShiftLeft',
    'ShiftRight',
    'ControlLeft',
    'ControlRight',
    'AltLeft',
    'AlftRight',
    'Pause',
    'Capslock',
    'Escape',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'ArrowDown',
    'ArrowUp',
    'PrintScreen',
    'Insert',
    'Delete',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12'
]

let runner_type = ''

let prev_text = ''
let is_restart = false

let data = {}
let metric = {
    "wpm": 0,
    "cpm": 0,
    "incorrect": 0,
    "incorrect_raw": 0,
    "typed_chars_raw": 0,
    "typed_words": 0,
    "typed_chars": 0,
    "second": 0,
    "speed_wpm": [],
    "speed_cpm": [],
    "accuracy": 100
}


const init_word_for_time = 40
const quote_lst = ['short', 'medium', 'long']

let source_type = 'dictionary'

let words_display = []
let number_of_words = 0

let time_counter = 0
let number_of_times = 0

let number_of_sentences = 0

let quote_length = ''

let end_interval = false

let previous_position = 0
let scroll_times = 0