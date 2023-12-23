import React, {ChangeEvent} from 'react';
import s from "./SearchBlock.module.css";
import {CopyToClipboard} from "../CopyToClipboard/CopyToClipboard";

type Props = {
    loading: boolean
    searchValue: string
    setSearchValue: (value: string) => void
    cancelSearch: () => void
}
export const SearchBlock = ({searchValue, loading, setSearchValue, cancelSearch}: Props) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const cancelSearchHandler = () => {
        cancelSearch()
        setSearchValue('')
    }
    return (
        <div className={s.searchBlock}>
            {loading && <button className={s.cancelButton} onClick={cancelSearchHandler}>Cancel Request</button>}
            <input placeholder={'repository search'} className={s.input} value={searchValue}
                   onChange={onChangeHandler}/>
            <CopyToClipboard text={searchValue}/>
        </div>
    );
};

