import { FooterHelp, Link } from '@shopify/polaris';
import React from 'react';
function Footer() {
    return (
        <div>
            <FooterHelp>
                Developed by{' '}
                <Link url="https://www.ptiwebtech.com" target='_blank'>
                    PTI Webtech
                </Link>
            </FooterHelp>
        </div>
    )
}

export default Footer
