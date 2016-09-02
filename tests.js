QUnit.test("tokenize + 1 1", function(assert) {
    assert.ok(
        _.isEqual(["+", "1", "1"], tokenize("+ 1 1"))
    )
});

QUnit.test("tokenIsOperator true if token is plus", function(assert) {
    assert.ok(
        tokenIsOperator("+")
    )
});

QUnit.test("tokenIsOperator false if token is integer", function(assert) {
    assert.ok(
        !tokenIsOperator(1)
    )
    assert.ok(
        !tokenIsOperator("1")
    )
});

QUnit.test("buildExpression single integer", function(assert) {
    assert.ok(
        _.isEqual(
            new Number(1),
            buildExpression(["1"])
        )
    )
});

QUnit.test("buildExpression single plus expression", function(assert) {
    assert.ok(
        _.isEqual(
            new Plus(new Number(1), new Number(2)),
            buildExpression(["+", "1", "2"])
        ),
        JSON.stringify(buildExpression(["+", "1", "2"]))
    )
});
