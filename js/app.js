// Enhanced App.js with comprehensive error handling and improved initialization
console.log('App.js loading...');

// Global app state with better state management
const appState = {
    initialized: false,
    currentTab: 'overview',
    contentLoaded: {},
    mermaidInitialized: false,
    mermaidConfig: null,
    initializationAttempts: 0,
    maxInitializationAttempts: 3
};

// Mermaid content templates for restoration
const mermaidTemplates = {
    'header-bidding': `flowchart TD
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
        K --> L[Ad Served to User]
        
        style A fill:#e1f5fe
        style G fill:#fff3e0
        style K fill:#c8e6c9
        style L fill:#e8f5e8`,
    
    'rtb-process': `flowchart TD
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
        K --> L[Ad Displayed to User]
        M[DMP - Data Management Platform] -.-> G
        M -.-> H
        N[Ad Verification] -.-> K
        O[Attribution & Analytics] -.-> L
        
        style A fill:#e1f5fe
        style L fill:#c8e6c9
        style J fill:#fff3e0
        style E fill:#f3e5f5`,
        
    'data-flow': `flowchart LR
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
        M[Conversions] --> G
        
        style B fill:#e3f2fd
        style D fill:#f3e5f5
        style F fill:#e8f5e8
        style H fill:#fff3e0`,
        
    'ecosystem-overview': `graph TD
        A[Advertiser] -->|Campaign| B[Ad Agency/Trading Desk]
        B -->|Campaign Setup| C[DSP - Demand Side Platform]
        C -->|Bid Request| D[Ad Exchange]
        E[Publisher] -->|Ad Inventory| F[SSP - Supply Side Platform]
        F -->|Inventory| D
        D -->|Winning Bid| G[Ad Serving]
        G -->|Ad Creative| H[User's Device]
        I[Data Management Platform] -.->|Audience Data| C
        I -.->|User Data| F
        J[Verification & Measurement] -.->|Analytics| A`,
        
    'user-journey': `sequenceDiagram
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
        Publisher->>User: Show ad to user`
};

// Wait for external CDN scripts to load
function waitForExternalScripts(callback, timeout = 10000) {
    const startTime = Date.now();
    
    function checkScripts() {
        const mermaidScript = document.querySelector('script[src*="mermaid"]');
        const bootstrapScript = document.querySelector('script[src*="bootstrap"]');
        
        // Check if scripts are loaded and ready
        const mermaidReady = (mermaidScript && (typeof mermaid !== 'undefined' || window.mermaid)) || 
                           !mermaidScript; // If no script tag, consider ready
        const bootstrapReady = (bootstrapScript && (typeof bootstrap !== 'undefined' || window.bootstrap)) || 
                             !bootstrapScript; // If no script tag, consider ready
        
        if (mermaidReady && bootstrapReady) {
            console.log('✅ External scripts loaded successfully');
            callback();
        } else if (Date.now() - startTime > timeout) {
            console.warn('⚠️ Timeout waiting for external scripts, proceeding anyway');
            callback();
        } else {
            // Wait a bit more
            setTimeout(checkScripts, 200);
        }
    }
    
    checkScripts();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, waiting for external scripts...');
    
    // Wait for external scripts first, then start app initialization
    waitForExternalScripts(() => {
        console.log('🚀 Starting app initialization...');
        setTimeout(() => {
            safeInitApp();
        }, 300);
    });
});

/**
 * Safe app initialization with error handling
 */
function safeInitApp() {
    try {
        if (appState.initialized) {
            console.log('App already initialized, skipping...');
            return;
        }

        if (appState.initializationAttempts >= appState.maxInitializationAttempts) {
            console.error('❌ Max initialization attempts reached');
            showFallbackContent();
            return;
        }

        appState.initializationAttempts++;
        console.log(`🚀 App initialization attempt ${appState.initializationAttempts}`);

        // Check required dependencies
        if (!checkDependencies()) {
            console.warn('⚠️ Dependencies not ready, retrying in 1 second...');
            setTimeout(safeInitApp, 1000);
            return;
        }

        // Initialize Mermaid first
        initializeMermaidSystem();
        
        // Load content
        loadAllContent();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize tooltips
        initializeTooltips();
        
        // Activate overview tab
        setTimeout(() => {
            activateOverviewTab();
            initializeMermaidDiagrams();
        }, 300);

        appState.initialized = true;
        console.log('✅ Application initialized successfully');
        
        // Dispatch initialization complete event
        document.dispatchEvent(new CustomEvent('appInitialized'));
        
    } catch (error) {
        console.error('❌ Error in safeInitApp:', error);
        setTimeout(safeInitApp, 2000);
    }
}

/**
 * Check if required dependencies are available
 */
function checkDependencies() {
    const required = [
        { 
            name: 'Bootstrap', 
            check: () => {
                // Check for Bootstrap in multiple ways
                return typeof bootstrap !== 'undefined' || 
                       window.bootstrap || 
                       document.querySelector('script[src*="bootstrap"]') !== null;
            }
        },
        { 
            name: 'Mermaid', 
            check: () => {
                // Check for Mermaid in multiple ways
                return typeof mermaid !== 'undefined' || 
                       window.mermaid || 
                       document.querySelector('script[src*="mermaid"]') !== null;
            }
        },
        { 
            name: 'Content Data', 
            check: () => typeof contentData !== 'undefined' || window.contentData
        }
    ];
    
    const missing = required.filter(dep => !dep.check());
    
    if (missing.length > 0) {
        console.warn('Missing dependencies:', missing.map(d => d.name));
        return false;
    }
    
    return true;
}

/**
 * Initialize Mermaid system with proper error handling and retries
 */
function initializeMermaidSystem() {
    // Function to check Mermaid availability
    const checkMermaid = () => {
        return window.mermaidLoaded && (typeof mermaid !== 'undefined' || window.mermaid);
    };

    // Function to initialize with retry mechanism
    const tryInitialize = (retryCount = 0, maxRetries = 10) => {
        if (checkMermaid()) {
            console.log('✅ Mermaid is available, proceeding with initialization');
            proceedWithInitialization();
            return;
        }

        if (retryCount >= maxRetries) {
            console.error('❌ Failed to initialize Mermaid after maximum retries');
            // Add fallback visualization or error message
            document.querySelectorAll('.mermaid').forEach(el => {
                el.innerHTML = `<div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> 
                    Diagram loading failed. Please refresh the page.
                </div>`;
            });
            return;
        }

        console.log(`📝 Waiting for Mermaid to load (attempt ${retryCount + 1}/${maxRetries})...`);
        setTimeout(() => {
            tryInitialize(retryCount + 1, maxRetries);
        }, 500); // Reduced timeout to 500ms but increased max retries
    };

    // Start the initialization process
    tryInitialize();

    function proceedWithInitialization() {
        if (appState.mermaidInitialized) {
            console.log('Mermaid already initialized');
            return;
        }

        if (!window.mermaidLoaded || typeof mermaid === 'undefined') {
            console.warn('Mermaid not fully loaded yet, waiting...');
            setTimeout(proceedWithInitialization, 100);
            return;
        }

        try {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const theme = isDarkMode ? 'dark' : 'default';
            
            // Initialize with default config first
            mermaid.initialize({ startOnLoad: false });
            
            // Then apply our custom config
            appState.mermaidConfig = { 
                startOnLoad: true,
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
                themeVariables: getMermaidThemeVariables(isDarkMode)
            };
            
            mermaid.initialize(appState.mermaidConfig);
            appState.mermaidInitialized = true;
            console.log('✅ Mermaid system initialized with theme:', theme);
            
            // Force re-render all diagrams
            setTimeout(() => {
                initializeMermaidDiagrams();
            }, 100);
            
        } catch (error) {
            console.error('❌ Error in Mermaid initialization:', error);
            appState.mermaidInitialized = false;
            // Retry initialization after a short delay
            setTimeout(proceedWithInitialization, 500);
        }
    }

    if (appState.mermaidInitialized) {
        console.log('Mermaid already initialized');
        return;
    }

    try {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const theme = isDarkMode ? 'dark' : 'default';
        
        appState.mermaidConfig = { 
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
            themeVariables: getMermaidThemeVariables(isDarkMode)
        };
        
        mermaid.initialize(appState.mermaidConfig);
        appState.mermaidInitialized = true;
        console.log('✅ Mermaid system initialized with theme:', theme);
        
    } catch (error) {
        console.error('❌ Mermaid initialization failed:', error);
        appState.mermaidInitialized = false;
    }
}

/**
 * Get Mermaid theme variables based on dark mode
 */
function getMermaidThemeVariables(isDarkMode) {
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

/**
 * Load all content sections
 */
function loadAllContent() {
    console.log('📦 Loading all content...');
    
    const sections = [
        { id: 'overview', loader: loadOverviewSection },
        { id: 'beginner', loader: loadBeginnerSection },
        { id: 'intermediate', loader: loadIntermediateSection },
        { id: 'expert', loader: loadExpertSection },
        { id: 'quiz', loader: loadQuizSection },
        { id: 'glossary', loader: loadGlossarySection }
    ];
    
    sections.forEach(section => {
        try {
            if (!appState.contentLoaded[section.id]) {
                section.loader();
                appState.contentLoaded[section.id] = true;
                console.log(`✅ ${section.id} content loaded`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${section.id}:`, error);
        }
    });
}

/**
 * Load Overview section content
 */
function loadOverviewSection() {
    const section = document.getElementById('overview');
    if (!section || !contentData?.overview) {
        console.warn('⚠️ Overview section or content not available');
        return;
    }

    const data = contentData.overview;
    section.innerHTML = `
        <h2 class="section-title">${data.title}</h2>
        ${data.intro}
        ${data.components.map(comp => `
            <h3 class="mb-4">${comp.title}</h3>
            ${comp.content}
        `).join('')}
    `;
}

/**
 * Load Beginner section content
 */
function loadBeginnerSection() {
    const section = document.getElementById('beginnerSection');
    if (!section || !contentData?.beginner) {
        console.warn('⚠️ Beginner section or content not available');
        return;
    }

    const data = contentData.beginner;
    section.innerHTML = `
        <h2 class="section-title">${data.title}</h2>
        ${data.intro}
        ${data.sections.map(sect => `
            <h3 class="mb-4">${sect.title}</h3>
            ${sect.content}
        `).join('')}
    `;
}

/**
 * Load Intermediate section content
 */
function loadIntermediateSection() {
    const section = document.getElementById('intermediateSection');
    if (!section || !contentData?.intermediate) {
        console.warn('⚠️ Intermediate section or content not available');
        return;
    }

    const data = contentData.intermediate;
    section.innerHTML = `
        <h2 class="section-title">${data.title}</h2>
        ${data.intro}
        ${data.sections.map(sect => `
            <h3 class="mb-4">${sect.title}</h3>
            ${sect.content}
        `).join('')}
    `;
}

/**
 * Load Expert section content
 */
function loadExpertSection() {
    const section = document.getElementById('expertSection');
    if (!section || !contentData?.expert) {
        console.warn('⚠️ Expert section or content not available');
        return;
    }

    const data = contentData.expert;
    section.innerHTML = `
        <h2 class="section-title">${data.title}</h2>
        ${data.intro}
        ${data.sections.map(sect => sect.content).join('')}
    `;
}

/**
 * Load Quiz section content
 */
function loadQuizSection() {
    const section = document.getElementById('quizSection');
    if (!section || !contentData?.quiz) {
        console.warn('⚠️ Quiz section or content not available');
        return;
    }

    section.innerHTML = `
        <h2 class="section-title">Test Your Ad Tech Knowledge</h2>
        <p class="lead mb-5">Challenge yourself with these quizzes to reinforce your understanding of Ad Tech concepts.</p>

        <ul class="nav nav-pills mb-4 justify-content-center" id="quiz-nav" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="beginner-quiz-tab" data-quiz-target="beginnerQuiz" type="button" role="tab">
                    <i class="fas fa-seedling me-2"></i>Beginner
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="intermediate-quiz-tab" data-quiz-target="intermediateQuiz" type="button" role="tab">
                    <i class="fas fa-cogs me-2"></i>Intermediate
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="expert-quiz-tab" data-quiz-target="expertQuiz" type="button" role="tab">
                    <i class="fas fa-brain me-2"></i>Expert
                </button>
            </li>
        </ul>

        <div class="quiz-tab-content">
            <div class="quiz-pane show active" id="beginnerQuiz" role="tabpanel"></div>
            <div class="quiz-pane" id="intermediateQuiz" role="tabpanel"></div>
            <div class="quiz-pane" id="expertQuiz" role="tabpanel"></div>
        </div>
    `;

    // Load quiz content for each level
    loadQuizContent('beginnerQuiz', contentData.quiz.beginner);
    loadQuizContent('intermediateQuiz', contentData.quiz.intermediate);
    loadQuizContent('expertQuiz', contentData.quiz.expert);
    
    setupQuizTabNavigation();
}

/**
 * Load Glossary section content
 */
function loadGlossarySection() {
    const section = document.getElementById('glossarySection');
    if (!section || !contentData?.glossary) {
        console.warn('⚠️ Glossary section or content not available');
        return;
    }

    section.innerHTML = `
        <h2 class="section-title">Ad Tech Glossary</h2>
        <p class="lead mb-5">A comprehensive dictionary of Ad Tech terminology from A to Z.</p>

        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                    <input type="text" class="form-control" id="glossarySearch" placeholder="Search terms...">
                </div>
            </div>
            <div class="col-md-8 mb-4">
                <div class="d-flex justify-content-start justify-content-md-end">
                    <div class="btn-group" id="alphabetFilter" role="group">
                        <button class="btn btn-outline-primary active" data-filter="all">All</button>
                        <button class="btn btn-outline-primary" data-filter="a">A</button>
                        <button class="btn btn-outline-primary" data-filter="b">B</button>
                        <button class="btn btn-outline-primary" data-filter="c">C</button>
                        <button class="btn btn-outline-primary" data-filter="d">D</button>
                        <button class="btn btn-outline-primary" data-filter="p">P</button>
                        <button class="btn btn-outline-primary" data-filter="r">R</button>
                        <button class="btn btn-outline-primary" data-filter="s">S</button>
                        <button class="btn btn-outline-primary" data-filter="other">Other</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="terms-container" id="glossaryTerms"></div>
            </div>
        </div>
    `;

    loadGlossaryTerms();
}

/**
 * Initialize or re-initialize Mermaid diagrams with improved content restoration and error handling
 */
function initializeMermaidDiagrams() {
    const initializeWithRetry = (retryCount = 0, maxRetries = 3) => {
        if (!appState.mermaidInitialized) {
            if (retryCount >= maxRetries) {
                console.error('❌ Failed to initialize Mermaid after maximum retries');
                return;
            }
            console.warn(`⚠️ Mermaid not initialized, retrying... (${retryCount + 1}/${maxRetries})`);
            setTimeout(() => initializeWithRetry(retryCount + 1, maxRetries), 1000);
            return;
        }

        try {
            const mermaidElements = document.querySelectorAll('.mermaid');
            
            if (mermaidElements.length === 0) {
                console.log('No Mermaid elements found');
                return;
            }

            console.log(`🎨 Processing ${mermaidElements.length} Mermaid diagrams...`);
            
            // Process each diagram
            mermaidElements.forEach((element, index) => {
                try {
                    // Ensure element has an ID
                    if (!element.id) {
                        element.id = `mermaid-diagram-${index}-${Date.now()}`;
                    }

                    // Store or restore original content
                    if (!element.dataset.originalContent) {
                        let originalContent = element.textContent.trim();
                        
                        // If content is corrupted or empty, try to restore
                        if (!originalContent || originalContent.length < 10 || originalContent.includes('undefined')) {
                            originalContent = restoreMermaidContent(element);
                        }
                        
                        // Validate content before storing
                        if (originalContent && originalContent.length >= 10) {
                            element.dataset.originalContent = originalContent;
                        } else {
                            throw new Error('Invalid diagram content');
                        }
                    }
                    
                    // Clear any processing flags and reset content
                    element.removeAttribute('data-processed');
                    element.innerHTML = element.dataset.originalContent;
                    
                } catch (elementError) {
                    console.warn(`⚠️ Error processing Mermaid element ${element.id}:`, elementError);
                    element.innerHTML = `<div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle"></i> 
                        Failed to load diagram. Please refresh the page.
                    </div>`;
                }
            });
            
            // Initialize diagrams with retry mechanism
            const initDiagrams = (attempt = 0, maxAttempts = 3) => {
                try {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'));
                    console.log('✅ Mermaid diagrams initialized successfully');
                } catch (initError) {
                    console.error(`❌ Error initializing Mermaid diagrams (attempt ${attempt + 1}/${maxAttempts}):`, initError);
                    if (attempt < maxAttempts - 1) {
                        setTimeout(() => initDiagrams(attempt + 1, maxAttempts), 500);
                    }
                }
            };
            
            // Start initialization with a small delay
            setTimeout(() => initDiagrams(), 200);
            
        } catch (error) {
            console.error('❌ Error in initializeMermaidDiagrams:', error);
        }
    };

    // Start the initialization process
    initializeWithRetry();
}

/**
 * Restore Mermaid content based on context and templates
 */
function restoreMermaidContent(element) {
    try {
        // Try to determine content type from context
        const container = element.closest('.flowchart-container') || element.closest('.card') || element.closest('[class*="mermaid"]');
        
        if (container) {
            const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
            
            for (let heading of headings) {
                const headingText = heading.textContent.toLowerCase();
                
                if (headingText.includes('header bidding')) {
                    return mermaidTemplates['header-bidding'];
                }
                if (headingText.includes('rtb') || headingText.includes('real-time bidding')) {
                    return mermaidTemplates['rtb-process'];
                }
                if (headingText.includes('data flow')) {
                    return mermaidTemplates['data-flow'];
                }
                if (headingText.includes('ecosystem') || headingText.includes('overview')) {
                    return mermaidTemplates['ecosystem-overview'];
                }
                if (headingText.includes('reach users') || headingText.includes('user')) {
                    return mermaidTemplates['user-journey'];
                }
            }
        }
        
        // Check for specific patterns in nearby text
        const parentText = element.parentElement?.textContent?.toLowerCase() || '';
        
        if (parentText.includes('header bidding')) {
            return mermaidTemplates['header-bidding'];
        }
        if (parentText.includes('rtb') || parentText.includes('bidding')) {
            return mermaidTemplates['rtb-process'];
        }
        if (parentText.includes('data')) {
            return mermaidTemplates['data-flow'];
        }
        
        // Default fallback
        return mermaidTemplates['ecosystem-overview'];
        
    } catch (error) {
        console.warn('Error restoring Mermaid content:', error);
        return mermaidTemplates['ecosystem-overview'];
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    console.log('🎧 Setting up event listeners...');
    
    try {
        setupNavigationListeners();
        setupTabNavigation();
        setupQuizListeners();
        setupGlossaryListeners();
        setupDarkModeListener();
        
        console.log('✅ Event listeners set up successfully');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

/**
 * Set up navigation event listeners
 */
function setupNavigationListeners() {
    const progressBar = document.querySelector('#progress-tracker .progress-bar');
    const progressStatus = document.getElementById('progress-status');
    
    // Start learning buttons
    ['startLearningBtn', 'startLearningModalBtn', 'beginnerBtn'].forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                switchToTab('beginnerSection');
                updateProgress(5, progressBar, progressStatus);
            });
        }
    });
    
    // Section navigation buttons (event delegation)
    document.addEventListener('click', function(e) {
        const btnId = e.target.id;
        
        switch (btnId) {
            case 'toIntermediateBtn':
                switchToTab('intermediateSection');
                updateProgress(15, progressBar, progressStatus);
                break;
            case 'toExpertBtn':
                switchToTab('expertSection');
                updateProgress(15, progressBar, progressStatus);
                break;
            case 'toQuizBtn':
                switchToTab('quizSection');
                updateProgress(15, progressBar, progressStatus);
                break;
            case 'showRoadmapBtn':
                setTimeout(() => initializeMermaidDiagrams(), 500);
                break;
        }
    });
}

/**
 * Set up tab navigation
 */
function setupTabNavigation() {
    document.querySelectorAll('#mainNav .nav-link').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-bs-target')?.replace('#', '');
            if (targetId) {
                switchToTab(targetId);
                
                // Re-initialize Mermaid diagrams after tab switch
                setTimeout(() => {
                    initializeMermaidDiagrams();
                }, 500);
            }
        });
    });
}

/**
 * Switch to a specific tab
 */
function switchToTab(targetId) {
    try {
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        
        // Deactivate all tabs
        document.querySelectorAll('#mainNav .nav-link').forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Activate target tab
        const targetPane = document.getElementById(targetId);
        const targetTab = document.querySelector(`#mainNav .nav-link[data-bs-target="#${targetId}"]`);
        
        if (targetPane && targetTab) {
            targetPane.classList.add('show', 'active');
            targetTab.classList.add('active');
            targetTab.setAttribute('aria-selected', 'true');
            
            appState.currentTab = targetId.replace('Section', '') || 'overview';
            console.log(`📑 Switched to tab: ${appState.currentTab}`);
        }
        
    } catch (error) {
        console.error('❌ Error switching tabs:', error);
    }
}

/**
 * Set up dark mode change listener
 */
function setupDarkModeListener() {
    document.addEventListener('darkModeChanged', function(e) {
        console.log('🌙 Dark mode changed, updating diagrams...');
        
        if (appState.mermaidInitialized) {
            // Reinitialize Mermaid with new theme
            const isDarkMode = e.detail.isDarkMode;
            const newConfig = {
                ...appState.mermaidConfig,
                theme: isDarkMode ? 'dark' : 'default',
                themeVariables: getMermaidThemeVariables(isDarkMode)
            };
            
            try {
                mermaid.initialize(newConfig);
                appState.mermaidConfig = newConfig;
                
                setTimeout(() => {
                    initializeMermaidDiagrams();
                }, 300);
                
            } catch (error) {
                console.error('❌ Error updating Mermaid theme:', error);
            }
        }
    });
}

/**
 * Activate overview tab
 */
function activateOverviewTab() {
    try {
        switchToTab('overview');
        console.log('✅ Overview tab activated');
    } catch (error) {
        console.error('❌ Error activating overview tab:', error);
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    try {
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
            console.log('✅ Tooltips initialized');
        }
    } catch (error) {
        console.warn('⚠️ Could not initialize tooltips:', error);
    }
}

/**
 * Show fallback content if initialization fails
 */
function showFallbackContent() {
    console.log('📄 Showing fallback content...');
    
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="alert alert-warning text-center">
                <h4><i class="fas fa-exclamation-triangle me-2"></i>Loading Issue</h4>
                <p>Some features may not work properly. Please refresh the page to try again.</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="fas fa-arrows-rotate me-2"></i>Refresh Page
                </button>
            </div>
        `;
    }
}

// Include all the helper functions from the original file
function loadQuizContent(quizId, quizData) {
    const quizContainer = document.getElementById(quizId);
    if (!quizContainer || !quizData) return;

    let quizHtml = `
        <div class="card quiz-card mb-4">
            <div class="card-body">
                <h4 class="card-title">${quizData.title}</h4>
                <form id="${quizId}Form" class="quiz-form">
                    <div id="${quizId}Container">
    `;

    quizData.questions.forEach((question, index) => {
        quizHtml += `
            <div class="quiz-question mb-4">
                <h5>${index + 1}. ${question.question}</h5>
                <div class="quiz-options-container">
        `;

        question.options.forEach((option, optIndex) => {
            const optionId = `${quizId}_q${index}_opt${optIndex}`;
            const isCorrect = optIndex === question.correctIndex;
            quizHtml += `
                <div class="quiz-option" ${isCorrect ? 'data-correct="true"' : ''}>
                    <input type="radio" name="${quizId}_question${index}" id="${optionId}" value="${optIndex}" class="quiz-option-input">
                    <label for="${optionId}" class="d-block w-100 p-2">${option}</label>
                </div>
            `;
        });

        quizHtml += `</div></div>`;
    });

    quizHtml += `
                    <div class="text-center mt-4">
                        <button type="submit" class="btn btn-primary" id="check${quizId.charAt(0).toUpperCase() + quizId.slice(1)}">Check Answers</button>
                        <button type="button" class="btn btn-outline-primary ms-2" id="reset${quizId.charAt(0).toUpperCase() + quizId.slice(1)}">Reset Quiz</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    `;

    quizContainer.innerHTML = quizHtml;
}

function setupQuizTabNavigation() {
    const quizNavTabs = document.querySelectorAll('#quiz-nav .nav-link');
    
    quizNavTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-quiz-target');
            
            document.querySelectorAll('.quiz-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            quizNavTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

function setupQuizListeners() {
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.classList.contains('quiz-form')) {
            e.preventDefault();
            const formId = e.target.id;
            const section = formId.replace('QuizForm', '').toLowerCase();
            handleQuizSubmission(section);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id.includes('reset') && e.target.id.includes('Quiz')) {
            const section = e.target.id.replace('reset', '').replace('Quiz', '').toLowerCase();
            resetQuiz(section);
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.quiz-option label')) {
            const label = e.target.closest('.quiz-option label');
            const input = document.getElementById(label.getAttribute('for'));
            if (input) {
                input.checked = true;
                
                const questionDiv = label.closest('.quiz-question');
                questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                label.closest('.quiz-option').classList.add('selected');
            }
        }
    });
}

function handleQuizSubmission(section) {
    const quizContainer = document.getElementById(`${section}QuizContainer`);
    if (!quizContainer) return;
    
    const questions = quizContainer.querySelectorAll('.quiz-question');
    let correctCount = 0;
    let answeredCount = 0;
    
    questions.forEach((question, questionIndex) => {
        const options = question.querySelectorAll('.quiz-option');
        const selectedOption = question.querySelector(`input[name="${section}Quiz_question${questionIndex}"]:checked`);
        
        if (selectedOption) {
            answeredCount++;
            const optionIndex = parseInt(selectedOption.value);
            const isCorrect = options[optionIndex].getAttribute('data-correct') === 'true';
            
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
                if (option.getAttribute('data-correct') === 'true') {
                    option.classList.add('correct');
                }
            });
            
            if (isCorrect) {
                correctCount++;
            } else {
                selectedOption.closest('.quiz-option').classList.add('incorrect');
            }
        }
        
        options.forEach(option => {
            const input = option.querySelector('input');
            if (input) input.disabled = true;
        });
    });
    
    const existingResult = quizContainer.querySelector('.quiz-result');
    if (existingResult) existingResult.remove();
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'alert mt-4 quiz-result';
    
    if (answeredCount < questions.length) {
        resultDiv.className += ' alert-warning';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i> Please answer all questions. You've completed ${answeredCount} out of ${questions.length}.`;
    } else if (correctCount === questions.length) {
        resultDiv.className += ' alert-success';
        resultDiv.innerHTML = `<i class="fas fa-trophy me-2"></i> Perfect! You got all ${questions.length} questions correct!`;
        updateProgress(10, document.querySelector('#progress-tracker .progress-bar'), document.getElementById('progress-status'));
    } else {
        resultDiv.className += ' alert-info';
        resultDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i> You got ${correctCount} out of ${questions.length} questions correct.`;
        updateProgress(5, document.querySelector('#progress-tracker .progress-bar'), document.getElementById('progress-status'));
    }
    
    quizContainer.appendChild(resultDiv);
    
    const checkBtn = document.getElementById(`check${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
    if (checkBtn) checkBtn.disabled = true;
}

function resetQuiz(section) {
    const quizContainer = document.getElementById(`${section}QuizContainer`);
    const form = document.getElementById(`${section}QuizForm`);
    
    if (!quizContainer || !form) return;
    
    form.reset();
    
    quizContainer.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
        const input = option.querySelector('input');
        if (input) input.disabled = false;
    });
    
    const resultDiv = quizContainer.querySelector('.quiz-result');
    if (resultDiv) resultDiv.remove();
    
    const checkBtn = document.getElementById(`check${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
    if (checkBtn) checkBtn.disabled = false;
}

function loadGlossaryTerms() {
    const container = document.getElementById('glossaryTerms');
    if (!container || !contentData?.glossary) return;

    container.innerHTML = '';

    for (const [letter, terms] of Object.entries(contentData.glossary)) {
        let termsHtml = `
            <div class="term-group" data-group="${letter}">
                <h4 class="text-primary">${letter.toUpperCase()}</h4>
                <dl>
        `;

        terms.forEach(item => {
            termsHtml += `
                <dt>${item.term}</dt>
                <dd>${item.definition}</dd>
            `;
        });

        termsHtml += `</dl></div>`;
        container.innerHTML += termsHtml;
    }
}

function setupGlossaryListeners() {
    const glossarySearch = document.getElementById('glossarySearch');
    const alphabetFilter = document.getElementById('alphabetFilter');
    
    if (glossarySearch) {
        glossarySearch.addEventListener('input', function() {
            filterGlossaryTerms(this.value);
        });
    }
    
    if (alphabetFilter) {
        alphabetFilter.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function() {
                filterGlossaryByLetter(this.getAttribute('data-filter'));
                
                alphabetFilter.querySelectorAll('.btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                if (glossarySearch) glossarySearch.value = '';
            });
        });
    }
}

function filterGlossaryTerms(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const termGroups = document.querySelectorAll('.term-group');
    
    document.querySelectorAll('#glossaryTerms dt, #glossaryTerms dd').forEach(item => {
        const text = item.textContent.toLowerCase();
        const parentDl = item.closest('dl');
        
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
            if (parentDl) {
                parentDl.style.display = 'block';
                parentDl.closest('.term-group').style.display = 'block';
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    termGroups.forEach(group => {
        const visibleTerms = group.querySelectorAll('dt[style="display: block;"]');
        group.style.display = visibleTerms.length === 0 ? 'none' : 'block';
    });
}

function filterGlossaryByLetter(filter) {
    const termGroups = document.querySelectorAll('.term-group');
    
    termGroups.forEach(group => {
        const groupName = group.getAttribute('data-group');
        
        if (filter === 'all') {
            group.style.display = 'block';
        } else if (filter === 'other') {
            group.style.display = !['a', 'b', 'c', 'd', 'p', 'r', 's'].includes(groupName) ? 'block' : 'none';
        } else {
            group.style.display = groupName === filter ? 'block' : 'none';
        }
    });
    
    document.querySelectorAll('.term-group[style="display: block;"] dt, .term-group[style="display: block;"] dd').forEach(item => {
        item.style.display = 'block';
    });
}

function updateProgress(increment, progressBar, progressStatus) {
    if (!progressBar) return;
    
    let progress = parseInt(progressBar.style.width?.replace('%', '') || '0');
    progress += increment;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.textContent = progress + '%';
    
    if (progressStatus) {
        if (progress < 25) progressStatus.textContent = 'Just started';
        else if (progress < 50) progressStatus.textContent = 'Making good progress';
        else if (progress < 75) progressStatus.textContent = 'Well on your way';
        else if (progress < 100) progressStatus.textContent = 'Almost there';
        else progressStatus.textContent = 'Complete! Great job!';
    }
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('💥 Global error:', e.error);
    if (!appState.initialized) {
        setTimeout(safeInitApp, 2000);
    }
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Public API
window.adTechApp = {
    initializeMermaidDiagrams,
    loadAllContent,
    updateProgress,
    state: appState,
    safeInitApp
};

// Expose global init function for fallback
window.initApp = safeInitApp;

console.log('📱 Enhanced App.js loaded and ready');
