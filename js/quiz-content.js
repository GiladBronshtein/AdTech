// Quiz section content
const quizContent = {
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
};