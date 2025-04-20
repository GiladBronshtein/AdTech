// Initialize Mermaid for flowcharts
mermaid.initialize({ startOnLoad: true, theme: 'default' });

// Main app functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content
    loadContent();

    // Set up event listeners
    setupEventListeners();

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Load content for each section
function loadContent() {
    // Load Overview Section
    const overviewSection = document.getElementById('overview');
    if (overviewSection) {
        overviewSection.innerHTML = `<h2 class="section-title">${contentData.overview.title}</h2>${contentData.overview.intro}`;
        
        // Add components
        contentData.overview.components.forEach(component => {
            overviewSection.innerHTML += `<h3 class="mb-4">${component.title}</h3>${component.content}`;
        });
    }

    // Load Beginner Section
    const beginnerSection = document.getElementById('beginnerSection');
    if (beginnerSection) {
        beginnerSection.innerHTML = `<h2 class="section-title">${contentData.beginner.title}</h2>${contentData.beginner.intro}`;
        
        // Add sections
        contentData.beginner.sections.forEach(section => {
            beginnerSection.innerHTML += `<h3 class="mb-4">${section.title}</h3>${section.content}`;
        });
    }

    // Load Intermediate Section
    const intermediateSection = document.getElementById('intermediateSection');
    if (intermediateSection) {
        intermediateSection.innerHTML = `<h2 class="section-title">${contentData.intermediate.title}</h2>${contentData.intermediate.intro}`;
        
        // Add sections
        contentData.intermediate.sections.forEach(section => {
            intermediateSection.innerHTML += `<h3 class="mb-4">${section.title}</h3>${section.content}`;
        });

        // Add navigation button
        intermediateSection.innerHTML += `
            <div class="text-center mb-5">
                <button class="btn btn-primary" id="toExpertBtn">
                    <i class="fas fa-arrow-right me-2"></i>Continue to Expert Level
                </button>
            </div>
        `;
    }

    // Load Expert Section
    const expertSection = document.getElementById('expertSection');
    if (expertSection) {
        expertSection.innerHTML = `<h2 class="section-title">${contentData.expert.title}</h2>${contentData.expert.intro}`;
        
        // Add sections
        contentData.expert.sections.forEach(section => {
            expertSection.innerHTML += `<h3 class="mb-4">${section.title}</h3>${section.content}`;
        });

        // Add navigation button
        expertSection.innerHTML += `
            <div class="text-center mb-5">
                <button class="btn btn-primary" id="toQuizBtn">
                    <i class="fas fa-question-circle me-2"></i>Test Your Knowledge
                </button>
            </div>
        `;
    }

    // Load Quiz Section
    const quizSection = document.getElementById('quizSection');
    if (quizSection) {
        quizSection.innerHTML = `
            <h2 class="section-title">Test Your Ad Tech Knowledge</h2>
            <p class="lead mb-5">Challenge yourself with these quizzes to reinforce your understanding of Ad Tech concepts.</p>

            <!-- Quiz Navigation -->
            <ul class="nav nav-pills mb-4 justify-content-center" id="quizNav">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="pill" href="#beginnerQuiz">Beginner</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#intermediateQuiz">Intermediate</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#expertQuiz">Expert</a>
                </li>
            </ul>

            <!-- Quiz Content -->
            <div class="tab-content">
                <!-- Beginner Quiz -->
                <div class="tab-pane fade show active" id="beginnerQuiz"></div>
                <!-- Intermediate Quiz -->
                <div class="tab-pane fade" id="intermediateQuiz"></div>
                <!-- Expert Quiz -->
                <div class="tab-pane fade" id="expertQuiz"></div>
            </div>
        `;

        // Load quiz content for each level
        loadQuizContent('beginnerQuiz', contentData.quiz.beginner);
        loadQuizContent('intermediateQuiz', contentData.quiz.intermediate);
        loadQuizContent('expertQuiz', contentData.quiz.expert);
    }

    // Load Glossary Section
    const glossarySection = document.getElementById('glossarySection');
    if (glossarySection) {
        glossarySection.innerHTML = `
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
                        <div class="btn-group" id="alphabetFilter">
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

    // Re-initialize Mermaid after content is loaded
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
}

// Function to load quiz content
function loadQuizContent(quizId, quizData) {
    const quizContainer = document.getElementById(quizId);
    if (!quizContainer) return;

    let quizHtml = `
        <div class="card quiz-card mb-4">
            <div class="card-body">
                <h4 class="card-title">${quizData.title}</h4>
                <div id="${quizId}Container">
    `;

    // Add questions
    quizData.questions.forEach((question, index) => {
        quizHtml += `
            <div class="quiz-question mb-4">
                <h5>${index + 1}. ${question.question}</h5>
        `;

        // Add options
        question.options.forEach((option, optIndex) => {
            const isCorrect = optIndex === question.correctIndex;
            quizHtml += `
                <div class="quiz-option" ${isCorrect ? 'data-correct="true"' : ''}>${option}</div>
            `;
        });

        quizHtml += `</div>`;
    });

    // Add buttons
    quizHtml += `
                    <div class="text-center mt-4">
                        <button class="btn btn-primary" id="check${quizId.charAt(0).toUpperCase() + quizId.slice(1)}">Check Answers</button>
                        <button class="btn btn-outline-primary ms-2" id="reset${quizId.charAt(0).toUpperCase() + quizId.slice(1)}">Reset Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    quizContainer.innerHTML = quizHtml;
}

// Function to load glossary terms
function loadGlossaryTerms() {
    const glossaryTermsContainer = document.getElementById('glossaryTerms');
    if (!glossaryTermsContainer) return;

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

// Set up event listeners
function setupEventListeners() {
    // Progress tracking
    const progressBar = document.querySelector('#progressTracker .progress-bar');
    const progressStatus = document.getElementById('progressStatus');
    let progress = 0;

    // Navigation buttons
    const startLearningBtn = document.getElementById('startLearningBtn');
    const startLearningModalBtn = document.getElementById('startLearningModalBtn');
    const beginnerBtn = document.getElementById('beginnerBtn');
    
    // Navigation event listeners
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[href="#beginnerSection"]').click();
            updateProgress(5);
        });
    }
    
    if (startLearningModalBtn) {
        startLearningModalBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[href="#beginnerSection"]').click();
            updateProgress(5);
        });
    }
    
    if (beginnerBtn) {
        beginnerBtn.addEventListener('click', function() {
            document.querySelector('#mainNav .nav-link[href="#beginnerSection"]').click();
            updateProgress(5);
        });
    }
    
    // Delayed setup for elements that are generated after initial load
    setTimeout(() => {
        const toIntermediateBtn = document.getElementById('toIntermediateBtn');
        const toExpertBtn = document.getElementById('toExpertBtn');
        const toQuizBtn = document.getElementById('toQuizBtn');
        
        if (toIntermediateBtn) {
            toIntermediateBtn.addEventListener('click', function() {
                document.querySelector('#mainNav .nav-link[href="#intermediateSection"]').click();
                updateProgress(15);
            });
        }
        
        if (toExpertBtn) {
            toExpertBtn.addEventListener('click', function() {
                document.querySelector('#mainNav .nav-link[href="#expertSection"]').click();
                updateProgress(15);
            });
        }
        
        if (toQuizBtn) {
            toQuizBtn.addEventListener('click', function() {
                document.querySelector('#mainNav .nav-link[href="#quizSection"]').click();
                updateProgress(15);
            });
        }
        
        // Track navigation through tabs
        const mainNavLinks = document.querySelectorAll('#mainNav .nav-link');
        mainNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                updateProgress(5);
            });
        });
        
        // Quiz functionality
        const quizSections = ['beginner', 'intermediate', 'expert'];
        
        quizSections.forEach(section => {
            const checkBtn = document.getElementById(`check${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
            const resetBtn = document.getElementById(`reset${section.charAt(0).toUpperCase() + section.slice(1)}Quiz`);
            const quizContainer = document.getElementById(`${section}QuizContainer`);
            
            if (checkBtn && resetBtn && quizContainer) {
                // Check quiz answers
                checkBtn.addEventListener('click', function() {
                    const questions = quizContainer.querySelectorAll('.quiz-question');
                    let correctCount = 0;
                    
                    questions.forEach(question => {
                        const options = question.querySelectorAll('.quiz-option');
                        let answered = false;
                        
                        options.forEach(option => {
                            if (option.classList.contains('selected')) {
                                answered = true;
                                if (option.getAttribute('data-correct') === 'true') {
                                    option.classList.add('correct');
                                    correctCount++;
                                } else {
                                    option.classList.add('incorrect');
                                }
                            } else if (option.getAttribute('data-correct') === 'true') {
                                option.classList.add('correct');
                            }
                            
                            option.style.pointerEvents = 'none';
                        });
                        
                        if (!answered) {
                            question.classList.add('unanswered');
                        }
                    });
                    
                    // Display results
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'alert mt-4';
                    
                    if (correctCount === questions.length) {
                        resultDiv.className += ' alert-success';
                        resultDiv.innerHTML = `<i class="fas fa-trophy me-2"></i> Perfect! You got all ${questions.length} questions correct!`;
                        updateProgress(10);
                    } else {
                        resultDiv.className += ' alert-info';
                        resultDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i> You got ${correctCount} out of ${questions.length} questions correct.`;
                        updateProgress(5);
                    }
                    
                    quizContainer.appendChild(resultDiv);
                    checkBtn.disabled = true;
                });
                
                // Reset quiz
                resetBtn.addEventListener('click', function() {
                    const options = quizContainer.querySelectorAll('.quiz-option');
                    const resultDiv = quizContainer.querySelector('.alert');
                    
                    options.forEach(option => {
                        option.classList.remove('selected', 'correct', 'incorrect');
                        option.style.pointerEvents = 'auto';
                    });
                    
                    quizContainer.querySelectorAll('.unanswered').forEach(question => {
                        question.classList.remove('unanswered');
                    });
                    
                    if (resultDiv) {
                        resultDiv.remove();
                    }
                    
                    checkBtn.disabled = false;
                });
                
                // Select quiz options
                quizContainer.querySelectorAll('.quiz-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const questionDiv = this.closest('.quiz-question');
                        questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    });
                });
            }
        });
        
        // Glossary search functionality
        const glossarySearch = document.getElementById('glossarySearch');
        const termGroups = document.querySelectorAll('.term-group');
        
        if (glossarySearch) {
            glossarySearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
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
                document.querySelectorAll('#alphabetFilter .btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector('#alphabetFilter .btn[data-filter="all"]').classList.add('active');
            });
        }
        
        // Glossary filter by alphabet
        const alphabetFilter = document.getElementById('alphabetFilter');
        
        if (alphabetFilter) {
            alphabetFilter.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    alphabetFilter.querySelectorAll('.btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Clear search input
                    if (glossarySearch) {
                        glossarySearch.value = '';
                    }
                    
                    // Show/hide term groups
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
                });
            });
        }
    }, 500);
    
    // Function to update progress
    function updateProgress(increment) {
        progress += increment;
        if (progress > 100) progress = 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
            progressBar.setAttribute('aria-valuenow', progress);
            progressBar.textContent = progress + '%';
        }
        
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
}