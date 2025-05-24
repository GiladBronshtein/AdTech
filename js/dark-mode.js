// Enhanced Dark Mode Toggle Implementation for Ad Tech Learning Platform
class DarkModeToggle {
    constructor() {
        this.darkModeKey = 'adtech-dark-mode';
        this.isInitialized = false;
        this.mermaidInitialized = false;
        this.originalMermaidContents = new Map(); // Store original content safely
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
                this.setupMermaidObserver();
            });
        } else {
            this.setupToggleButton();
            this.setupMermaidObserver();
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

    setupMermaidObserver() {
        // Observe when new Mermaid elements are added to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const mermaidElements = node.querySelectorAll ? node.querySelectorAll('.mermaid') : [];
                        if (node.classList && node.classList.contains('mermaid')) {
                            this.storeMermaidContent(node);
                        }
                        mermaidElements.forEach(element => this.storeMermaidContent(element));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    storeMermaidContent(element) {
        if (!element.id) {
            element.id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }

        if (!this.originalMermaidContents.has(element.id)) {
            const content = element.textContent.trim();
            if (content && content.length > 10 && !content.includes('undefined')) {
                this.originalMermaidContents.set(element.id, content);
                element.dataset.originalStored = 'true';
                console.log(`📝 Stored Mermaid content for ${element.id}`);
            }
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

        // Update Mermaid diagrams theme safely
        this.safeMermaidThemeUpdate(isDarkMode);
        
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

    safeMermaidThemeUpdate(isDarkMode) {
        // Only update if Mermaid is available and we have the app initialization function
        if (typeof mermaid === 'undefined') {
            console.log('Mermaid not available, skipping theme update');
            return;
        }

        try {
            const theme = isDarkMode ? 'dark' : 'default';
            
            // Get theme variables
            const themeVariables = this.getMermaidThemeVariables(isDarkMode);
            
            // Initialize Mermaid with new theme
            const config = {
                startOnLoad: false,
                theme: theme,
                securityLevel: 'loose',
                flowchart: {
                    htmlLabels: true,
                    curve: 'linear',
                    padding: 15,
                    nodeSpacing: 50,
                    rankSpacing: 50
                },
                sequence: {
                    actorMargin: 50,
                    width: 150,
                    height: 65,
                    boxMargin: 10,
                    boxTextMargin: 5,
                    noteMargin: 10,
                    messageMargin: 35
                },
                themeVariables: themeVariables
            };

            mermaid.initialize(config);
            console.log(`🎨 Mermaid theme updated to: ${theme}`);

            // Safely re-render existing diagrams
            setTimeout(() => {
                this.reRenderMermaidDiagrams();
            }, 300);

        } catch (error) {
            console.error('❌ Error updating Mermaid theme:', error);
        }
    }

    reRenderMermaidDiagrams() {
        try {
            const mermaidElements = document.querySelectorAll('.mermaid');
            
            if (mermaidElements.length === 0) {
                console.log('No Mermaid elements found to re-render');
                return;
            }

            console.log(`🔄 Re-rendering ${mermaidElements.length} Mermaid diagrams...`);

            mermaidElements.forEach((element, index) => {
                try {
                    // Clear any processed flag
                    element.removeAttribute('data-processed');
                    
                    // Restore original content
                    const originalContent = this.getOriginalContent(element);
                    if (originalContent) {
                        element.innerHTML = originalContent;
                        
                        // Ensure element has unique ID
                        if (!element.id) {
                            element.id = `mermaid-rerender-${index}-${Date.now()}`;
                        }
                        
                        console.log(`✅ Restored content for ${element.id}`);
                    } else {
                        console.warn(`⚠️ No original content found for element ${index}`);
                    }
                    
                } catch (elementError) {
                    console.warn(`⚠️ Error processing element ${index}:`, elementError);
                }
            });

            // Re-initialize diagrams after restoration
            setTimeout(() => {
                try {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'));
                    console.log('✅ Mermaid diagrams re-rendered successfully');
                } catch (initError) {
                    console.error('❌ Error re-initializing Mermaid diagrams:', initError);
                    
                    // Fallback: use app's Mermaid initialization if available
                    if (window.adTechApp && typeof window.adTechApp.initializeMermaidDiagrams === 'function') {
                        console.log('🔄 Trying app fallback for Mermaid initialization...');
                        window.adTechApp.initializeMermaidDiagrams();
                    }
                }
            }, 100);

        } catch (error) {
            console.error('❌ Error in reRenderMermaidDiagrams:', error);
        }
    }

    getOriginalContent(element) {
        // Try multiple sources for original content
        
        // 1. From our stored map
        if (element.id && this.originalMermaidContents.has(element.id)) {
            return this.originalMermaidContents.get(element.id);
        }
        
        // 2. From dataset
        if (element.dataset.originalContent) {
            return element.dataset.originalContent;
        }
        
        // 3. Try to get from current content if it looks valid
        const currentContent = element.textContent.trim();
        if (this.isValidMermaidContent(currentContent)) {
            return currentContent;
        }
        
        // 4. Generate default content based on context
        return this.generateDefaultMermaidContent(element);
    }

    isValidMermaidContent(content) {
        if (!content || content.length < 10) return false;
        
        const validKeywords = ['flowchart', 'graph', 'sequenceDiagram', 'classDiagram', 'stateDiagram'];
        return validKeywords.some(keyword => content.includes(keyword));
    }

    generateDefaultMermaidContent(element) {
        // Generate appropriate content based on context
        const container = element.closest('.flowchart-container') || element.closest('.card');
        
        if (container) {
            const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                const headingText = heading.textContent.toLowerCase();
                
                if (headingText.includes('header bidding')) {
                    return `flowchart TD
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
                }
                
                if (headingText.includes('rtb') || headingText.includes('real-time bidding')) {
                    return `flowchart TD
                        A[User Visits Website] --> B[Ad Request Generated]
                        B --> C[Publisher's Ad Server]
                        C --> D[Supply-Side Platform]
                        D --> E[Ad Exchange]
                        E --> F[DSPs Receive Bid Request]
                        F --> G[DSPs Evaluate User Data]
                        G --> H[DSPs Determine Bid Price]
                        H --> I[Bids Returned to Exchange]
                        I --> J[Auction Winner Determined]
                        J --> K[Winning Ad Served]
                        K --> L[Ad Displayed to User]`;
                }
                
                if (headingText.includes('data flow')) {
                    return `flowchart LR
                        A[User Data Collection] --> B[Data Management Platform]
                        B --> C[Audience Segmentation]
                        C --> D[DSP - Targeting]
                        B --> E[Publisher Insights]
                        E --> F[SSP - Inventory Valuation]`;
                }
                
                if (headingText.includes('ecosystem') || headingText.includes('overview')) {
                    return `graph TD
                        A[Advertiser] -->|Campaign| B[Ad Agency/Trading Desk]
                        B -->|Campaign Setup| C[DSP - Demand Side Platform]
                        C -->|Bid Request| D[Ad Exchange]
                        E[Publisher] -->|Ad Inventory| F[SSP - Supply Side Platform]
                        F -->|Inventory| D
                        D -->|Winning Bid| G[Ad Serving]
                        G -->|Ad Creative| H[User's Device]`;
                }
                
                if (headingText.includes('reach users') || headingText.includes('user')) {
                    return `sequenceDiagram
                        participant User as User visits website
                        participant Publisher as Publisher
                        participant SSP as Supply-Side Platform
                        participant Exchange as Ad Exchange
                        participant DSP as Demand-Side Platform
                        participant Advertiser as Advertiser
                        User->>Publisher: Visits website
                        Publisher->>SSP: Ad request
                        SSP->>Exchange: Send ad inventory
                        Exchange->>DSP: Request bids
                        DSP->>Advertiser: Should we bid?
                        Advertiser->>DSP: Yes, bid $X
                        DSP->>Exchange: Submit bid
                        Exchange->>SSP: Winning bid
                        SSP->>Publisher: Ad to display
                        Publisher->>User: Show ad to user`;
                }
            }
        }
        
        // Default fallback
        return `graph TD
            A[Start] --> B[Process]
            B --> C[End]`;
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
                edgeLabelBackground: '#1e1e1e',
                actorBkg: '#2d2d2d',
                actorBorder: '#444',
                actorTextColor: '#f8f9fa',
                actorLineColor: '#adb5bd'
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
                edgeLabelBackground: '#ffffff',
                actorBkg: '#ffffff',
                actorBorder: '#ddd',
                actorTextColor: '#333',
                actorLineColor: '#333'
            };
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
        this.safeMermaidThemeUpdate(isDarkMode);
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
