export function runTests(code: Function, cases: any) {
    cases.forEach((testCase: any[]) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = code(testCase[0]);
            expect(result).toBe(testCase[1]);
        });
    });
};