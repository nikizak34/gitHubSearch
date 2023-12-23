import React from 'react';
import s from "./Repositories.module.css";
import {RepRequest} from "../../types/types";
import {Repo} from "./Repo/Repo";
import {favoritesStore} from "../../store/store";
import {observer} from "mobx-react";

type Props = {
    debounceValue: string
    loading: boolean
    repositories: RepRequest[]
}
export const Repositories = observer(({debounceValue, loading, repositories}: Props) => {
        const {favorites, addRepository, removeRepository} = favoritesStore;
        const isRepositoryInFavorites = (repository: RepRequest) => {
            return favorites.some((fav) => fav.id === repository.id);
        };
        const mappedFavorite = favorites.map((favorites: RepRequest) => (
            <Repo disabled={false} changeRepository={removeRepository} isFavorites={true} key={favorites.id}
                  repository={favorites}/>
        ))
        const mappedRepo = repositories.map((repository: RepRequest) =>
            <Repo disabled={isRepositoryInFavorites(repository)} changeRepository={addRepository}
                  key={repository.id}
                  repository={repository}/>)

        return (
            <div className={s.repBlock}>
                <div>
                    <div className={s.title}>List of repositories:</div>
                    {debounceValue && !loading && <div className={s.repositories}>{mappedRepo}</div>}
                </div>
                <div>
                    <div className={s.title}>List with favorites repositories:</div>
                    {mappedFavorite}
                </div>
            </div>
        );
    }
);

