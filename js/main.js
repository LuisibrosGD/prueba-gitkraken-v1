// Detectar la rama actual (simulado desde el entorno)
function getCurrentBranch() {
    const branchName = document.body.getAttribute('data-branch') || 'main';
    return branchName;
}

// Mostrar información de la rama
function displayBranchInfo() {
    const branchInfo = document.getElementById('branchInfo');
    const currentBranch = getCurrentBranch();
    
    const infoHTML = `
        <p><strong>🌿 Rama actual:</strong> ${currentBranch}</p>
        <p><strong>📅 Última modificación:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>🎯 Características activas:</strong> ${getFeaturesForBranch(currentBranch)}</p>
    `;
    
    branchInfo.innerHTML = infoHTML;
}

// Obtener características según la rama
function getFeaturesForBranch(branch) {
    const features = {
        'main': 'Características base del proyecto + 🌓 Cambio de tema',
        'feature/mensaje-bienvenida': '✨ Mensaje de bienvenida personalizado + 🌓 Cambio de tema',
        'feature/contador-clics': '🔢 Contador de clics interactivo + 🌓 Cambio de tema',
        'feature/theme-switcher': '🎨 Cambiador de tema oscuro/claro (completo)'
    };
    
    return features[branch] || 'Características estándar + 🌓 Cambio de tema';
}

// Configurar mensaje principal
function setupMainButton() {
    const button = document.getElementById('mainButton');
    const messageDiv = document.getElementById('mainMessage');
    
    if (button) {
        button.addEventListener('click', () => {
            messageDiv.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px;">
                    ✅ ¡Clic detectado en la rama ${getCurrentBranch()}!
                </div>
            `;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        });
    }
}

// Configurar mensaje secundario
function setupSecondaryButton() {
    const button = document.getElementById('secondaryButton');
    const messageDiv = document.getElementById('secondaryMessage');
    
    if (button) {
        button.addEventListener('click', () => {
            messageDiv.innerHTML = `
                <div style="background: #cce5ff; color: #004085; padding: 10px; border-radius: 5px;">
                    ℹ️ Funcionalidad secundaria activa desde la rama ${getCurrentBranch()}
                </div>
            `;
        });
    }
}

// ===== NUEVO: Función para el modo oscuro/claro =====
function setupThemeToggle() {
    const themeButton = document.getElementById('themeToggle');
    
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o detectar preferencia del sistema
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeButton.textContent = '☀️ Modo Claro';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeButton.textContent = '🌙 Modo Oscuro';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Si el sistema prefiere modo oscuro
        document.body.classList.add('dark-mode');
        themeButton.textContent = '☀️ Modo Claro';
        localStorage.setItem('theme', 'dark');
    }
    
    // Evento del botón
    themeButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        if (isDarkMode) {
            themeButton.textContent = '☀️ Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            themeButton.textContent = '🌙 Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Función específica para la rama feature/mensaje-bienvenida
function addWelcomeMessage() {
    const mainSection = document.querySelector('.main-feature');
    
    // Verificar si ya existe para no duplicar
    if (document.querySelector('.welcome-message')) return;
    
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
        animation: slideIn 0.5s ease;
    `;
    welcomeMessage.innerHTML = `
        <strong>🎉 ¡Bienvenido al proyecto!</strong><br>
        Estás aprendiendo a trabajar con ramas en GitKraken.
    `;
    
    mainSection.appendChild(welcomeMessage);
    
    // Agregar animación CSS si no existe
    if (!document.querySelector('#welcome-animation')) {
        const style = document.createElement('style');
        style.id = 'welcome-animation';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función específica para la rama feature/contador-clics
function addCounterFeature() {
    const secondarySection = document.querySelector('.secondary-feature');
    
    // Verificar si ya existe para no duplicar
    if (document.querySelector('.counter-feature')) return;
    
    let counter = 0;
    
    const counterDiv = document.createElement('div');
    counterDiv.className = 'counter-feature';
    counterDiv.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        text-align: center;
    `;
    
    const counterDisplay = document.createElement('h3');
    counterDisplay.textContent = `Clics: ${counter}`;
    counterDisplay.style.margin = '10px 0';
    
    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+1';
    incrementButton.style.cssText = `
        padding: 5px 15px;
        margin: 0 5px;
        background: #4299e1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.cssText = `
        padding: 5px 15px;
        margin: 0 5px;
        background: #e53e3e;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    incrementButton.addEventListener('click', () => {
        counter++;
        counterDisplay.textContent = `Clics: ${counter}`;
    });
    
    resetButton.addEventListener('click', () => {
        counter = 0;
        counterDisplay.textContent = `Clics: ${counter}`;
    });
    
    counterDiv.appendChild(counterDisplay);
    counterDiv.appendChild(incrementButton);
    counterDiv.appendChild(resetButton);
    
    secondarySection.appendChild(counterDiv);
}

// Inicializar según la rama
function initializeFeatures() {
    const currentBranch = getCurrentBranch();
    
    // Configurar botones base
    setupMainButton();
    setupSecondaryButton();
    setupThemeToggle(); // ← NUEVO: Inicializar el tema
    
    // Agregar características específicas según la rama
    switch(currentBranch) {
        case 'feature/mensaje-bienvenida':
            addWelcomeMessage();
            break;
        case 'feature/contador-clics':
            addCounterFeature();
            break;
        case 'feature/theme-switcher':
            // El theme switcher ya está incluido por defecto
            // Pero podemos agregar un indicador visual
            const themeIndicator = document.createElement('div');
            themeIndicator.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: #48bb78;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 1000;
            `;
            themeIndicator.textContent = '🎨 Theme Switcher Activo';
            document.body.appendChild(themeIndicator);
            
            setTimeout(() => {
                themeIndicator.style.opacity = '0';
                setTimeout(() => themeIndicator.remove(), 1000);
            }, 3000);
            break;
    }
    
    displayBranchInfo();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeFeatures);