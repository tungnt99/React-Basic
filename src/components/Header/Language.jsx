import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Language() {
    return (
        <>
            <NavDropdown id="basic-nav-dropdown-language" title="Việt Nam" className='px-2 '>
                <NavDropdown.Item>English</NavDropdown.Item>
                <NavDropdown.Item>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
