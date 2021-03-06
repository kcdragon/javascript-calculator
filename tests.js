QUnit.test("Lexer#token + 1 1", function(assert) {
    assert.ok(
        _.isEqual(["+", 1, 1], new Lexer("+ 1 1").tokens())
    )
});

QUnit.test("Parser#buildExpression single integer", function(assert) {
    assert.ok(
        _.isEqual(
            new Number(1),
            new Parser([1]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression single plus expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(new Number(1), new Number(2)),
            new Parser(["+", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression single minus expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Minus(new Number(1), new Number(2)),
            new Parser(["-", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression single times expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Times(new Number(1), new Number(2)),
            new Parser(["*", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression single divide expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Divide(new Number(1), new Number(2)),
            new Parser(["/", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression nested expression with depth 2", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(new Plus(new Number(1), new Number(2)), new Plus(new Number(3), new Number(4))),
            new Parser(["+", "+", 1, 2, "+", 3, 4]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression nested expression with depth 2 and depth 3", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(
                new Plus(
                    new Plus(new Number(1), new Number(2)),
                    new Number(3)
                ),
                new Plus(
                    new Number(4),
                    new Plus(new Number(5), new Number(6))
                )
            ),
            new Parser(["+", "+", "+", 1, 2, 3, "+", 4, "+", 5, 6]).buildExpression()
        )
    )
});

QUnit.test("Parser#buildExpression nested expression with depth 3", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(
                new Plus(
                    new Plus(new Number(1), new Number(2)),
                    new Plus(new Number(3), new Number(4))
                ),
                new Plus(
                    new Plus(new Number(5), new Number(6)),
                    new Plus(new Number(7), new Number(8))
                )
            ),
            new Parser(["+", "+", "+", 1, 2, "+", 3, 4, "+", "+", 5, 6, "+", 7, 8]).buildExpression()
        )
    )
});

QUnit.test("Number#calculate returns value of number", function(assert) {
    assert.ok(
        new Number(1).calculate() === 1
    )
});

QUnit.test("Plus#calculate returns value of summing two numbers", function(assert) {
    assert.ok(
        new Plus(new Number(1), new Number(2)).calculate() === 3
    )
});

QUnit.test("Minus#calculate returns value of subtracting two numbers", function(assert) {
    assert.ok(
        new Minus(new Number(3), new Number(2)).calculate() === 1
    )
});

QUnit.test("Times#calculate returns value of multiplying two numbers", function(assert) {
    assert.ok(
        new Times(new Number(3), new Number(2)).calculate() === 6
    )
});

QUnit.test("Divide#calculate returns value of dividing two numbers", function(assert) {
    assert.ok(
        new Divide(new Number(3), new Number(2)).calculate() === 1.5
    )
});
