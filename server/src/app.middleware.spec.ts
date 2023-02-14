/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import { AppMiddleware } from './app.middleware';

describe('AppMiddleware', () => {
  it('should be defined', () => {
    expect(new AppMiddleware()).toBeDefined();
  });
});
