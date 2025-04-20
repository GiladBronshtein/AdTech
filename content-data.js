// Structure of the content data for each section
const contentData = {
    overview: {
        title: "The Ad Tech Ecosystem",
        intro: `
            <div class="row mb-5">
                <div class="col-md-6">
                    <p>The <strong>Ad Tech</strong> (Advertising Technology) ecosystem is a complex network of platforms, tools, and technologies that enable and manage digital advertising. From the moment an advertiser decides to run a campaign to when an ad appears on a user's screen, numerous technologies work together to make this happen in milliseconds.</p>
                    <p>This learning platform will take you through the entire Ad Tech ecosystem from basic concepts to expert-level understanding, with interactive elements and visualizations to make learning easier.</p>
                    <div class="d-grid gap-2 d-md-block mt-4">
                        <button class="btn btn-primary" id="beginnerBtn">Start with Basics</button>
                        <button class="btn btn-outline-primary" id="showRoadmapBtn" data-bs-toggle="modal" data-bs-target="#roadmapModal">Learning Roadmap</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="flowchart-container">
                        <h5 class="mb-3 text-center">Ad Tech Ecosystem Overview</h5>
                        <div class="mermaid">
                            graph TD
                                A[Advertiser] -->|Campaign| B[Ad Agency/Trading Desk]
                                B -->|Campaign Setup| C[DSP - Demand Side Platform]
                                C -->|Bid Request| D[Ad Exchange]
                                E[Publisher] -->|Ad Inventory| F[SSP - Supply Side Platform]
                                F -->|Inventory| D
                                D -->|Winning Bid| G[Ad Serving]
                                G -->|Ad Creative| H[User's Device]
                                I[Data Management Platform] -.->|Audience Data| C
                                I -.->|User Data| F
                                J[Verification & Measurement] -.->|Analytics| A
                        </div>
                    </div>
                </div>
            </div>
        `,
        components: [
            {
                title: "Core Components of Ad Tech",
                content: `
                    <div class="row g-4">
                        <!-- Component 1 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-store"></i>
                                    </div>
                                    <h5 class="card-title text-center">Demand Side</h5>
                                    <p class="card-text">The side of advertisers looking to buy ad space, including brands, agencies, and the platforms they use to purchase advertising.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">DSPs</span>
                                        <span class="concept-badge">Ad Agencies</span>
                                        <span class="concept-badge">Brands</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Component 2 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-newspaper"></i>
                                    </div>
                                    <h5 class="card-title text-center">Supply Side</h5>
                                    <p class="card-text">The side of publishers offering ad space for sale, including websites, apps, and the platforms they use to sell their inventory.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">SSPs</span>
                                        <span class="concept-badge">Publishers</span>
                                        <span class="concept-badge">Ad Networks</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Component 3 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-exchange-alt"></i>
                                    </div>
                                    <h5 class="card-title text-center">Marketplace</h5>
                                    <p class="card-text">The technologies and platforms that facilitate the buying and selling of advertising through auctions and direct deals.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">Ad Exchanges</span>
                                        <span class="concept-badge">RTB</span>
                                        <span class="concept-badge">Programmatic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Component 4 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-database"></i>
                                    </div>
                                    <h5 class="card-title text-center">Data & Targeting</h5>
                                    <p class="card-text">The collection, management, and application of data to target specific audiences with relevant advertising.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">DMPs</span>
                                        <span class="concept-badge">CDPs</span>
                                        <span class="concept-badge">Cookies</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Component 5 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <h5 class="card-title text-center">Measurement & Analytics</h5>
                                    <p class="card-text">The tools and methods used to track, measure, and analyze the performance and effectiveness of advertising campaigns.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">Attribution</span>
                                        <span class="concept-badge">Analytics</span>
                                        <span class="concept-badge">Verification</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Component 6 -->
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="text-center feature-icon">
                                        <i class="fas fa-ad"></i>
                                    </div>
                                    <h5 class="card-title text-center">Ad Serving & Creative</h5>
                                    <p class="card-text">The technologies responsible for delivering ads to users and the creative formats and specifications for digital advertisements.</p>
                                    <div class="d-flex justify-content-center">
                                        <span class="concept-badge">Ad Servers</span>
                                        <span class="concept-badge">Rich Media</span>
                                        <span class="concept-badge">Creative Formats</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    beginner: {
        title: "Ad Tech Fundamentals",
        intro: `<p class="lead mb-5">Start your Ad Tech journey by understanding the basic concepts and key players in the ecosystem.</p>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h4 class="card-title">What is Ad Tech?</h4>
                                <span class="level-indicator level-beginner">Beginner</span>
                                <p>Advertising Technology (Ad Tech) refers to the software and tools that help agencies and brands target, deliver, and analyze their digital advertising efforts.</p>
                                <p>Ad Tech has revolutionized how advertising is bought, sold, delivered, and measured online, making it more efficient, targeted, and data-driven.</p>
                                <div class="mt-4">
                                    <h5>Key Benefits of Ad Tech:</h5>
                                    <ul>
                                        <li><strong>Automation:</strong> Reduces manual work in buying and selling ads</li>
                                        <li><strong>Targeting:</strong> Reaches specific audiences based on various data points</li>
                                        <li><strong>Efficiency:</strong> Optimizes ad spend and performance in real-time</li>
                                        <li><strong>Measurement:</strong> Provides detailed analytics on campaign performance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h4 class="card-title">Traditional vs. Programmatic Advertising</h4>
                                <span class="level-indicator level-beginner">Beginner</span>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Traditional Advertising</th>
                                                <th>Programmatic Advertising</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Manual negotiation and insertion orders</td>
                                                <td>Automated buying through platforms</td>
                                            </tr>
                                            <tr>
                                                <td>Fixed pricing models</td>
                                                <td>Dynamic auction-based pricing</td>
                                            </tr>
                                            <tr>
                                                <td>Limited targeting options</td>
                                                <td>Advanced audience targeting</td>
                                            </tr>
                                            <tr>
                                                <td>Campaign setup takes days/weeks</td>
                                                <td>Campaigns can launch in minutes</td>
                                            </tr>
                                            <tr>
                                                <td>Basic reporting metrics</td>
                                                <td>Comprehensive real-time analytics</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
        sections: [
            {
                title: "Key Players in the Ad Tech Ecosystem",
                content: `
                <div class="row g-4 mb-5">
                    <!-- Player 1 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Advertisers</h5>
                                <p class="card-text">Brands, companies, or individuals looking to promote their products or services through digital advertising. They are the ones who fund the entire ecosystem.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#advertiserCollapse">Learn More</button>
                                <div class="collapse mt-3" id="advertiserCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Goals:</strong> Reach target audiences, increase brand awareness, drive sales/conversions</p>
                                        <p><strong>Metrics they care about:</strong> ROI, ROAS, CPA, CTR, Conversions, Brand Lift</p>
                                        <p><strong>Examples:</strong> Consumer brands (Nike, Coca-Cola), B2B companies, local businesses, e-commerce stores</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Player 2 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Publishers</h5>
                                <p class="card-text">Websites, apps, or any digital properties that have space available to display advertisements. They monetize their content by selling ad space.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#publisherCollapse">Learn More</button>
                                <div class="collapse mt-3" id="publisherCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Goals:</strong> Maximize revenue while maintaining good user experience</p>
                                        <p><strong>Metrics they care about:</strong> eCPM, Fill Rate, Viewability, Revenue per User</p>
                                        <p><strong>Examples:</strong> News sites (CNN, NYT), blogs, mobile apps, social media platforms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Player 3 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Ad Agencies & Trading Desks</h5>
                                <p class="card-text">Companies that help advertisers plan, create, and manage their advertising campaigns, often specializing in media buying and strategy.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#agencyCollapse">Learn More</button>
                                <div class="collapse mt-3" id="agencyCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Goals:</strong> Deliver results for clients, optimize campaign performance</p>
                                        <p><strong>Services:</strong> Media planning, creative development, campaign management, analytics</p>
                                        <p><strong>Examples:</strong> WPP, Omnicom, Publicis, independent digital agencies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Player 4 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Demand-Side Platforms (DSPs)</h5>
                                <p class="card-text">Technology platforms that allow advertisers and agencies to buy ad inventory from multiple sources through a single interface.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#dspCollapse">Learn More</button>
                                <div class="collapse mt-3" id="dspCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Key features:</strong> Audience targeting, real-time bidding capabilities, campaign optimization</p>
                                        <p><strong>Benefits:</strong> Centralized buying, efficiency, advanced targeting, reporting</p>
                                        <p><strong>Examples:</strong> The Trade Desk, DV360 (Google), Amazon DSP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Player 5 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Supply-Side Platforms (SSPs)</h5>
                                <p class="card-text">Technology platforms that help publishers manage and sell their ad inventory, often through automated auctions to maximize revenue.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#sspCollapse">Learn More</button>
                                <div class="collapse mt-3" id="sspCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Key features:</strong> Yield optimization, header bidding integration, price floor management</p>
                                        <p><strong>Benefits:</strong> Maximized ad revenue, access to multiple demand sources, advanced analytics</p>
                                        <p><strong>Examples:</strong> Google Ad Manager, Magnite, PubMatic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Player 6 -->
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Ad Exchanges</h5>
                                <p class="card-text">Digital marketplaces where advertisers and publishers buy and sell ad space, often through real-time auctions.</p>
                                <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#exchangeCollapse">Learn More</button>
                                <div class="collapse mt-3" id="exchangeCollapse">
                                    <div class="card card-body bg-light">
                                        <p><strong>Role:</strong> Connect buyers and sellers of digital ad inventory</p>
                                        <p><strong>Process:</strong> Facilitate real-time bidding (RTB) auctions</p>
                                        <p><strong>Examples:</strong> Google Ad Exchange, OpenX, Xandr</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            {
                title: "How Digital Ads Reach Users",
                content: `
                <div class="flowchart-container mb-5">
                    <h3 class="mb-3 text-center">How Digital Ads Reach Users</h3>
                    <p class="text-center mb-4">A simplified view of how ads are delivered to users in real-time</p>
                    <div class="mermaid">
                        sequenceDiagram
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
                            Publisher->>User: Show ad to user
                    </div>
                    <div class="text-center mt-4">
                        <small class="text-muted">This entire process happens in milliseconds</small>
                    </div>
                </div>`
            },
            {
                title: "Common Digital Ad Formats",
                content: `
                <div class="row g-4 mb-5">
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="./images/riselogo-blue-1.svg" class="card-img-top" alt="Display Ads">
                            <div class="card-body">
                                <h5 class="card-title">Display Ads</h5>
                                <p class="card-text">Image-based advertisements that appear on websites, including banners, rectangles, and skyscrapers.</p>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Standard IAB sizes</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Static or animated images</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>HTML5 interactive elements</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="./images/riselogo-blue-1.svg" class="card-img-top" alt="Video Ads">
                            <div class="card-body">
                                <h5 class="card-title">Video Ads</h5>
                                <p class="card-text">Video-based advertisements that play before, during, or after video content, or as standalone units.</p>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Pre-roll, mid-roll, post-roll</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>In-stream and out-stream formats</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Various lengths (6s, 15s, 30s, etc.)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="./images/riselogo-blue-1.svg" class="card-img-top" alt="Native Ads">
                            <div class="card-body">
                                <h5 class="card-title">Native Ads</h5>
                                <p class="card-text">Advertisements that match the look, feel, and function of the media format in which they appear.</p>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Blends with organic content</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>Sponsored content/advertorials</li>
                                    <li><i class="fas fa-check-circle text-success me-2"></i>In-feed social media ads</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            {
                title: "Essential Ad Tech Metrics",
                content: `
                <div class="table-responsive mb-5">
                    <table class="table table-striped table-hover">
                        <thead class="table-primary">
                            <tr>
                                <th>Metric</th>
                                <th>Definition</th>
                                <th>Formula</th>
                                <th>Used By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>CTR</strong> (Click-Through Rate)</td>
                                <td>Percentage of impressions that resulted in a click</td>
                                <td>(Clicks / Impressions) × 100</td>
                                <td>Advertisers, Publishers</td>
                            </tr>
                            <tr>
                                <td><strong>CPC</strong> (Cost Per Click)</td>
                                <td>Average cost paid for each click</td>
                                <td>Total Cost / Number of Clicks</td>
                                <td>Advertisers</td>
                            </tr>
                            <tr>
                                <td><strong>CPM</strong> (Cost Per Mille)</td>
                                <td>Cost per thousand impressions</td>
                                <td>(Total Cost / Impressions) × 1000</td>
                                <td>Advertisers, Publishers</td>
                            </tr>
                            <tr>
                                <td><strong>CPA</strong> (Cost Per Acquisition)</td>
                                <td>Cost to acquire one customer or conversion</td>
                                <td>Total Cost / Number of Acquisitions</td>
                                <td>Advertisers</td>
                            </tr>
                            <tr>
                                <td><strong>Viewability</strong></td>
                                <td>Percentage of impressions that were actually viewable</td>
                                <td>(Viewable Impressions / Total Impressions) × 100</td>
                                <td>Advertisers, Publishers</td>
                            </tr>
                            <tr>
                                <td><strong>Conversion Rate</strong></td>
                                <td>Percentage of clicks that resulted in a desired action</td>
                                <td>(Conversions / Clicks) × 100</td>
                                <td>Advertisers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mb-5">
                    <button class="btn btn-primary" id="toIntermediateBtn">
                        <i class="fas fa-arrow-right me-2"></i>Continue to Intermediate Level
                    </button>
                </div>`
            }
        ]
    },
    intermediate: {
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
                <div class="flowchart-container mb-5">
                    <h3 class="mb-3 text-center">Real-Time Bidding (RTB) Process</h3>
                    <p class="text-center mb-4">A detailed look at how RTB works in the programmatic ecosystem</p>
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
                            <i class="fas fa-info-circle me-2"></i> This entire RTB process takes place in less than 100 milliseconds!
                        </div>
                    </div>
                </div>`
            },
            {
                title: "Advanced Targeting Methods",
                content: `
                <h3 class="mb-4">Advanced Targeting Methods</h3>
                <div class="row g-4 mb-5">
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Contextual Targeting</h5>
                                <p class="card-text">Displays ads based on the content of the webpage rather than user data. Matches ads to relevant content environments.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-success">Privacy-Friendly</span>
                                    <span class="badge bg-info">Content-Based</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Behavioral Targeting</h5>
                                <p class="card-text">Shows ads based on a user's past browsing behavior, website visits, clicks, and interactions across the web.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-warning">Cookie-Dependent</span>
                                    <span class="badge bg-info">User-Based</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Demographic Targeting</h5>
                                <p class="card-text">Targets users based on demographics like age, gender, income level, education, and other personal attributes.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-info">User-Based</span>
                                    <span class="badge bg-secondary">Statistical</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Geotargeting</h5>
                                <p class="card-text">Delivers ads to users based on their geographic location, from broad regions down to specific zip codes or even near specific locations.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-info">Location-Based</span>
                                    <span class="badge bg-success">High-Intent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Retargeting</h5>
                                <p class="card-text">Shows ads to users who have previously visited an advertiser's website or interacted with their brand but didn't convert.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-warning">Cookie-Dependent</span>
                                    <span class="badge bg-success">High-Intent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Lookalike Targeting</h5>
                                <p class="card-text">Finds new users who share similar characteristics to an advertiser's existing customers or high-value audience segments.</p>
                                <div class="mt-auto">
                                    <span class="badge bg-info">AI-Powered</span>
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
                <h3 class="mb-4">Data Flow in Ad Tech</h3>
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
                    </div>
                    <div class="mt-4">
                        <h5>Key Data Types in Ad Tech</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <h6><i class="fas fa-database me-2 text-primary"></i>First-Party Data</h6>
                                <p>Data collected directly from your audience or customers, such as website behavior, purchase history, and CRM data.</p>
                            </div>
                            <div class="col-md-4">
                                <h6><i class="fas fa-handshake me-2 text-primary"></i>Second-Party Data</h6>
                                <p>First-party data acquired directly from a trusted partner, often through data-sharing agreements.</p>
                            </div>
                            <div class="col-md-4">
                                <h6><i class="fas fa-globe me-2 text-primary"></i>Third-Party Data</h6>
                                <p>Data collected by entities that don't have direct relationships with users, often aggregated from various sources.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mb-5">
                    <button class="btn btn-primary" id="toExpertBtn">
                        <i class="fas fa-arrow-right me-2"></i>Continue to Expert Level
                    </button>
                </div>`
            }
        ]
    },
    expert: {
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
                                    <i class="fas fa-exclamation-triangle me-2"></i> Header bidding can add latency to page load times if not properly implemented.
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
                                    <i class="fas fa-shield-alt me-2"></i> Privacy regulations continue to evolve globally, requiring ad tech companies to build adaptable compliance systems.
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h5>Identity Solutions in a Post-Cookie World</h5>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Solution Type</th>
                                                <th>Description</th>
                                                <th>Examples</th>
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
                                    <i class="fas fa-chart-line me-2"></i> Incrementality testing helps advertisers understand the true ROI of their campaigns beyond correlation.
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
                                    <i class="fas fa-robot text-primary me-3" style="font-size: 2rem;"></i>
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
                                    <i class="fas fa-tv text-primary me-3" style="font-size: 2rem;"></i>
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
                                    <i class="fas fa-shopping-cart text-primary me-3" style="font-size: 2rem;"></i>
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
                                    <i class="fas fa-lightbulb me-2"></i> Retail media combines the power of intent data with closed-loop measurement.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mb-5">
                    <button class="btn btn-primary" id="toQuizBtn">
                        <i class="fas fa-question-circle me-2"></i>Test Your Knowledge
                    </button>
                </div>`
            }
        ]
    },
    quiz: {
        beginner: {
            title: "Ad Tech Basics Quiz",
            questions: [
                {
                    question: "What does DSP stand for in Ad Tech?",
                    options: ["Demand-Side Platform", "Digital Service Provider", "Data Supply Platform", "Display Selling Platform"],
                    correctIndex: 0
                },
                {
                    question: "Which of the following is NOT a common digital ad format?",
                    options: ["Display Banner", "Native Ad", "Video Ad", "Analog Ad"],
                    correctIndex: 3
                },
                {
                    question: "What does CPM stand for?",
                    options: ["Cost Per Million", "Cost Per Mille (thousand)", "Cost Per Metric", "Click Per Minute"],
                    correctIndex: 1
                },
                {
                    question: "Which side of the ad tech ecosystem do publishers belong to?",
                    options: ["Demand Side", "Supply Side", "Data Side", "Creative Side"],
                    correctIndex: 1
                },
                {
                    question: "What is programmatic advertising?",
                    options: ["Manual buying of ads through sales representatives", "Coding ads to appear in software programs", "Automated buying and selling of digital ads", "Creating ads with programming languages"],
                    correctIndex: 2
                }
            ]
        },
        intermediate: {
            title: "Programmatic & RTB Quiz",
            questions: [
                {
                    question: "What is Real-Time Bidding (RTB)?",
                    options: ["A manual negotiation process for ad space", "An auction-based system where ads are bought and sold on a per-impression basis in real-time", "A platform for scheduling future ad campaigns", "A method for determining the best time to show ads"],
                    correctIndex: 1
                },
                {
                    question: "Which of these is NOT a type of programmatic deal?",
                    options: ["Private Marketplace (PMP)", "Programmatic Guaranteed", "Preferred Deals", "Scheduled Placement"],
                    correctIndex: 3
                },
                {
                    question: "What is a DMP in ad tech?",
                    options: ["Digital Marketing Platform", "Display Management Program", "Data Management Platform", "Demand Matching Platform"],
                    correctIndex: 2
                },
                {
                    question: "Which targeting method shows ads based on the content of the webpage?",
                    options: ["Contextual Targeting", "Behavioral Targeting", "Demographic Targeting", "Retargeting"],
                    correctIndex: 0
                },
                {
                    question: "Approximately how long does the entire RTB process typically take?",
                    options: ["Several minutes", "1-2 seconds", "Less than 100 milliseconds", "10-15 seconds"],
                    correctIndex: 2
                }
            ]
        },
        expert: {
            title: "Advanced Ad Tech Quiz",
            questions: [
                {
                    question: "What is header bidding?",
                    options: ["A technique for creating eye-catching headlines in display ads", "The practice of placing ads in the header section of websites", "A technique that allows publishers to offer inventory to multiple SSPs simultaneously", "A method for bidding on the top position in search results"],
                    correctIndex: 2
                },
                {
                    question: "Which attribution model gives equal credit to all touchpoints in a conversion path?",
                    options: ["Last-click attribution", "Linear attribution", "Time-decay attribution", "First-click attribution"],
                    correctIndex: 1
                },
                {
                    question: "What is a \"walled garden\" in ad tech?",
                    options: ["A type of ad verification system", "An ad-free subscription service", "A closed ecosystem where the operator has control over applications, content, and media", "A security measure preventing ad fraud"],
                    correctIndex: 2
                },
                {
                    question: "What is a data clean room?",
                    options: ["A facility for physically cleaning data servers", "A process for removing invalid data from datasets", "A method for sanitizing data before analysis", "A secure environment where multiple parties can analyze combined datasets without exposing raw data"],
                    correctIndex: 3
                },
                {
                    question: "Which of the following is NOT a common approach to identity resolution in a cookieless world?",
                    options: ["Universal ID solutions", "Contextual targeting", "First-party data strategies", "Enhanced cookie tracking"],
                    correctIndex: 3
                }
            ]
        }
    },
    glossary: {
        a: [
            { term: "Ad Exchange", definition: "A digital marketplace that enables publishers and advertisers to buy and sell ad inventory, often through real-time auctions." },
            { term: "Ad Network", definition: "A company that connects advertisers to websites that want to host advertisements, aggregating ad inventory for easier buying." },
            { term: "Ad Server", definition: "Technology responsible for making decisions about what ads to show on a website, serving them, and collecting and reporting data about impressions, clicks, etc." },
            { term: "Ad Verification", definition: "The process of confirming that an ad was served in the intended location, to the intended audience, in a brand-safe environment." },
            { term: "Attribution", definition: "The process of identifying and assigning credit to marketing touchpoints that contribute to a conversion or sale." }
        ],
        b: [
            { term: "Behavioral Targeting", definition: "A technique used by advertisers to display relevant ads based on a user's previous browsing behavior, search history, purchase history, and other activities." },
            { term: "Bid Request", definition: "In programmatic advertising, a message sent from a publisher's supply-side platform to potential advertisers containing information about the ad impression, user, and context." },
            { term: "Brand Safety", definition: "Practices and tools designed to ensure that an ad does not appear in a context that could damage the advertiser's brand, such as next to offensive content." }
        ],
        c: [
            { term: "Click-Through Rate (CTR)", definition: "The ratio of users who click on a specific link to the number of total users who view an ad, expressed as a percentage." },
            { term: "Contextual Targeting", definition: "A form of targeted advertising where ads are displayed based on the content of the webpage rather than user data." },
            { term: "Conversion", definition: "The completion of a desired action by a website visitor, such as making a purchase, filling out a form, or signing up for a newsletter." },
            { term: "Cookie", definition: "A small piece of data sent from a website and stored on the user's computer by the web browser to remember information about the user." },
            { term: "Cost Per Action (CPA)", definition: "A pricing model where the advertiser pays for a specific action, such as a sale, lead, or click." },
            { term: "Cost Per Click (CPC)", definition: "A pricing model where the advertiser pays each time a user clicks on their ad." },
            { term: "Cost Per Mille (CPM)", definition: "A pricing model where the advertiser pays for one thousand impressions or views of their ad." }
        ],
        d: [
            { term: "Data Management Platform (DMP)", definition: "A platform that collects, organizes, and activates first-, second-, and third-party audience data from various sources." },
            { term: "Demand-Side Platform (DSP)", definition: "Software used by advertisers to buy ad inventory from multiple sources through a single interface, often with the ability to optimize based on various KPIs." },
            { term: "Dynamic Creative Optimization (DCO)", definition: "The process of automatically optimizing and personalizing ad creative elements based on data about the user and context." }
        ],
        p: [
            { term: "Programmatic Advertising", definition: "The automated buying and selling of digital advertising space using data and algorithms, often in real-time." },
            { term: "Programmatic Direct", definition: "A type of programmatic advertising where inventory is sold directly from publisher to advertiser at a fixed price with guaranteed impressions." },
            { term: "Private Marketplace (PMP)", definition: "An invitation-only RTB auction where premium publishers offer their inventory to a select group of advertisers." }
        ],
        r: [
            { term: "Real-Time Bidding (RTB)", definition: "A protocol that enables the buying and selling of individual ad impressions through real-time auctions that occur in the time it takes a webpage to load." },
            { term: "Retargeting", definition: "A form of online targeted advertising where ads are served to people who have already visited a website or shown interest in a product/service." }
        ],
        s: [
            { term: "Supply-Side Platform (SSP)", definition: "Technology that helps publishers sell their digital ad inventory automatically and efficiently, often through an auction process." },
            { term: "Second-Price Auction", definition: "An auction type commonly used in RTB where the winning bidder pays the price offered by the second-highest bidder plus a small increment." }
        ]
    }
};