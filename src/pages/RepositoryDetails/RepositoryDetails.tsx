import {observer} from "mobx-react";
import {Link, useParams} from "react-router-dom";
import {repositoriesStore, RepRequest} from "../../store/store";
import s from './RepositoryDetails.module.css'
import React, {useEffect} from "react";
import {Loader} from "../../components/Loader/Loader";

export const RepositoryDetails = observer(() => {
        const {repositories, searchRepositories} = repositoriesStore
        const {id, name} = useParams()
        const repository = repositories.find((repo: RepRequest) => repo.id === Number(id));
        useEffect(() => {
            if (!repository) {
                name && searchRepositories(name)
            }
        }, [id, repository, name])
        if (!repository) {
            return <Loader/>
        }
        return (
            <div className={s.root}>
                <div className={s.RepDetailsBlock}>
                    <Link className={s.link} to={'/'}>Back</Link>
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
                    <div>
                        <img className={s.image} src={repository.owner.avatar_url} alt="Avatar"/>
                    </div>
                </div>
            </div>

        )
    }
)