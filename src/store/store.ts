import {makeAutoObservable} from 'mobx';
import {API} from "../api/api";
import axios, {CancelTokenSource} from "axios";
import {RepRequest} from "../types/types";


class FavoritesStore {
    favorites: RepRequest[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addRepository = (repository: RepRequest) => {
        this.favorites.unshift(repository);
    }
    removeRepository = (repository: RepRequest) => {
        const index = this.favorites.findIndex(el => el.id === repository.id)
        if (index !== -1) this.favorites.splice(index, 1)
    }
}

export const favoritesStore = new FavoritesStore();


class RepositoriesStore {
    cancelTokenSource: CancelTokenSource | null = null;
    repositories: RepRequest[] = [];
    loading = false;
    searchValue = ''

    constructor() {
        makeAutoObservable(this);
    }

    setSearchValue = (value: string) => {
        this.searchValue = value
    }

    cancelSearch=()=> {
        if (this.cancelTokenSource) {
            this.cancelTokenSource.cancel("Request canceled by the user.");
        }
    }

    searchRepositories = async (value: string) => {
        this.cancelTokenSource = axios.CancelToken.source();
        this.loading = true;
        try {
            const response = await API.getRep(value, this.cancelTokenSource.token);
            this.repositories = response.data.items;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.error('Failed to search repositories', error);
            }
        } finally {
            this.loading = false;
        }
    }
}

export const repositoriesStore = new RepositoriesStore();