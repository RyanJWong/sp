import { useQuery, UseQueryOptions } from "react-query";
import request, { gql } from "graphql-request";

import {
  QUERY_KEYS,
  SNAPSHOT_ENDPOINT,
} from "../constants/snapshot";

export type Vote = {
  choice: number;
  created: number;
};


const useGetSnapshotVotes = (
  proposalIds: string[] | null,
  voter: string | undefined,
  options?: UseQueryOptions<Vote[] | null>
) => {
  return useQuery<Vote[] | null>(
    QUERY_KEYS.Snapshot.Votes(proposalIds || [""]),
    async () => {
      const { votes } = await request(
        SNAPSHOT_ENDPOINT,
        gql`
          query Votes($proposalIds: [String], $voter: String) {
            votes(first: 5, where: { proposal_in: $proposalIds, voter: $voter }) {
              id
              voter
              created
              choice
              proposal {
                id
              }
            }
          }
        `,
        { proposalIds, voter }
      );
      // return votes.reduce((acc: any, vote: any) => {
      //   const { proposal, choice, created, voter } = vote;
      //   acc[proposal.id] = acc[proposal.id] || {};
      //   acc[proposal.id][voter] = {
      //     choice,
      //     created,
      //     voter,
      //   };
      //   return acc;
      // }, {});
      return votes;
    },
    {
      ...options,
      enabled: !!proposalIds && proposalIds.length > 0,
    }
  );
};

export default useGetSnapshotVotes;
