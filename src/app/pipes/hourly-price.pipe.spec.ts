import { HourlyPricePipe } from './hourly-price.pipe';

describe('HourlyPricePipe', () => {
  it('create an instance', () => {
    const pipe = new HourlyPricePipe();
    expect(pipe).toBeTruthy();
  });
});
