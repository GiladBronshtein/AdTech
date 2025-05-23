// Fixed Module Loader for Ad Tech Learning Platform
document.addEventListener('DOMContentLoaded', function() {
    // List of modules to load in the correct order
    const modules = [
        'dark-mode.js',          // Load dark mode first
        'content-data.js',
        'overview-content.js',
        'beginner-content.js',
        'intermediate-content.js',
        'expert-content.js',
        'quiz-content.js',
        'glossary-content.js',
        'app.js'                 // Load app.js last
    ];
    
    // Track loading progress
    let modulesLoaded = 0;
    let loadingFailed = false;
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Load modules sequentially
    loadModules(0);
    
    function showLoadingIndicator() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-overlay';
        loadingIndicator.id = 'moduleLoader';
        loadingIndicator.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="loading-text mt-3">Loading modules: <span id="loadingProgress">0/${modules.length}</span></p>
            </div>
        `;
        document.body.appendChild(loadingIndicator);
    }
    
    function updateProgress() {
        const progressElement = document.getElementById('loadingProgress');
        if (progressElement) {
            progressElement.textContent = `${modulesLoaded}/${modules.length}`;
        }
    }
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            
            // Try different possible paths
            const possiblePaths = [
                `js/${src}`,
                `./${src}`,
                src
            ];
            
            let currentPathIndex = 0;
            
            function tryNextPath() {
                if (currentPathIndex >= possiblePaths.length) {
                    reject(new Error(`Failed to load script: ${src}`));
                    return;
                }
                
                script.src = possiblePaths[currentPathIndex];
                currentPathIndex++;
                
                script.onload = function() {
                    console.log(`✅ Loaded: ${src}`);
                    resolve();
                };
                
                script.onerror = function() {
                    console.warn(`❌ Failed to load from: ${script.src}`);
                    if (currentPathIndex < possiblePaths.length) {
                        tryNextPath();
                    } else {
                        reject(new Error(`Failed to load script: ${src}`));
                    }
                };
                
                document.head.appendChild(script);
            }
            
            tryNextPath();
        });
    }
    
    async function loadModules(startIndex = 0) {
        for (let i = startIndex; i < modules.length; i++) {
            try {
                await loadScript(modules[i]);
                modulesLoaded++;
                updateProgress();
                
                // Small delay to prevent overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 50));
                
            } catch (error) {
                console.error(`Failed to load module: ${modules[i]}`, error);
                
                // For critical modules, show error
                if (modules[i] === 'app.js' || modules[i] === 'content-data.js') {
                    showError(`Failed to load critical module: ${modules[i]}`);
                    loadingFailed = true;
                    return;
                }
                
                // For non-critical modules, continue loading
                console.warn(`Skipping failed module: ${modules[i]}`);
                modulesLoaded++;
                updateProgress();
            }
        }
        
        // All modules loaded successfully
        if (!loadingFailed) {
            initializeApp();
        }
    }
    
    function initializeApp() {
        console.log('🚀 All modules loaded successfully');
        
        // Hide loading indicator
        hideLoadingIndicator();
        
        // Initialize the app
        setTimeout(() => {
            try {
                if (typeof initApp === 'function') {
                    initApp();
                } else if (typeof loadContent === 'function') {
                    loadContent();
                } else {
                    console.warn('No init function found, app may not work properly');
                }
                
                // Force Mermaid initialization
                if (typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                }
                
                // Ensure overview tab is active
                activateOverviewTab();
                
            } catch (error) {
                console.error('Error initializing app:', error);
                showError('Failed to initialize application');
            }
        }, 100);
    }
    
    function hideLoadingIndicator() {
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator) {
            loadingIndicator.classList.add('fade-out');
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.parentNode.removeChild(loadingIndicator);
                }
            }, 500);
        }
    }
    
    function activateOverviewTab() {
        try {
            const overviewTab = document.getElementById('overview-tab');
            const overviewPane = document.getElementById('overview');
            
            if (overviewTab && overviewPane) {
                // Deactivate all tabs first
                document.querySelectorAll('#mainNav .nav-link').forEach(tab => {
                    tab.classList.remove('active');
                    tab.setAttribute('aria-selected', 'false');
                });
                
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // Activate overview tab and pane
                overviewTab.classList.add('active');
                overviewTab.setAttribute('aria-selected', 'true');
                overviewPane.classList.add('show', 'active');
                
                console.log('✅ Overview tab activated');
            } else {
                console.warn('Overview tab or pane not found');
            }
        } catch (error) {
            console.error('Error activating overview tab:', error);
        }
    }
    
    function showError(message) {
        // Remove loading indicator
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger position-fixed top-50 start-50 translate-middle';
        errorDiv.style.zIndex = '9999';
        errorDiv.style.maxWidth = '90%';
        errorDiv.innerHTML = `
            <h4>Loading Error</h4>
            <p>${message}</p>
            <button class="btn btn-outline-danger" onclick="location.reload()">
                <i class="fas fa-refresh me-2"></i>Reload Page
            </button>
        `;
        document.body.appendChild(errorDiv);
    }
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error caught:', e.error);
        if (e.error && e.error.message && e.error.message.includes('module')) {
            showError('A module failed to load. Please refresh the page.');
        }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault(); // Prevent the default browser behavior
    });
});

// Fallback initialization if modules fail to load
setTimeout(() => {
    const loadingIndicator = document.getElementById('moduleLoader');
    if (loadingIndicator && !loadingIndicator.classList.contains('fade-out')) {
        console.warn('⚠️ Module loading taking too long, trying fallback initialization');
        
        // Try to initialize what we can
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({ 
                startOnLoad: true, 
                theme: 'default',
                securityLevel: 'loose'
            });
        }
        
        // Hide loader and show basic content
        loadingIndicator.style.display = 'none';
        
        // Show a warning to the user
        const warningDiv = document.createElement('div');
        warningDiv.className = 'alert alert-warning m-3';
        warningDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            Some features may not work properly. Please refresh the page.
        `;
        document.body.insertBefore(warningDiv, document.body.firstChild);
    }
}, 10000); // 10 second timeout
