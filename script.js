// Library Management System - JavaScript Logic

// Data structures using arrays and maps for demonstration
let users = [];
let books = [];
let loans = [];
let usersMap = new Map();
let booksMap = new Map();
let loansMap = new Map();

// LocalStorage keys
const STORAGE_KEYS = {
    USERS: 'library_users',
    BOOKS: 'library_books',
    LOANS: 'library_loans'
};

// Utility functions
function generateUniqueId() {
    return Date.now().toString();
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved to localStorage for key: ${key}`, data);
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
        console.log(`Data loaded from localStorage for key: ${key}`, JSON.parse(data));
        return JSON.parse(data);
    }
    return [];
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateInputs(formData, type) {
    const errors = [];
    if (type === 'user') {
        if (!formData.name.trim()) errors.push('Name is required');
        if (!formData.email.trim()) errors.push('Email is required');
        if (!validateEmail(formData.email)) errors.push('Invalid email format');
    } else if (type === 'book') {
        if (!formData.title.trim()) errors.push('Title is required');
        if (!formData.author.trim()) errors.push('Author is required');
        if (!formData.year || isNaN(formData.year)) errors.push('Valid year is required');
        if (!formData.genre.trim()) errors.push('Genre is required');
    }
    return errors;
}

// Data management functions
function loadData() {
    users = loadFromLocalStorage(STORAGE_KEYS.USERS);
    books = loadFromLocalStorage(STORAGE_KEYS.BOOKS);
    loans = loadFromLocalStorage(STORAGE_KEYS.LOANS);

    // Populate maps for quick lookups
    usersMap = new Map(users.map(user => [user.id, user]));
    booksMap = new Map(books.map(book => [book.id, book]));
    loansMap = new Map(loans.map(loan => [loan.id, loan]));

    console.log('Data loaded and maps populated');
}

function saveData() {
    saveToLocalStorage(STORAGE_KEYS.USERS, users);
    saveToLocalStorage(STORAGE_KEYS.BOOKS, books);
    saveToLocalStorage(STORAGE_KEYS.LOANS, loans);
}

// User management functions
function addUser(name, email) {
    const user = {
        id: generateUniqueId(),
        name: name.trim(),
        email: email.trim()
    };
    users.push(user);
    usersMap.set(user.id, user);
    saveData();
    console.log('User added:', user);
    return user;
}

function updateUser(id, name, email) {
    const user = usersMap.get(id);
    if (user) {
        user.name = name.trim();
        user.email = email.trim();
        saveData();
        console.log('User updated:', user);
    }
}

function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        // Check if user has active loans
        const activeLoans = loans.filter(loan => loan.userId === id && loan.status === 'active');
        if (activeLoans.length > 0) {
            alert('Cannot delete user with active loans');
            return false;
        }
        users.splice(index, 1);
        usersMap.delete(id);
        saveData();
        console.log('User deleted:', id);
        return true;
    }
    return false;
}

// Book management functions
function addBook(title, author, year, genre) {
    const book = {
        id: generateUniqueId(),
        title: title.trim(),
        author: author.trim(),
        year: parseInt(year),
        genre: genre.trim(),
        available: true
    };
    books.push(book);
    booksMap.set(book.id, book);
    saveData();
    console.log('Book added:', book);
    return book;
}

function updateBook(id, title, author, year, genre) {
    const book = booksMap.get(id);
    if (book) {
        book.title = title.trim();
        book.author = author.trim();
        book.year = parseInt(year);
        book.genre = genre.trim();
        saveData();
        console.log('Book updated:', book);
    }
}

function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        // Check if book is currently loaned
        const activeLoan = loans.find(loan => loan.bookId === id && loan.status === 'active');
        if (activeLoan) {
            alert('Cannot delete book that is currently loaned');
            return false;
        }
        books.splice(index, 1);
        booksMap.delete(id);
        saveData();
        console.log('Book deleted:', id);
        return true;
    }
    return false;
}

// Loan management functions
function registerLoan(userId, bookId) {
    const user = usersMap.get(userId);
    const book = booksMap.get(bookId);

    if (!user || !book) {
        alert('Invalid user or book selected');
        return null;
    }

    if (!book.available) {
        alert('Book is not available');
        return null;
    }

    const loan = {
        id: generateUniqueId(),
        userId: userId,
        bookId: bookId,
        date: new Date().toISOString().split('T')[0],
        status: 'active'
    };

    loans.push(loan);
    loansMap.set(loan.id, loan);
    book.available = false;
    saveData();
    console.log('Loan registered:', loan);
    return loan;
}

function returnLoan(loanId) {
    const loan = loansMap.get(loanId);
    if (loan && loan.status === 'active') {
        loan.status = 'returned';
        const book = booksMap.get(loan.bookId);
        if (book) {
            book.available = true;
        }
        saveData();
        console.log('Loan returned:', loan);
        return true;
    }
    return false;
}

// UI rendering functions
function renderUsers() {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="action-btn edit-user" data-id="${user.id}">Edit</button>
                <button class="action-btn delete-btn delete-user" data-id="${user.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderBooks() {
    const tbody = document.querySelector('#books-table tbody');
    tbody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.genre}</td>
            <td>${book.available ? 'Available' : 'Loaned'}</td>
            <td>
                <button class="action-btn edit-book" data-id="${book.id}">Edit</button>
                <button class="action-btn delete-btn delete-book" data-id="${book.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderLoans() {
    const tbody = document.querySelector('#loans-table tbody');
    tbody.innerHTML = '';

    loans.forEach(loan => {
        const user = usersMap.get(loan.userId);
        const book = booksMap.get(loan.bookId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${loan.id}</td>
            <td>${user ? user.name : 'Unknown'}</td>
            <td>${book ? book.title : 'Unknown'}</td>
            <td>${loan.date}</td>
            <td>${loan.status}</td>
            <td>
                ${loan.status === 'active' ? `<button class="action-btn return-btn return-loan" data-id="${loan.id}">Return</button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function populateSelects() {
    const userSelect = document.getElementById('loan-user');
    const bookSelect = document.getElementById('loan-book');

    userSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach(user => {
        userSelect.innerHTML += `<option value="${user.id}">${user.name}</option>`;
    });

    bookSelect.innerHTML = '<option value="">Select Available Book</option>';
    books.filter(book => book.available).forEach(book => {
        bookSelect.innerHTML += `<option value="${book.id}">${book.title}</option>`;
    });
}

// Event handlers
function handleUserForm(e) {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;

    const errors = validateInputs({ name, email }, 'user');
    if (errors.length > 0) {
        alert('Validation errors:\n' + errors.join('\n'));
        return;
    }

    addUser(name, email);
    document.getElementById('user-form').reset();
    renderUsers();
    populateSelects();
}

function handleBookForm(e) {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const year = document.getElementById('book-year').value;
    const genre = document.getElementById('book-genre').value;

    const errors = validateInputs({ title, author, year, genre }, 'book');
    if (errors.length > 0) {
        alert('Validation errors:\n' + errors.join('\n'));
        return;
    }

    addBook(title, author, year, genre);
    document.getElementById('book-form').reset();
    renderBooks();
    populateSelects();
}

function handleLoanForm(e) {
    e.preventDefault();
    const userId = document.getElementById('loan-user').value;
    const bookId = document.getElementById('loan-book').value;

    if (!userId || !bookId) {
        alert('Please select both user and book');
        return;
    }

    registerLoan(userId, bookId);
    document.getElementById('loan-form').reset();
    renderBooks();
    renderLoans();
    populateSelects();
}

function handleTableActions(e) {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains('delete-user')) {
        if (confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
            renderUsers();
            populateSelects();
        }
    } else if (target.classList.contains('edit-user')) {
        const user = usersMap.get(id);
        if (user) {
            const newName = prompt('Enter new name:', user.name);
            const newEmail = prompt('Enter new email:', user.email);
            if (newName && newEmail) {
                updateUser(id, newName, newEmail);
                renderUsers();
            }
        }
    } else if (target.classList.contains('delete-book')) {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteBook(id);
            renderBooks();
            populateSelects();
        }
    } else if (target.classList.contains('edit-book')) {
        const book = booksMap.get(id);
        if (book) {
            const newTitle = prompt('Enter new title:', book.title);
            const newAuthor = prompt('Enter new author:', book.author);
            const newYear = prompt('Enter new year:', book.year);
            const newGenre = prompt('Enter new genre:', book.genre);
            if (newTitle && newAuthor && newYear && newGenre) {
                updateBook(id, newTitle, newAuthor, newYear, newGenre);
                renderBooks();
            }
        }
    } else if (target.classList.contains('return-loan')) {
        returnLoan(id);
        renderBooks();
        renderLoans();
        populateSelects();
    }
}

function handleNavigation(e) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => button.classList.remove('active'));

    if (e.target.id === 'nav-users') {
        document.getElementById('users-section').classList.add('active');
        e.target.classList.add('active');
    } else if (e.target.id === 'nav-books') {
        document.getElementById('books-section').classList.add('active');
        e.target.classList.add('active');
    } else if (e.target.id === 'nav-loans') {
        document.getElementById('loans-section').classList.add('active');
        e.target.classList.add('active');
    }
}

// Demonstration functions for console interactions
function demonstrateArrayOperations() {
    console.log('Demonstrating array operations:');
    console.log('Users array:', users);
    console.log('Filtered users with email containing "gmail":', users.filter(user => user.email.includes('gmail')));
    console.log('Mapped user names:', users.map(user => user.name));
}

function demonstrateMapOperations() {
    console.log('Demonstrating map operations:');
    console.log('Users map:', usersMap);
    console.log('Getting user by ID:', usersMap.get(users[0]?.id));
    console.log('Users map keys:', Array.from(usersMap.keys()));
}

function demonstrateLocalStorage() {
    console.log('Demonstrating localStorage operations:');
    console.log('localStorage keys:', Object.keys(localStorage));
    console.log('Users in localStorage:', localStorage.getItem(STORAGE_KEYS.USERS));
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderUsers();
    renderBooks();
    renderLoans();
    populateSelects();

    // Event listeners
    document.getElementById('user-form').addEventListener('submit', handleUserForm);
    document.getElementById('book-form').addEventListener('submit', handleBookForm);
    document.getElementById('loan-form').addEventListener('submit', handleLoanForm);

    document.querySelector('nav').addEventListener('click', handleNavigation);
    document.addEventListener('click', handleTableActions);

    // Demonstrate console interactions
    demonstrateArrayOperations();
    demonstrateMapOperations();
    demonstrateLocalStorage();

    console.log('Library Management System initialized');
});