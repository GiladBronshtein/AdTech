// Modify the module loader to be more flexible with paths
document.addEventListener('DOMContentLoaded', function() {
    // List of modules to load in the correct order
    const modules = [
        'content-data.js',
        'overview-content.js',
        'beginner-content.js',
        'intermediate-content.js',
        'expert-content.js',
        'quiz-content.js',
        'glossary-content.js',
        'app.js'
    ];
    
    // Track loading progress
    let modulesLoaded = 0;
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-overlay';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="loading-text mt-3">Loading modules: <span id="loadingProgress">0/${modules.length}</span></p>
        </div>
    `;
    document.body.appendChild(loadingIndicator);
    
    // Function to try different paths when loading scripts
    function tryLoadScript(paths, index, onSuccess, onError) {
        if (index >= paths.length) {
            console.error(`Failed to load module: ${paths[0].split('/').pop()}`);
            onError();
            return;
        }
        
        const script = document.createElement('script');
        script.src = paths[index];
        
        script.onload = onSuccess;
        
        script.onerror = function() {
            console.warn(`Failed to load from path: ${paths[index]}, trying next path...`);
            tryLoadScript(paths, index + 1, onSuccess, onError);
        };
        
        document.body.appendChild(script);
    }
    
    // Load modules with path fallbacks
    function loadModules(index) {
        if (index >= modules.length) {
            // All modules loaded, remove loading indicator and initialize app
            setTimeout(() => {
                loadingIndicator.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(loadingIndicator);
                    
                    // Initialize the app after all modules are loaded
                    if (typeof initApp === 'function') {
                        initApp();
                    } else {
                        console.error("initApp function not found. Loading content directly.");
                        loadContent();
                    }
                    
                    // Force a redraw of Mermaid diagrams
                    if (typeof mermaid !== 'undefined') {
                        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                    }
                    
                    // Force the overview tab to be active
                    const overviewTab = document.getElementById('overview-tab');
                    const overviewPane = document.getElementById('overview');
                    
                    if (overviewTab && overviewPane) {
                        // Try to use Bootstrap Tab if available
                        if (typeof bootstrap !== 'undefined' && bootstrap.Tab) {
                            const tab = new bootstrap.Tab(overviewTab);
                            tab.show();
                        }
                        
                        // Also manually set classes in case Bootstrap isn't working properly
                        overviewPane.classList.add('active', 'show');
                        overviewTab.classList.add('active');
                        overviewTab.setAttribute('aria-selected', 'true');
                    }
                }, 500);
            }, 500);
            return;
        }
        
        const fileName = modules[index];
        // Try multiple possible paths
        const possiblePaths = [
            `./js/${fileName}`,
            `./${fileName}`,
            `${fileName}`
        ];
        
        tryLoadScript(possiblePaths, 0, 
            // Success callback
            function() {
                modulesLoaded++;
                document.getElementById('loadingProgress').textContent = `${modulesLoaded}/${modules.length}`;
                
                // Load next module
                loadModules(index + 1);
            },
            // Error callback - still try to continue with next module
            function() {
                loadModules(index + 1);
            }
        );
    }
    
    // Start loading modules
    loadModules(0);
});