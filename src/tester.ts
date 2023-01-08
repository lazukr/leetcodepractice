export function runTests(code: Function, cases: any) {
    cases.forEach((testCase: any[]) => {
        test(`${JSON.stringify(testCase[0])} -> ${JSON.stringify(testCase[1])}`, () => {
            const result = code(testCase[0]);
            expect(result).toEqual(testCase[1]);
        });
    });
};