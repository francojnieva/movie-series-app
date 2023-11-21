// MENÚ MÓVIL - TABLET
const btnMenu = document.querySelector('#btnMenu')
const sidebar = document.querySelector('#sidebar')
const imgMenu = document.querySelector('#imgMenu')
const imgCloseMenu = document.querySelector('#imgCloseMenu')

btnMenu.addEventListener('click', () => {
    sidebar.classList.toggle('-left-full')
    imgMenu.classList.toggle('hidden')
    imgCloseMenu.classList.toggle('hidden')
})

// CHANGE THEME: LIGHT OR DARK
const btnChangeTheme = document.querySelector('#btnChangeTheme')
const imgSun = document.querySelector('#imgSun')
const imgMoon = document.querySelector('#imgMoon')

btnChangeTheme.addEventListener('click', () => {
    imgSun.classList.toggle('hidden')
    imgMoon.classList.toggle('hidden')
    document.documentElement.classList.toggle('dark')
})

