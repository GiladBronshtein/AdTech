// Beginner section content
const beginnerContent = {
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
                                            <th scope="col">Traditional Advertising</th>
                                            <th scope="col">Programmatic Advertising</th>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#advertiserCollapse" aria-expanded="false" aria-controls="advertiserCollapse">Learn More</button>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#publisherCollapse" aria-expanded="false" aria-controls="publisherCollapse">Learn More</button>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#agencyCollapse" aria-expanded="false" aria-controls="agencyCollapse">Learn More</button>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#dspCollapse" aria-expanded="false" aria-controls="dspCollapse">Learn More</button>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#sspCollapse" aria-expanded="false" aria-controls="sspCollapse">Learn More</button>
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
                            <button class="btn btn-sm btn-outline-primary mt-2" data-bs-toggle="collapse" data-bs-target="#exchangeCollapse" aria-expanded="false" aria-controls="exchangeCollapse">Learn More</button>
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
                        <div class="card-body">
                            <h5 class="card-title">Display Ads</h5>
                            <p class="card-text">Image-based advertisements that appear on websites, including banners, rectangles, and skyscrapers.</p>
                            <div class="text-center mb-3">
                                <i class="fas fa-image fa-3x text-primary" aria-hidden="true"></i>
                            </div>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Standard IAB sizes</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Static or animated images</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>HTML5 interactive elements</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Video Ads</h5>
                            <p class="card-text">Video-based advertisements that play before, during, or after video content, or as standalone units.</p>
                            <div class="text-center mb-3">
                                <i class="fas fa-video fa-3x text-primary" aria-hidden="true"></i>
                            </div>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Pre-roll, mid-roll, post-roll</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>In-stream and out-stream formats</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Various lengths (6s, 15s, 30s, etc.)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Native Ads</h5>
                            <p class="card-text">Advertisements that match the look, feel, and function of the media format in which they appear.</p>
                            <div class="text-center mb-3">
                                <i class="fas fa-newspaper fa-3x text-primary" aria-hidden="true"></i>
                            </div>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Blends with organic content</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>Sponsored content/advertorials</li>
                                <li><i class="fas fa-check-circle text-success me-2" aria-hidden="true"></i>In-feed social media ads</li>
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
                    <caption>Common metrics used in digital advertising</caption>
                    <thead class="table-primary">
                        <tr>
                            <th scope="col">Metric</th>
                            <th scope="col">Definition</th>
                            <th scope="col">Formula</th>
                            <th scope="col">Used By</th>
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
                    <i class="fas fa-arrow-right me-2" aria-hidden="true"></i>Continue to Intermediate Level
                </button>
            </div>`
        }
    ]
};