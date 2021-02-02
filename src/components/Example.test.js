import { render, screen } from '@testing-library/react';
import Example from './Example';

test('renders text', () => {
  render(<Example />);
  const text = screen.getByText(/example/i);
  expect(text).toBeInTheDocument();
});
