import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	generates: {
		"./src/lib/__generated__/graphql.ts": {
			schema: process.env.PUBLIC_DIRECTUS_API_URL,
			documents: ["src/routes/**/*.ts", "src/lib/cms/graphql/**/*.ts"],
			plugins: ["typescript", "typescript-operations", "typescript-graphql-request"]
		}
	}
};

export default config;
