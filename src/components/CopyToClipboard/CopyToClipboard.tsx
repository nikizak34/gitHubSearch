import React, {useState} from 'react';
import copy from 'clipboard-copy';
import s from './CopyToClipboard.module.css'

type Props = {
    text: string;
    classname?: string
}

export const CopyToClipboard: React.FC<Props> = ({text, classname}: Props) => {

    const [copied, setCopied] = useState(false);
    const handleCopyClick = async () => {
        try {
            await copy(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard', error);
        }
    };
    return (
        <button className={`${s.button} ${classname}`} disabled={!text} onClick={handleCopyClick}>
            {copied ? 'Copied' : 'Copy'}
        </button>
    );
};