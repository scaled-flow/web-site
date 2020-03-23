import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer'

test('loads Footer component', () => {
    const { container } = render(<Footer />)
    // Confirm Footer loads
    expect(container).toBeDefined()

    // Confirm Footer contains div with a class of footer
    expect(container.querySelector('div').getAttribute('class')).toBe('footer')
})

