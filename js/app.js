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

// Initialize Mermaid for flowcharts
document.addEventListener('DOMContentLoaded', function() {
    mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'default',
        securityLevel: 'loose' // Allows rendering diagrams from content strings
    });

    // Initialize the application
    initApp();
});

/**
 * Initialize the main application
 */
function initApp() {
    // Load initial content
    loadContent();

    // Set up event listeners
    setupEventListeners();

    // Initialize tooltips
    initializeTooltips();
    
    // Force the overview tab to be active and visible
    setTimeout(() => {
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
        }
    }, 500);
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

/**
 * Load content for each section of the application
 */
function loadContent() {
    console.log("Loading content...");
    
    // Check if the DOM elements exist before trying to load content
    const overviewSection = document.getElementById('overview');
    const beginnerSection = document.getElementById('beginnerSection');
    const intermediateSection = document.getElementById('intermediateSection');
    const expertSection = document.getElementById('expertSection');
    const quizSection = document.getElementById('quizSection');
    const glossarySection = document.getElementById('glossarySection');
    
    console.log("DOM Elements:", {
        overview: overviewSection ? true : false,
        beginner: beginnerSection ? true : false,
        intermediate: intermediateSection ? true : false,
        expert: expertSection ? true : false,
        quiz: quizSection ? true : false,
        glossary: glossarySection ? true : false
    });
    
    if (overviewSection) loadOverviewSection();
    if (beginnerSection) loadBeginnerSection();
    if (intermediateSection) loadIntermediateSection();
    if (expertSection) loadExpertSection();
    if (quizSection) loadQuizSection();
    if (glossarySection) loadGlossarySection();

    // Re-initialize Mermaid after content is loaded
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
}

/**
 * Load the Overview section content
 */
function loadOverviewSection() {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;

    const overviewData = contentData.overview;
    
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
}

/**
 * Load the Beginner section content
 */
function loadBeginnerSection() {
    const beginnerSection = document.getElementById('beginnerSection');
    if (!beginnerSection) return;

    const beginnerData = contentData.beginner;
    
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
}

/**
 * Load the Intermediate section content
 */
function loadIntermediateSection() {
    const intermediateSection = document.getElementById('intermediateSection');
    if (!intermediateSection) return;

    const intermediateData = contentData.intermediate;
    
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
}

/**
 * Load the Expert section content
 */
function loadExpertSection() {
    const expertSection = document.getElementById('expertSection');
    if (!expertSection) return;

    const expertData = contentData.expert;
    
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
}

/**
 * Load the Quiz section content
 */
function loadQuizSection() {
    const quizSection = document.getElementById('quizSection');
    if (!quizSection) return;

    quizSection.innerHTML = `
        <h2 class="section-title">Test Your Ad Tech Knowledge</h2>
        <p class="lead mb-5">Challenge yourself with these quizzes to reinforce your understanding of Ad Tech concepts.</p>

        <!-- Quiz Navigation -->
        <ul class="nav nav-pills mb-4 justify-content-center" id="quizNav">
            <li class="nav-item">
                <button class="nav-link active" id="beginner-quiz-tab" data-bs-toggle="pill" data-bs-target="#beginnerQuiz" type="button" role="tab" aria-controls="beginnerQuiz" aria-selected="true">Beginner</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="intermediate-quiz-tab" data-bs-toggle="pill" data-bs-target="#intermediateQuiz" type="button" role="tab" aria-controls="intermediateQuiz" aria-selected="false">Intermediate</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="expert-quiz-tab" data-bs-toggle="pill" data-bs-target="#expertQuiz" type="button" role="tab" aria-controls="expertQuiz" aria-selected="false">Expert</button>
            </li>
        </ul>

        <!-- Quiz Content -->
        <div class="tab-content">
            <!-- Beginner Quiz -->
            <div class="tab-pane fade show active" id="beginnerQuiz" role="tabpanel" aria-labelledby="beginner-quiz-tab"></div>
            <!-- Intermediate Quiz -->
            <div class="tab-pane fade" id="intermediateQuiz" role="tabpanel" aria-labelledby="intermediate-quiz-tab"></div>
            <!-- Expert Quiz -->
            <div class="tab-pane fade" id="expertQuiz" role="tabpanel" aria-labelledby="expert-quiz-tab"></div>
        </div>
    `;

    // Load quiz content for each level
    loadQuizContent('beginnerQuiz', contentData.quiz.beginner);
    loadQuizContent('intermediateQuiz', contentData.quiz.intermediate);
    loadQuizContent('expertQuiz', contentData.quiz.expert);
    
    // Set up quiz tab navigation
    setupQuizTabNavigation();
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
            const targetId = this.getAttribute('data-bs-target');
            
            // Hide all quiz panes
            document.querySelectorAll('#quizSection .tab-pane').forEach(pane => {
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
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

/**
 * Load the Glossary section content
 */
function loadGlossarySection() {
    const glossarySection = document.getElementById('glossarySection');
    if (!glossarySection) return;

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
}

/**
 * Load quiz content for a specific quiz section
 * @param {string} quizId - The ID of the quiz container
 * @param {Object} quizData - The quiz data to load
 */
function loadQuizContent(quizId, quizData) {
    const quizContainer = document.getElementById(quizId);
    if (!quizContainer) return;

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
}

/**
 * Load glossary terms into the glossary section
 */
function loadGlossaryTerms() {
    const glossaryTermsContainer = document.getElementById('glossaryTerms');
    if (!glossaryTermsContainer) return;

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
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
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
    
    // Tab switching functionality - FIX FOR NAVIGATION
    setupTabNavigation();
}

/**
 * Set up tab navigation event listeners
 */
function setupTabNavigation() {
    const mainNavTabs = document.querySelectorAll('#mainNav .nav-link');
    
    mainNavTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target content ID
            const targetId = this.getAttribute('data-bs-target');
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Deactivate all tabs
            mainNavTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Activate this tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show the target content
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
                
                // Special handling for the Quiz section - initialize the first quiz tab
                if (targetId === '#quizSection') {
                    // Make sure the beginner quiz tab is active by default
                    const beginnerQuizTab = document.getElementById('beginner-quiz-tab');
                    const beginnerQuiz = document.getElementById('beginnerQuiz');
                    
                    if (beginnerQuizTab && beginnerQuiz) {
                        // Activate the beginner tab
                        document.querySelectorAll('#quizNav .nav-link').forEach(t => {
                            t.classList.remove('active');
                            t.setAttribute('aria-selected', 'false');
                        });
                        
                        beginnerQuizTab.classList.add('active');
                        beginnerQuizTab.setAttribute('aria-selected', 'true');
                        
                        // Show beginner quiz content
                        document.querySelectorAll('#quizSection .tab-pane').forEach(p => {
                            p.classList.remove('show', 'active');
                        });
                        
                        beginnerQuiz.classList.add('show', 'active');
                    }
                }
            }
            
            // Re-initialize Mermaid diagrams in the new tab
            setTimeout(() => {
                if (typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                }
            }, 100);
        });
    });
}

/**
 * Set up navigation event listeners
 * @param {HTMLElement} progressBar - The progress bar element
 * @param {HTMLElement} progressStatus - The progress status element
 * @param {number} progress - The current progress value
 */
function setupNavigationListeners(progressBar, progressStatus, progress) {
    // Initial navigation buttons
    const startLearningBtn = document.getElementById('startLearningBtn');
    const startLearningModalBtn = document.getElementById('startLearningModalBtn');
    const beginnerBtn = document.getElementById('beginnerBtn');
    
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]').click();
            updateProgress(5, progressBar, progressStatus);
        });
    }
    
    if (startLearningModalBtn) {
        startLearningModalBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]').click();
            updateProgress(5, progressBar, progressStatus);
        });
    }
    
    if (beginnerBtn) {
        beginnerBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[data-bs-target="#beginnerSection"]').click();
            updateProgress(5, progressBar, progressStatus);
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
            document.querySelector('#mainNav .nav-link[data-bs-target="#intermediateSection"]').click();
            updateProgress(15, progressBar, progressStatus);
        } else if (e.target && e.target.id === 'toExpertBtn') {
            document.querySelector('#mainNav .nav-link[data-bs-target="#expertSection"]').click();
            updateProgress(15, progressBar, progressStatus);
        } else if (e.target && e.target.id === 'toQuizBtn') {
            document.querySelector('#mainNav .nav-link[data-bs-target="#quizSection"]').click();
            updateProgress(15, progressBar, progressStatus);
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
                    mermaid.init(undefined, roadmapModal.querySelectorAll('.mermaid'));
                });
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