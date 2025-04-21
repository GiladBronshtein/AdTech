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
                                <i class="fas fa-exclamation-triangle me-2" aria-hidden="true"></i> Header bidding can add latency to page load times if not properly implemented.
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="flowchart-container">
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
                                </div>
                            </div>
                            <div class="mt-3">
                                <h5>Types of Header Bidding</h5>
                                <ul>
                                    <li><strong>Client-side:</strong> Runs in the user's browser</li>
                                    <li><strong>Server-side:</strong> Runs on a server to reduce latency</li>
                                    <li><strong>Hybrid:</strong> Combines both approaches</li>
                                </ul>
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
                            <ul>
                                <li><strong>GDPR (EU):</strong> Requires explicit consent for data collection</li>
                                <li><strong>CCPA/CPRA (California):</strong> Gives users rights over their personal data</li>
                                <li><strong>LGPD (Brazil):</strong> Similar to GDPR but with some differences</li>
                                <li><strong>Other Regional Laws:</strong> PIPEDA (Canada), POPI (South Africa), etc.</li>
                            </ul>
                            
                            <div class="alert alert-info mt-3">
                                <i class="fas fa-shield-alt me-2" aria-hidden="true"></i> Privacy regulations continue to evolve globally, requiring ad tech companies to build adaptable compliance systems.
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h5>Identity Solutions in a Post-Cookie World</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <caption>Emerging identity solutions for the post-cookie era</caption>
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Solution Type</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Examples</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>First-Party IDs</td>
                                            <td>Publisher-specific identifiers</td>
                                            <td>Login/CRM data</td>
                                        </tr>
                                        <tr>
                                            <td>Universal ID Solutions</td>
                                            <td>Shared identity frameworks</td>
                                            <td>UID 2.0, ID5</td>
                                        </tr>
                                        <tr>
                                            <td>Contextual Targeting</td>
                                            <td>Content-based, not user-based</td>
                                            <td>Page content analysis</td>
                                        </tr>
                                        <tr>
                                            <td>Google Privacy Sandbox</td>
                                            <td>Chrome's privacy-preserving API framework</td>
                                            <td>Topics API, FLEDGE</td>
                                        </tr>
                                        <tr>
                                            <td>Data Clean Rooms</td>
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
                            <h5 class="card-title">Multi-Touch Attribution</h5>
                            <p class="card-text">Models that distribute credit for a conversion across multiple touchpoints in the customer journey.</p>
                            
                            <h6 class="mt-3">Common Multi-Touch Models</h6>
                            <ul>
                                <li><strong>Linear:</strong> Equal credit to all touchpoints</li>
                                <li><strong>Time Decay:</strong> More credit to more recent touchpoints</li>
                                <li><strong>U-Shaped:</strong> 40% to first and last touch, 20% to middle</li>
                                <li><strong>W-Shaped:</strong> Emphasizes first, lead creation, and final touchpoints</li>
                                <li><strong>Data-Driven:</strong> Algorithmic weighting based on historical patterns</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Incrementality & Lift Measurement</h5>
                            <p class="card-text">Methods to measure the true incremental impact of advertising by comparing exposed versus unexposed groups.</p>
                            
                            <h6 class="mt-3">Testing Methodologies</h6>
                            <ul>
                                <li><strong>Randomized Control Trials:</strong> Gold standard, randomly assigning users to test/control groups</li>
                                <li><strong>Ghost Bids:</strong> Simulating winning auctions without actually showing ads</li>
                                <li><strong>PSA Testing:</strong> Using public service announcements for control groups</li>
                                <li><strong>Geo Testing:</strong> Comparing performance across different geographic regions</li>
                                <li><strong>Hold-Out Testing:</strong> Withholding ads from a segment of the audience</li>
                            </ul>
                            <div class="alert alert-success mt-3">
                                <i class="fas fa-chart-line me-2" aria-hidden="true"></i> Incrementality testing helps advertisers understand the true ROI of their campaigns beyond correlation.
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
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-robot text-primary me-3" aria-hidden="true" style="font-size: 2rem;"></i>
                                <h5 class="card-title mb-0">AI & Machine Learning</h5>
                            </div>
                            <p class="card-text">Advanced algorithms that optimize bidding strategies, creative performance, and audience targeting in real-time.</p>
                            <h6 class="mt-3">Key Applications:</h6>
                            <ul>
                                <li>Predictive analytics for bid optimization</li>
                                <li>Dynamic creative optimization</li>
                                <li>Fraud detection and prevention</li>
                                <li>Audience segmentation and lookalike modeling</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-tv text-primary me-3" aria-hidden="true" style="font-size: 2rem;"></i>
                                <h5 class="card-title mb-0">Connected TV & OTT</h5>
                            </div>
                            <p class="card-text">The shift of television viewing to internet-connected devices, creating new opportunities for targeted and measurable TV advertising.</p>
                            <h6 class="mt-3">Key Features:</h6>
                            <ul>
                                <li>Advanced audience targeting beyond age/gender</li>
                                <li>Programmatic buying for TV inventory</li>
                                <li>Cross-device measurement and attribution</li>
                                <li>Interactive ad formats not possible in linear TV</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-shopping-cart text-primary me-3" aria-hidden="true" style="font-size: 2rem;"></i>
                                <h5 class="card-title mb-0">Retail Media Networks</h5>
                            </div>
                            <p class="card-text">Advertising platforms built by retailers that allow brands to reach shoppers using the retailer's first-party customer data.</p>
                            <h6 class="mt-3">Leading Examples:</h6>
                            <ul>
                                <li>Amazon Advertising</li>
                                <li>Walmart Connect</li>
                                <li>Target Roundel</li>
                                <li>Instacart Ads</li>
                            </ul>
                            <div class="alert alert-primary mt-3 small">
                                <i class="fas fa-lightbulb me-2" aria-hidden="true"></i> Retail media combines the power of intent data with closed-loop measurement.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mb-5">
                <button class="btn btn-primary" id="toQuizBtn">
                    <i class="fas fa-question-circle me-2" aria-hidden="true"></i>Test Your Knowledge
                </button>
            </div>`
        }
    ]
};