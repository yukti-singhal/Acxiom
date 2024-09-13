document.addEventListener('DOMContentLoaded', () => {
    const issueBookForm = document.getElementById('issueBookForm');
    
    issueBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookId = document.getElementById('bookId').value;
        const userId = document.getElementById('userId').value;
        
        try {
            const response = await fetch('/api/issue-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId, userId }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Book issued successfully!');
                issueBookForm.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while issuing the book.');
        }
    });
});
