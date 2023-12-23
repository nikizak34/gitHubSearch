export type RepRequest = {
    id: number
    full_name: string
    name: string
    owner: Owner
    forks: number
    stargazers_count: number
    private: boolean
    description: boolean
    language: string
    open_issues_count: number
}
type Owner = {
    avatar_url: string
    html_url: string
}