module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
    ],
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'],
    //         parserOptions: {
    //             project: './tsconfig.json',
    //         },
    //     },
    // ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { // Features是特征的意思，这里用于指定要使用其他那些语言对象
            experimentalObjectRestSpread: true, // 启用对对象的扩展
            jsx: true, // 启用jsx语法
            globalReturn: true, // 允许return在全局使用
            impliedStrict: true, // 启用严格校验模式
        },
    },
    plugins: [
        'vue',
    ],
    rules: {
        // eslint
        indent: ['error', 4], // 强制使用一致的缩进
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 0, // 逗号前后的空格
        'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
        semi: [2, 'always'], // 语句强制分号结尾
        quotes: [1, 'single'], // 引号类型 `` "" ''
        '@typescript-eslint/no-var-requires': 'off',

        // vue设置
        'vue/multi-word-component-names': 'off',
    },
};
