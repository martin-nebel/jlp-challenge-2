const fixPriceLabel = require('../src/fixPriceLabel');

//--------------------------------------------------------------------------------
// 1 price -> unique combinations are [a]
test('A', () => {
   expect(fixPriceLabel('Now £10')).toBe('Now £10');
});


//--------------------------------------------------------------------------------
// 2 prices -> unique combinations are [ab, b]
test('A > B (ab)', () => {
   expect(fixPriceLabel('Was £8, now £6')).toBe('Was £8, now £6');
});

test('A = B (b v1)', () => {
   expect(fixPriceLabel('Was £8, now £8')).toBe('Now £8');
});

test('A = B (b v2)', () => {
   expect(fixPriceLabel('Was £8.00, now £8.00')).toBe('Now £8.00');
});

test('A < B (b)', () => {
   expect(fixPriceLabel('Was £8, now £100')).toBe('Now £100');
});


//--------------------------------------------------------------------------------
// 3 prices -> unique combinations are [abc, ac, bc, c]
test('A > B > C (abc)', () => {
   expect(fixPriceLabel('Was £8, then £6, now £4')).toBe('Was £8, then £6, now £4');
});

test('A > B = C (ac)', () => {
   expect(fixPriceLabel('Was £8.50, then £7.50, now £7.50')).toBe('Was £8.50, now £7.50');
});

test('A > C > B (ac)', () => {
   expect(fixPriceLabel('Was £8, then £6, now £7')).toBe('Was £8, now £7');
});

test('A = B > C (bc)', () => {
   expect(fixPriceLabel('Was £8, then £8, now £6')).toBe('Was £8, now £6');
});

test('A = B = C (c)', () => {
   expect(fixPriceLabel('Was £8, then £8, now £8')).toBe('Now £8');
});

test('A = B < C (c)', () => {
   expect(fixPriceLabel('Was £8, then £8, now £9')).toBe('Now £9');
});

test('B > A > C (bc)', () => {
   expect(fixPriceLabel('Was £8, then £9.95, now £6')).toBe('Was £9.95, now £6');
});

test('B > C > A (bc)', () => {
   expect(fixPriceLabel('Was £6, then £9.95, now £7.50')).toBe('Was £9.95, now £7.50');
});

test('C > B > A (c)', () => {
   expect(fixPriceLabel('Was £8, then £10, now £12')).toBe('Now £12');
});

test('C > A > B (c)', () => {
   expect(fixPriceLabel('Was £10, then £8, now £12')).toBe('Now £12');
});


//--------------------------------------------------------------------------------
// 4 prices -> unique combinations are [abcd, abd, acd, bcd, ad, bd, cd, d]
test('A > B > C > D (abcd)', () => {
   expect(fixPriceLabel('Was £8, then £6, then £5.50, now £4')).toBe('Was £8, then £6, then £5.50, now £4');
});

test('A > B > D > C (abd)', () => {
   expect(fixPriceLabel('Was £8, then £6, then £4, now £5.50')).toBe('Was £8, then £6, now £5.50');
});

test('A > C > B > D (acd)', () => {
   expect(fixPriceLabel('Was £8, then £6, then £7, now £5')).toBe('Was £8, then £7, now £5');
});

test('B > C > D > A (bcd)', () => {
   expect(fixPriceLabel('Was £8, then £12, then £10, now £9')).toBe('Was £12, then £10, now £9');
});

test('A > D > B > C (ad)', () => {
   expect(fixPriceLabel('Was £10, then £6, then £5, now £8')).toBe('Was £10, now £8');
});

test('B > D > C > A (bd)', () => {
   expect(fixPriceLabel('Was £4, then £12, then £8, now £10')).toBe('Was £12, now £10');
});

test('C > D > A > B (cd)', () => {
   expect(fixPriceLabel('Was £10, then £8, then £14, now £12')).toBe('Was £14, now £12');
});

test('D > C > B > A (d)', () => {
   expect(fixPriceLabel('Was £4, then £5, then £6, now £7')).toBe('Now £7');
});

// Misc other
test('A = B = C = D', () => {
   expect(fixPriceLabel('Was £10, then £10, then £10, now £10')).toBe('Now £10');
});

test('A > B = C = D', () => {
   expect(fixPriceLabel('Was £14, then £10, then £10, now £10')).toBe('Was £14, now £10');
});

test('A = B > C > D; A is decimal; B is integer', () => {
   expect(fixPriceLabel('Was £10.00, then £10, then £8, now £4')).toBe('Was £10, then £8, now £4');
});

test('A = B > C > D; A is integer; B is decimal', () => {
   expect(fixPriceLabel('Was £10, then £10.00, then £8, now £4')).toBe('Was £10.00, then £8, now £4');
});
