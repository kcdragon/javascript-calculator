class Expression {
    calculate() {
        throw(this.constructor.name + " has not implemented calculate()")
    }
}
class Operator extends Expression {
    constructor(leftExpression, rightExpression) {
        super()
        this.leftExpression = leftExpression
        this.rightExpression = rightExpression
    }
}
class Number extends Expression {
    constructor(number) {
        super()
        this.number = number
    }

    calculate() {
        return this.number
    }
}
class Plus extends Operator {
    calculate() {
        return this.leftExpression.calculate() + this.rightExpression.calculate()
    }
}
class Minus extends Operator {
    calculate() {
        return this.leftExpression.calculate() - this.rightExpression.calculate()
    }
}
class Times extends Operator {
    calculate() {
        return this.leftExpression.calculate() * this.rightExpression.calculate()
    }
}
class Divide extends Operator {
    calculate() {
        return this.leftExpression.calculate() / this.rightExpression.calculate()
    }
}

class Lexer {
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

class Parser {
    constructor(tokens) {
        this.tokens = tokens
    }

    buildExpression() {
        return this._parse(this.tokens)
    }

    _parse(tokens) {
        var token = null
        while (token = tokens.shift()) {
            if (this._tokenIsOperator(token)) {
                var operator = token
                var left = this._parse(tokens)
                var right = this._parse(tokens)
                return this._getNewOperator(operator, left, right)
            }
            else {
                return new Number(token)
            }
        }
    }

    _tokenIsOperator(token) {
        return token.toString().match(/^[\+\-*\/]$/)
    }

    _getNewOperator(token, left, right) {
        if (token == "+") {
            return new Plus(left, right)
        }
        else if (token == "-") {
            return new Minus(left, right)
        }
        else if (token == "*") {
            return new Times(left, right)
        }
        else {
            return new Divide(left, right)
        }
    }
}

$(document).ready(function () {
    $('.run-button').click(function () {
        var expressionString = $('.expression-input').val(),
            tokens = new Lexer(expressionString).tokens(),
            expression = new Parser(tokens).buildExpression()

        $('.result').text(expression.calculate())
    })
})
