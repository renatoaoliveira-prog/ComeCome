import { get } from 'svelte/store';
import { nomeMercado } from './store.js';
import { describe, it, expect } from 'vitest';

describe('nomeMercado store', () => {
  it('should have an initial value of an empty string', () => {
    expect(get(nomeMercado)).toBe('');
  });

  it('should update its value correctly', () => {
    const newValue = 'Supermercado Teste';
    nomeMercado.set(newValue);
    expect(get(nomeMercado)).toBe(newValue);
  });
});