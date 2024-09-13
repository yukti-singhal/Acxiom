document.addEventListener('DOMContentLoaded', () => {
    const returnBookForm = document.getElementById('returnBookForm');
    
    returnBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookId = document.getElementById('bookId').value;
        const userId = document.getElementById('userId').value;
        
        try {
            const response = await fetch('/api/return-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId, userId }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Book returned successfully!');
                if (data.fine > 0) {
                    alert(`Fine incurred: $${data.fine}. Please pay at the counter.`);
                }
                returnBookForm.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while returning the book.');
        }
    });
});
