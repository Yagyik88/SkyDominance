// Emergency modal blocker - runs immediately when script loads
(function() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.style.display = 'none';
})();

document.addEventListener('DOMContentLoaded', function() {
    // Jet data with estimated hourly rates in INR
    const jetData = {
        "very-light": [
            "Cessna Citation Mustang",
            "Embraer Phenom 100",
            "HondaJet HA-420",
            "Citation CJ2+",
            "Eclipse 550",
            "Phenom 100EV",
            "Nextant 400XTi",
            "SyberJet SJ30"
        ],
        // ... rest of your jet categories ...
    };

    // Hourly rates in INR for each jet category
    const jetRates = {
        "very-light": 250000,
        "light": 350000,
        "midsize": 500000,
        "super-midsize": 650000,
        "large": 850000,
        "ultra-long-range": 1100000
    };

    // Initialize event listeners
    function initEventListeners() {
        // Jet type dropdown change
        const jetTypeSelect = document.getElementById('jet-type');
        if (jetTypeSelect) {
            jetTypeSelect.addEventListener('change', updateJetModels);
        }

        // Quote button
        const quoteBtn = document.querySelector('.quote-btn');
        if (quoteBtn) {
            quoteBtn.addEventListener('click', calculateQuote);
        }

        // Book now buttons
        document.querySelectorAll('.book-now-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showBookingForm();
            });
        });

        // Modify button
        const modifyBtn = document.querySelector('.modify-btn');
        if (modifyBtn) {
            modifyBtn.addEventListener('click', modifyRequest);
        }

        // Close modal button
        const closeModalBtn = document.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close modal when clicking outside
        const modal = document.getElementById('booking-modal');
        if (modal) {
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
        }

        // Booking form submission
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                completeBooking(e);
            });
        }
    }

    // Update specific jet models when category changes
    function updateJetModels() {
        const jetType = document.getElementById('jet-type').value;
        const specificJetSelect = document.getElementById('specific-jet');
        
        // Clear existing options
        specificJetSelect.innerHTML = '<option value="">Select jet model</option>';
        
        if (jetType && jetData[jetType]) {
            // Add new options
            jetData[jetType].forEach(jet => {
                const option = document.createElement('option');
                option.value = jet;
                option.textContent = jet;
                specificJetSelect.appendChild(option);
            });
        }
    }

    // Calculate and display quote
    function calculateQuote() {
        const jetType = document.getElementById('jet-type').value;
        const specificJet = document.getElementById('specific-jet').value;
        const departure = document.getElementById('departure').value;
        const destination = document.getElementById('destination').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const passengers = document.getElementById('passengers').value;
        
        // Validate form
        if (!jetType || !specificJet || !departure || !destination || !departureDate || !passengers) {
            alert('Please fill all required fields');
            return;
        }
        
        // Get hourly rate for selected category
        const hourlyRate = jetRates[jetType];
        
        // Calculate estimated flight time and distance in KM
        const estimatedFlightTime = Math.floor(Math.random() * 6) + 2; // 2-7 hours
        const estimatedDistance = estimatedFlightTime * 800; // Approx km
        
        // Calculate total cost in INR
        const totalCost = hourlyRate * estimatedFlightTime;
        
        // Display results
        document.getElementById('selected-jet-info').innerHTML = `
            <p><strong>${specificJet}</strong></p>
            <p>From: ${departure} | To: ${destination} | Passengers: ${passengers}</p>
        `;
        
        document.getElementById('hourly-rate').textContent = `₹${hourlyRate.toLocaleString('en-IN')}/hour`;
        document.getElementById('flight-time').textContent = `${estimatedFlightTime} hours`;
        document.getElementById('flight-distance').textContent = `${estimatedDistance.toLocaleString('en-IN')} km`;
        document.getElementById('total-cost').textContent = `₹${totalCost.toLocaleString('en-IN')}`;
        
        // Show results section
        document.getElementById('quote-results').style.display = 'block';
    }

    // Show booking form
    function showBookingForm() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Modify request
    function modifyRequest() {
        const quoteResults = document.getElementById('quote-results');
        if (quoteResults) {
            quoteResults.style.display = 'none';
        }
    }

    // Complete booking
    function completeBooking(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Get these values from the quote results, not the form
        const jetModel = document.getElementById('specific-jet').value;
        const totalCost = document.getElementById('total-cost').textContent;
        
        // Hide form and show confirmation
        const bookingForm = document.getElementById('booking-form');
        const confirmationScreen = document.getElementById('confirmation-screen');
        
        if (bookingForm && confirmationScreen) {
            bookingForm.style.display = 'none';
            confirmationScreen.style.display = 'block';
            
            // Update confirmation text with proper values
            document.getElementById('confirmation-text').innerHTML = `
                <p>Thank you, ${name}!</p>
                <p>Your booking for the <strong>${jetModel}</strong> has been confirmed.</p>
                <p><strong>Total Cost:</strong> ${totalCost}</p>
                <p>We've sent the details to ${email}.</p>
                <p>Our team will contact you shortly at ${phone} to finalize arrangements.</p>
            `;
        }
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form when closing
            const bookingForm = document.getElementById('booking-form');
            const confirmationScreen = document.getElementById('confirmation-screen');
            
            if (bookingForm && confirmationScreen) {
                bookingForm.style.display = 'block';
                confirmationScreen.style.display = 'none';
                bookingForm.reset();
            }
        }
    }

    // Initialize everything
    initEventListeners();
});