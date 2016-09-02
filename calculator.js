class Expression {}
class Number extends Expression {
    constructor(number) {
        super();
        this.number = number
    }
}
class Plus extends Expression {
    constructor(leftExpression, rightExpression) {
        super();
        this.leftExpression = leftExpression
        this.rightExpression = rightExpression
    }
}

class Stack {
    constructor() {
        this.elements = []
    }

    push(element) {
        this.elements.push(element)
    }

    pop() {
        return this.elements.pop()
    }

    peek() {
        return this.elements[this.elements.length - 1]
    }
}

function tokenize(expressionString) {
    return expressionString.split(/\s|\b/)
}

function tokenIsOperator(token) {
    return token.toString().match(/^\+$/)
}

function buildExpression(tokens) {
    tokens = tokens.map(function (token) {
        if (token.match(/^\d+$/)) {
            return parseFloat(token)
        }
        else {
            return token
        }
    })

    var stack = new Stack()
    tokens.forEach(function (token) {
        if (token == "+") {
            stack.push(token)
        }
        else {
            if (stack.peek() instanceof Expression) {
                var left = stack.pop()
                var operator = stack.pop()
                stack.push(
                    new Plus(left, new Number(token))
                )
            }
            else {
                stack.push(new Number(token));
            }
        }
    })

    return stack.pop()
}

$(document).ready(function () {
    $('.run-button').click(function () {
        // var expressionString = $('.expression-input').val();

        // var tokens = tokenize(expressionString)

        // var expression = new Plus(
        //     new Number(1),
        //     new Number(1)
        // )

        // $('.result').text(expression.toString())
    });
});
