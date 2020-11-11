'use strict';

// Question class definition
class Question {

    // Class constructor
    // Parameters:
    // 1. The number (ID) of the question (number)
    // 2. The actual question (type: QuestionClass extends Object)
    constructor(number, questionObject) {
        this.number = null || number
        this.question = null || questionObject.question
        this.answer0 = null || questionObject.answer0
        this.answer1 = null || questionObject.answer1
        this.answer2 = null || questionObject.answer2
        this.answer3 = null || questionObject.answer3
        this.correctAnswer = null || questionObject.correctAnswer
        this.imgURL = null || questionObject.imgURL
    }
}

// Export the Question class as a module
module.exports = Question