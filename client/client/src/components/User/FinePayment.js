document.addEventListener('DOMContentLoaded', () => {
    const finePaymentForm = document.getElementById('finePaymentForm');
    
    finePaymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const amount = document.getElementById('amount').value;
        
        try {
            const response = await fetch('/api/pay-fine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, amount }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Fine paid successfully!');
                finePaymentForm.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the payment.');
        }
    });
});