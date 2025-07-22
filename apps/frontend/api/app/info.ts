import type { Result } from "@mycelis/types";

export function gitLogs(skip: number = 0, take: number = 15) {
    return useAxios().axios.get<Result<GitLogsResult>>(`/appinfo/gitlogs?take=${take}&skip=${skip}`)
}

export type GitLogsResult = {
    commits: GitLogsResultCommitItem[]
}

export type GitLogsResultCommitItem = {
    body: string,
    shortHash: string,
    title: string,
    committer: {
        name: string,
        email: string,
        date: string,
        relativeTime: string
    }
}

export function gitInfo() {
    return useAxios().axios.get<Result<GitInfoResult>>('/appinfo/gitinfo');
}

export type GitInfoResult = {
    name: string,
    url: string,
}