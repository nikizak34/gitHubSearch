import {makeAutoObservable} from 'mobx';
import {API} from "../api/api";


export type RepRequest = {
    id: number
    full_name: string
    name: string
    owner: Owner
    forks: number
    stargazers_count: number
    private:boolean
    description:boolean
    language:string
    open_issues_count:number
}
type Owner = {
    avatar_url: string
    html_url: string
}
class FavoritesStore {
    favorites: RepRequest[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addRepository=(repository: RepRequest)=> {
        this.favorites.unshift(repository);
    }
    removeRepository=(repository: RepRequest)=> {
        const index = this.favorites.findIndex(el => el.id === repository.id)
        if (index !== -1) this.favorites.splice(index, 1)
    }
}
export const favoritesStore = new FavoritesStore();


class RepositoriesStore {
    repositories: RepRequest[] = [];
    loading = false;
    searchValue = ''

    constructor() {
        makeAutoObservable(this);
    }
    setSearchValue = (value: string) => {
        this.searchValue = value
    }
    searchRepositories = async (value: string) => {
        this.loading = true;
        try {
            const response = await API.getRep(value);
            this.repositories = response.data.items;
        } catch (error) {
            console.error('Failed to search repositories', error);
        } finally {
            this.loading = false;
        }
    }
}

export const repositoriesStore = new RepositoriesStore();