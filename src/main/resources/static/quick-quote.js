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
    "light": [
        "Citation CJ3",
        "Hawker 400XP",
        "Learjet 70",
        "Phenom 300",
        "Citation M2",
        "Learjet 75",
        "Pilatus PC-24",
        "Citation XLS+"
    ],
    "midsize": [
        "Citation Sovereign",
        "Hawker 900XP",
        "Learjet 60XR",
        "Challenger 300",
        "Citation X",
        "Gulfstream G150",
        "Embraer Legacy 450",
        "Westwind II"
    ],
    "super-midsize": [
        "Citation XLS+",
        "Challenger 350",
        "Gulfstream G200",
        "Hawker 4000",
        "Legacy 500",
        "Falcon 50",
        "Citation Longitude",
        "Falcon 2000"
    ],
    "large": [
        "Challenger 650",
        "Gulfstream G450",
        "Falcon 900",
        "Global 5000",
        "Gulfstream G550",
        "Legacy 650",
        "Falcon 2000LX",
        "Citation Hemisphere"
    ],
    "ultra-long-range": [
        "Gulfstream G650",
        "Global 7500",
        "Falcon 8X",
        "Gulfstream G700",
        "Global 6000",
        "Falcon 7X",
        "Bombardier 8000",
        "Gulfstream G500"
    ]
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
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Modify request
function modifyRequest() {
    document.getElementById('quote-results').style.display = 'none';
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
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation-screen').style.display = 'block';
    
    // Update confirmation text with proper values
    document.getElementById('confirmation-text').innerHTML = `
        <p>Thank you, ${name}!</p>
        <p>Your booking for the <strong>${jetModel}</strong> has been confirmed.</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
        <p>We've sent the details to ${email}.</p>
        <p>Our team will contact you shortly at ${phone} to finalize arrangements.</p>
    `;
}

// Close modal
function closeModal() {
    document.getElementById('booking-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form when closing
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('confirmation-screen').style.display = 'none';
    document.getElementById('booking-form').reset();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('booking-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', showBookingForm);
    });

    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Initialize jet type dropdown
    document.getElementById('jet-type').addEventListener('change', updateJetModels);
});