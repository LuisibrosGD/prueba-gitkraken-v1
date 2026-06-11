// Detectar la rama actual (simulado desde el entorno)
// En un proyecto real, esto podría venir de un archivo o API
function getCurrentBranch() {
    // Esta información la actualizaremos manualmente en cada rama
    // Simulamos la detección de rama
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
        'main': 'Características base del proyecto',
        'feature/mensaje-bienvenida': '✨ Mensaje de bienvenida personalizado',
        'feature/contador-clics': '🔢 Contador de clics interactivo',
        'feature/theme-switcher': '🎨 Cambiador de tema oscuro/claro'
    };
    
    return features[branch] || 'Características estándar';
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

// Función específica para la rama feature/mensaje-bienvenida
function addWelcomeMessage() {
    const mainSection = document.querySelector('.main-feature');
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
    
    // Agregar animación CSS
    const style = document.createElement('style');
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

// Función específica para la rama feature/contador-clics
function addCounterFeature() {
    const secondarySection = document.querySelector('.secondary-feature');
    let counter = 0;
    
    const counterDiv = document.createElement('div');
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

// Función específica para la rama feature/theme-switcher
function addThemeSwitcher() {
    const header = document.querySelector('header');
    const container = document.querySelector('.container');
    
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Modo Oscuro';
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #2d3748;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
    `;
    
    let isDarkMode = false;
    
    themeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.style.background = '#1a202c';
            container.style.background = '#2d3748';
            container.style.color = '#e2e8f0';
            themeButton.textContent = '☀️ Modo Claro';
            themeButton.style.background = '#e2e8f0';
            themeButton.style.color = '#2d3748';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            container.style.background = 'white';
            container.style.color = '#333';
            themeButton.textContent = '🌙 Modo Oscuro';
            themeButton.style.background = '#2d3748';
            themeButton.style.color = 'white';
        }
    });
    
    document.body.appendChild(themeButton);
}

// Inicializar según la rama
function initializeFeatures() {
    const currentBranch = getCurrentBranch();
    
    // Configurar botones base
    setupMainButton();
    setupSecondaryButton();
    
    // Agregar características específicas según la rama
    switch(currentBranch) {
        case 'feature/mensaje-bienvenida':
            addWelcomeMessage();
            break;
        case 'feature/contador-clics':
            addCounterFeature();
            break;
        case 'feature/theme-switcher':
            addThemeSwitcher();
            break;
    }
    
    displayBranchInfo();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeFeatures);