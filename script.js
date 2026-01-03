// Preset color palettes for furniture
const presetColors = [
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#f5f5f5' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Beige', hex: '#f5f5dc' },
    { name: 'Red', hex: '#c41e3a' },
    { name: 'Blue', hex: '#4169e1' },
    { name: 'Green', hex: '#228b22' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Cream', hex: '#fffdd0' }
];

// Furniture SVG templates
const furnitureTemplates = {
    chair: `
        <rect x="100" y="150" width="200" height="20" rx="5" class="furniture-seat" fill="var(--furniture-color)"/>
        <rect x="100" y="170" width="20" height="80" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="280" y="170" width="20" height="80" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="120" y="100" width="160" height="20" rx="5" class="furniture-back" fill="var(--furniture-color)"/>
        <rect x="120" y="100" width="20" height="50" rx="5" class="furniture-back-support" fill="var(--furniture-color)"/>
        <rect x="260" y="100" width="20" height="50" rx="5" class="furniture-back-support" fill="var(--furniture-color)"/>
    `,
    sofa: `
        <rect x="50" y="180" width="300" height="30" rx="5" class="furniture-seat" fill="var(--furniture-color)"/>
        <rect x="50" y="210" width="30" height="60" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="320" y="210" width="30" height="60" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="80" y="120" width="240" height="30" rx="5" class="furniture-back" fill="var(--furniture-color)"/>
        <rect x="80" y="120" width="30" height="60" rx="5" class="furniture-back-support" fill="var(--furniture-color)"/>
        <rect x="290" y="120" width="30" height="60" rx="5" class="furniture-back-support" fill="var(--furniture-color)"/>
        <rect x="140" y="120" width="80" height="30" rx="5" class="furniture-back" fill="var(--furniture-color)"/>
    `,
    table: `
        <rect x="80" y="100" width="240" height="20" rx="5" class="furniture-seat" fill="var(--furniture-color)"/>
        <rect x="100" y="120" width="20" height="100" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="280" y="120" width="20" height="100" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
        <rect x="180" y="120" width="20" height="100" rx="5" class="furniture-leg" fill="var(--furniture-color)"/>
    `,
    cabinet: `
        <rect x="100" y="80" width="200" height="180" rx="5" class="furniture-seat" fill="var(--furniture-color)"/>
        <rect x="120" y="100" width="160" height="15" rx="2" fill="rgba(0,0,0,0.2)"/>
        <rect x="120" y="130" width="160" height="15" rx="2" fill="rgba(0,0,0,0.2)"/>
        <rect x="120" y="160" width="160" height="15" rx="2" fill="rgba(0,0,0,0.2)"/>
        <circle cx="130" cy="107" r="3" fill="rgba(0,0,0,0.4)"/>
        <circle cx="290" cy="107" r="3" fill="rgba(0,0,0,0.4)"/>
        <rect x="100" y="80" width="200" height="10" rx="5" fill="rgba(0,0,0,0.1)"/>
    `
};

let currentColor = '#8B4513';
let currentFurnitureType = 'chair';

// Initialize the application
function init() {
    renderPresetColors();
    setupEventListeners();
    updateFurnitureColor(currentColor);
    updateFurnitureType(currentFurnitureType);
}

// Render preset colors
function renderPresetColors() {
    const presetColorsGrid = document.getElementById('presetColors');
    presetColorsGrid.innerHTML = '';
    
    presetColors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'preset-color';
        colorDiv.style.backgroundColor = color.hex;
        colorDiv.setAttribute('data-name', color.name);
        colorDiv.setAttribute('data-hex', color.hex);
        
        if (color.hex === currentColor) {
            colorDiv.classList.add('active');
        }
        
        colorDiv.addEventListener('click', () => {
            selectPresetColor(color.hex, color.name);
        });
        
        presetColorsGrid.appendChild(colorDiv);
    });
}

// Setup event listeners
function setupEventListeners() {
    const colorPicker = document.getElementById('colorPicker');
    const colorHex = document.getElementById('colorHex');
    const furnitureTypeBtns = document.querySelectorAll('.furniture-type-btn');
    
    // Color picker
    colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        updateFurnitureColor(color);
        colorHex.value = color;
        updateCurrentColorDisplay(color);
        updateActivePreset(color);
    });
    
    // Hex input
    colorHex.addEventListener('input', (e) => {
        let color = e.target.value;
        if (color.startsWith('#')) {
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                colorPicker.value = color;
                updateFurnitureColor(color);
                updateCurrentColorDisplay(color);
                updateActivePreset(color);
            }
        } else if (/^[0-9A-Fa-f]{6}$/.test(color)) {
            color = '#' + color;
            colorPicker.value = color;
            updateFurnitureColor(color);
            updateCurrentColorDisplay(color);
            updateActivePreset(color);
        }
    });
    
    // Furniture type buttons
    furnitureTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            furnitureTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const type = btn.getAttribute('data-type');
            updateFurnitureType(type);
        });
    });
}

// Update furniture color
function updateFurnitureColor(color) {
    currentColor = color;
    document.documentElement.style.setProperty('--furniture-color', color);
    updateCurrentColorDisplay(color);
}

// Update furniture type
function updateFurnitureType(type) {
    currentFurnitureType = type;
    const furniturePreview = document.getElementById('furniture-preview');
    furniturePreview.innerHTML = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${furnitureTemplates[type]}</svg>`;
}

// Select preset color
function selectPresetColor(hex, name) {
    updateFurnitureColor(hex);
    document.getElementById('colorPicker').value = hex;
    document.getElementById('colorHex').value = hex;
    updateActivePreset(hex);
    updateCurrentColorDisplay(hex, name);
}

// Update active preset
function updateActivePreset(color) {
    const presetColors = document.querySelectorAll('.preset-color');
    presetColors.forEach(preset => {
        if (preset.getAttribute('data-hex') === color) {
            preset.classList.add('active');
        } else {
            preset.classList.remove('active');
        }
    });
}

// Update current color display
function updateCurrentColorDisplay(color, name = null) {
    const swatch = document.getElementById('currentColorSwatch');
    const nameElement = document.getElementById('currentColorName');
    
    swatch.style.backgroundColor = color;
    
    if (name) {
        nameElement.textContent = name;
    } else {
        // Find matching preset color name
        const preset = presetColors.find(c => c.hex.toLowerCase() === color.toLowerCase());
        if (preset) {
            nameElement.textContent = preset.name;
        } else {
            nameElement.textContent = color.toUpperCase();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


