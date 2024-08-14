import ThreeDotsPopover from "./ThreeDotsPopover";
function IntroVideo({ shop_owner, updateGetstart }) {
    return (
        <div className="Polaris-LegacyCard">
            <div className="Polaris-MediaCard">
                <div className="Polaris-MediaCard__InfoContainer">
                    <div
                        className="Polaris-Box"
                        style={{
                            '--pc-box-padding-block-start-xs': 'var(--p-space-500)',
                            '--pc-box-padding-block-end-xs': 'var(--p-space-500)',
                            '--pc-box-padding-inline-start-xs': 'var(--p-space-500)',
                            '--pc-box-padding-inline-end-xs': 'var(--p-space-500)',
                        }}
                    >
                        <div
                            className="Polaris-BlockStack"
                            style={{
                                '--pc-block-stack-order': 'column',
                                '--pc-block-stack-gap-xs': 'var(--p-space-200)',
                            }}
                        >
                            <div
                                className="Polaris-InlineStack"
                                style={{
                                    '--pc-inline-stack-align': 'space-between',
                                    '--pc-inline-stack-wrap': 'nowrap',
                                    '--pc-inline-stack-gap-xs': 'var(--p-space-200)',
                                    '--pc-inline-stack-flex-direction-xs': 'row',
                                }}
                            >
                                <div>
                                    <h2 className="Polaris-Text--root Polaris-Text--headingSm">Getting Started</h2>
                                </div>
                                <div
                                    className="Polaris-Box"
                                    style={{
                                        position: 'absolute',
                                        '--pc-box-inset-inline-end': 'var(--p-space-500)',
                                        zIndex: 'var(--p-z-index-2)',
                                    }}
                                >
                                    <div
                                        className="Polaris-InlineStack"
                                        style={{
                                            '--pc-inline-stack-wrap': 'nowrap',
                                            '--pc-inline-stack-gap-xs': 'var(--p-space-100)',
                                            '--pc-inline-stack-flex-direction-xs': 'row',
                                        }}
                                    >
                                        <div>
                                            <div
                                                className="Polaris-InlineStack"
                                                style={{
                                                    '--pc-inline-stack-block-align': 'center',
                                                    '--pc-inline-stack-wrap': 'wrap',
                                                    '--pc-inline-stack-flex-direction-xs': 'row',
                                                }}
                                            >
                                                <ThreeDotsPopover updateGetstart={updateGetstart} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="Polaris-Text--root Polaris-Text--bodySm">
                                Explore our comprehensive documentation to learn how to set up and make the most of our app. From installation guides to detailed feature explanations, our documentation will help you get started quickly and efficiently.
                            </p>
                            <div className="Polaris-MediaCard__ActionContainer">
                                <div className="Polaris-ButtonGroup">
                                    <div className="Polaris-ButtonGroup__Item">
                                        <div>
                                            <button
                                                className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter"
                                                type="button"
                                            >
                                                <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                                                    Learn about getting started
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Polaris-MediaCard__MediaContainer">
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    />
                </div>
            </div>
        </div>

    )
}

export default IntroVideo;

