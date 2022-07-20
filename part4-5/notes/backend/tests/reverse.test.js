const reverse = require('../utils/for_testing').reverse

describe('reverse of', () => {
  test('a', () => {
    expect(reverse('a')).toBe('a')
  })
  
  test('react', () => {
    expect(reverse('react')).toBe('tcaer')
  })
  
  test('releveler', () => {
    expect(reverse('releveler')).toBe('releveler')
  })
})

