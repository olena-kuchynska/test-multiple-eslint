import _import from 'eslint-plugin-import';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplateParser from '@angular-eslint/template-parser';
import eslintPluginTemplate from '@angular-eslint/eslint-plugin-template';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import pluginJs from '@eslint/js';


const baseStyleRules = {
    'import/no-deprecated': 'warn',
    'import/order': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@stylistic/ts/indent': ['error', 4, {
        FunctionDeclaration: {
            parameters: 'first',
        },

        FunctionExpression: {
            parameters: 'first',
        },

        SwitchCase: 1
    }],
    '@stylistic/ts/member-delimiter-style': ['error', {
        multiline: {
            delimiter: 'semi',
            requireLast: true,
        },

        singleline: {
            delimiter: 'semi',
            requireLast: false,
        },
    }],
    '@stylistic/ts/type-annotation-spacing': 'error',
    '@stylistic/ts/object-curly-spacing': ['error', 'always']
};

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            'node_modules',
            'dist',
        ]
    },
    {
        plugins: {
            import: fixupPluginRules(_import),
            '@typescript-eslint': typescriptEslint,
            '@angular-eslint': angularPlugin,
            '@stylistic/ts': stylisticTs,
        }
    },
    {
        files: ['**/*.spec.ts'],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.jasmine
            },
        },
        rules: {
            ...baseStyleRules,
            'no-restricted-globals': ['error', 'event', 'fit', 'fdescribe']
        }
    },
    {
        files: ['**/*.ts'],
        ignores: ['**/*.spec.ts'],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                project: ['./tsconfig.json'], // put path to the tsconfig files
            },
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...typescriptEslint.configs.recommended.rules,
            ...angularPlugin.configs.recommended.rules,
            ...baseStyleRules,
            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/component-selector': ['error', {
                type: 'element',
                prefix: 'av', // put project prefix
                style: 'kebab-case',
            }],
            '@angular-eslint/contextual-lifecycle': 'error',
            '@angular-eslint/directive-class-suffix': 'error',
            '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
            '@angular-eslint/directive-selector': ['error', {
                type: 'attribute',
                prefix: 'av', // put project prefix
                style: 'camelCase',
            }],
            '@angular-eslint/no-output-native': 'error',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/use-pipe-transform-interface': 'error',

            '@typescript-eslint/no-restricted-types': ['error', {
                types: {
                    Object: {
                        message: 'Avoid using the `Object` type. Did you mean `object`?',
                    },

                    Function: {
                        message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    },

                    Boolean: {
                        message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    },

                    Number: {
                        message: 'Avoid using the `Number` type. Did you mean `number`?',
                    },

                    String: {
                        message: 'Avoid using the `String` type. Did you mean `string`?',
                    },

                    Symbol: {
                        message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    },
                },
            }],

            '@typescript-eslint/explicit-function-return-type': ['error', {
                allowExpressions: false,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: false,
                allowDirectConstAssertionInArrowFunctions: true,
                allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            }],
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'variable',
                    modifiers: ['const'],
                    format: ['camelCase', 'UPPER_CASE'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
                {
                    selector: 'enum',
                    format: ['PascalCase'],
                },
                {
                    selector: 'enumMember',
                    format: ['PascalCase'],
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
            quotes: ['error', 'single', { avoidEscape: true }],
            '@typescript-eslint/typedef': ['error', { propertyDeclaration: true }],
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
            'arrow-body-style': ['error', 'as-needed'],
            complexity: ['warn', 15],
            'constructor-super': 'error',
            curly: 'error',
            eqeqeq: ['error', 'smart'],
            'max-len': ['error', {
                code: 140,
            }],
        },
    },
    {
        files: ['**/*.html'],
        languageOptions: {
            parser: angularTemplateParser,
        },
        plugins: {
            '@angular-eslint/template': eslintPluginTemplate,
        },
        rules: {
            ...eslintPluginTemplate.configs.recommended.rules,
        }
    },
];
