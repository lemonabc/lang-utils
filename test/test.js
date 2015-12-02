var util = require("../");
var assert = require("assert");
describe("isBoolean", function() {
    it("判断变量是布尔型", function() {
        assert.equal(true,util.isBoolean(true));
    });
    it("判断变量不是布尔型", function() {
        assert.equal(false,util.isBoolean(11));
    });
});
describe("inArray", function() {
    it("判断值在数组中", function() {
        assert.equal(true,util.inArray(3,[0,1,2,3]));
    });
    it("判断值不在数组中", function() {
        assert.equal(false,util.inArray(4,[0,1,2,3]));
    });
});
describe("dequeueArray", function() {
    it("数组去重复", function() {
        assert.deepEqual([0,1,2,3],util.dequeueArray([0,1,2,3,3]));
    });

});