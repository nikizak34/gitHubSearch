import {Link} from "react-router-dom";
import s from "./Repo.module.css";
import React from "react";
import {CopyToClipboard} from "../../CopyToClipboard/CopyToClipboard";
import {RepRequest} from "../../../types/types";


type Props = {
    isFavorites?: boolean
    repository: RepRequest
    changeRepository?: (value: RepRequest) => void
    disabled?: boolean
}
export const Repo = ({repository, changeRepository, isFavorites = false, disabled = false}: Props) => {
    const {id, forks, name, full_name, stargazers_count, owner} = repository
    const handleChangeRepository = () => {
        changeRepository && changeRepository(repository)
    }
    return (
        <div className={s.rep}>
            <div className={s.linkBox}>
                <a href={owner.html_url}>{name}</a>
            </div>
            <div>{owner.html_url}</div>
            <div>Stars: {stargazers_count}</div>
            <div>Forks: {forks}</div>
            <div><img alt={'avatar'} className={s.image} src={owner.avatar_url}/></div>
            <button className={s.button} disabled={disabled} onClick={handleChangeRepository}>{!isFavorites ?
                'Add to Favorites' : 'Remove from repository'}</button>
            <CopyToClipboard classname={s.copy} text={full_name}/>
            <Link className={s.button} to={`${id}/${name}`}>Detailed information
            </Link>

        </div>
    )
}



