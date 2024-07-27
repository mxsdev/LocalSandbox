/* THIS CODE IS GENERATED, DO NOT MODIFY! */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface GithubRepos {
  id: string;
}

export interface GithubUsers {
  city: Generated<string>;
  id: string;
  username: string;
}

export interface DB {
  github__repos: GithubRepos;
  github__users: GithubUsers;
}
