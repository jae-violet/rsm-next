import { env } from "$env/dynamic/public";

export const prerender = env.PUBLIC_USE_SSR_ADAPTER === "true" ? false : "auto";
