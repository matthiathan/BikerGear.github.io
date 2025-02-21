document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`Thank you, ${name}! Your message has been sent.`);
    
    // Reset the form
    document.getElementById('contact-form').reset();
});

function orderProduct(productName, price) {
    alert(`You have ordered a ${productName} for $${price}. Thank you!`);
}

// Firebase App already initialized in index.html

// Sign-Up Form Handling
document.getElementById('signup-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        document.getElementById('signup-message').textContent = 'Account created successfully!';
    } catch (error) {
        document.getElementById('signup-message').textContent = error.message;
    }
});

// Login Form Handling
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('login-message').textContent = 'Login successful!';
        window.location.href = 'index.html'; // Redirect to home page or basket page
    } catch (error) {
        document.getElementById('login-message').textContent = error.message;
    }
});