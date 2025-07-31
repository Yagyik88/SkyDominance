document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.getAttribute('data-tab') === tab) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-pw').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
	loginForm.addEventListener('submit', function(e) {
	    e.preventDefault();

	    const email = document.getElementById('loginEmail').value;
	    const password = document.getElementById('loginPassword').value;

	    if (!email || !password) {
	        alert('Please fill in all fields');
	        return;
	    }

	  
	    fetch('http://localhost:8080/api/login', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ email, password })
	    })
	    .then(res => res.text())
	    .then(data => {
	        if (data.toLowerCase().includes("successful")) {
	            alert(data);
	            setTimeout(() => {
	                window.location.href = 'index1.html'; // Redirect to homepage
	            }, 1500);
	        } else {
	            alert("Login failed: " + data);
	        }
	    })
	    .catch(error => {
	        console.error("Login error:", error);
	        alert("Login error. Try again.");
	    });
	});

    
	signupForm.addEventListener('submit', function(e) {
	    e.preventDefault();

	    const name = document.getElementById('signupName').value;
	    const email = document.getElementById('signupEmail').value;
	    const password = document.getElementById('signupPassword').value;
	    const confirmPassword = document.getElementById('signupConfirmPassword').value;
	    const termsChecked = document.getElementById('terms').checked;

	    if (!name || !email || !password || !confirmPassword) {
	        alert('Please fill in all fields');
	        return;
	    }

	    if (password !== confirmPassword) {
	        alert('Passwords do not match');
	        return;
	    }

	    if (!termsChecked) {
	        alert('You must agree to the terms');
	        return;
	    }

	
	    fetch('http://localhost:8080/api/signup', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({
	            name: name,
	            email: email,
	            password: password
	        })
	    })
	    .then(res => res.text())
	    .then(data => {
	        alert(data);
	        tabBtns[0].click(); // Switch to login tab
	    })
	    .catch(error => {
	        console.error("Signup error:", error);
	        alert("Something went wrong. Please try again.");
	    });
	});

});