// Intermediate section content
const intermediateContent = {
    title: "Programmatic Advertising & RTB",
    intro: `<p class="lead mb-5">Dive deeper into the mechanics of programmatic advertising and real-time bidding.</p>`,
    sections: [
        {
            title: "What is Programmatic Advertising?",
            content: `
            <div class="card mb-5">
                <div class="card-body">
                    <h3 class="card-title">What is Programmatic Advertising?</h3>
                    <span class="level-indicator level-intermediate">Intermediate</span>
                    <p>Programmatic advertising refers to the automated buying and selling of digital ad space using technology and algorithms, rather than traditional methods involving human negotiations and manual insertion orders.</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h5>Types of Programmatic Buying</h5>
                            <ul>
                                <li><strong>Real-Time Bidding (RTB):</strong> Auction-based buying where ads are sold on an impression-by-impression basis in real-time</li>
                                <li><strong>Programmatic Direct:</strong> Automated guaranteed buying with fixed pricing and reserved inventory</li>
                                <li><strong>Private Marketplace (PMP):</strong> Invitation-only RTB auctions where premium publishers offer inventory to select buyers</li>
                                <li><strong>Preferred Deals:</strong> Non-guaranteed deals with fixed pricing between specific buyers and sellers</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Key Components</h5>
                            <ul>
                                <li><strong>DSPs (Demand-Side Platforms):</strong> Tools used by advertisers to buy ad inventory</li>
                                <li><strong>SSPs (Supply-Side Platforms):</strong> Tools used by publishers to sell ad inventory</li>
                                <li><strong>Ad Exchanges:</strong> Digital marketplaces that facilitate the buying and selling process</li>
                                <li><strong>DMPs (Data Management Platforms):</strong> Systems that collect and manage audience data for targeting</li>
                                <li><strong>Ad Servers:</strong> Technology that stores ads and delivers them to users</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Real-Time Bidding (RTB) Process",
            content: `
            <div class="card mb-5">
                <div class="card-body">
                    <h3 class="mb-3 text-center">Real-Time Bidding (RTB) Process</h3>
                    <p class="text-center mb-4">A detailed look at how RTB works in the programmatic ecosystem</p>
                    
                    <div class="flowchart-container mb-4">
                        <div class="mermaid">
                            flowchart TD
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
                                style E fill:#f3e5f5
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h5>RTB Process Steps</h5>
                        <ol>
                            <li><strong>User Visit:</strong> A user visits a website or app with ad space</li>
                            <li><strong>Ad Request:</strong> The publisher's page generates an ad request</li>
                            <li><strong>Bid Request:</strong> The SSP sends a bid request to multiple DSPs via an ad exchange</li>
                            <li><strong>Data Evaluation:</strong> DSPs evaluate available user data (demographics, behavior, etc.)</li>
                            <li><strong>Bidding:</strong> DSPs determine if the impression matches advertiser criteria and what to bid</li>
                            <li><strong>Auction:</strong> The exchange conducts an auction and selects the winning bid</li>
                            <li><strong>Ad Serving:</strong> The winning advertiser's ad is served to the user</li>
                        </ol>
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2" aria-hidden="true"></i> This entire RTB process takes place in less than 100 milliseconds!
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Advanced Targeting Methods",
            content: `
            <div class="row g-4 mb-5">
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-align-left fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Contextual Targeting</h5>
                            <p class="card-text">Displays ads based on the content of the webpage rather than user data. Matches ads to relevant content environments.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-success mb-1">Privacy-Friendly</span>
                                <span class="badge bg-info">Content-Based</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-user-clock fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Behavioral Targeting</h5>
                            <p class="card-text">Shows ads based on a user's past browsing behavior, website visits, clicks, and interactions across the web.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-warning mb-1">Cookie-Dependent</span>
                                <span class="badge bg-info">User-Based</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-users fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Demographic Targeting</h5>
                            <p class="card-text">Targets users based on demographics like age, gender, income level, education, and other personal attributes.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-info mb-1">User-Based</span>
                                <span class="badge bg-secondary">Statistical</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-map-marker-alt fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Geotargeting</h5>
                            <p class="card-text">Delivers ads to users based on their geographic location, from broad regions down to specific zip codes or even near specific locations.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-info mb-1">Location-Based</span>
                                <span class="badge bg-success">High-Intent</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-redo fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Retargeting</h5>
                            <p class="card-text">Shows ads to users who have previously visited an advertiser's website or interacted with their brand but didn't convert.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-warning mb-1">Cookie-Dependent</span>
                                <span class="badge bg-success">High-Intent</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-search-plus fa-2x text-primary" aria-hidden="true"></i>
                            </div>
                            <h5 class="card-title text-center">Lookalike Targeting</h5>
                            <p class="card-text">Finds new users who share similar characteristics to an advertiser's existing customers or high-value audience segments.</p>
                            <div class="mt-auto text-center">
                                <span class="badge bg-info mb-1">AI-Powered</span>
                                <span class="badge bg-secondary">Predictive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            title: "Data Flow in Ad Tech",
            content: `
            <div class="flowchart-container mb-5">
                <div class="mermaid">
                    flowchart LR
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
                        style H fill:#fff3e0
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-title">
                                <i class="fas fa-database me-2 text-primary" aria-hidden="true"></i>
                                First-Party Data
                            </h6>
                            <p class="card-text">Data collected directly from your audience or customers, such as website behavior, purchase history, and CRM data.</p>
                            <div class="mt-auto">
                                <span class="badge bg-success">High Quality</span>
                                <span class="badge bg-info">Owned</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-title">
                                <i class="fas fa-handshake me-2 text-primary" aria-hidden="true"></i>
                                Second-Party Data
                            </h6>
                            <p class="card-text">First-party data acquired directly from a trusted partner, often through data-sharing agreements.</p>
                            <div class="mt-auto">
                                <span class="badge bg-warning">Partnership</span>
                                <span class="badge bg-info">Shared</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-title">
                                <i class="fas fa-globe me-2 text-primary" aria-hidden="true"></i>
                                Third-Party Data
                            </h6>
                            <p class="card-text">Data collected by entities that don't have direct relationships with users, often aggregated from various sources.</p>
                            <div class="mt-auto">
                                <span class="badge bg-secondary">External</span>
                                <span class="badge bg-danger">Deprecating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <button class="btn btn-primary btn-lg" id="toExpertBtn">
                    <i class="fas fa-arrow-right me-2" aria-hidden="true"></i>Continue to Expert Level
                </button>
            </div>`
        }
    ]
};
