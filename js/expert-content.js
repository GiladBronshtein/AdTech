// Expert section content
const expertContent = {
    title: "Advanced Ad Tech Topics",
    intro: `<p class="lead mb-5">Explore cutting-edge concepts, challenges, and the future of Ad Tech.</p>`,
    sections: [
        {
            title: "Header Bidding Explained",
            content: `
            <div class="card mb-5">
                <div class="card-body">
                    <h3 class="card-title">Header Bidding Explained</h3>
                    <span class="level-indicator level-expert">Expert</span>
                    <p>Header bidding is an advanced programmatic technique that allows publishers to offer their inventory to multiple ad exchanges simultaneously before making calls to their ad servers.</p>
                    
                    <div class="row mt-4">
                        <div class="col-lg-6">
                            <h5>How Header Bidding Works</h5>
                            <ol>
                                <li>When a user visits a webpage, the header bidding code in the page's header sends bid requests to multiple demand partners simultaneously</li>
                                <li>Each demand partner returns a bid for the ad impression</li>
                                <li>The highest bid wins and gets passed to the publisher's ad server</li>
                                <li>The ad server compares this bid against direct-sold campaigns and selects the final winner</li>
                                <li>The winning ad is displayed to the user</li>
                            </ol>
                            <div class="alert alert-warning">
                                <i class="fas fa-exclamation-triangle me-2" aria-hidden="true"></i> 
                                Header bidding can add latency to page load times if not properly implemented.
                            </div>
                            
                            <div class="mt-4">
                                <h6>Types of Header Bidding</h6>
                                <ul>
                                    <li><strong>Client-side:</strong> Runs in the user's browser</li>
                                    <li><strong>Server-side:</strong> Runs on a server to reduce latency</li>
                                    <li><strong>Hybrid:</strong> Combines both approaches</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="flowchart-container">
                                <h6 class="text-center mb-3">Header Bidding Flow</h6>
                                <div class="mermaid">
                                    flowchart TD
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
                                        style L fill:#e8f5e8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Identity Resolution & Privacy Challenges",
            content: `
            <div class="card mb-5">
                <div class="card-body">
                    <h3 class="card-title">Identity Resolution & Privacy Challenges</h3>
                    <span class="level-indicator level-expert">Expert</span>
                    
                    <div class="row mt-4">
                        <div class="col-lg-6">
                            <h5>The Cookie Deprecation Challenge</h5>
                            <p>With third-party cookies being phased out by major browsers, the ad tech industry is developing new ways to identify users while respecting privacy.</p>
                            
                            <h6 class="mt-4">Key Privacy Regulations</h6>
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <div class="card border-primary">
                                        <div class="card-body p-3">
                                            <h6 class="card-title text-primary">GDPR (EU)</h6>
                                            <p class="card-text small">Requires explicit consent for data collection</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card border-success">
                                        <div class="card-body p-3">
                                            <h6 class="card-title text-success">CCPA/CPRA (California)</h6>
                                            <p class="card-text small">Gives users rights over their personal data</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card border-warning">
                                        <div class="card-body p-3">
                                            <h6 class="card-title text-warning">LGPD (Brazil)</h6>
                                            <p class="card-text small">Similar to GDPR but with some differences</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card border-info">
                                        <div class="card-body p-3">
                                            <h6 class="card-title text-info">Other Regional Laws</h6>
                                            <p class="card-text small">PIPEDA (Canada), POPI (South Africa), etc.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="alert alert-info mt-3">
                                <i class="fas fa-shield-alt me-2" aria-hidden="true"></i> 
                                Privacy regulations continue to evolve globally, requiring ad tech companies to build adaptable compliance systems.
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h5>Identity Solutions in a Post-Cookie World</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover">
                                    <caption class="caption-top">Emerging identity solutions for the post-cookie era</caption>
                                    <thead class="table-primary">
                                        <tr>
                                            <th scope="col">Solution Type</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Examples</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>First-Party IDs</strong></td>
                                            <td>Publisher-specific identifiers</td>
                                            <td>Login/CRM data</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Universal ID Solutions</strong></td>
                                            <td>Shared identity frameworks</td>
                                            <td>UID 2.0, ID5</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Contextual Targeting</strong></td>
                                            <td>Content-based, not user-based</td>
                                            <td>Page content analysis</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Google Privacy Sandbox</strong></td>
                                            <td>Chrome's privacy-preserving API framework</td>
                                            <td>Topics API, FLEDGE</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Data Clean Rooms</strong></td>
                                            <td>Secure environments for data collaboration</td>
                                            <td>InfoSum, LiveRamp</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Advanced Attribution Models",
            content: `
            <h3 class="mb-4">Advanced Attribution Models</h3>
            <div class="row g-4 mb-5">
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-route fa-3x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Multi-Touch Attribution</h5>
                            <p class="card-text">Models that distribute credit for a conversion across multiple touchpoints in the customer journey.</p>
                            
                            <h6 class="mt-3">Common Multi-Touch Models</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="badge bg-primary me-2">Linear</span>
                                    Equal credit to all touchpoints
                                </li>
                                <li class="mb-2">
                                    <span class="badge bg-success me-2">Time Decay</span>
                                    More credit to recent touchpoints
                                </li>
                                <li class="mb-2">
                                    <span class="badge bg-warning me-2">U-Shaped</span>
                                    40% first/last, 20% middle
                                </li>
                                <li class="mb-2">
                                    <span class="badge bg-info me-2">W-Shaped</span>
                                    Emphasizes key touchpoints
                                </li>
                                <li class="mb-2">
                                    <span class="badge bg-secondary me-2">Data-Driven</span>
                                    Algorithmic weighting
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-chart-line fa-3x text-success" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Incrementality & Lift Measurement</h5>
                            <p class="card-text">Methods to measure the true incremental impact of advertising by comparing exposed versus unexposed groups.</p>
                            
                            <h6 class="mt-3">Testing Methodologies</h6>
                            <div class="accordion" id="testingAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="rctHeading">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rctCollapse">
                                            Randomized Control Trials
                                        </button>
                                    </h2>
                                    <div id="rctCollapse" class="accordion-collapse collapse" data-bs-parent="#testingAccordion">
                                        <div class="accordion-body">
                                            Gold standard method, randomly assigning users to test/control groups for unbiased measurement.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="ghostHeading">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ghostCollapse">
                                            Ghost Bids & PSA Testing
                                        </button>
                                    </h2>
                                    <div id="ghostCollapse" class="accordion-collapse collapse" data-bs-parent="#testingAccordion">
                                        <div class="accordion-body">
                                            Simulating winning auctions without showing ads, or using public service announcements for control groups.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="geoHeading">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#geoCollapse">
                                            Geo & Hold-Out Testing
                                        </button>
                                    </h2>
                                    <div id="geoCollapse" class="accordion-collapse collapse" data-bs-parent="#testingAccordion">
                                        <div class="accordion-body">
                                            Comparing performance across geographic regions or withholding ads from audience segments.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="alert alert-success mt-3">
                                <i class="fas fa-chart-line me-2" aria-hidden="true"></i> 
                                Incrementality testing helps advertisers understand the true ROI of their campaigns beyond correlation.
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Current & Emerging Ad Tech Trends",
            content: `
            <h3 class="mb-4">Current & Emerging Ad Tech Trends</h3>
            <div class="row g-4 mb-5">
                <div class="col-lg-4">
                    <div class="card h-100 border-primary">
                        <div class="card-header bg-primary text-white">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-robot me-3" style="font-size: 1.5rem;"></i>
                                <h5 class="mb-0">AI & Machine Learning</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Advanced algorithms that optimize bidding strategies, creative performance, and audience targeting in real-time.</p>
                            
                            <h6 class="mt-3">Key Applications:</h6>
                            <div class="row g-2">
                                <div class="col-6">
                                    <div class="feature-card p-2 border rounded text-center">
                                        <i class="fas fa-brain text-primary mb-1"></i>
                                        <small class="d-block">Predictive Analytics</small>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="feature-card p-2 border rounded text-center">
                                        <i class="fas fa-magic text-primary mb-1"></i>
                                        <small class="d-block">Dynamic Creative</small>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="feature-card p-2 border rounded text-center">
                                        <i class="fas fa-shield-alt text-primary mb-1"></i>
                                        <small class="d-block">Fraud Detection</small>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="feature-card p-2 border rounded text-center">
                                        <i class="fas fa-users text-primary mb-1"></i>
                                        <small class="d-block">Audience Modeling</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100 border-success">
                        <div class="card-header bg-success text-white">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-tv me-3" style="font-size: 1.5rem;"></i>
                                <h5 class="mb-0">Connected TV & OTT</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">The shift of television viewing to internet-connected devices, creating new opportunities for targeted and measurable TV advertising.</p>
                            
                            <h6 class="mt-3">Key Features:</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="fas fa-bullseye text-success me-2"></i>
                                    Advanced audience targeting beyond age/gender
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-robot text-success me-2"></i>
                                    Programmatic buying for TV inventory
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-mobile-alt text-success me-2"></i>
                                    Cross-device measurement and attribution
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-hand-pointer text-success me-2"></i>
                                    Interactive ad formats not possible in linear TV
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100 border-warning">
                        <div class="card-header bg-warning text-dark">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shopping-cart me-3" style="font-size: 1.5rem;"></i>
                                <h5 class="mb-0">Retail Media Networks</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Advertising platforms built by retailers that allow brands to reach shoppers using the retailer's first-party customer data.</p>
                            
                            <h6 class="mt-3">Leading Examples:</h6>
                            <div class="d-flex flex-wrap gap-2">
                                <span class="badge bg-warning text-dark">Amazon Advertising</span>
                                <span class="badge bg-primary">Walmart Connect</span>
                                <span class="badge bg-danger">Target Roundel</span>
                                <span class="badge bg-success">Instacart Ads</span>
                                <span class="badge bg-info">Kroger Precision Marketing</span>
                                <span class="badge bg-secondary">Home Depot</span>
                            </div>
                            
                            <div class="alert alert-warning mt-3 p-2">
                                <i class="fas fa-lightbulb me-2"></i> 
                                <small>Retail media combines the power of intent data with closed-loop measurement.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-crystal-ball me-2 text-primary"></i>
                        Future Trends to Watch
                    </h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Web3 & Blockchain:</strong> Decentralized advertising platforms and NFT-based campaigns</li>
                                <li><strong>Voice Commerce:</strong> Shopping and advertising through voice assistants</li>
                                <li><strong>Augmented Reality Ads:</strong> Immersive AR experiences for product visualization</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>5G-Powered Experiences:</strong> Faster, richer mobile advertising formats</li>
                                <li><strong>Edge Computing:</strong> Faster ad serving and real-time personalization</li>
                                <li><strong>Sustainability Metrics:</strong> Carbon footprint tracking in media buying</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center">
                <button class="btn btn-primary btn-lg" id="toQuizBtn">
                    <i class="fas fa-question-circle me-2" aria-hidden="true"></i>Test Your Knowledge
                </button>
            </div>`
        }
    ]
};
