// Dark Mode Toggle Implementation for Ad Tech Learning Platform
class DarkModeToggle {
    constructor() {
        this.darkModeKey = 'adtech-dark-mode';
        this.isInitialized = false;
        this.mermaidInitialized = false;
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
                this.initializeMermaid();
            });
        } else {
            this.setupToggleButton();
            this.initializeMermaid();
        }
        
        this.isInitialized = true;
    }

    preventFlashOnLoad() {
        // Add no-transition class to prevent flash during initial load
        document.documentElement.classList.add('no-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('no-transition');
        }, 100);
    }

    initializeMermaid() {
        if (typeof mermaid !== 'undefined' && !this.mermaidInitialized) {
            try {
                const isDarkMode = this.isDarkMode();
                const theme = isDarkMode ? 'dark' : 'default';
                
                mermaid.initialize({ 
                    startOnLoad: false, 
                    theme: theme,
                    securityLevel: 'loose',
                    flowchart: {
                        htmlLabels: true,
                        curve: 'linear'
                    },
                    themeVariables: this.getMermaidThemeVariables(isDarkMode)
                });
                
                this.mermaidInitialized = true;
                console.log('🎨 Mermaid initialized with theme:', theme);
            } catch (error) {
                console.warn('⚠️ Could not initialize Mermaid:', error);
            }
        }
    }

    getMermaidThemeVariables(isDarkMode) {
        if (isDarkMode) {
            return {
                primaryColor: '#3498db',
                primaryTextColor: '#f8f9fa',
                primaryBorderColor: '#444',
                lineColor: '#adb5bd',
                secondaryColor: '#1e1e1e',
                tertiaryColor: '#2d2d2d',
                background: '#1e1e1e',
                mainBkg: '#1e1e1e',
                secondBkg: '#2d2d2d',
                tertiaryBkg: '#444',
                nodeBorder: '#444',
                clusterBkg: '#2d2d2d',
                defaultLinkColor: '#adb5bd',
                titleColor: '#f8f9fa',
                edgeLabelBackground: '#1e1e1e'
            };
        } else {
            return {
                primaryColor: '#3498db',
                primaryTextColor: '#333',
                primaryBorderColor: '#ddd',
                lineColor: '#333',
                secondaryColor: '#ffffff',
                tertiaryColor: '#f9f9f9',
                background: '#ffffff',
                mainBkg: '#ffffff',
                secondBkg: '#f9f9f9',
                tertiaryBkg: '#e1f5fe',
                nodeBorder: '#ddd',
                clusterBkg: '#f9f9f9',
                defaultLinkColor: '#333',
                titleColor: '#333',
                edgeLabelBackground: '#ffffff'
            };
        }
    }

    setupToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) {
            console.warn('Dark mode toggle button not found. Make sure element with id "darkModeToggle" exists.');
            return;
        }

        // Click handler
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
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

        // Update Mermaid diagrams if initialized
        if (this.mermaidInitialized) {
            this.updateMermaidTheme(isDarkMode);
        }
        
        // Update other dynamic elements
        this.updateDynamicElements(isDarkMode);

        // Dispatch custom event for other components that might need to know
        document.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { 
                isDarkMode,
                timestamp: Date.now()
            }
        }));
    }

    updateToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;

        const icon = toggleButton.querySelector('i');
        const text = toggleButton.querySelector('.toggle-text');
        const isDarkMode = this.isDarkMode();

        // Update icon and text
        if (isDarkMode) {
            if (icon) {
                icon.className = 'fas fa-sun';
                icon.style.color = '#ffd700'; // Golden sun color
            }
            if (text) {
                text.textContent = 'Light Mode';
            }
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
            toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            if (icon) {
                icon.className = 'fas fa-moon';
                icon.style.color = '#4a90e2'; // Blue moon color
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
        if (typeof mermaid !== 'undefined' && this.mermaidInitialized) {
            try {
                const theme = isDarkMode ? 'dark' : 'default';
                const config = {
                    startOnLoad: false,
                    theme: theme,
                    securityLevel: 'loose',
                    flowchart: {
                        htmlLabels: true,
                        curve: 'linear'
                    },
                    themeVariables: this.getMermaidThemeVariables(isDarkMode)
                };
                
                // Clear existing processed diagrams
                const mermaidElements = document.querySelectorAll('.mermaid');
                mermaidElements.forEach(element => {
                    if (element.getAttribute('data-processed')) {
                        element.removeAttribute('data-processed');
                        // Store original content if not already stored
                        if (!element.dataset.originalContent) {
                            const originalContent = element.textContent.trim();
                            if (originalContent && !originalContent.includes('flowchart') && !originalContent.includes('graph')) {
                                // If content looks corrupted, try to restore from nearby heading
                                const parent = element.closest('.flowchart-container');
                                const heading = parent ? parent.querySelector('h3, h5, h6') : null;
                                if (heading && heading.textContent.includes('Header Bidding')) {
                                    element.dataset.originalContent = `flowchart TD
                                        A[User Visits Page] --> B[Header Bidding Code Executes]
                                        B --> C[Simultaneous Bid Requests]
                                        C --> D[SSP/Exchange 1]
                                        C --> E[SSP/Exchange 2]
                                        C --> F[SSP/Exchange 3]
                                        D --> G[Bids Collected]
                                        E --> G
                                        F --> G
                                        G --> H[Highest Bid Selected]
                                        H --> I[Passed to Ad Server]
                                        I --> J{Compare with Direct Deals}
                                        J --> K[Final Winner Determined]
                                        K --> L[Ad Served to User]`;
                                } else if (heading && heading.textContent.includes('Data Flow')) {
                                    element.dataset.originalContent = `flowchart LR
                                        A[User Data Collection] --> B[Data Management Platform]
                                        B --> C[Audience Segmentation]
                                        C --> D[DSP - Targeting]
                                        B --> E[Publisher Insights]
                                        E --> F[SSP - Inventory Valuation]
                                        G[Campaign Performance] --> H[Optimization Algorithms]
                                        H --> D
                                        I[Identity Resolution] --> B
                                        J[3rd Party Data Providers] --> B
                                        K[1st Party Data] --> B
                                        L[Ad Interactions] --> G
                                        M[Conversions] --> G`;
                                } else {
                                    element.dataset.originalContent = originalContent;
                                }
                            } else {
                                element.dataset.originalContent = originalContent;
                            }
                        }
                        // Clear the element and restore original content
                        element.innerHTML = element.dataset.originalContent || '';
                    }
                });

                // Reinitialize Mermaid with new theme
                mermaid.initialize(config);
                
                // Re-render diagrams with delay
                setTimeout(() => {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'));
                }, 200);
                
                console.log(`🎨 Mermaid theme updated to: ${theme}`);
            } catch (error) {
                console.warn('Could not update Mermaid theme:', error);
            }
        }
    }

    updateDynamicElements(isDarkMode) {
        // Update any dynamically created elements that might not have CSS coverage
        
        // Update Bootstrap modals
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            if (isDarkMode) {
                modal.style.backgroundColor = '#1e1e1e';
                modal.style.color = '#f8f9fa';
                modal.style.borderColor = '#444';
            } else {
                modal.style.backgroundColor = '';
                modal.style.color = '';
                modal.style.borderColor = '';
            }
        });

        // Update progress bars
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(progress => {
            if (isDarkMode) {
                progress.style.backgroundColor = '#444';
            } else {
                progress.style.backgroundColor = '';
            }
        });
    }

    // Force refresh of all Mermaid diagrams
    refreshMermaidDiagrams() {
        if (typeof mermaid !== 'undefined' && this.mermaidInitialized) {
            try {
                // Clear all processed diagrams
                const mermaidElements = document.querySelectorAll('.mermaid[data-processed]');
                mermaidElements.forEach(element => {
                    element.removeAttribute('data-processed');
                    element.innerHTML = element.dataset.originalContent || element.innerHTML;
                });

                // Re-initialize all diagrams
                setTimeout(() => {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'));
                }, 100);
            } catch (error) {
                console.warn('Could not refresh Mermaid diagrams:', error);
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

    // Public method to force refresh of all themes
    refreshThemes() {
        const isDarkMode = this.isDarkMode();
        this.updateMermaidTheme(isDarkMode);
        this.updateDynamicElements(isDarkMode);
        this.updateToggleButton();
    }
}

// Add enhanced CSS for toggle animation and effects
const toggleAnimationCSS = `
    .dark-mode-toggle.toggle-animate {
        transform: scale(0.95);
    }
    
    .dark-mode-toggle {
        transition: transform 0.1s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    /* Prevent transition flash on page load */
    .no-transition * {
        transition: none !important;
    }
    
    /* Enhanced icon styles */
    .dark-mode-toggle i {
        transition: color 0.3s ease, transform 0.3s ease;
    }
    
    .dark-mode-toggle:hover i {
        transform: scale(1.1) rotate(10deg);
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = toggleAnimationCSS;
document.head.appendChild(style);

// Initialize dark mode toggle when DOM is loaded
let darkModeToggleInstance = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        darkModeToggleInstance = new DarkModeToggle();
        window.darkModeToggle = darkModeToggleInstance;
    });
} else {
    darkModeToggleInstance = new DarkModeToggle();
    window.darkModeToggle = darkModeToggleInstance;
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
console.log('🌙 Enhanced Dark Mode Toggle initialized. Use window.darkModeToggle to control programmatically.');
