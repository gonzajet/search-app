import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const titleElement = screen.getByText(/News search Page!/i);
  expect(titleElement).toBeInTheDocument();
});
