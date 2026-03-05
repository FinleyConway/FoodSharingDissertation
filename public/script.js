fetch('/api')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('output').innerText = `Hello, ${data.name}!`;
    })
    .catch(error => {
        console.error('Error fetching API:', error);
    });
