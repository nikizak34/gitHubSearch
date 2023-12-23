import React, {useEffect} from "react"
import {useDebounce} from "../../hooks/useDebounce";
import {observer} from "mobx-react";
import {repositoriesStore} from "../../store/store";
import {Loader} from "../../components/Loader/Loader";
import {SearchBlock} from "../../components/SearchBlock/SearchBlock";
import {Repositories} from "../../components/Repositories/Repositories";


export const Search = observer(() => {
    const {
        searchRepositories, loading,
        repositories,
        searchValue,
        setSearchValue,
        cancelSearch,
    } = repositoriesStore

    const debounceValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (debounceValue) {
            searchRepositories(debounceValue);
            return () => {
                cancelSearch();
            };
        }
    }, [debounceValue]);

    return (
        <div className={'App'}>
            <SearchBlock loading={loading} searchValue={searchValue}
                         setSearchValue={setSearchValue} cancelSearch={cancelSearch}/>
            {loading && <Loader/>}
            <Repositories repositories={repositories} debounceValue={debounceValue} loading={loading}/>
        </div>
    );
})

