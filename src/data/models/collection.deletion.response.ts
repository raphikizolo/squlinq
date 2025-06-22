import { Pair } from "./pair";

export interface CollectionDeletionResponse
{
    id_deleted: Pair<string, boolean>[];
}