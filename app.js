/* ============================================
   Dreamer — Flight Booking Application Logic
   ============================================ */

// ── Mock Flight Database ──────────────────────────────────────────────
const AIRLINES = ['Dreamer Air', 'Blue Horizon', 'Nimbus Airways', 'AeroStar', 'CloudJet', 'Zenith Airlines'];

const CITIES = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai',
    'Singapore', 'Los Angeles', 'Sydney', 'Mumbai', 'Toronto',
    'Berlin', 'San Francisco', 'Chicago', 'Hong Kong', 'Bangkok'
];

const ROUTES = [
    { from: 'New York', to: 'London', basePrice: 420, baseDuration: 7 * 60 + 30 },
    { from: 'New York', to: 'Paris', basePrice: 480, baseDuration: 8 * 60 },
    { from: 'New York', to: 'Tokyo', basePrice: 780, baseDuration: 14 * 60 },
    { from: 'New York', to: 'Dubai', basePrice: 620, baseDuration: 12 * 60 + 45 },
    { from: 'New York', to: 'Los Angeles', basePrice: 180, baseDuration: 5 * 60 + 30 },
    { from: 'New York', to: 'Toronto', basePrice: 150, baseDuration: 1 * 60 + 30 },
    { from: 'New York', to: 'Chicago', basePrice: 120, baseDuration: 2 * 60 + 30 },
    { from: 'London', to: 'Paris', basePrice: 110, baseDuration: 1 * 60 + 15 },
    { from: 'London', to: 'Dubai', basePrice: 380, baseDuration: 7 * 60 },
    { from: 'London', to: 'New York', basePrice: 430, baseDuration: 8 * 60 },
    { from: 'London', to: 'Berlin', basePrice: 95, baseDuration: 1 * 60 + 50 },
    { from: 'London', to: 'Singapore', basePrice: 550, baseDuration: 12 * 60 + 30 },
    { from: 'Paris', to: 'London', basePrice: 105, baseDuration: 1 * 60 + 10 },
    { from: 'Paris', to: 'Tokyo', basePrice: 720, baseDuration: 12 * 60 + 15 },
    { from: 'Paris', to: 'New York', basePrice: 490, baseDuration: 8 * 60 + 30 },
    { from: 'Tokyo', to: 'Singapore', basePrice: 340, baseDuration: 7 * 60 + 15 },
    { from: 'Tokyo', to: 'Los Angeles', basePrice: 650, baseDuration: 11 * 60 + 30 },
    { from: 'Tokyo', to: 'Hong Kong', basePrice: 280, baseDuration: 4 * 60 + 30 },
    { from: 'Tokyo', to: 'Bangkok', basePrice: 310, baseDuration: 6 * 60 + 45 },
    { from: 'Dubai', to: 'Mumbai', basePrice: 190, baseDuration: 3 * 60 + 30 },
    { from: 'Dubai', to: 'London', basePrice: 390, baseDuration: 7 * 60 + 15 },
    { from: 'Dubai', to: 'Singapore', basePrice: 320, baseDuration: 7 * 60 },
    { from: 'Singapore', to: 'Sydney', basePrice: 350, baseDuration: 7 * 60 + 45 },
    { from: 'Singapore', to: 'Bangkok', basePrice: 90, baseDuration: 2 * 60 + 30 },
    { from: 'Singapore', to: 'Tokyo', basePrice: 360, baseDuration: 7 * 60 },
    { from: 'Los Angeles', to: 'New York', basePrice: 175, baseDuration: 5 * 60 + 15 },
    { from: 'Los Angeles', to: 'Tokyo', basePrice: 640, baseDuration: 11 * 60 + 45 },
    { from: 'Los Angeles', to: 'San Francisco', basePrice: 70, baseDuration: 1 * 60 + 20 },
    { from: 'Sydney', to: 'Singapore', basePrice: 340, baseDuration: 8 * 60 },
    { from: 'Sydney', to: 'Tokyo', basePrice: 520, baseDuration: 9 * 60 + 30 },
    { from: 'Mumbai', to: 'Dubai', basePrice: 180, baseDuration: 3 * 60 + 20 },
    { from: 'Mumbai', to: 'London', basePrice: 470, baseDuration: 9 * 60 + 30 },
    { from: 'Mumbai', to: 'Singapore', basePrice: 260, baseDuration: 5 * 60 + 30 },
    { from: 'Mumbai', to: 'Bangkok', basePrice: 220, baseDuration: 4 * 60 + 15 },
    { from: 'Toronto', to: 'New York', basePrice: 145, baseDuration: 1 * 60 + 25 },
    { from: 'Toronto', to: 'London', basePrice: 410, baseDuration: 7 * 60 + 30 },
    { from: 'Berlin', to: 'London', basePrice: 90, baseDuration: 1 * 60 + 45 },
    { from: 'Berlin', to: 'Paris', basePrice: 100, baseDuration: 1 * 60 + 50 },
    { from: 'San Francisco', to: 'Los Angeles', basePrice: 65, baseDuration: 1 * 60 + 15 },
    { from: 'San Francisco', to: 'Tokyo', basePrice: 610, baseDuration: 11 * 60 },
    { from: 'Chicago', to: 'New York', basePrice: 115, baseDuration: 2 * 60 + 20 },
    { from: 'Chicago', to: 'Los Angeles', basePrice: 160, baseDuration: 4 * 60 + 10 },
    { from: 'Hong Kong', to: 'Tokyo', basePrice: 270, baseDuration: 4 * 60 + 15 },
    { from: 'Hong Kong', to: 'Singapore', basePrice: 230, baseDuration: 3 * 60 + 50 },
    { from: 'Bangkok', to: 'Singapore', basePrice: 85, baseDuration: 2 * 60 + 20 },
    { from: 'Bangkok', to: 'Tokyo', basePrice: 300, baseDuration: 6 * 60 + 30 },
];

// ── Generate flights from routes ──────────────────────────────────────
function generateFlightsForRoute(route, dateStr) {
    const flights = [];
    // Generate 2-4 flights per route with different airlines/times
    const count = 2 + Math.floor(seededRandom(route.from + route.to + dateStr) * 3);

    for (let i = 0; i < count; i++) {
        const airline = AIRLINES[Math.floor(seededRandom(route.from + route.to + i + dateStr) * AIRLINES.length)];
        const priceVariation = 0.8 + seededRandom(airline + route.from + i + dateStr) * 0.6; // 0.8x - 1.4x
        const price = Math.round(route.baseDuration > 300 ? route.basePrice * priceVariation : route.basePrice * priceVariation);
        const durationVariation = Math.round(route.baseDuration * (0.9 + seededRandom(route.to + i + dateStr + 'dur') * 0.3));
        const stops = route.baseDuration > 480 ? (seededRandom(route.from + i + dateStr + 'st') > 0.5 ? 1 : 0) :
            route.baseDuration > 300 ? (seededRandom(route.from + i + dateStr + 'st') > 0.7 ? 1 : 0) : 0;

        const depHour = 6 + Math.floor(seededRandom(airline + i + dateStr + 'h') * 16); // 6 AM - 10 PM
        const depMin = Math.floor(seededRandom(airline + i + dateStr + 'm') * 4) * 15; // 0, 15, 30, 45

        const arrTotalMin = depHour * 60 + depMin + durationVariation;
        const arrHour = Math.floor(arrTotalMin / 60) % 24;
        const arrMin = arrTotalMin % 60;
        const nextDay = arrTotalMin >= 24 * 60;

        flights.push({
            id: `SV-${Math.floor(1000 + seededRandom(route.from + route.to + i + dateStr + 'id') * 9000)}`,
            airline,
            from: route.from,
            to: route.to,
            date: dateStr,
            departureTime: `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`,
            arrivalTime: `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}`,
            duration: durationVariation,
            stops,
            price,
            nextDay
        });
    }

    return flights;
}

// Simple seeded random for consistent results
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    // Manually split to avoid timezone / parsing issues across browsers
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr; // fallback
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) return dateStr; // fallback
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

// ── DOM Elements ──────────────────────────────────────────────────────
const searchForm = document.getElementById('search-form');
const passengerInput = document.getElementById('passenger-name');
const dateInput = document.getElementById('departure-date');
const fromSelect = document.getElementById('from-city');
const toSelect = document.getElementById('to-city');

const resultsSection = document.getElementById('results-section');
const resultsTitle = document.getElementById('results-title');
const resultsSubtitle = document.getElementById('results-subtitle');
const flightsGrid = document.getElementById('flights-grid');
const noResults = document.getElementById('no-results');
const sortBar = document.getElementById('sort-bar');

const modalOverlay = document.getElementById('modal-overlay');
const modalDetails = document.getElementById('modal-details');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ── State ────────────────────────────────────────────────────────────
let currentFlights = [];
let currentSort = 'price';
let selectedFlight = null;
let passengerName = '';

// ── Init ──────────────────────────────────────────────────────────────
function init() {
    populateCities();
    setMinDate();
    bindEvents();
}

function populateCities() {
    const sorted = [...CITIES].sort();
    sorted.forEach(city => {
        fromSelect.appendChild(new Option(city, city));
        toSelect.appendChild(new Option(city, city));
    });
}

function setMinDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
}

// ── Events ────────────────────────────────────────────────────────────
function bindEvents() {
    searchForm.addEventListener('submit', handleSearch);

    // Sort buttons
    sortBar.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSort = btn.dataset.sort;
            sortBar.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn--active'));
            btn.classList.add('sort-btn--active');
            renderFlights();
        });
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalConfirm.addEventListener('click', confirmBooking);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Filter to-city based on from-city
    fromSelect.addEventListener('change', () => {
        const from = fromSelect.value;
        const currentTo = toSelect.value;
        toSelect.innerHTML = '<option value="">Select destination city</option>';
        const sorted = [...CITIES].sort();
        sorted.forEach(city => {
            if (city !== from) {
                toSelect.appendChild(new Option(city, city));
            }
        });
        if (currentTo && currentTo !== from) {
            toSelect.value = currentTo;
        }
    });

    // Keyboard: Escape closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ── Search ────────────────────────────────────────────────────────────
function handleSearch(e) {
    e.preventDefault();
    clearErrors();

    const name = passengerInput.value.trim();
    const date = dateInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    let valid = true;

    if (!name || name.length < 2) {
        showError('error-name', 'Please enter a valid passenger name');
        valid = false;
    }
    if (!date) {
        showError('error-date', 'Please select a departure date');
        valid = false;
    }
    if (!from) {
        showError('error-from', 'Please select a departure city');
        valid = false;
    }
    if (!to) {
        showError('error-to', 'Please select a destination city');
        valid = false;
    }
    if (from && to && from === to) {
        showError('error-to', 'Destination must differ from departure');
        valid = false;
    }

    if (!valid) return;

    passengerName = name;

    // Find matching routes
    const matchingRoutes = ROUTES.filter(r => r.from === from && r.to === to);

    if (matchingRoutes.length === 0) {
        currentFlights = [];
    } else {
        currentFlights = [];
        matchingRoutes.forEach(route => {
            currentFlights.push(...generateFlightsForRoute(route, date));
        });
    }

    // Show results
    resultsSection.style.display = 'block';
    resultsSubtitle.textContent = `${from} → ${to}  •  ${formatDate(date)}  •  Passenger: ${name}`;

    if (currentFlights.length === 0) {
        flightsGrid.style.display = 'none';
        sortBar.style.display = 'none';
        noResults.style.display = 'block';
        resultsTitle.textContent = 'No Flights Available';
    } else {
        flightsGrid.style.display = 'flex';
        sortBar.style.display = 'flex';
        noResults.style.display = 'none';
        resultsTitle.textContent = `${currentFlights.length} Flights Found`;
        renderFlights();
    }

    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Render Flights ────────────────────────────────────────────────────
function renderFlights() {
    const sorted = [...currentFlights].sort((a, b) => {
        if (currentSort === 'price') return a.price - b.price;
        if (currentSort === 'duration') return a.duration - b.duration;
        if (currentSort === 'departure') return a.departureTime.localeCompare(b.departureTime);
        return 0;
    });

    flightsGrid.innerHTML = sorted.map((flight, i) => `
        <div class="flight-card" style="animation-delay: ${i * 0.08}s">
            <div class="flight-card__route">
                <div class="flight-card__airline">
                    <span class="flight-card__airline-dot"></span>
                    ${flight.airline}  •  ${flight.id}
                </div>
                <div class="flight-card__times">
                    <span>${flight.departureTime}</span>
                    <div class="flight-card__arrow">
                        <div class="flight-card__duration">${formatDuration(flight.duration)}</div>
                        <div class="flight-card__arrow-line"></div>
                    </div>
                    <span>${flight.arrivalTime}${flight.nextDay ? '<sup style="color:var(--accent-amber);font-size:0.6em;margin-left:2px">+1</sup>' : ''}</span>
                </div>
                <div class="flight-card__cities">
                    <span>${flight.from}</span>
                    <span>${flight.to}</span>
                </div>
            </div>
            <div class="flight-card__meta">
                <span class="flight-card__stops ${flight.stops === 0 ? 'flight-card__stops--nonstop' : 'flight-card__stops--with-stops'}">
                    ${flight.stops === 0 ? 'Nonstop' : flight.stops + ' Stop'}
                </span>
                <span class="flight-card__date">${formatDate(flight.date)}</span>
            </div>
            <div class="flight-card__price-area">
                <div>
                    <span class="flight-card__price">$${flight.price}</span>
                    <span class="flight-card__price-label"> / person</span>
                </div>
                <button class="flight-card__book-btn" onclick="openBookingModal('${flight.id}')">
                    Book Now →
                </button>
            </div>
        </div>
    `).join('');
}

// ── Booking Modal ────────────────────────────────────────────────────
function openBookingModal(flightId) {
    selectedFlight = currentFlights.find(f => f.id === flightId);
    if (!selectedFlight) return;

    modalDetails.innerHTML = `
        <div class="modal__row">
            <span class="modal__label">Passenger</span>
            <span class="modal__value">${passengerName}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Flight</span>
            <span class="modal__value">${selectedFlight.id}  •  ${selectedFlight.airline}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Route</span>
            <span class="modal__value">${selectedFlight.from} → ${selectedFlight.to}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Date</span>
            <span class="modal__value">${formatDate(selectedFlight.date)}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Departure</span>
            <span class="modal__value">${selectedFlight.departureTime}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Arrival</span>
            <span class="modal__value">${selectedFlight.arrivalTime}${selectedFlight.nextDay ? ' (+1 day)' : ''}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Duration</span>
            <span class="modal__value">${formatDuration(selectedFlight.duration)}  •  ${selectedFlight.stops === 0 ? 'Nonstop' : selectedFlight.stops + ' Stop'}</span>
        </div>
        <div class="modal__row">
            <span class="modal__label">Total Price</span>
            <span class="modal__value modal__value--highlight">$${selectedFlight.price}</span>
        </div>
    `;

    modalOverlay.classList.add('modal-overlay--visible');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('modal-overlay--visible');
    document.body.style.overflow = '';
    selectedFlight = null;
}

async function confirmBooking() {
    if (!selectedFlight) return;

    // Change button text to indicate loading
    const originalBtnHTML = modalConfirm.innerHTML;
    modalConfirm.innerHTML = `
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
        </svg>
        Booking...
    `;
    modalConfirm.disabled = true;

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                passengerName: passengerName,
                departureDate: selectedFlight.date,
                fromCity: selectedFlight.from,
                toCity: selectedFlight.to,
                airline: selectedFlight.airline,
                price: selectedFlight.price.toString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save booking');
        }

        const data = await response.json();
        
        // Show toast with database ID
        toastMessage.textContent = `Txn ID: ${data.id}  •  ${selectedFlight.from} → ${selectedFlight.to}  •  ${formatDate(selectedFlight.date)}`;
        toast.classList.add('toast--visible');

        setTimeout(() => {
            toast.classList.remove('toast--visible');
        }, 5000);

        closeModal();

    } catch (error) {
        console.error('Error confirming booking:', error);
        alert('There was an error saving your booking. Please try again.');
    } finally {
        modalConfirm.innerHTML = originalBtnHTML;
        modalConfirm.disabled = false;
    }
}

// ── Validation Helpers ────────────────────────────────────────────────
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

// ── Start ────────────────────────────────────────────────────────────
init();
