const endpoint = "https://api.football-data.org/v2/";

const fetchData = async (path) => {
    try {
        const response = await fetch(new URL(path, endpoint), {
            method: "GET",
            headers: {
                "X-Auth-Token": "913db747fd0d4f90b1b8799422f1e10b",
                "Connection": "keep-alive"
            }
        });

        return await response.json();
    } catch (error){
        throw(error);
    }
}

export const fetchCompetitionMatch = async (matchday) => {
    return await fetchData(`competitions/2021/matches?matchday=${matchday}`);
}

export const getMatch = async (matchId) => {
    return await fetchData(`competitions/2021/matches?matchday=1`);
}

export const fetchStandings = async () => {
    return await fetchData(`competitions/2021/standings?standingType=TOTAL`);
}

export const getTeam = async (teamId) => {
    return await fetchData(`teams/${teamId}`);
}

export const getCompetition = async () => {
    return await fetchData(`competitions/2021`);
}