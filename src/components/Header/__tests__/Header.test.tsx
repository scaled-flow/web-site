import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header'
import { BrowserRouter as Router } from 'react-router-dom'



test('Header Loads Test', () => {
    const { container, getByText } = render(<Header title="TEST" />)
    // Confirm <Header> contains a <header>
    expect(container.getElementsByTagName("header").length).toBeGreaterThan(0)
    // Confirm header contains a title in an H1 tag
    expect(getByText('TEST').tagName).toBe('H1')    
})