import staticAdapter from "@sveltejs/adapter-static";
import nodeAdapter from "@sveltejs/adapter-node";
import sveltePreprocess from "svelte-preprocess";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let adapter;
if (process.env.PUBLIC_USE_SSR_ADAPTER == "true") {
	console.log("Using SSR adapter.");
	adapter = nodeAdapter();
} else {
	console.log("Using Static adapter.");
	adapter = staticAdapter({ strict: false });
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
			includePaths: [path.join(__dirname, "/src/styles")]
		}
	}),

	kit: {
		adapter,

		prerender: {
			handleHttpError: "warn"
		},

		alias: {
			$config: path.resolve(__dirname, "src/config"),
			$ui: path.resolve(__dirname, "src/ui"),
			$generated: path.resolve(__dirname, "src/generated"),
			$graphql: path.resolve(__dirname, "src/graphql")
		},

		paths: {
			relative: false,
		},
	}
};

export default config;
