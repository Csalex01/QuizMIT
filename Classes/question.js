
// Question class definition
class Question {

    // Class constructor
    // Parameters:
    // 1. The number of the question (number)
    // 2. The actual question (question)
    // 3. The answers for the question (answer1, answer2, answer3, answer4)
    // 4. The correct answer (correctAnswer)
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

module.exports = Question