export interface Movie {
    id?: string;
    name: string;
    level_1_title: string | null;
    full_name: string;
    external_id: number;
    season_number: string | null;
    episode_number: string | null;
    title_level: string | null
}