// Dark Mode Toggle Implementation for Ad Tech Learning Platform
class DarkModeToggle {
    constructor() {
        this.darkModeKey = 'adtech-dark-mode';
        this.init();
    }

    init() {
        // Prevent flash of wrong theme on page load
        this.preventFlashOnLoad();
        
        // Check saved preference or default to light mode
        const savedMode = localStorage.getItem(this.darkModeKey);
        const isDarkMode = savedMode === 'true';
        
        // Apply initial mode
        this.setDarkMode(isDarkMode, false);
        
        // Set up toggle button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupToggleButton();
            });
        } else {
            this.setupToggleButton();
        }
    }

    preventFlashOnLoad() {
        // Add no-transition class to prevent flash during initial load
        document.documentElement.classList.add('no-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('no-transition');
        }, 100);
    }

    setupToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) {
            console.warn('Dark mode toggle button not found. Make sure element with id "darkModeToggle" exists.');
            return;
        }

        // Click handler
        toggleButton.addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Keyboard support for accessibility
        toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDarkMode();
            }
        });

        // Update button state based on current mode
        this.updateToggleButton();
    }

    toggleDarkMode() {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        this.setDarkMode(!isCurrentlyDark, true);
        
        // Add a subtle feedback animation
        this.animateToggle();
    }

    setDarkMode(isDarkMode, savePreference = true) {
        const body = document.body;
        
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        // Update toggle button appearance
        this.updateToggleButton();

        // Save preference to localStorage
        if (savePreference) {
            localStorage.setItem(this.darkModeKey, isDarkMode.toString());
        }

        // Dispatch custom event for other components that might need to know
        document.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { 
                isDarkMode,
                timestamp: Date.now()
            }
        }));

        // Update Mermaid diagrams if they exist
        this.updateMermaidTheme(isDarkMode);
    }

    updateToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;

        const icon = toggleButton.querySelector('i');
        const text = toggleButton.querySelector('.toggle-text');
        const isDarkMode = this.isDarkMode();

        if (isDarkMode) {
            if (icon) {
                icon.className = 'fas fa-sun';
            }
            if (text) {
                text.textContent = 'Light Mode';
            }
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
            toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            if (icon) {
                icon.className = 'fas fa-moon';
            }
            if (text) {
                text.textContent = 'Dark Mode';
            }
            toggleButton.setAttribute('aria-label', 'Switch to dark mode');
            toggleButton.setAttribute('title', 'Switch to dark mode');
        }
    }

    animateToggle() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;

        // Add animation class
        toggleButton.classList.add('toggle-animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            toggleButton.classList.remove('toggle-animate');
        }, 300);
    }

    updateMermaidTheme(isDarkMode) {
        // Update Mermaid diagrams theme if Mermaid is available
        if (typeof mermaid !== 'undefined') {
            const theme = isDarkMode ? 'dark' : 'default';
            
            // Reinitialize Mermaid with new theme
            try {
                mermaid.initialize({ 
                    startOnLoad: false, 
                    theme: theme,
                    securityLevel: 'loose'
                });
                
                // Re-render existing diagrams
                setTimeout(() => {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                }, 100);
            } catch (error) {
                console.warn('Could not update Mermaid theme:', error);
            }
        }
    }

    // Public method to check current mode
    isDarkMode() {
        return document.body.classList.contains('dark-mode');
    }

    // Public method to programmatically set mode
    setMode(isDarkMode) {
        this.setDarkMode(isDarkMode, true);
    }

    // Public method to get user's saved preference
    getSavedPreference() {
        return localStorage.getItem(this.darkModeKey);
    }

    // Public method to clear saved preference
    clearPreference() {
        localStorage.removeItem(this.darkModeKey);
    }

    // Public method to reset to system preference
    useSystemPreference() {
        this.clearPreference();
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDarkMode(systemPrefersDark, false);
    }
}

// Add CSS for toggle animation
const toggleAnimationCSS = `
    .dark-mode-toggle.toggle-animate {
        transform: scale(0.95);
    }
    
    .dark-mode-toggle {
        transition: transform 0.1s ease, background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Prevent transition flash on page load */
    .no-transition * {
        transition: none !important;
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = toggleAnimationCSS;
document.head.appendChild(style);

// Initialize dark mode toggle when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeToggle = new DarkModeToggle();
    });
} else {
    window.darkModeToggle = new DarkModeToggle();
}

// Listen for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (window.darkModeToggle && !window.darkModeToggle.getSavedPreference()) {
            window.darkModeToggle.setDarkMode(e.matches, false);
        }
    });
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}

// Console info for developers
console.log('🌙 Dark Mode Toggle initialized. Use window.darkModeToggle to control programmatically.');
