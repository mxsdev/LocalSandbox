/* THIS CODE IS GENERATED, DO NOT MODIFY! */

import z from "zod"

import type { ColumnType } from "npm:kysely"

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export const github__repos = z.object({
  id: z.string(),
})

export const github__users = z.object({
  id: z.string(),
  username: z.string(),
  city: z.string().transform((x) => x as unknown as Generated<typeof x>),
})

export type GithubRepos = z.output<typeof github__repos>

export type GithubUsers = z.output<typeof github__users>

export interface DB {
  github__repos: GithubRepos
  github__users: GithubUsers
}
