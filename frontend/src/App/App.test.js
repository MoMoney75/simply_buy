import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Simply Buy brand', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const brandElement = screen.getByText(/Simply Buy/i);
  expect(brandElement).toBeInTheDocument();
});
