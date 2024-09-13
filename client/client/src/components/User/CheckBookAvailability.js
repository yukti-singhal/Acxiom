document.addEventListener('DOMContentLoaded', () => {
    const checkAvailabilityForm = document.getElementById('checkAvailabilityForm');
    const availabilityResult = document.getElementById('availabilityResult');
    
    checkAvailabilityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookId = document.getElementById('bookId').value;
        
        try {
            const response = await fetch(`/api/check-availability/${bookId}`);
            const data = await response.json();
            
            if (response.ok) {
                if (data.available) {
                    availabilityResult.textContent = `The book (ID: ${bookId}) is available. ${data.copies} copy/copies in stock.`;
                } else {
                    availabilityResult.textContent = `The book (ID: ${bookId}) is currently unavailable. Expected return date: ${data.expectedReturnDate}`;
                }
            } else {
                availabilityResult.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            availabilityResult.textContent = 'An error occurred while checking book availability.';
        }
    });
});