import React, { useState, useCallback } from 'react';
import { Popover, ActionList } from '@shopify/polaris';

function ThreeDotsPopover() {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const activator = (
        <button
            className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantTertiary Polaris-Button--sizeSlim Polaris-Button--textAlignCenter Polaris-Button--iconOnly"
            aria-label="Actions"
            type="button"
            tabIndex="0"
            aria-controls=":Rpkq6:"
            aria-owns=":Rpkq6:"
            aria-expanded="false"
            data-state="closed"
            onClick={togglePopoverActive}
        >
            <span className="Polaris-Button__Icon">
                <span className="Polaris-Icon">
                    <svg
                        viewBox="0 0 20 20"
                        className="Polaris-Icon__Svg"
                        focusable="false"
                        aria-hidden="true"
                    >
                        <path d="M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        <path d="M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        <path d="M17 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </span>
            </span>
        </button>
    );

    return (
        <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopoverActive}
            preferredAlignment="right"
        >
            <ActionList
                items={[
                    {
                        content: 'Dismiss',
                        onAction: () => {
                            console.log('Dismiss clicked');
                            setPopoverActive(false);
                        },
                    },
                ]}
            />
        </Popover>
    );
}

export default ThreeDotsPopover;
