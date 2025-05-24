// App initialization
console.log('App.js loaded');
console.log('Available modules:', {
    overviewContent: typeof overviewContent !== 'undefined',
    beginnerContent: typeof beginnerContent !== 'undefined',
    intermediateContent: typeof intermediateContent !== 'undefined',
    expertContent: typeof expertContent !== 'undefined',
    quizContent: typeof quizContent !== 'undefined',
    glossaryContent: typeof glossaryContent !== 'undefined'
});

// Global app state
const appState = {
    initialized: false,
    currentTab: 'overview',
    contentLoaded: {},
    mermaidInitialized: false,
    mermaidConfig: null
};

// Initialize Mermaid for flowcharts
document.addEventListener('DOMContentLoaded', function() {
    // Wait for dark mode to initialize first
    setTimeout(() => {
        initializeMermaidSystem();
        initApp();
    }, 200);
});

/**
 * Initialize Mermaid system properly
 */
function initializeMermaidSystem() {
    if (typeof mermaid !== 'undefined' && !appState.mermaidInitialized) {
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
                    padding: 10
                },
                themeVariables: getMermaidThemeVariables(isDarkMode)
            };
            
            mermaid.initialize(appState.mermaidConfig);
            appState.mermaidInitialized = true;
            console.log('✅ Mermaid system initialized with theme:', theme);
        } catch (error) {
            console.warn('⚠️ Could not initialize Mermaid system:', error);
        }
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
            tertiaryBkg: '#444'
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
            tertiaryBkg: '#e1f5fe'
        };
    }
}

/**
 * Initialize the main application
 */
function initApp() {
    if (appState.initialized) {
        console.log('App already initialized, skipping...');
        return;
    }

    console.log('🚀 Initializing application...');

    // Load initial content
    loadContent();

    // Set up event listeners
    setupEventListeners();

    // Initialize tooltips
    initializeTooltips();
    
    // Force the overview tab to be active and visible
    setTimeout(() => {
        activateOverviewTab();
        // Initialize Mermaid diagrams after content is loaded
        initializeMermaidDiagrams();
    }, 300);

    appState.initialized = true;
    console.log('✅ Application initialized successfully');
}

/**
 * Activate the overview tab and ensure it's visible
 */
function activateOverviewTab() {
    try {
        // Hide all tab panes first
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        
        // Deactivate all tabs
        document.querySelectorAll('#mainNav .nav-link').forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Activate overview tab and content
        const overviewTab = document.getElementById('overview-tab');
        const overviewContent = document.getElementById('overview');
        
        if (overviewTab && overviewContent) {
            // Activate the tab
            overviewTab.classList.add('active');
            overviewTab.setAttribute('aria-selected', 'true');
            
            // Show the content
            overviewContent.classList.add('show', 'active');
            
            appState.currentTab = 'overview';
            console.log('✅ Overview tab activated');
        } else {
            console.warn('⚠️ Overview tab or content not found');
        }
    } catch (error) {
        console.error('❌ Error activating overview tab:', error);
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    try {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        console.log('✅ Tooltips initialized');
    } catch (error) {
        console.warn('⚠️ Could not initialize tooltips:', error);
    }
}

/**
 * Initialize or re-initialize Mermaid diagrams
 */
function initializeMermaidDiagrams() {
    if (typeof mermaid !== 'undefined' && appState.mermaidInitialized) {
        try {
            // Find all mermaid elements
            const mermaidElements = document.querySelectorAll('.mermaid');
            
            if (mermaidElements.length > 0) {
                console.log(`🎨 Initializing ${mermaidElements.length} Mermaid diagrams...`);
                
                // Process each element
                mermaidElements.forEach((element, index) => {
                    // Store original content if not already stored
                    if (!element.dataset.originalContent) {
                        let originalContent = element.textContent.trim();
                        
                        // If content is corrupted, try to restore based on context
                        if (!originalContent || originalContent.includes('flowchart TD A[') || originalContent.includes('style')) {
                            originalContent = restoreMermaidContent(element);
                        }
                        
                        element.dataset.originalContent = originalContent;
                    }
                    
                    // Clear processed attribute
                    if (element.getAttribute('data-processed')) {
                        element.removeAttribute('data-processed');
                    }
                    
                    // Reset content
                    element.innerHTML = element.dataset.originalContent;
                    
                    // Add unique ID if not present
                    if (!element.id) {
                        element.id = `mermaid-${index}`;
                    }
                });
                
                // Initialize diagrams with delay
                setTimeout(() => {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'));
                }, 100);
                
                console.log('✅ Mermaid diagrams initialized');
            }
        } catch (error) {
            console.warn('⚠️ Error initializing Mermaid diagrams:', error);
        }
    }
}

/**
 * Restore Mermaid content based on context
 */
function restoreMermaidContent(element) {
    const container = element.closest('.flowchart-container');
    const card = element.closest('.card');
    
    // Check for specific headings to determine content
    const headings = container ? 
        container.querySelectorAll('h3, h5, h6') : 
        card ? card.querySelectorAll('h3, h5, h6') : [];
    
    for (let heading of headings) {
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
                K --> L[Ad Served to User]
                
                style A fill:#e1f5fe
                style G fill:#fff3e0
                style K fill:#c8e6c9
                style L fill:#e8f5e8`;
        }
        
        if (headingText.includes('data flow')) {
            return `flowchart LR
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
                style H fill:#fff3e0`;
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
                K --> L[Ad Displayed to User]
                M[DMP - Data Management Platform] -.-> G
                M -.-> H
                N[Ad Verification] -.-> K
                O[Attribution & Analytics] -.-> L
                
                style A fill:#e1f5fe
                style L fill:#c8e6c9
                style J fill:#fff3e0
                style E fill:#f3e5f5`;
        }
    }
    
    // Default flowchart if none matched
    return `graph TD
        A[Start] --> B[Process]
        B --> C[End]`;
}

/**
 * Load content for each section of the application
 */
function loadContent() {
    console.log("📦 Loading content...");
    
    // Check if the DOM elements exist before trying to load content
    const sections = {
        overview: document.getElementById('overview'),
        beginner: document.getElementById('beginnerSection'),
        intermediate: document.getElementById('intermediateSection'),
        expert: document.getElementById('expertSection'),
        quiz: document.getElementById('quizSection'),
        glossary: document.getElementById('glossarySection')
    };
    
    console.log("🔍 DOM Elements found:", {
        overview: !!sections.overview,
        beginner: !!sections.beginner,
        intermediate: !!sections.intermediate,
        expert: !!sections.expert,
        quiz: !!sections.quiz,
        glossary: !!sections.glossary
    });
    
    // Load each section if it exists and hasn't been loaded yet
    if (sections.overview && !appState.contentLoaded.overview) {
        loadOverviewSection();
        appState.contentLoaded.overview = true;
    }
    if (sections.beginner && !appState.contentLoaded.beginner) {
        loadBeginnerSection();
        appState.contentLoaded.beginner = true;
    }
    if (sections.intermediate && !appState.contentLoaded.intermediate) {
        loadIntermediateSection();
        appState.contentLoaded.intermediate = true;
    }
    if (sections.expert && !appState.contentLoaded.expert) {
        loadExpertSection();
        appState.contentLoaded.expert = true;
    }
    if (sections.quiz && !appState.contentLoaded.quiz) {
        loadQuizSection();
        appState.contentLoaded.quiz = true;
    }
    if (sections.glossary && !appState.contentLoaded.glossary) {
        loadGlossarySection();
        appState.contentLoaded.glossary = true;
    }

    console.log('✅ Content loading completed');
}

/**
 * Load the Overview section content
 */
function loadOverviewSection() {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection || typeof contentData === 'undefined' || !contentData.overview) {
        console.warn('⚠️ Overview section or content not available');
        return;
    }

    try {
        const overviewData = contentData.overview;
        
        // Clear existing content to prevent duplicates
        overviewSection.innerHTML = '';
        
        overviewSection.innerHTML = `
            <h2 class="section-title">${overviewData.title}</h2>
            ${overviewData.intro}
        `;
        
        // Add components
        overviewData.components.forEach(component => {
            overviewSection.innerHTML += `
                <h3 class="mb-4">${component.title}</h3>
                ${component.content}
            `;
        });
        
        console.log('✅ Overview section loaded');
    } catch (error) {
        console.error('❌ Error loading overview section:', error);
    }
}

/**
 * Load the Beginner section content
 */
function loadBeginnerSection() {
    const beginnerSection = document.getElementById('beginnerSection');
    if (!beginnerSection || typeof contentData === 'undefined' || !contentData.beginner) {
        console.warn('⚠️ Beginner section or content not available');
        return;
    }

    try {
        const beginnerData = contentData.beginner;
        
        // Clear existing content to prevent duplicates
        beginnerSection.innerHTML = '';
        
        beginnerSection.innerHTML = `
            <h2 class="section-title">${beginnerData.title}</h2>
            ${beginnerData.intro}
        `;
        
        // Add sections
        beginnerData.sections.forEach(section => {
            beginnerSection.innerHTML += `
                <h3 class="mb-4">${section.title}</h3>
                ${section.content}
            `;
        });
        
        console.log('✅ Beginner section loaded');
    } catch (error) {
        console.error('❌ Error loading beginner section:', error);
    }
}

/**
 * Load the Intermediate section content
 */
function loadIntermediateSection() {
    const intermediateSection = document.getElementById('intermediateSection');
    if (!intermediateSection || typeof contentData === 'undefined' || !contentData.intermediate) {
        console.warn('⚠️ Intermediate section or content not available');
        return;
    }

    try {
        const intermediateData = contentData.intermediate;
        
        // Clear existing content to prevent duplicates
        intermediateSection.innerHTML = '';
        
        intermediateSection.innerHTML = `
            <h2 class="section-title">${intermediateData.title}</h2>
            ${intermediateData.intro}
        `;
        
        // Add sections
        intermediateData.sections.forEach(section => {
            intermediateSection.innerHTML += `
                <h3 class="mb-4">${section.title}</h3>
                ${section.content}
            `;
        });
        
        console.log('✅ Intermediate section loaded');
    } catch (error) {
        console.error('❌ Error loading intermediate section:', error);
    }
}

/**
 * Load the Expert section content
 */
function loadExpertSection() {
    const expertSection = document.getElementById('expertSection');
    if (!expertSection || typeof contentData === 'undefined' || !contentData.expert) {
        console.warn('⚠️ Expert section or content not available');
        return;
    }

    try {
        const expertData = contentData.expert;
        
        // Clear existing content to prevent duplicates
        expertSection.innerHTML = '';
        
        expertSection.innerHTML = `
            <h2 class="section-title">${expertData.title}</h2>
            ${expertData.intro}
        `;
        
        // Add sections
        expertData.sections.forEach(section => {
            expertSection.innerHTML += `
                ${section.content}
            `;
        });
        
        console.log('✅ Expert section loaded');
    } catch (error) {
        console.error('❌ Error loading expert section:', error);
    }
}

/**
 * Load the Quiz section content
 */
function loadQuizSection() {
    const quizSection = document.getElementById('quizSection');
    if (!quizSection || typeof contentData === 'undefined' || !contentData.quiz) {
        console.warn('⚠️ Quiz section or content not available');
        return;
    }

    try {
        // Clear existing content to prevent duplicates
        quizSection.innerHTML = '';
        
        quizSection.innerHTML = `
            <h2 class="section-title">Test Your Ad Tech Knowledge</h2>
            <p class="lead mb-5">Challenge yourself with these quizzes to reinforce your understanding of Ad Tech concepts.</p>

            <!-- Quiz Navigation -->
            <ul class="nav nav-pills mb-4 justify-content-center" id="quizNav" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="beginner-quiz-tab" data-quiz-target="beginnerQuiz" type="button" role="tab" aria-controls="beginnerQuiz" aria-selected="true">
                        <i class="fas fa-seedling me-2"></i>Beginner
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="intermediate-quiz-tab" data-quiz-target="intermediateQuiz" type="button" role="tab" aria-controls="intermediateQuiz" aria-selected="false">
                        <i class="fas fa-cogs me-2"></i>Intermediate
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="expert-quiz-tab" data-quiz-target="expertQuiz" type="button" role="tab" aria-controls="expertQuiz" aria-selected="false">
                        <i class="fas fa-brain me-2"></i>Expert
                    </button>
                </li>
            </ul>

            <!-- Quiz Content -->
            <div class="quiz-tab-content">
                <!-- Beginner Quiz -->
                <div class="quiz-pane show active" id="beginnerQuiz" role="tabpanel" aria-labelledby="beginner-quiz-tab"></div>
                <!-- Intermediate Quiz -->
                <div class="quiz-pane" id="intermediateQuiz" role="tabpanel" aria-labelledby="intermediate-quiz-tab"></div>
                <!-- Expert Quiz -->
                <div class="quiz-pane" id="expertQuiz" role="tabpanel" aria-labelledby="expert-quiz-tab"></div>
            </div>
        `;

        // Load quiz content for each level
        loadQuizContent('beginnerQuiz', contentData.quiz.beginner);
        loadQuizContent('intermediateQuiz', contentData.quiz.intermediate);
        loadQuizContent('expertQuiz', contentData.quiz.expert);
        
        // Set up quiz tab navigation
        setupQuizTabNavigation();
        
        console.log('✅ Quiz section loaded');
    } catch (error) {
        console.error('❌ Error loading quiz section:', error);
    }
}

/**
 * Set up navigation between quiz tabs
 */
function setupQuizTabNavigation() {
    const quizNavTabs = document.querySelectorAll('#quizNav .nav-link');
    
    quizNavTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target content ID
            const targetId = this.getAttribute('data-quiz-target');
            
            console.log('Quiz tab clicked:', targetId);
            
            // Hide all quiz panes
            document.querySelectorAll('.quiz-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Deactivate all tabs
            quizNavTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Activate this tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show the target content
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
                console.log('✅ Quiz tab activated:', targetId);
            } else {
                console.error('❌ Quiz pane not found:', targetId);
            }
        });
    });
}

/**
 * Load the Glossary section content
 */
function loadGlossarySection() {
    const glossarySection = document.getElementById('glossarySection');
    if (!glossarySection || typeof contentData === 'undefined' || !contentData.glossary) {
        console.warn('⚠️ Glossary section or content not available');
        return;
    }

    try {
        // Clear existing content to prevent duplicates
        glossarySection.innerHTML = '';
        
        glossarySection.innerHTML = `
            <h2 class="section-title">Ad Tech Glossary</h2>
            <p class="lead mb-5">A comprehensive dictionary of Ad Tech terminology from A to Z.</p>

            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input type="text" class="form-control" id="glossarySearch" placeholder="Search terms..." aria-label="Search glossary terms">
                    </div>
                </div>
                <div class="col-md-8 mb-4">
                    <div class="d-flex justify-content-start justify-content-md-end">
                        <div class="btn-group" id="alphabetFilter" role="group" aria-label="Alphabet filter">
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

        // Load glossary terms
        loadGlossaryTerms();
        
        console.log('✅ Glossary section loaded');
    } catch (error) {
        console.error('❌ Error loading glossary section:', error);
    }
}

/**
 * Load quiz content for a specific quiz section
 * @param {string} quizId - The ID of the quiz container
 * @param {Object} quizData - The quiz data to load
 */
function loadQuizContent(quizId, quizData) {
    const quizContainer = document.getElementById(quizId);
    if (!quizContainer || !quizData) {
        console.warn(`⚠️ Quiz container ${quizId} or data not found`);
        return;
    }

    try {
        let quizHtml = `
            <div class="card quiz-card mb-4">
                <div class="card-body">
                    <h4 class="card-title">${quizData.title}</h4>
                    <form id="${quizId}Form" class="quiz-form">
                        <div id="${quizId}Container">
        `;

        // Add questions
        quizData.questions.forEach((question, index) => {
            quizHtml += `
                <div class="quiz-question mb-4">
                    <h5>${index + 1}. ${question.question}</h5>
                    <div class="quiz-options-container">
            `;

            // Add options
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

            quizHtml += `
                    </div>
                </div>
            `;
        });

        // Add buttons
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
        console.log(`✅ Quiz content loaded for ${quizId}`);
    } catch (error) {
        console.error(`❌ Error loading quiz content for ${quizId}:`, error);
    }
}

/**
 * Load glossary terms into the glossary section
 */
function loadGlossaryTerms() {
    const glossaryTermsContainer = document.getElementById('glossaryTerms');
    if (!glossaryTermsContainer || typeof contentData === 'undefined' || !contentData.glossary) {
        console.warn('⚠️ Glossary terms container or content not available');
        return;
    }

    try {
        // Clear any existing content
        glossaryTermsContainer.innerHTML = '';

        // Load terms for each letter
        for (const [letter, terms] of Object.entries(contentData.glossary)) {
            let termsHtml = `
                <div class="term-group" data-group="${letter}">
                    <h4 class="text-primary">${letter.toUpperCase()}</h4>
                    <dl>
            `;

            // Add terms and definitions
            terms.forEach(item => {
                termsHtml += `
                    <dt>${item.term}</dt>
                    <dd>${item.definition}</dd>
                `;
            });

            termsHtml += `
                    </dl>
                </div>
            `;

            glossaryTermsContainer.innerHTML += termsHtml;
        }
        
        console.log('✅ Glossary terms loaded');
    } catch (error) {
        console.error('❌ Error loading glossary terms:', error);
    }
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
    console.log('🎧 Setting up event listeners...');
    
    // Progress tracking
    const progressBar = document.querySelector('#progressTracker .progress-bar');
    const progressStatus = document.getElementById('progressStatus');
    let progress = 0;

    // Navigation buttons
    setupNavigationListeners(progressBar, progressStatus, progress);
    
    // Quiz functionality
    setupQuizListeners();
    
    // Glossary functionality
    setupGlossaryListeners();
    
    // Tab switching functionality
    setupTabNavigation();
    
    // Dark mode change listener for Mermaid updates
    document.addEventListener('darkModeChanged', function(e) {
        console.log('🌙 Dark mode changed, updating Mermaid diagrams...');
        setTimeout(() => {
            initializeMermaidDiagrams();
        }, 200);
    });
    
    console.log('✅ Event listeners set up');
}

/**
 * Set up tab navigation event listeners
 */
function setupTabNavigation() {
    // Use Bootstrap's tab events for better integration
    document.querySelectorAll('#mainNav .nav-link').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            const targetId = e.target.getAttribute('data-bs-target');
            appState.currentTab = targetId?.replace('#', '').replace('Section', '') || 'overview';
            
            console.log(`📑 Switched to tab: ${appState.currentTab}`);
            
            // Re-initialize Mermaid diagrams in the new tab with delay
            setTimeout(() => {
                initializeMermaidDiagrams();
            }, 300);
        });
        
        // Also handle click events for proper tab switching
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-bs-target');
            
            // Update Bootstrap tab state
            const tabTrigger = new bootstrap.Tab(this);
            tabTrigger.show();
        });
    });
}

function setupNavigationListeners(progressBar, progressStatus, progress) {
    // Initial navigation buttons
    const startLearningBtn = document.getElementById('startLearningBtn');
    const startLearningModalBtn = document.getElementById('startLearningModalBtn');
    const beginnerBtn = document.getElementById('beginnerBtn');
    
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            const beginnerTab = document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]');
            if (beginnerTab) {
                const tabTrigger = new bootstrap.Tab(beginnerTab);
                tabTrigger.show();
                updateProgress(5, progressBar, progressStatus);
            }
        });
    }
    
    if (startLearningModalBtn) {
        startLearningModalBtn.addEventListener('click', function() {
            const beginnerTab = document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]');
            if (beginnerTab) {
                const tabTrigger = new bootstrap.Tab(beginnerTab);
                tabTrigger.show();
                updateProgress(5, progressBar, progressStatus);
            }
        });
    }
    
    if (beginnerBtn) {
        beginnerBtn.addEventListener('click', function() {
            const beginnerTab = document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]');
            if (beginnerTab) {
                const tabTrigger = new bootstrap.Tab(beginnerTab);
                tabTrigger.show();
                updateProgress(5, progressBar, progressStatus);
            }
        });
    }
    
    // Track navigation through main tabs
    const mainNavLinks = document.querySelectorAll('#mainNav .nav-link');
    mainNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            updateProgress(5, progressBar, progressStatus);
        });
    });

    // Listen for section navigation buttons that are created after initial load
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'toIntermediateBtn') {
            const intermediateTab = document.querySelector('#mainNav .nav-link[data-bs-target="#intermediateSection"]');
            if (intermediateTab) {
                const tabTrigger = new bootstrap.Tab(intermediateTab);
                tabTrigger.show();
                updateProgress(15, progressBar, progressStatus);
            }
        } else if (e.target && e.target.id === 'toExpertBtn') {
            const expertTab = document.querySelector('#mainNav .nav-link[data-bs-target="#expertSection"]');
            if (expertTab) {
                const tabTrigger = new bootstrap.Tab(expertTab);
                tabTrigger.show();
                updateProgress(15, progressBar, progressStatus);
            }
        } else if (e.target && e.target.id === 'toQuizBtn') {
            const quizTab = document.querySelector('#mainNav .nav-link[data-bs-target="#quizSection"]');
            if (quizTab) {
                const tabTrigger = new bootstrap.Tab(quizTab);
                tabTrigger.show();
                updateProgress(15, progressBar, progressStatus);
            }
        }
    });

    // Roadmap modal
    const showRoadmapBtn = document.getElementById('showRoadmapBtn');
    if (showRoadmapBtn) {
        showRoadmapBtn.addEventListener('click', function() {
            // Reinitialize mermaid in the modal after it's shown
            const roadmapModal = document.getElementById('roadmapModal');
            if (roadmapModal) {
                roadmapModal.addEventListener('shown.bs.modal', function() {
                    setTimeout(() => {
                        initializeMermaidDiagrams();
                    }, 200);
                }, { once: true });
            }
        });
    }
}

/**
 * Set up quiz-related event listeners
 */
function setupQuizListeners() {
    const quizSections = ['beginner', 'intermediate', 'expert'];
    
    // Handle quiz forms submission and reset
    quizSections.forEach(section => {
        // Use event delegation since these elements are created dynamically
        document.addEventListener('submit', function(e) {
            const quizForm = document.getElementById(`${section}QuizForm`);
            if (e.target === quizForm) {
                e.preventDefault();
                handleQuizSubmission(section);
            }
        });
        
        document.addEventListener('click', function(e) {
            const resetBtn = document.getElementById(`reset${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
            if (e.target === resetBtn) {
                resetQuiz(section);
            }
        });
    });

    // Event delegation for selecting quiz options
    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.quiz-option label')) {
            const label = e.target.closest('.quiz-option label');
            const input = document.getElementById(label.getAttribute('for'));
            if (input) {
                input.checked = true;
                
                // Remove selected class from all options in the question
                const questionDiv = label.closest('.quiz-question');
                questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                label.closest('.quiz-option').classList.add('selected');
            }
        }
    });
}

/**
 * Handle quiz submission
 * @param {string} section - The quiz section (beginner, intermediate, expert)
 */
function handleQuizSubmission(section) {
    const quizContainer = document.getElementById(`${section}QuizContainer`);
    const form = document.getElementById(`${section}QuizForm`);
    
    if (!quizContainer || !form) return;
    
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
        } else {
            question.classList.add('unanswered');
        }
        
        // Disable further selection
        options.forEach(option => {
            const input = option.querySelector('input');
            if (input) input.disabled = true;
        });
    });
    
    // Remove any existing result message
    const existingResult = quizContainer.querySelector('.quiz-result');
    if (existingResult) {
        existingResult.remove();
    }
    
    // Display results
    const resultDiv = document.createElement('div');
    resultDiv.className = 'alert mt-4 quiz-result';
    
    if (answeredCount < questions.length) {
        resultDiv.className += ' alert-warning';
        resultDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i> Please answer all questions. You've completed ${answeredCount} out of ${questions.length}.`;
    } else if (correctCount === questions.length) {
        resultDiv.className += ' alert-success';
        resultDiv.innerHTML = `<i class="fas fa-trophy me-2"></i> Perfect! You got all ${questions.length} questions correct!`;
        updateProgress(10, document.querySelector('#progressTracker .progress-bar'), document.getElementById('progressStatus'));
    } else {
        resultDiv.className += ' alert-info';
        resultDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i> You got ${correctCount} out of ${questions.length} questions correct.`;
        updateProgress(5, document.querySelector('#progressTracker .progress-bar'), document.getElementById('progressStatus'));
    }
    
    quizContainer.appendChild(resultDiv);
    
    // Disable check button
    const checkBtn = document.getElementById(`check${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
    if (checkBtn) {
        checkBtn.disabled = true;
    }
}

/**
 * Reset a quiz to its initial state
 * @param {string} section - The quiz section (beginner, intermediate, expert)
 */
function resetQuiz(section) {
    const quizContainer = document.getElementById(`${section}QuizContainer`);
    const form = document.getElementById(`${section}QuizForm`);
    
    if (!quizContainer || !form) return;
    
    // Reset form
    form.reset();
    
    // Remove styling classes
    quizContainer.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
        const input = option.querySelector('input');
        if (input) input.disabled = false;
    });
    
    // Remove unanswered class from questions
    quizContainer.querySelectorAll('.unanswered').forEach(question => {
        question.classList.remove('unanswered');
    });
    
    // Remove result message
    const resultDiv = quizContainer.querySelector('.quiz-result');
    if (resultDiv) {
        resultDiv.remove();
    }
    
    // Enable check button
    const checkBtn = document.getElementById(`check${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
    if (checkBtn) {
        checkBtn.disabled = false;
    }
}

/**
 * Set up glossary-related event listeners
 */
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
                
                // Update active button
                alphabetFilter.querySelectorAll('.btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Clear search input
                if (glossarySearch) {
                    glossarySearch.value = '';
                }
            });
        });
    }
}

/**
 * Filter glossary terms by search input
 * @param {string} searchTerm - The search term
 */
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
    
    // Show/hide term groups based on visible terms
    termGroups.forEach(group => {
        const visibleTerms = group.querySelectorAll('dt[style="display: block;"]');
        if (visibleTerms.length === 0) {
            group.style.display = 'none';
        } else {
            group.style.display = 'block';
        }
    });
    
    // Reset alphabet filter active state
    const alphabetFilter = document.getElementById('alphabetFilter');
    if (alphabetFilter) {
        alphabetFilter.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const allButton = alphabetFilter.querySelector('.btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }
}

/**
 * Filter glossary terms by starting letter
 * @param {string} filter - The letter filter
 */
function filterGlossaryByLetter(filter) {
    const termGroups = document.querySelectorAll('.term-group');
    
    termGroups.forEach(group => {
        const groupName = group.getAttribute('data-group');
        
        if (filter === 'all') {
            group.style.display = 'block';
        } else if (filter === 'other') {
            // Show groups that are not a, b, c, d, p, r, s
            if (!['a', 'b', 'c', 'd', 'p', 'r', 's'].includes(groupName)) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        } else {
            if (groupName === filter) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        }
    });
    
    // Show all terms in visible groups
    document.querySelectorAll('.term-group[style="display: block;"] dt, .term-group[style="display: block;"] dd').forEach(item => {
        item.style.display = 'block';
    });
}

/**
 * Update the progress bar
 * @param {number} increment - The amount to increment progress by
 * @param {HTMLElement} progressBar - The progress bar element
 * @param {HTMLElement} progressStatus - The progress status element
 */
function updateProgress(increment, progressBar, progressStatus) {
    // Get current progress from the bar if it exists
    let progress = 0;
    if (progressBar) {
        const currentWidth = progressBar.style.width;
        if (currentWidth) {
            progress = parseInt(currentWidth.replace('%', ''));
        }
    } else {
        return; // No progress bar, exit
    }
    
    // Update progress
    progress += increment;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.textContent = progress + '%';
    
    // Update status text
    if (progressStatus) {
        if (progress < 25) {
            progressStatus.textContent = 'Just started';
        } else if (progress < 50) {
            progressStatus.textContent = 'Making good progress';
        } else if (progress < 75) {
            progressStatus.textContent = 'Well on your way';
        } else if (progress < 100) {
            progressStatus.textContent = 'Almost there';
        } else {
            progressStatus.textContent = 'Complete! Great job!';
        }
    }
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('💥 Application error:', e.error);
    showErrorMessage('Something went wrong. Please refresh the page.');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Unhandled promise rejection:', e.reason);
    showErrorMessage('An error occurred. Please try refreshing the page.');
    e.preventDefault();
});

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger position-fixed top-0 start-50 translate-middle-x';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.marginTop = '20px';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close ms-2" aria-label="Close" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Public API for external use
window.adTechApp = {
    initializeMermaidDiagrams,
    loadContent,
    updateProgress,
    state: appState
};

console.log('📱 App.js fully loaded and ready');
