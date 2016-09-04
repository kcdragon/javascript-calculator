class Expression {}
class Operator extends Expression {
    constructor(leftExpression, rightExpression) {
        super();
        this.leftExpression = leftExpression
        this.rightExpression = rightExpression
    }
}
class Number extends Expression {
    constructor(number) {
        super();
        this.number = number
    }
}
class Plus extends Operator {}
class Minus extends Operator {}
class Times extends Operator {}
class Divide extends Operator {}

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

class Tokenizer {
    constructor(expressionString) {
        this.expressionString = expressionString
    }

    tokens() {
        return this.expressionString.split(/\s|\b/).map(function (token) {
            if (token.match(/^\d+$/)) {
                return parseFloat(token)
            }
            else {
                return token
            }
        })
    }
}

class ExpressionBuilder {
    constructor(tokens) {
        this.tokens = tokens
    }

    buildExpression() {
        var builder = this
        var stack = new Stack()
        this.tokens.forEach(function (token) {
            if (builder.tokenIsOperator(token)) {
                stack.push(token)
            }
            else {
                if (stack.peek() instanceof Expression) {
                    var left = stack.pop()
                    var right = new Number(token)
                    var operator = stack.pop()
                    stack.push(
                        builder.getNewOperator(operator, left, right)
                    )
                }
                else {
                    stack.push(new Number(token));
                }
            }
        })
        return stack.pop()
    }

    tokenIsOperator(token) {
        return token.toString().match(/^[\+\-*\/]$/)
    }

    getNewOperator(token, left, right) {
        if (token == "+")
            return new Plus(left, right)
        else if (token == "-")
            return new Minus(left, right)
        else if (token == "*")
            return new Times(left, right)
        else
            return new Divide(left, right)
    }
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
