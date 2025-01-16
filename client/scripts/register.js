const API_BASE_URL = 'http//localhost:4200'

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const userName = document.getElementById('username')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password })
        })
    
        if (response.ok) {
            const data = await response.json()
            window.location.href = '/login'
        } else {
            alert('Register Failed: An Error has Occurred')
        }   
    } catch (error) {
        alert('An Error has occurred with the creation of the Account, Check the console for more details')
    }
})