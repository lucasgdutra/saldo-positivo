import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// Configurações base do Next.js (inclui TypeScript, React, etc.)
	...compat.extends("next/core-web-vitals", "next/typescript"),
	// Integração com as regras recomendadas do Biome
	// eslint-config-biome desativa regras conflitantes do ESLint
	...compat.extends("eslint-config-biome"),
	// Configurações adicionais ou overrides podem ser adicionados aqui, se necessário
	// Exemplo:
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off", // Exemplo de override
		},
	},
];

export default eslintConfig;
