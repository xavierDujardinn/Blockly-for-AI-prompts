// Copy prompt to clipboard
document.getElementById('copyBtn').addEventListener('click', function() {
    const promptText = document.getElementById('promptResult').innerText;

    navigator.clipboard.writeText(promptText).then(function() {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerText;
        
        btn.innerText = "Copié !";
        btn.classList.add('success');

        setTimeout(function() {
            btn.innerText = originalText;
            btn.classList.remove('success');
        }, 2000);
    }).catch(function(err) {
        console.error('Erreur lors de la copie : ', err);
        alert("Erreur lors de la copie.");
    });
});