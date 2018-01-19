// First argument to 'describe' (which is defined by Jasmine) is the testing module that will
// appear in test reports. The second argument is a callback containing the individual tests.

import Store from "./store";

describe("Store Test", function () {
// The 'it' function of Jasmine defined an individual test. The first argument is
// a description of the test that's appended to the module name. Because a module name
// is typically a noun, like the name of the function being tested, the description for
// an individual test is typically written in an action-data format.

    it("Get store name", () => {
        const store = new Store();
        console.log(store);
        const name = store.getName();
        expect(name).toEqual("store");
    });
});