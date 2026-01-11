import { Directus } from "@directus/sdk";
import type { CustomDirectusTypes } from "./types";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "$lib/__generated__/graphql";
import { env } from "$env/dynamic/public";

export const directus = new Directus<CustomDirectusTypes>("https://rsm-cms-prod.onrender.com", {});

export const cmsClient = getSdk(new GraphQLClient(env.PUBLIC_DIRECTUS_API_URL));

export type ImageAssetRelation = {
	directus_files_id?: {
		title?: string | null;
		description?: string | null;
		filename_disk?: string | null;
	} | null;
} | null;

export type ImageAsset =
	| ({
			title?: string | null;
			description?: string | null;
			filename_disk?: string | null;
	  } | null)
	| null;
