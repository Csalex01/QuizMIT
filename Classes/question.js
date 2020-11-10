'use strict';

// Question class definition
class Question {

    // Class constructor
    // Parameters:
    // 1. The number of the question (number)
    // 2. The actual question (question extends QuestionClass)
    constructor(number, questionObject) {
        this.number = null || number
        this.question = null || questionObject.question
        this.answer1 = null || questionObject.answer1
        this.answer2 = null || questionObject.answer2
        this.answer3 = null || questionObject.answer3
        this.answer4 = null || questionObject.answer4
        this.correctAnswer = null || questionObject.correctAnswer
    }
}

// Export the Question class as a module
module.exports = Question