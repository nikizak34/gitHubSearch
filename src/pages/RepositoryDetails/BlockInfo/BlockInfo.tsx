import React from 'react';
import s from "../RepositoryDetails.module.css";
import {RepRequest} from "../../../types/types";

type Props = {
    repository: RepRequest
}
export const BlockInfo = ({repository}: Props) => {
    const {
        name, full_name, stargazers_count, forks,
        open_issues_count, language, description, owner,
    } = repository
    const {html_url}=owner

    return (
        <div className={s.blockInfo}>
            <div>Name: {name}</div>
            <div>Stars: {stargazers_count}</div>
            <div>Forks: {forks}</div>
            <a href={html_url}>Go to repository</a>
            <div>Full Name: {full_name}</div>
            <div>Description: {description}</div>
            <div>Language: {language}</div>
            <div>Open_issues_count: {open_issues_count}</div>
        </div>
    );
};

