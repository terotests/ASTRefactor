// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var ASTRefactor_prototype = function ASTRefactor_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * Binds event name to event function
       * @param string en  - Event name
       * @param float ef
       */
      _myTrait_.on = function (en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);
        return this;
      };

      /**
       * @param float name
       * @param float fn
       */
      _myTrait_.removeListener = function (name, fn) {
        if (!this._ev) return;
        if (!this._ev[name]) return;

        var list = this._ev[name];

        for (var i = 0; i < list.length; i++) {
          if (list[i] == fn) {
            list.splice(i, 1);
            return;
          }
        }
      };

      /**
       * triggers event with data and optional function
       * @param string en
       * @param float data
       * @param float fn
       */
      _myTrait_.trigger = function (en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function (cb) {
          cb(data, fn);
        });
        return this;
      };
    })(this);

    (function (_myTrait_) {
      var _cnt;
      var _parser;
      var _parserOptions;

      // Initialize static variables here...

      /**
       * @param Object node  - Source code AST node
       * @param Object tpl  - Template to compare to
       * @param Object cData  - differential data
       * @param String arrayName  - Name of array property
       */
      _myTrait_.diff_nodes = function (node, tpl, cData, arrayName) {

        try {

          if (cData.failed) return true;

          if (!node && !tpl) return;

          if (node && !tpl || !node && tpl) {
            cData.failed = true;
            return true;
          }

          var v_list = this.v_list;

          if (node instanceof Array && tpl instanceof Array) {

            // look for codeBlock template variable...
            var tt,
                t_rest_index = -1;

            for (var i = 0; i < tpl.length; i++) {
              var n = tpl[i];
              if (n.type == "ExpressionStatement") n = n.expression;
              if (n && n.type == "Literal" && n.value == "...rest") {
                t_rest_index = i;
                tt = n;
                break;
              }
            }

            var until_i = node.length;

            // if "...rest" can not be reached, not enough "material"
            if (t_rest_index >= 0 && t_rest_index >= until_i) {
              cData.failed = true;
              return true;
            }

            for (var i = 0; i < until_i; i++) {
              var n = node[i],
                  t = tpl[i];
              var test = t;

              if (!test) {
                cData.failed = true;
                return true;
              }

              if (test.type == "ExpressionStatement") test = test.expression;
              if (test && test.type == "Literal" && test.value == "...rest") {
                // the rest are skipped
                cData.slots["...rest"] = {
                  srcArray: node,
                  tplArray: tpl,
                  tplNodeIndex: t_rest_index,
                  tplNode: tt,
                  array_name: arrayName
                };
                break;
              }
              this.diff_nodes(n, t, cData);
            }
            return;
          }
          if (tpl.type == "Identifier" && tpl.name) {
            // console.log("Identifier", tpl.name)
            if (tpl.name && v_list.indexOf(tpl.name) >= 0) {
              if (tpl.name == "codeBlock") {} else {
                cData.slots[tpl.name] = node;
              }
              return;
            }
          }

          if (node.type != tpl.type) {
            cData.failed = true;
            return true;
          }
          if (node.type == "Literal") {
            if (node.value != tpl.value) {
              cData.failed = true;
              return true;
            }
          }
          /*
          JSXAttribute
          xJSXClosingElement
          xJSXElement
          xJSXEmptyExpression
          xJSXExpressionContainer
          xJSXIdentifier
          xJSXMemberExpression
          xJSXNamespacedName
          xJSXOpeningElement
          xJSXSpreadAttribute
          */
          if (node.type == "JSXAttribute") {
            this.diff_nodes(node.name, tpl.name, cData);
            this.diff_nodes(node.value, tpl.value, cData);
          }
          if (node.type == "JSXExpressionContainer") {
            this.diff_nodes(node.expression, tpl.expression, cData);
          }
          if (node.type == "JSXIdentifier") {
            if (node.name != tpl.name) {
              cData.failed = true;
              return true;
            }
          }
          if (node.type == "JSXNamespacedName") {
            if (node.name != tpl.name) {
              cData.failed = true;
              return true;
            }
            if (node.namespace != tpl.namespace) {
              cData.failed = true;
              return true;
            }
          }
          if (node.type == "JSXMemberExpression") {
            this.diff_nodes(node.property, tpl.property, cData);
            this.diff_nodes(node.object, tpl.object, cData);
          }
          if (node.type == "JSXElement") {
            this.diff_nodes(node.openingElement, tpl.openingElement, cData);
            this.diff_nodes(node.children, tpl.children, cData);
            this.diff_nodes(node.closingElement, tpl.closingElement, cData);
          }
          if (node.type == "JSXOpeningElement") {
            this.diff_nodes(node.attributes, tpl.attributes, cData);
            this.diff_nodes(node.name, tpl.name, cData);
          }

          if (node.type == "JSXClosingElement") {
            this.diff_nodes(node.attributes, tpl.attributes, cData);
            this.diff_nodes(node.name, tpl.name, cData);
          }
          if (node.type == "Identifier") {
            if (node.name != tpl.name) {
              cData.failed = true;
              return true;
            }
          }
          if (node.type == "MemberExpression") {
            if (node.computed != tpl.computed) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.property, tpl.property, cData);
            this.diff_nodes(node.object, tpl.object, cData);
          }
          if (node.type == "FunctionDeclaration") {
            if (node.generator != tpl.generator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.params, tpl.params, cData, "params");
            this.diff_nodes(node.body, tpl.body, cData, "params");
            this.diff_nodes(node.id, tpl.id, cData);
          }
          if (node.type == "ArrowFunctionExpression") {
            if (node.generator != tpl.generator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.params, tpl.params, cData, "params");
            this.diff_nodes(node.body, tpl.body, cData, "body");
            this.diff_nodes(node.id, tpl.id, cData);
          }
          if (node.type == "FunctionExpression") {
            if (node.generator != tpl.generator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.params, tpl.params, cData, "params");
            this.diff_nodes(node.body, tpl.body, cData, "body");
            this.diff_nodes(node.id, tpl.id, cData);
          }

          if (node.type == "TryStatement") {
            this.diff_nodes(node.block, tpl.block, cData, "block");
            this.diff_nodes(node.handler, tpl.handler, cData, "handler");
            this.diff_nodes(node.finalizer, tpl.finalizer, cData, "finalizer");
          }
          if (node.type == "CallExpression") {
            this.diff_nodes(node.callee, tpl.callee, cData, "callee");
            this.diff_nodes(node.arguments, tpl.arguments, cData, "arguments");
          }
          if (node.type == "SequenceExpression") {
            this.diff_nodes(node.expressions, tpl.expressions, cData, "expressions");
          }
          if (node.type == "BlockStatement") {
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "VariableDeclaration") {
            this.diff_nodes(node.declarations, tpl.declarations, cData, "declarations");
          }
          if (node.type == "YieldExpression") {
            this.diff_nodes(node.argument, tpl.argument, cData, "argument");
          }
          if (node.type == "ReturnStatement") {
            this.diff_nodes(node.argument, tpl.argument, cData);
          }

          if (node.type == "BreakStatement") {
            this.diff_nodes(node.label, tpl.label, cData);
          }

          if (node.type == "MethodDefinition") {
            this.diff_nodes(node.key, tpl.key, cData);
            this.diff_nodes(node.value, tpl.value, cData);
          }
          if (node.type == "ClassDeclaration") {
            this.diff_nodes(node.id, tpl.id, cData);
            this.diff_nodes(node.superClass, tpl.superClass, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "ClassBody") {
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "CatchClause") {
            this.diff_nodes(node.param, tpl.param, cData, "param");
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "NewExpression") {
            this.diff_nodes(node.callee, tpl.callee, cData);
            this.diff_nodes(node.arguments, tpl.arguments, cData, "arguments");
          }
          if (node.type == "ConditionalExpression") {
            this.diff_nodes(node.test, tpl.test, cData, "test");
            this.diff_nodes(node.consequent, tpl.consequent, cData);
            this.diff_nodes(node.alternate, tpl.alternate, cData);
          }
          if (node.type == "DebuggerStatement") {}
          if (node.type == "ThrowStatement") {
            this.diff_nodes(node.argument, tpl.argument, cData);
          }
          if (node.type == "BlockStatement") {
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }

          // LabeledStatement
          if (node.type == "LabeledStatement") {
            this.diff_nodes(node.label, tpl.label, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }

          // LogicalExpression
          if (node.type == "LogicalExpression") {
            if (node.operator != tpl.operator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.left, tpl.left, cData);
            this.diff_nodes(node.right, tpl.right, cData);
          }
          // UnaryExpression
          if (node.type == "UnaryExpression") {
            if (node.operator != tpl.operator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.argument, tpl.argument, cData);
          }
          if (node.type == "Program") {
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "UpdateExpression") {
            if (node.operator != tpl.operator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.argument, tpl.argument, cData);
          }
          if (node.type == "Property") {
            if (node.shorthand != tpl.shorthand) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.key, tpl.key, cData);
            this.diff_nodes(node.value, tpl.value, cData);
          }
          if (node.type == "ArrayPattern") {
            this.diff_nodes(node.elements, tpl.elements, cData, "elements");
          }
          if (node.type == "ArrayExpression") {
            this.diff_nodes(node.elements, tpl.elements, cData, "elements");
          }
          /*
          ArrayExpression
          xArrayPattern
          */
          if (node.type == "ObjectPattern") {
            this.diff_nodes(node.properties, tpl.properties, cData, "properties");
          }

          if (node.type == "ObjectExpression") {
            this.diff_nodes(node.properties, tpl.properties, cData, "properties");
          }

          if (node.type == "RestElement") {
            this.diff_nodes(node.argument, tpl.argument, cData);
          }

          if (node.type == "IfStatement") {
            this.diff_nodes(node.test, tpl.test, cData);
            this.diff_nodes(node.consequent, tpl.consequent, cData);
            this.diff_nodes(node.alternate, tpl.alternate, cData);
          }

          if (node.type == "Super") {
            this.diff_nodes(node.test, tpl.test, cData);
          }
          if (node.type == "SwitchStatement") {
            this.diff_nodes(node.discriminant, tpl.discriminant, cData);
            this.diff_nodes(node.cases, tpl.cases, cData, "cases");
          }
          if (node.type == "SwitchCase") {
            this.diff_nodes(node.test, tpl.test, cData);
            this.diff_nodes(node.consequent, tpl.consequent, cData);
          }
          if (node.type == "ForOfStatement") {
            this.diff_nodes(node.left, tpl.left, cData);
            this.diff_nodes(node.right, tpl.right, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "ForInStatement") {
            this.diff_nodes(node.left, tpl.left, cData);
            this.diff_nodes(node.right, tpl.right, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "ForStatement") {
            this.diff_nodes(node.init, tpl.init, cData);
            this.diff_nodes(node.test, tpl.test, cData);
            this.diff_nodes(node.update, tpl.update, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "WhileStatement") {
            this.diff_nodes(node.test, tpl.test, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "DoWhileStatement") {
            this.diff_nodes(node.test, tpl.test, cData);
            this.diff_nodes(node.body, tpl.body, cData, "body");
          }
          if (node.type == "BinaryExpression") {
            if (node.operator != tpl.operator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.left, tpl.left, cData);
            this.diff_nodes(node.right, tpl.right, cData);
          }
          // declarations
          if (node.type == "VariableDeclarator") {
            if (node.kind != tpl.kind) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.id, tpl.id, cData);
            this.diff_nodes(node.init, tpl.init, cData);
          }
          if (node.type == "ExpressionStatement") {
            this.diff_nodes(node.expression, tpl.expression, cData);
          }
          if (node.type == "AssignmentExpression") {
            if (node.operator != tpl.operator) {
              cData.failed = true;
              return true;
            }
            this.diff_nodes(node.left, tpl.left, cData);
            this.diff_nodes(node.right, tpl.right, cData);
          }
        } catch (e) {
          cData.failed = true;
        }
        /*
        ArrayExpression
        xArrayPattern
        xArrowExpression
        xArrowFunctionExpression
        xAssignmentExpression
        xBinaryExpression
        xBlockStatement
        xBreakStatement
        xbreakWalk
        xCallExpression
        xCatchClause
        xClassBody
        xClassDeclaration
        xConditionalExpression
        xContinueStatement
        xcreateContext
        xcreateId
        xcreateObject
        xDebuggerStatement
        xDoWhileStatement
        xEmptyStatement
        xendBlock
        xendCollecting
        xExpressionStatement
        xfind
        xForInStatement
        xForOfStatement
        xForStatement
        xFunctionDeclaration
        xFunctionExpression
        xgetCode
        xgetLineNumber
        xgetParent
        xgetStructures
        xIdentifier
        xIfStatement
        xindent
        xinit
        xLabeledStatement
        xLiteral
        xLogicalExpression
        xMemberExpression
        xMethodDefinition
        xNewExpression
        xnlIfNot
        xObjectExpression
        xObjectPattern
        xout
        xprevChar
        xProgram
        xProperty
        xpushStructure
        xRestElement
        xReturnStatement
        xsaveNode
        xSequenceExpression
        xskip
        xstartBlock
        xstartCollecting
        xstartWalk
        xSuper
        xSwitchCase
        xSwitchStatement
        xThisExpression
        xThrowStatement
        xTryStatement
        xUnaryExpression
        xUpdateExpression
        xVariableDeclaration
        xVariableDeclarator
        xwalk
        xwalkAsString
        xWhileStatement
        xWithStatement
        xYieldExpression
        */
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {

        this._structures = [];

        this._tabChar = "  ";
        this._codeStr = "";
        this._currentLine = "";
        this._indent = 0;

        if (typeof espree != "undefined") {
          _parser = espree;
          _parserOptions = {

            // attach range information to each node
            range: true,

            // attach line/column location information to each node
            loc: true,

            // create a top-level comments array containing all comments
            comments: true,

            // attach comments to the closest relevant node as leadingComments and
            // trailingComments
            attachComment: true,

            // create a top-level tokens array containing all tokens
            tokens: true,

            // try to continue parsing if an error is encountered, store errors in a
            // top-level errors array
            tolerant: true,

            // specify the language version (3, 5, or 6, default is 5)
            ecmaVersion: 5,

            // specify which type of script you're parsing (script or module, default is script)
            sourceType: "script",

            // specify additional language features
            ecmaFeatures: {

              // enable JSX parsing
              jsx: true,

              // enable return in global scope
              globalReturn: true,

              // allow experimental object rest/spread
              experimentalObjectRestSpread: true
            }
          };
        } else {
          if (typeof esprima != "undefined") {
            _parser = esprima;
            _parserOptions = {};
          }
        }

        this._options = options || {};
      });

      /**
       * @param String varString  - Variables in comma separated format, a,b,foobar etc
       * @param String matchExpression  - String expressin to match
       * @param Object codeBaseAST  - AST nodes
       * @param Function callBackFn
       */
      _myTrait_.match = function (varString, matchExpression, codeBaseAST, callBackFn) {
        var rawAST = codeBaseAST;
        if (varString.trim()) {
          var v_list = varString.trim().split(",").map(function (v) {
            return v.trim();
          });
        } else {
          var v_list = [];
        }

        this.v_list = v_list;

        // The match might be also multilne...
        var matchAST = _parser.parse(matchExpression, _parserOptions); // .body.shift();

        if (matchAST.type == "Program") matchAST = matchAST.body.shift();

        if (matchAST.type == "ExpressionStatement") {
          matchAST = matchAST.expression;
        }

        // this._variables
        var walker = ASTWalker();
        var me = this;

        walker.on("node", function (c) {
          var node = c.node;
          // diff_nodes
          var cData = {
            slots: {}
          };
          me.diff_nodes(node, matchAST, cData);
          if (!cData.failed) {
            var all_found_cnt = 0;
            // Check if all variables have been found...
            v_list.forEach(function (v) {
              if (cData.slots[v]) all_found_cnt++;
            });
            console.log(all_found_cnt, v_list.length);
            // Callback with context and node as parameters...
            if (all_found_cnt == v_list.length) {
              callBackFn({
                node: c.node,
                ctx: c.ctx,
                found: cData.slots
              });
            }
          }
        });

        // First walk...
        walker.startWalk(rawAST, {
          functions: {},
          vars: {}
        });
      };

      /**
       * @param String varString  - Comma separated List of variables (x,y,i, item)
       * @param String matchExpression  - Expression to match
       * @param String newExpression  - Refactor into this expression
       * @param Object codeBaseAST  - AST (Mozilla compatible)
       */
      _myTrait_.refactor = function (varString, matchExpression, newExpression, codeBaseAST) {
        var rawAST = codeBaseAST;
        var v_list = varString.split(",").map(function (v) {
          return v.trim();
        });

        this.v_list = v_list;

        // The match might be also multilne...
        var matchAST = _parser.parse(matchExpression, _parserOptions); // .body.shift();
        var intoAST = _parser.parse(newExpression, _parserOptions); // .body.shift();       

        if (matchAST.type == "Program") matchAST = matchAST.body.shift();
        if (intoAST.type == "Program") intoAST = intoAST.body.shift();

        if (matchAST.type == "ExpressionStatement") {
          matchAST = matchAST.expression;
        }

        // this._variables
        var walker = ASTWalker();
        var me = this;

        walker.on("node", function (c) {
          var node = c.node;
          // diff_nodes
          var cData = {
            slots: {}
          };
          me.diff_nodes(node, matchAST, cData);
          if (!cData.failed) {
            var all_found = true;
            // Check if all variables have been found...
            v_list.forEach(function (v) {
              if (!cData.slots[v]) all_found = false;
            });

            if (all_found) {
              var matchWalk = ASTWalker();
              // var matchAST = esprima.parse(matchExpression).body.shift();
              var intoAST = esprima.parse(newExpression);
              if (intoAST.type == "Program") intoAST = intoAST.body.shift();
              if (intoAST.type == "ExpressionStatement") intoAST = intoAST.expression;
              /*
                cData.slots["...rest"] = {
                      srcArray : node,
                      tplArray : tpl,
                      tplNodeIndex : t_rest_index,
                      tplNode : tt
                };             
              */
              matchWalk.on("Literal", function (n) {
                var toReplace = n.node,
                    name = toReplace.value,
                    exprContent = cData.slots[name];

                if (!exprContent) return;
                if (name == "...rest") {
                  if (exprContent.srcArray) {
                    var src_arr_index = exprContent.tplNodeIndex;
                    var mp = matchWalk.getParent(toReplace);
                    if (mp.type == "ExpressionStatement") {
                      toReplace = mp;
                      mp = matchWalk.getParent(mp);
                    }
                    var arrName = exprContent.array_name || "body";
                    // TODO: add here function params etc. possibility to replace multiple statement arrays...
                    if (mp[arrName]) {
                      var match_node_index = mp[arrName].indexOf(toReplace);
                      var steps_to_take = exprContent.srcArray.length - src_arr_index;
                      // mp.body.splice(i,1);
                      for (var i = match_node_index; steps_to_take > 0; steps_to_take--, i++) {
                        // mp.body.push( pArray[i] );
                        mp[arrName][i] = exprContent.srcArray[src_arr_index++];
                      }
                      return;
                    }
                  }
                }
              });
              matchWalk.on("Identifier", function (n) {
                var toReplace = n.node,
                    name = toReplace.name,
                    exprContent = cData.slots[name];

                if (!exprContent) return;
                Object.keys(exprContent).forEach(function (k) {
                  toReplace[k] = exprContent[k];
                });
              });
              matchWalk.startWalk(intoAST, {
                functions: {},
                vars: {}
              });
              Object.keys(intoAST).forEach(function (k) {
                node[k] = intoAST[k];
              });
            }
          }
        });

        // First walk...
        walker.startWalk(rawAST, {
          functions: {},
          vars: {}
        });

        // Do it again to create modified data
        var newData = ASTWalker();
        newData.startWalk(rawAST, {
          functions: {},
          vars: {}
        });

        return {
          code: newData.getCode(),
          ast: rawAST
        };
      };
    })(this);
  };

  var ASTRefactor = function ASTRefactor(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof ASTRefactor) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != ASTRefactor._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new ASTRefactor(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  ASTRefactor._classInfo = {
    name: "ASTRefactor"
  };
  ASTRefactor.prototype = new ASTRefactor_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["ASTRefactor"] = ASTRefactor;
      this.ASTRefactor = ASTRefactor;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["ASTRefactor"] = ASTRefactor;
    } else {
      this.ASTRefactor = ASTRefactor;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());