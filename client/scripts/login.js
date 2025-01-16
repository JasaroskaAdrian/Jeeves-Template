const API_BASE_URL = 'http://localhost:4200'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email')
    const password = document.getElementById('password')

    try {
        const response = await fetch(`${API_BASE_URL}/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
            /*
            Awaits until the POST-Method with the content of the email and password 
            of the user gets fetched and the response is stored in the variable response.
            Its possible that the response didn't get any email or password
            */
        })
        if (response.ok) {
            //If the response contains email and password, this if Statement will trigger
            const data = await response.json()
            localStorage.setItem('token', data.token)
            window.location.href = '/dashboard'
        } else {
            alert('Login failed: Invalid Credentials')
        }
    } catch (error) {
        alert('An Error has occurred. Please check the console for details')
    }
})