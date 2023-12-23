import React from 'react';
import s from "../RepositoryDetails.module.css";
import {RepRequest} from "../../../types/types";

type Props={
    repository:RepRequest
}
export const BlockInfo = ({repository}:Props) => {
    return (
        <div className={s.blockInfo}>
            <div>Name: {repository.name}</div>
            <div>Stars: {repository.stargazers_count}</div>
            <div>Forks: {repository.forks}</div>
            <a href={repository.owner.html_url}>Go to repository</a>
            <div>Full Name: {repository.full_name}</div>
            <div>Description: {repository.description}</div>
            <div>Language: {repository.language}</div>
            <div>Open_issues_count: {repository.open_issues_count}</div>
        </div>
    );
};

