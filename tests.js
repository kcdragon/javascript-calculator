QUnit.test("tokenize + 1 1", function(assert) {
    assert.ok(
        _.isEqual(["+", 1, 1], new Tokenizer("+ 1 1").tokens())
    )
});

QUnit.test("buildExpression single integer", function(assert) {
    assert.ok(
        _.isEqual(
            new Number(1),
            new ExpressionBuilder([1]).buildExpression()
        )
    )
});

QUnit.test("buildExpression single plus expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(new Number(1), new Number(2)),
            new ExpressionBuilder(["+", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("buildExpression single minus expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Minus(new Number(1), new Number(2)),
            new ExpressionBuilder(["-", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("buildExpression single times expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Times(new Number(1), new Number(2)),
            new ExpressionBuilder(["*", 1, 2]).buildExpression()
        )
    )
});

QUnit.test("buildExpression single divide expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Divide(new Number(1), new Number(2)),
            new ExpressionBuilder(["/", 1, 2]).buildExpression()
        )
    )
});
