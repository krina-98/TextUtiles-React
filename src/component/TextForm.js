import React, { useState } from 'react';

export default function TextForm(props) {
    const [Text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const onUpClick = () => {
        let newText = Text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase", "success");
    }

    const onLoClick = () => {
        let newText = Text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase", "success");
    }

    const handleExtraSpaces = () => {
        let newText = Text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed Extra Spaces Successfully", "success");
    }

    const onClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Cleared Successfully", "success");
    }

    const handleCapitalizeClick = () => {
        setText(
            Text
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
        );
        props.showAlert("Converted to Capitalized Text", "success");
    };

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(Text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const countSentences = (text) => {
        if (text.trim() === '') {
            return 0;
        }
        return text.split('.').filter(sentence => sentence.trim() !== '').length;
    };

    return (
        <>
            <div className={`container text-${props.mode === 'light' ? 'dark' : 'light'}`} >
                <div className="mb-3">
                    <h1>{props.heading}</h1>
                    <textarea className={`form-control text-${props.mode === 'dark' ? 'light' : 'dark'}`} style={{ backgroundColor: `${props.mode === 'dark' ? 'grey' : 'white'}` }} value={Text} onChange={handleOnChange} id="textbox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={onUpClick}>Convert to UpperCase</button>
                <button className="btn btn-primary mx-2" onClick={onLoClick}>Convert to LowerCase</button>
                <button className="btn btn-primary mx-2" onClick={onClearClick}>Clear</button>
                <button className="btn btn-primary mx-2" onClick={handleCopyClick}>
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button className="btn btn-primary mx-2" onClick={handleCapitalizeClick}>Convert to Capitalize</button>
            </div>

            <div className={`container my-3 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h2>Text Summary</h2>
                <p className='my-3'>
                    {Text.trim() === '' ? 0 : Text.split(/\s+/).filter(word => word !== '').length} words {Text.length} characters {countSentences(Text)} sentences
                </p>
                <p>{0.008 * Text.split(/\s+/).filter(word => word !== '').length} Minutes read</p>
                <h2>Preview</h2>
                <p>{Text.length > 0 ? Text : "Enter something in the textbox above to preview it here"}</p>
            </div>
        </>
    );
}
