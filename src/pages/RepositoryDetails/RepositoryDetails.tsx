import {observer} from "mobx-react";
import {Link, useParams} from "react-router-dom";
import {repositoriesStore} from "../../store/store";
import s from './RepositoryDetails.module.css'
import React, {useEffect} from "react";
import {Loader} from "../../components/Loader/Loader";
import {RepRequest} from "../../types/types";
import {BlockInfo} from "./BlockInfo/BlockInfo";

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
                    <BlockInfo repository={repository}/>
                    <div>
                        <img className={s.image}
                             src={repository.owner.avatar_url}
                             alt="Avatar"/>
                    </div>
                </div>
            </div>
        )
    }
)