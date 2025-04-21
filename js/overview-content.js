// Overview section content
const overviewContent = {
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
                                    <i class="fas fa-store" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Demand Side</h5>
                                <p class="card-text">The side of advertisers looking to buy ad space, including brands, agencies, and the platforms they use to purchase advertising.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
                                    <i class="fas fa-newspaper" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Supply Side</h5>
                                <p class="card-text">The side of publishers offering ad space for sale, including websites, apps, and the platforms they use to sell their inventory.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
                                    <i class="fas fa-exchange-alt" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Marketplace</h5>
                                <p class="card-text">The technologies and platforms that facilitate the buying and selling of advertising through auctions and direct deals.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
                                    <i class="fas fa-database" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Data & Targeting</h5>
                                <p class="card-text">The collection, management, and application of data to target specific audiences with relevant advertising.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
                                    <i class="fas fa-chart-line" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Measurement & Analytics</h5>
                                <p class="card-text">The tools and methods used to track, measure, and analyze the performance and effectiveness of advertising campaigns.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
                                    <i class="fas fa-ad" aria-hidden="true"></i>
                                </div>
                                <h5 class="card-title text-center">Ad Serving & Creative</h5>
                                <p class="card-text">The technologies responsible for delivering ads to users and the creative formats and specifications for digital advertisements.</p>
                                <div class="d-flex justify-content-center flex-wrap">
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
};