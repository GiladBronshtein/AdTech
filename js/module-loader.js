// Enhanced Module Loader for Ad Tech Learning Platform
document.addEventListener('DOMContentLoaded', function() {
    // List of modules to load in the correct order
    const modules = [
        'dark-mode.js',          // Load dark mode first
        'content-data.js',       // Then content data structure
        'overview-content.js',   // Content modules
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
    let retryCount = 0;
    const maxRetries = 2;
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Load modules sequentially with retry logic
    loadModules(0);
    
    function showLoadingIndicator() {
        // Remove any existing loader
        const existingLoader = document.getElementById('moduleLoader');
        if (existingLoader) {
            existingLoader.remove();
        }
        
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-overlay';
        loadingIndicator.id = 'moduleLoader';
        loadingIndicator.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h4 class="loading-text mt-3">Loading Ad Tech Platform</h4>
                <p class="small text-muted">
                    Modules: <span id="loadingProgress">0/${modules.length}</span>
                    <span id="loadingStatus" class="d-block mt-2">Initializing...</span>
                </p>
            </div>
        `;
        document.body.appendChild(loadingIndicator);
        console.log('📺 Loading indicator shown');
    }
    
    function updateProgress(status = '') {
        const progressElement = document.getElementById('loadingProgress');
        const statusElement = document.getElementById('loadingStatus');
        
        if (progressElement) {
            progressElement.textContent = `${modulesLoaded}/${modules.length}`;
        }
        
        if (statusElement && status) {
            statusElement.textContent = status;
        }
    }
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            const existingScript = document.querySelector(`script[src*="${src}"]`);
            if (existingScript) {
                console.log(`⚡ Script ${src} already loaded, skipping...`);
                resolve();
                return;
            }
            
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
                    reject(new Error(`Failed to load script: ${src} from all paths`));
                    return;
                }
                
                const scriptPath = possiblePaths[currentPathIndex];
                script.src = scriptPath;
                currentPathIndex++;
                
                console.log(`🔄 Attempting to load: ${scriptPath}`);
                updateProgress(`Loading ${src}...`);
                
                script.onload = function() {
                    console.log(`✅ Successfully loaded: ${src}`);
                    resolve();
                };
                
                script.onerror = function() {
                    console.warn(`❌ Failed to load from: ${scriptPath}`);
                    
                    // Remove failed script
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    
                    if (currentPathIndex < possiblePaths.length) {
                        // Try next path after a short delay
                        setTimeout(tryNextPath, 100);
                    } else {
                        reject(new Error(`Failed to load script: ${src} from all paths`));
                    }
                };
                
                // Set script attributes
                script.type = 'text/javascript';
                script.async = false; // Load scripts in order
                
                document.head.appendChild(script);
            }
            
            tryNextPath();
        });
    }
    
    async function loadModules(startIndex = 0) {
        console.log(`📦 Starting module loading from index ${startIndex}...`);
        
        for (let i = startIndex; i < modules.length; i++) {
            try {
                updateProgress(`Loading ${modules[i]}...`);
                await loadScript(modules[i]);
                modulesLoaded++;
                updateProgress(`Loaded ${modules[i]}`);
                
                // Small delay to prevent overwhelming the browser and allow for better user feedback
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Validate critical modules after loading
                if (modules[i] === 'content-data.js') {
                    if (typeof contentData === 'undefined') {
                        throw new Error('Content data not available after loading');
                    }
                }
                
                if (modules[i] === 'app.js') {
                    if (typeof initApp === 'undefined') {
                        throw new Error('App initialization function not available');
                    }
                }
                
            } catch (error) {
                console.error(`💥 Failed to load module: ${modules[i]}`, error);
                
                // For critical modules, try to retry
                if ((modules[i] === 'app.js' || modules[i] === 'content-data.js') && retryCount < maxRetries) {
                    console.log(`🔄 Retrying critical module: ${modules[i]} (attempt ${retryCount + 1}/${maxRetries})`);
                    retryCount++;
                    updateProgress(`Retrying ${modules[i]}...`);
                    
                    // Wait before retry
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Retry this module
                    i--;
                    continue;
                }
                
                // For critical modules that failed after retries
                if (modules[i] === 'app.js' || modules[i] === 'content-data.js') {
                    showError(`Critical module failed to load: ${modules[i]}. Please refresh the page.`);
                    loadingFailed = true;
                    return;
                }
                
                // For non-critical modules, continue loading
                console.warn(`⚠️ Skipping failed non-critical module: ${modules[i]}`);
                modulesLoaded++;
                updateProgress(`Skipped ${modules[i]} (failed)`);
            }
        }
        
        // All modules processed
        if (!loadingFailed) {
            updateProgress('Initializing application...');
            setTimeout(() => {
                initializeApp();
            }, 300);
        }
    }
    
    function initializeApp() {
        console.log('🚀 All modules loaded successfully, initializing app...');
        
        try {
            // Validate required components
            const requiredComponents = [
                { name: 'contentData', obj: window.contentData || (typeof contentData !== 'undefined' ? contentData : null) },
                { name: 'mermaid', obj: window.mermaid },
                { name: 'bootstrap', obj: window.bootstrap }
            ];
            
            const missingComponents = requiredComponents.filter(comp => !comp.obj);
            if (missingComponents.length > 0) {
                console.warn('⚠️ Missing components:', missingComponents.map(c => c.name));
            }
            
            // Hide loading indicator with smooth transition
            updateProgress('Ready!');
            setTimeout(() => {
                hideLoadingIndicator();
            }, 500);
            
            // Initialize the app after a short delay
            setTimeout(() => {
                try {
                    // Initialize app if function exists
                    if (typeof initApp === 'function') {
                        initApp();
                    } else {
                        console.warn('⚠️ initApp function not found, trying manual initialization...');
                        manualInitialization();
                    }
                    
                    // Success notification
                    showSuccessMessage('🎉 Ad Tech Platform loaded successfully!');
                    
                } catch (error) {
                    console.error('💥 Error during app initialization:', error);
                    showError('Failed to initialize application. Please refresh the page.');
                }
            }, 200);
            
        } catch (error) {
            console.error('💥 Error in initializeApp:', error);
            showError('Failed to initialize application. Please refresh the page.');
        }
    }
    
    function manualInitialization() {
        console.log('🔧 Attempting manual initialization...');
        
        // Try to initialize Mermaid
        if (typeof mermaid !== 'undefined') {
            try {
                const isDarkMode = document.body.classList.contains('dark-mode');
                mermaid.initialize({ 
                    startOnLoad: true, 
                    theme: isDarkMode ? 'dark' : 'default',
                    securityLevel: 'loose'
                });
                console.log('✅ Mermaid manually initialized');
            } catch (error) {
                console.warn('⚠️ Could not initialize Mermaid:', error);
            }
        }
        
        // Try to load content manually
        if (typeof loadContent === 'function') {
            try {
                loadContent();
                console.log('✅ Content manually loaded');
            } catch (error) {
                console.warn('⚠️ Could not load content:', error);
            }
        }
        
        // Ensure overview tab is active
        activateOverviewTab();
    }
    
    function hideLoadingIndicator() {
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator) {
            loadingIndicator.classList.add('fade-out');
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.parentNode.removeChild(loadingIndicator);
                    console.log('📺 Loading indicator hidden');
                }
            }, 500);
        }
    }
    
    function activateOverviewTab() {
        try {
            setTimeout(() => {
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
                    console.warn('⚠️ Overview tab or pane not found for activation');
                }
            }, 100);
        } catch (error) {
            console.error('💥 Error activating overview tab:', error);
        }
    }
    
    function showError(message) {
        console.error('💥 Showing error:', message);
        
        // Remove loading indicator
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger position-fixed top-50 start-50 translate-middle shadow-lg';
        errorDiv.style.zIndex = '9999';
        errorDiv.style.maxWidth = '90%';
        errorDiv.style.transform = 'translate(-50%, -50%)';
        errorDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-triangle me-3" style="font-size: 2rem;"></i>
                <div>
                    <h4 class="alert-heading mb-1">Loading Error</h4>
                    <p class="mb-2">${message}</p>
                    <button class="btn btn-outline-danger" onclick="location.reload()">
                        <i class="fas fa-arrows-rotate me-2"></i>Reload Page
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success position-fixed bottom-0 end-0 m-3 shadow';
        successDiv.style.zIndex = '9999';
        successDiv.style.maxWidth = '400px';
        successDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-check-circle me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        document.body.appendChild(successDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('🚨 Global error caught:', e.error);
        
        // If loading is still in progress, show error
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator && !loadingIndicator.classList.contains('fade-out')) {
            showError('A critical error occurred during loading. Please refresh the page.');
        }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('🚨 Unhandled promise rejection:', e.reason);
        e.preventDefault(); // Prevent the default browser behavior
        
        // If it's related to module loading, show user-friendly error
        if (e.reason && e.reason.message && e.reason.message.includes('script')) {
            const loadingIndicator = document.getElementById('moduleLoader');
            if (loadingIndicator && !loadingIndicator.classList.contains('fade-out')) {
                showError('Failed to load required resources. Please check your connection and refresh.');
            }
        }
    });
    
    // Fallback initialization if modules fail to load completely
    const fallbackTimer = setTimeout(() => {
        const loadingIndicator = document.getElementById('moduleLoader');
        if (loadingIndicator && !loadingIndicator.classList.contains('fade-out')) {
            console.warn('⚠️ Module loading taking too long, attempting fallback initialization...');
            
            updateProgress('Loading timeout, trying fallback...');
            
            // Try to initialize what we can
            try {
                // Initialize Mermaid if available
                if (typeof mermaid !== 'undefined') {
                    mermaid.initialize({ 
                        startOnLoad: true, 
                        theme: 'default',
                        securityLevel: 'loose'
                    });
                }
                
                // Hide loader
                hideLoadingIndicator();
                
                // Try manual initialization
                setTimeout(() => {
                    manualInitialization();
                    
                    // Show warning to user
                    const warningDiv = document.createElement('div');
                    warningDiv.className = 'alert alert-warning m-3 shadow';
                    warningDiv.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-triangle me-3"></i>
                            <div>
                                <strong>Partial Load Warning:</strong> Some features may not work properly. 
                                <button class="btn btn-sm btn-warning ms-2" onclick="location.reload()">
                                    <i class="fas fa-arrows-rotate me-1"></i>Reload
                                </button>
                            </div>
                        </div>
                    `;
                    document.body.insertBefore(warningDiv, document.body.firstChild);
                }, 500);
                
            } catch (error) {
                console.error('💥 Fallback initialization failed:', error);
                showError('Failed to load the platform. Please refresh the page.');
            }
        }
    }, 15000); // 15 second timeout
    
    // Clear fallback timer if initialization completes successfully
    document.addEventListener('appInitialized', function() {
        clearTimeout(fallbackTimer);
        console.log('✅ App initialization completed, fallback timer cleared');
    });
});

// Add enhanced CSS for better loading experience
const loaderStyles = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }

    .loading-spinner {
        text-align: center;
        padding: 3rem;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        color: #333;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .loading-text {
        margin-top: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: #667eea;
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .fade-out {
        opacity: 0;
        pointer-events: none;
    }

    .spinner-border {
        border-width: 0.3rem;
    }
    
    @keyframes shimmer {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
    
    #loadingStatus {
        animation: shimmer 2s ease-in-out infinite;
    }
`;

// Inject loader styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);

console.log('🔧 Enhanced Module Loader initialized');
