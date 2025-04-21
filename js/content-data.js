// Main content data module that aggregates all content
const contentData = {
    // Check if the modules are loaded properly before accessing them
    get overview() {
        return typeof overviewContent !== 'undefined' ? overviewContent : {};
    },
    get beginner() {
        return typeof beginnerContent !== 'undefined' ? beginnerContent : {};
    },
    get intermediate() {
        return typeof intermediateContent !== 'undefined' ? intermediateContent : {};
    },
    get expert() {
        return typeof expertContent !== 'undefined' ? expertContent : {};
    },
    get quiz() {
        return typeof quizContent !== 'undefined' ? quizContent : {};
    },
    get glossary() {
        return typeof glossaryContent !== 'undefined' ? glossaryContent : {};
    }
};