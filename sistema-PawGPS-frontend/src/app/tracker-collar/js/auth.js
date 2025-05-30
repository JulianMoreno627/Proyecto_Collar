document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const deviceId = document.getElementById('deviceId').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    try {
        errorMsg.style.display = 'none';
      const response = await fetch('/tracker-api/auth/login', {  // Usa /tracker-api como prefix
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deviceId, password })
});
        const data = await response.json();

        if (data.success) {
            window.location.href = data.redirect;
        } else {
            errorMsg.textContent = data.message || "Credenciales incorrectas";
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión";
        errorMsg.style.display = 'block';
        console.error("Login error:", error);
    }
});