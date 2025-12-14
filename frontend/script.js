const API_BASE = 'http://localhost:3000';

// Fetch all users
function getUsers() {
    fetch(`${API_BASE}/users`)
        .then(res => res.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.email || 'No email'}`;
                userList.appendChild(li);
            });
        })
        .catch(err => console.error(err));
}

// Register a new user
function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        getUsers(); // Refresh users list
    })
    .catch(err => console.error(err));
}

// Initial load
getUsers();
