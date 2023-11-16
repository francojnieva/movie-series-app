const submitForm = document.querySelector('#submitForm')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const errorEmail = document.querySelector('#errorEmail')
const errorPassword = document.querySelector('#errorPassword')
const btnSubmit = document.querySelector('.btn-submit')

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (email.value === '') {
        errorEmail.textContent = 'Campo requerido.'
        return false
    } else {
        errorEmail.textContent = ''
    }
    
    const emailRegex = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    if (!emailRegex.test(email.value.trim())) {
        errorEmail.textContent = 'Correo electrónico inválido.'
        return false
    }

    if (password.value === '') {
        errorPassword.textContent = 'Campo requerido.'
        return false
    } else {
        errorPassword.textContent = ''
    }

    if (password.value.length < 8 || password.value.length > 25 ) {
        errorPassword.textContent = 'La contraseña debe tener entre 8 y 25 caracteres.'
        return false
    }

    const loading = document.createElement('span')
    loading.classList.add('loading', 'loading-spinner', 'text-white', 'loading-xs', 'ml-2' )

    btnSubmit.appendChild(loading)

    setTimeout(() => {
        window.location.href = './pages/dashboard.html'
    }, 2000)
})

// See Password and not see password

const seePassword = document.querySelector('#seePassword')
const notSeePassword = document.querySelector('#notSeePassword')

function togglePasswordVisibility() {
    seePassword.classList.toggle('hidden')
    notSeePassword.classList.toggle('hidden')
    password.type = (password.type === 'password') ? 'text' : 'password'
}

seePassword.addEventListener('click', togglePasswordVisibility)
notSeePassword.addEventListener('click', togglePasswordVisibility)