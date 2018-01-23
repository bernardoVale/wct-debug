module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "globalReturn": false,
            "impliedStrict": true
        }
    },
    "env": {
        "browser": true,
        "amd": false,
        "node": false,
        "commonjs": true,
        "shared-node-browser": false,
        "es6": true,
        "worker": false,
        "mocha": true,
        "jasmine": false,
        "jest": false,
        "phantomjs": false,
        "protractor": false,
        "qunit": false,
        "jquery": false,
        "prototypejs": false,
        "shelljs": false,
        "meteor": false,
        "mongo": false,
        "applescript": false,
        "nashorn": false,
        "serviceworker": false,
        "atomtest": false,
        "embertest": false,
        "webextensions": false,
        "greasemonkey": false
    },
    "globals": {
        "__dirname": true,
        "process": true,
        "expect": true,
        "fixture": true,
        "assert": true
    },
    "rules": {
        // Possible Development Errors
        "no-cond-assign": ["error", "always"],  // disallow assignment operators in conditional expressions
        "no-console": "error",                  // disallow the use of console
        "no-constant-condition": "error",       // disallow constant expressions in conditions
        "no-control-regex": "warn",             // disallow control characters in regular expressions
        "no-debugger": "error",                 // disallow the use of debugger
        "no-dupe-args": "error",                // disallow duplicate arguments in function definitions
        "no-dupe-keys": "error",                // disallow duplicate keys in object literals
        "no-duplicate-case": "error",           // disallow duplicate case labels
        "no-empty-character-class": "error",    // disallow empty character classes in regular expressions
        "no-empty": "error",                    // disallow empty block statements
        "no-ex-assign": "error",                // disallow reassigning exceptions in catch clauses
        "no-extra-boolean-cast": "error",       // disallow unnecessary boolean casts
        "no-extra-parens": ["error", "all", {   // disallow unnecessary parentheses
            "returnAssign": false,
            "nestedBinaryExpressions": false
        }],
        "no-extra-semi": "error",               // disallow unnecessary semicolons
        "no-func-assign": "error",              // disallow reassigning function declarations
        "no-inner-declarations": ["error", "both"], // disallow function or var declarations in nested blocks
        "no-invalid-regexp": "error",           // disallow invalid regular expression strings in RegExp constructors
        "no-irregular-whitespace": ["error", {  // disallow irregular whitespace outside of strings and comments
            "skipStrings": true,
            "skipRegExps": true,
            "skipTemplates": true
        }],
        "no-negated-in-lhs": "error",             // disallow negating the left operand in in expressions
        "no-obj-calls": "error",                  // disallow calling global object properties as functions (Math & JSON)
        "no-regex-spaces": "error",               // disallow multiple spaces in regular expressions
        "no-sparse-arrays": "error",              // disallow sparse arrays
        "no-unexpected-multiline": "error",       // disallow confusing multiline expressions
        "no-unreachable": "error",                // disallow unreachable code after return, throw, continue, and break statements
        "no-unsafe-finally": "error",             // disallow control flow statements in finally blocks
        "use-isnan": "error",                     // require calls to isNaN() when checking for NaN
        "valid-typeof": "error",                  // enforce comparing typeof expressions against valid strings

        // Best Practices
        "block-scoped-var": "error",              // enforce the use of variables within the scope they are defined
        "consistent-return": "error",             // require return statements to either always or never specify values
        "curly": "error",                         // enforce consistent brace style for all control statements
        "default-case": "error",                  // require default cases in switch statements
        "eqeqeq": "error",                        // require the use of === and !==
        "guard-for-in": "error",                  // require for-in loops to include an if statement
        "no-alert": "error",                      // disallow the use of alert, confirm, and prompt
        "no-caller": "error",                     // disallow the use of arguments.caller or arguments.callee
        "no-empty-function": "error",             // disallow empty functions
        "no-empty-pattern": "error",              // disallow empty destructuring patterns
        "no-eval": "error",                       // disallow the use of eval()
        "no-fallthrough": "error",                // disallow fallthrough of case statements
        "no-implicit-globals": "error",           // disallow var and named function declarations in the global scope
        "no-implied-eval": "error",               // disallow the use of eval()-like methods
        "no-lone-blocks": "error",                // disallow unnecessary nested blocks
        "no-loop-func": "error",                  // disallow function declarations and expressions inside loop statements
        "no-multi-spaces": ["error", {            // disallow multiple spaces
            exceptions: { "VariableDeclarator": true }
        }],
        "no-native-reassign": "error",            // disallow assignments to native objects or read-only global variables
        "no-redeclare": "error",                  // disallow var redeclaration
        "no-self-assign": "error",                // disallow assignments where both sides are exactly the same
        "no-self-compare": "error",               // disallow comparisons where both sides are exactly the same
        "strict": ["error", "global"],            // require or disallow strict mode directives

        // Variables
        "no-undef": "error",                      // disallow the use of undeclared variables
        "no-undefined": "error",                  // disallow the use of undefined as an identifier
        "no-unused-vars": "error",                // disallow unused variables

        // Stylistic Issues
        "array-bracket-spacing": "error",         // enforce consistent spacing inside array brackets
        "block-spacing": "error",                 // enforce consistent spacing inside single-line blocks
        "brace-style": ["error", "1tbs", {
            "allowSingleLine": true
        }],                                       // enforce consistent brace style for blocks
        "camelcase": "error",                     // enforce camelcase naming convention
        "comma-dangle": "error",                  // require or disallow trailing commas
        "comma-spacing": "error",                 // enforce consistent spacing before and after commas
        "computed-property-spacing": "error",     // enforce consistent spacing inside computed property brackets
        "indent": "error",                        // enforce consistent indentation
        "key-spacing": "error",                   // enforce consistent spacing between keys and values in object literal properties
        "keyword-spacing": "error",               // enforce consistent spacing before and after keywords
        "no-mixed-spaces-and-tabs": "error",      // disallow mixed spaces and tabs for indentation
        "no-trailing-spaces": "error",            // disallow trailing whitespace at the end of lines
        "quotes": ["error", "double", {
            "avoidEscape": true,
            "allowTemplateLiterals": true
        }]            // enforce the consistent use of either backticks, double, or single quotes
    }
}
