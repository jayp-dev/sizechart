import React, { useState, useEffect } from 'react';

const Editor = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/tinymce/tinymce.min.js'; // Adjust the path as needed
        script.onload = () => {
            window.tinymce.init({
                selector: '#editor',
                height: 500,
                menubar: false,
                plugins: 'code table lists',
                toolbar: 'undo redo | blocks | bold italic | formatselect | alignleft aligncenter alignright | indent outdent | bullist numlist | code | table',
                statusbar: false,
                setup: (editor) => {
                    editor.on('Change KeyUp', () => {
                        const content = editor.getContent();
                        setContent(content);
                        console.log('Content was updated:', content);
                    });
                },
            });
        };
        document.body.appendChild(script);

        return () => {
            if (window.tinymce) {
                window.tinymce.remove();
            }
        };
    }, []);

    return (
        <textarea id="editor" />
    );
};

export default Editor;
