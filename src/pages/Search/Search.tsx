import React, {ChangeEvent, useEffect} from "react"
import s from './Search.module.css'
import {useDebounce} from "../../hooks/useDebounce";
import {Repo} from "../../components/Repo/Repo";
import {observer} from "mobx-react";
import {favoritesStore, repositoriesStore, RepRequest} from "../../store/store";
import {CopyToClipboard} from "../../components/CopyToClipboard/CopyToClipboard";
import {Loader} from "../../components/Loader/Loader";


export const Search = observer(() => {
    const {searchRepositories, loading, repositories, searchValue, setSearchValue} = repositoriesStore
    const {favorites, addRepository,removeRepository} = favoritesStore;
    const debounceValue = useDebounce(searchValue, 500)
    useEffect(() => {
        if (debounceValue) {
            searchRepositories(debounceValue);
        }
    }, [debounceValue]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const mappedFavorite = favorites.map((favorites: RepRequest) => (
        <Repo changeRepository={removeRepository} isFavorites={true} key={favorites.id} repository={favorites}/>
    ))
    const mappedRepo = repositories.map((repository: RepRequest) =>
        <Repo disabled={favorites.includes(repository)} changeRepository={addRepository} key={repository.id}
              repository={repository}/>)
    return (
        <div className={'App'}>
            <div className={s.searchBlock}>
                <input placeholder={'repository search'} className={s.input}
                       value={searchValue}
                       onChange={onChangeHandler}/>
                <CopyToClipboard text={searchValue}/>
            </div>
            {loading&&<Loader/>}
            <div className={s.repBlock}>
                    <div>
                        <div className={s.title}>List of repositories:</div>
                        {debounceValue && !loading&& <div className={s.repositories}>{mappedRepo}</div>}
                    </div>
                <div>
                    <div className={s.title}>List with favorites repositories:</div>
                    {mappedFavorite}
                </div>
            </div>
        </div>
    );
})
