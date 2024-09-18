import React, { useEffect } from 'react';
const Editor = ({ handleChange, EditorContent }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/tinymce/tinymce.min.js'; // Ensure this path is correct
        script.onload = () => {
            window.tinymce.init({
                selector: '#editor',
                height: 500,
                menubar: false,
                plugins: 'code table lists',
                toolbar: 'undo redo | blocks | bold italic | formatselect | alignleft aligncenter alignright | indent outdent | bullist numlist | code | table',
                statusbar: false,
                setup: (editor) => {
                    editor.on('init', () => {
                        if (EditorContent) {
                            editor.setContent(EditorContent);
                        }
                    });

                    editor.on('Change KeyUp', () => {
                        const content = editor.getContent();
                        handleChange('content', content);
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
    }, [handleChange, EditorContent]);

    return (
        <textarea id="editor" />
    );
};

export default Editor;
