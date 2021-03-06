export const SNAPSHOT_ENS = "devodao.eth";

export const SNAPSHOT_ENDPOINT = `https://hub.snapshot.org/graphql`;

export const MESSAGE_URL = `https://hub.snapshot.org/api/message`;

export const QUERY_KEYS = {
  Snapshot: {
    Space: (id: string) => ["snapshot", "space", id],
    Proposals: (spaceId: string) => ["snapshot", "proposals", spaceId],
    Votes: (proposalIds: string[]) => ["snapshot", "votes", proposalIds],
  },
};
