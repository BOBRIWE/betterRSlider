import ConvertationHelper from '../src/ConvertationHelper';

describe('Convertation helper', function () {
    it('should convert correctly to percents', function () {
        expect(100).toEqual(ConvertationHelper.toPercents(0,100, 100));
        expect(0).toEqual(ConvertationHelper.toPercents(0,100, 0));
        expect(50).toEqual(ConvertationHelper.toPercents(0,100, 50));
        expect(20).toEqual(ConvertationHelper.toPercents(0,150, 30));
    });

    it('should handle negative correctly', function () {
        expect(0).toEqual(ConvertationHelper.toPercents(-10, 10, -10));
        expect(100).toEqual(ConvertationHelper.toPercents(-10, 10, 10));
    });
});