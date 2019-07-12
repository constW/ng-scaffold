module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'semi': [
      'error',
      'always'
    ],
    // Bese Priactices
    // 部分数组方法必须含有 return
    'array-callback-return': 1,
    // 禁止使用 var 在 if, while 中声明的变量
    'block-scoped-var': 2,
    // if, while 语句必须使用大括号
    'curly': 2,
    // 禁用不必要的[]访问对象的属性
    'dot-notation': 1,
    // 严格使用 === 进行比较，smart 模式可以放过和 null 的比较
    'eqeqeq': [2, 'smart'],
    // for...in 语句必须使用 hasOwnProperty
    'guard-for-in': 2,
    // 禁用 arguments.caller 和 arguments.callee
    'no-caller': 2,
    // 强制在正则表达式中转义操作符
    'no-div-regex': 1,
    // 在 if 中包含 return 时，不需要 else
    'no-else-return': 2,
    // 禁用空函数
    'no-empty-function': 2,
    // 禁用eval
    'no-eval': 2,
    // 禁止扩展 native 对象
    'no-extend-native': 2,
    // 禁止使用不必要的 bind
    'no-extra-bind': 2,
    // 禁用不必要的 label
    'no-extra-label': 2,
    // 禁止使用.2, -.7等数字，必须使用0.2, -0.7
    'no-floating-decimal': 2,
    // 禁用可读性低的类型转换，如：!!
    'no-implicit-coercion': 2,
    // 禁用直接在顶级作用域定义函数和变量，除非显式定义到 window，sourceType: 'module' 时无效
    'no-implicit-globals': 2,
    // 禁用 setTimeout 和 setInterval 传递字符串参数
    'no-implied-eval': 2,
    // 禁用无效的this
    'no-invalid-this': 2,
    // 禁用过时的 __iterator__
    'no-iterator': 2,
    // 禁用 label
    'no-labels': 2,
    // 禁用不必要的块级作用域
    'no-lone-blocks': 2,
    // 禁用在 for(var) 循环中定义函数
    'no-loop-func': 2,
    // 禁用多于一个的空格
    'no-multi-spaces': 2,
    // 必须有变量保存调用 new 生成的实例
    'no-new': 2,
    // 禁止通过 new 调用 String, Number, Boolean
    'no-new-wrappers': 2,
    // 禁止使用八进制转义字符
    'no-octal-escape': 2,
    // 使用 Object.getPrototypeOf 代替直接取对象的 __proto__ 属性
    'no-proto': 2,
    // 禁止在 return 中赋值，如：return foo = bar + 2
    'no-return-assign': 2,
    // 禁用 javascript:
    'no-script-url': 2,
    // 禁用和自身进行比较
    'no-self-compare': 2,
    // 禁用不在括号内的逗号表达式
    'no-sequences': 2,
    // 只能 throw Error 的实例
    'no-throw-literal': 2,
    // 禁用在循环中不修改的变量作为循环条件
    'no-unmodified-loop-condition': 2,
    // 禁用不必要的 call, apply 调用
    'no-useless-call': 2,
    // 禁用字符串字面量拼接
    'no-useless-concat': 2,
    // 禁用 void
    'no-void': 2,
    // 验证代码中的 TODO
    'no-warning-comments': [1, { terms: ['todo', 'fixme'] }],
    // 禁用 with
    'no-with': 2,
    // 只在需要的时候向 parseInt, parseFloat 传递第二个参数，省略10.如果需要兼容旧版本浏览器，建议使用 always
    'radix': [2, 'as-needed'],
    // 必须使用括号包含 IIFE，inside 用括号包裹函数体: (function() {})()
    'wrap-iife': [2, 'inside'],
    // 在进行比较时，必须将常量放置在右边，范围比较除外
    'yoda': [2, 'never', {exceptRange: true}],


    // Variables
    // 禁用变量作为 label
    'no-label-var': 2,
    // 禁止覆盖全局的 NaN, undefined, Infinity
    'no-shadow-restricted-names': 2,
    // 禁止产生变量覆盖
    'no-shadow': ['warn', { builtinGlobals: true, hoist: 'all' }],
    // 禁止定义名叫 undefined 的变量
    'no-undefined': 2,
    // 禁止在变量/函数声明前使用
    'no-use-before-define': 2,
    // 禁用不使用的变量
    'no-unused-vars': [2, { argsIgnorePattern: "^(error|next)" }],


    // Stylistic Issues，包含[fix]的是可以通过 --fix 参数自动修复的
    // [fix]数组定义格式，在中括号和数组元素之间不使用空格
    'array-bracket-spacing': [1, 'never', { singleValue: true, arraysInArrays: false }],
    // [fix]单行定义的块和函数需要空格，如：if (true) { foo = 'bar'; }
    'block-spacing': 1,
    // 右花括号独占一行，即 else, catch, finally 在新一行的开始
    // 'brace-style': [1, 'stroustrup', { allowSingleLine: false }],
    // 除常量外的变量名使用 camelCase
    'camelcase': 1,
    // 警告对象或数组声明时多余的逗号
    'comma-dangle': 1,
    // 在逗号之后空格
    'comma-spacing': 1,
    // 逗号不能出现在行首
    'comma-style': 1,
    // 不在计算属性名中使用空格，obj[foo], var obj = { [foo]: '1' }
    'computed-property-spacing': 1,
    // 保存 this 的变量名
    'consistent-this': [1, '_this', 'self'],
    // [fix]确保非空文件以空行结尾
    'eol-last': 1,
    // 禁用函数表达式的函数名
    // 'func-names': [1, 'never'],
    // 变量名的长度限制
    'id-length': [1, { min: 1, max: 25 }],
    // [fix]缩进使用2个空格
    'indent': [1, 2, { SwitchCase: 1 }],
    // [fix]声明对象字面量时，在冒号后空格
    'key-spacing': 1,
    // [fix]关键字前后需要有至少一个空格
    'keyword-spacing': 1,
    // [fix]块级/行级注释前后的空行
    'lines-around-comment': [1, { allowBlockStart: true, allowObjectStart: true, allowArrayStart: true }],
    // 每行最大字符数，忽略包含Url的行
    'max-len': [1, { code: 120, ignoreUrls: true }],
    // 每行最大语句数量
    'max-statements-per-line': 1,
    // new 调用的函数必须首字母大写，首字母大写的函数必须被 new 调用。忽略对象的属性。
    'new-cap': [1, { properties: false }],
    // 调用无参数的构造函数时，也需要括号
    'new-parens': 1,
    // 链式调用时，每个调用在单独的行
    'newline-per-chained-call': 1,
    // 禁止调用 Array 构造函数
    'no-array-constructor': 1,
    // 禁用位运算
    'no-bitwise': 2,
    // 禁止行内注释出现在代码之后
    'no-inline-comments': 1,
    // 如果 else 中只有 if，使用 else if 替代
    'no-lonely-if': 1,
    // 禁止同时使用 tab 和 space 缩进
    'no-mixed-spaces-and-tabs': 1,
    // [fix]允许的一次最大空行数量，默认 2 行
    // 'no-multiple-empty-lines': [1, { max: 2 }],
    // 禁用嵌套三元运算符
    'no-nested-ternary': 1,
    // 禁止调用 Object 构造函数
    'no-new-object': 1,
    // [fix]调用函数时，函数名和括号之间不能有空格
    'no-spaced-func': 1,
    // [fix]禁用行尾空格
    'no-trailing-spaces': 1,
    // 禁用不必要的三元运算符
    'no-unneeded-ternary': 1,
    // [fix]在一行内使用 . 或 [] 调用对象属性时，. 和 [ 之前不允许有空格
    'no-whitespace-before-property': 1,
    // 定义对象时，每个属性占单独一行
    'object-property-newline': 1,
    // 一行只一个变量
    'one-var-declaration-per-line': 1,
    // 定义对象时，任何一个属性名需要引号，则所有属性名需要引号
    'quote-props': [1, 'consistent-as-needed', { keywords: true }],
    // [fix]字符串字面量使用单引号
    'quotes': [2, 'single', { allowTemplateLiterals: true }],
    // 必须在 block 前添加一个空格，函数定义除外
    'space-before-blocks': [1, 'always'],
    // 函数声明的括号前不能有空格
    // 'space-before-function-paren': [1, 'never'],
    // 操作符前后至少有一个空格
    'space-infix-ops': 1,
    // 一元运算符的 new delete typeof 之后必须有空格
    'space-unary-ops': [1, { words: true, nonwords: false }],
    // 注释必须有空格
    'spaced-comment': 1,


    // ECMAScript 6
    // 箭头函数只在必要时添加花括号
    'arrow-body-style': [1, 'as-needed'],
    // [fix]箭头函数的参数只在必要时添加括号
    'arrow-parens': [1, 'as-needed'],
    // [fix]箭头函数的 => 前后至少有一个空格
    'arrow-spacing': 1,
    // [fix]Generator 函数的 * 之后至少有一个空格
    // 'generator-star-spacing': [1, 'after'],
    // 禁止有歧义的箭头函数，如：let x = a => 1 ? 2 : 3
    'no-confusing-arrow': [2, { allowParens: true }],
    // 禁止重复 import，一个 module 需要 import 的内容应该在一行内
    'no-duplicate-imports': [2, { includeExports: true }],
    // 禁用不必要的计算属性名
    'no-useless-computed-key': 2,
    // 禁用空构造函数和直接调用 super 的构造函数，因为默认就是这样的
    'no-useless-constructor': 2,
    // [fix]禁用不必要的 import, export 和解构重命名
    'no-useless-rename': 2,
    // [fix]使用 let 和 const 代替 var
    // 'no-var': 2,
    // [fix]在定义对象属性时使用简洁写法
    // 'object-shorthand': 0,
    // 回调函数使用箭头函数
    // 'prefer-arrow-callback': 2,
    // [fix]使用 let 声明的变量没有重新赋值时，可以使用 const 代替；解构出的所有变量都没有重新赋值时，可以使用 const
    'prefer-const': [2, { destructuring: 'all' }],
    // 使用可变参数代替读取 arguments
    'prefer-rest-params': 2,
    // 使用模板字符串而不是字符串拼接
    'prefer-template': 'warn',
    // [fix]在 rest 操作符和表达式之间不含空格
    'rest-spread-spacing': [2, 'never'],
    // [fix]模板字符串的 ${} 中不可以包含空格
    'template-curly-spacing': [2, 'never']
  }
};
