/* eslint-disable prettier/prettier */
/** .eslintrc.js
 * 在VSCode中安装ESLint插件，编写过程中检测代码质量
 * ESLint 代码质量校验相关配置
 * 这里使用prettier作为代码格式化工具，用ESLint做代码质检
 * 相关配置使用下面extends扩展先做默认设置
 * 在.prettierrc.js文件中配置好后，格式化规则会以.prettierrc.js作为最终格式，所以不建议在本文件中做代码格式化相关配置
 * 相关prettier配置ESLint会默认加载为代码质检 格式化以prettier为主
 * 在本配置文件中只做代码质量约束规范配置
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint-config-prettier',
		'eslint:recommended', // 使用推荐的eslint
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended', // 使用插件支持vue3
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js文件规则  2.开启rules的 "prettier/prettier": "error"  3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	plugins: [],
	globals: {
		ElMessage: 'readonly',
		// 因为自动导入了vue,手动声明为全局变量
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
		ref: 'readonly',
		computed: 'readonly',
		reactive: 'readonly',
		ElMessageBox: 'readonly',
		PropType: 'readonly',
		Ref: 'readonly',
		onMounted: 'readonly',
		watch: 'readonly',
		defineAsyncComponent: 'readonly',
		nextTick: 'readonly',
		toRef: 'readonly',
		toRaw: 'readonly',
		watchEffect: 'readonly',
		getCurrentInstance: 'readonly',
		ComponentInternalInstance: 'readonly',
		useSlots: 'readonly',
		onUnmounted: 'readonly',
		ComputedRef: 'readonly',
		unref: 'readonly',
		onBeforeUnmount: 'readonly',
		onDeactivated: 'readonly',
		Component: 'readonly',
		isRef: 'readonly',
		h: 'readonly',
		ComponentPublicInstance: 'readonly',
		globalThis: 'readonly',
		NodeJS: 'readonly',
		provide: 'readonly',
		inject: 'readonly'
	},
	rules: {
		'no-prototype-builtins': 'error', // 允许使用hasOwnProperty
		'vue/no-unused-components': 'error', // 组件必须使用
		'vue/component-definition-name-casing': 'error', // 组件名称中允许使用驼峰
		'vue/multi-word-component-names': 'error', // 允许组件名中包含多个单词
		'vue/no-template-shadow': 'error', // 组件模板中不允许有同名属性
		'vue/no-v-html': 'error', // 允许使用v-html
		'prefer-const': 'error', // 优先使用const
		'@typescript-eslint/ban-types': 'error', // 禁止使用一些类型
		'vue/require-prop-types': 'error', // 允许组件定义prop类型 可以不定义类型
		'vue/require-default-prop': 'off', // 允许组件定义默认值 可以不定义默认值
		'no-undef': ['error', { typeof: false }], //允许使用未定义的变量,因为自动导入了vue
		'no-console': process.env.NODE_ENV === 'build' ? ['warn', { allow: ['warn'] }] : 'off', //生产模式不允许使用log
		'no-debugger': process.env.NODE_ENV === 'build' ? 'error' : 'off', //生产默认不允许使用debugger
		'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }], //变量声明未使用
		'@typescript-eslint/no-explicit-any': 'warn', // ts使用any
		'@typescript-eslint/no-var-requires': 'error', // 强制使用 import 且不允许使用 require 设置off关闭检查
		'vue/require-v-for-key': 'error', // 对保留元素检查 vue3中v-for会自动追加key值，所以不用再强制添加key属性，所以不检查key的填写
		'vue/valid-v-for': 'error', // 对于非保留(自定义)元素检查  vue3中v-for会自动追加key值，所以不用再强制添加key属性，所以不检查key的填写
		'no-unused-vars': 'error',
	},
	ignorePatterns: ['src/assets'],
};
