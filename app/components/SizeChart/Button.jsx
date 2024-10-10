function Button({ onClick, style, disabled, children, ...rest }) {

    return (
        <button
            onClick={onClick}
            style={style}
            disabled={disabled}
            // Optional for custom styles
            {...rest}
        >
            {children}
        </button>
    );

}

export default Button;
