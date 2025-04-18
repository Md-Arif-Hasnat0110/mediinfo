// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const hamburger = document.querySelector('.hamburger');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const recordForm = document.getElementById('recordForm');
const registerRole = document.getElementById('registerRole');
const patientFields = document.getElementById('patientFields');
const doctorFields = document.getElementById('doctorFields');
const modal = document.getElementById('recordModal');
const closeModal = document.querySelector('.close');
const addRecordBtn = document.getElementById('addRecordBtn');

// State
let currentUser = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            showPage(page);
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Role selection in registration
    registerRole.addEventListener('change', (e) => {
        if (e.target.value === 'patient') {
            patientFields.classList.remove('hidden');
            doctorFields.classList.add('hidden');
        } else {
            patientFields.classList.add('hidden');
            doctorFields.classList.remove('hidden');
        }
    });

    // Modal
    addRecordBtn ? .addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal ? .addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Forms
    loginForm ? .addEventListener('submit', handleLogin);
    registerForm ? .addEventListener('submit', handleRegister);
    recordForm ? .addEventListener('submit', handleAddRecord);
});

// Functions
function showPage(pageName) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageName) {
            page.classList.add('active');
        }
    });

    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Show/hide navigation items based on authentication
    const authLinks = document.querySelectorAll('.nav-links a.hidden');
    if (currentUser) {
        document.querySelector('[data-page="login"]').classList.add('hidden');
        document.querySelector('[data-page="register"]').classList.add('hidden');
        document.querySelector('[data-page="dashboard"]').classList.remove('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');

        if (currentUser.role === 'doctor') {
            document.querySelector('[data-page="records"]').classList.remove('hidden');
        }
    } else {
        document.querySelector('[data-page="login"]').classList.remove('hidden');
        document.querySelector('[data-page="register"]').classList.remove('hidden');
        document.querySelector('[data-page="dashboard"]').classList.add('hidden');
        document.querySelector('[data-page="records"]').classList.add('hidden');
        document.getElementById('logoutBtn').classList.add('hidden');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showPage('dashboard');
            updateDashboard();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const formData = {
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        role: document.getElementById('registerRole').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value
    };

    if (formData.role === 'patient') {
        formData.dateOfBirth = document.getElementById('dateOfBirth').value;
    } else {
        formData.specialization = document.getElementById('specialization').value;
        formData.licenseNumber = document.getElementById('licenseNumber').value;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showPage('dashboard');
            updateDashboard();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
}

async function handleAddRecord(e) {
    e.preventDefault();
    const formData = {
        patientId: document.getElementById('patientSelect').value,
        diagnosis: document.getElementById('diagnosis').value,
        treatment: document.getElementById('treatment').value,
        prescription: document.getElementById('prescription').value,
        notes: document.getElementById('notes').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            modal.style.display = 'none';
            recordForm.reset();
            fetchRecords();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to add record');
        }
    } catch (error) {
        console.error('Add record error:', error);
        alert('An error occurred while adding the record');
    }
}

async function updateDashboard() {
    if (!currentUser) return;

    document.getElementById('userName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.querySelector('.user-role').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    // Update personal information
    const personalInfo = document.getElementById('personalInfo');
    personalInfo.innerHTML = `
        <p><strong>Email:</strong> ${currentUser.email}</p>
        ${currentUser.role === 'patient' ? 
            `<p><strong>Date of Birth:</strong> ${new Date(currentUser.dateOfBirth).toLocaleDateString()}</p>` :
            `<p><strong>Specialization:</strong> ${currentUser.specialization}</p>
             <p><strong>License Number:</strong> ${currentUser.licenseNumber}</p>`
        }
    `;

    // Fetch and display recent records
    try {
        const response = await fetch(`http://localhost:5000/api/records/${currentUser.role}/${currentUser.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const records = await response.json();
            const recentRecords = document.getElementById('recentRecords');
            recentRecords.innerHTML = records.slice(0, 5).map(record => `
                <div class="record-item">
                    <p><strong>Date:</strong> ${new Date(record.visitDate).toLocaleDateString()}</p>
                    <p><strong>Diagnosis:</strong> ${record.diagnosis}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

async function fetchRecords() {
    if (!currentUser || currentUser.role !== 'doctor') return;

    try {
        const response = await fetch('http://localhost:5000/api/records/doctor', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const records = await response.json();
            const recordsList = document.getElementById('recordsList');
            recordsList.innerHTML = records.map(record => `
                <div class="record-card">
                    <h3>${record.patientId.firstName} ${record.patientId.lastName}</h3>
                    <p><strong>Date:</strong> ${new Date(record.visitDate).toLocaleDateString()}</p>
                    <p><strong>Diagnosis:</strong> ${record.diagnosis}</p>
                    <p><strong>Treatment:</strong> ${record.treatment}</p>
                    ${record.prescription ? `<p><strong>Prescription:</strong> ${record.prescription}</p>` : ''}
                    ${record.notes ? `<p><strong>Notes:</strong> ${record.notes}</p>` : ''}
                    <button class="btn primary" onclick="deleteRecord('${record._id}')">Delete</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

async function deleteRecord(recordId) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
        const response = await fetch(`http://localhost:5000/api/records/${recordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            fetchRecords();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete record');
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        alert('An error occurred while deleting the record');
    }
}

// Check for existing session
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        currentUser = JSON.parse(user);
        showPage('dashboard');
        updateDashboard();
    } else {
        showPage('home');
    }
});