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