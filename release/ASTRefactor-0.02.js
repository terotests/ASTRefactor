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

      // Initialize static variables here...

      /**
       * @param Object node
       * @param float tpl
       * @param float cData
       */
      _myTrait_.diff_nodes = function (node, tpl, cData) {

        if (cData.failed) return true;

        if (!node && !tpl) return;

        if (node && !tpl || !node && tpl) {
          cData.failed = true;
          return true;
        }

        var v_list = this.v_list;

        if (node instanceof Array && tpl instanceof Array) {

          for (var i = 0; i < node.length; i++) {
            var n = node[i],
                t = tpl[i];
            var test = t;
            if (test.type == "ExpressionStatement") test = test.expression;
            if (test && test.type == "Identifier" && test.name == "codeBlock") {
              // the rest are skipped
              cData.slots[test.name] = [node, n];
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
          this.diff_nodes(node.params, tpl.params, cData);
          this.diff_nodes(node.body, tpl.body, cData);
          this.diff_nodes(node.id, tpl.id, cData);
        }
        if (node.type == "ArrowFunctionExpression") {
          if (node.generator != tpl.generator) {
            cData.failed = true;
            return true;
          }
          this.diff_nodes(node.params, tpl.params, cData);
          this.diff_nodes(node.body, tpl.body, cData);
          this.diff_nodes(node.id, tpl.id, cData);
        }
        if (node.type == "FunctionExpression") {
          if (node.generator != tpl.generator) {
            cData.failed = true;
            return true;
          }
          this.diff_nodes(node.params, tpl.params, cData);
          this.diff_nodes(node.body, tpl.body, cData);
          this.diff_nodes(node.id, tpl.id, cData);
        }

        if (node.type == "TryStatement") {
          this.diff_nodes(node.block, tpl.block, cData);
          this.diff_nodes(node.handler, tpl.handler, cData);
          this.diff_nodes(node.finalizer, tpl.finalizer, cData);
        }
        if (node.type == "CallExpression") {
          this.diff_nodes(node.callee, tpl.callee, cData);
          this.diff_nodes(node.arguments, tpl.arguments, cData);
        }
        if (node.type == "SequenceExpression") {
          this.diff_nodes(node.expressions, tpl.expressions, cData);
        }
        if (node.type == "BlockStatement") {
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "VariableDeclaration") {
          this.diff_nodes(node.declarations, tpl.declarations, cData);
        }
        if (node.type == "YieldExpression") {
          this.diff_nodes(node.argument, tpl.argument, cData);
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
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "ClassBody") {
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "CatchClause") {
          this.diff_nodes(node.param, tpl.param, cData);
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "NewExpression") {
          this.diff_nodes(node.callee, tpl.callee, cData);
          this.diff_nodes(node.arguments, tpl.arguments, cData);
        }
        if (node.type == "ConditionalExpression") {
          this.diff_nodes(node.test, tpl.test, cData);
          this.diff_nodes(node.consequent, tpl.consequent, cData);
          this.diff_nodes(node.alternate, tpl.alternate, cData);
        }
        if (node.type == "DebuggerStatement") {}
        if (node.type == "ThrowStatement") {
          this.diff_nodes(node.argument, tpl.argument, cData);
        }
        if (node.type == "BlockStatement") {
          this.diff_nodes(node.body, tpl.body, cData);
        }

        // LabeledStatement
        if (node.type == "LabeledStatement") {
          this.diff_nodes(node.label, tpl.label, cData);
          this.diff_nodes(node.body, tpl.body, cData);
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
          this.diff_nodes(node.body, tpl.body, cData);
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
          this.diff_nodes(node.elements, tpl.elements, cData);
        }
        if (node.type == "ArrayExpression") {
          this.diff_nodes(node.elements, tpl.elements, cData);
        }
        /*
        ArrayExpression
        xArrayPattern
        */
        if (node.type == "ObjectPattern") {
          this.diff_nodes(node.properties, tpl.properties, cData);
        }

        if (node.type == "ObjectExpression") {
          this.diff_nodes(node.properties, tpl.properties, cData);
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
          this.diff_nodes(node.cases, tpl.cases, cData);
        }
        if (node.type == "SwitchCase") {
          this.diff_nodes(node.test, tpl.test, cData);
          this.diff_nodes(node.consequent, tpl.consequent, cData);
        }
        if (node.type == "ForOfStatement") {
          this.diff_nodes(node.left, tpl.left, cData);
          this.diff_nodes(node.right, tpl.right, cData);
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "ForInStatement") {
          this.diff_nodes(node.left, tpl.left, cData);
          this.diff_nodes(node.right, tpl.right, cData);
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "ForStatement") {
          this.diff_nodes(node.init, tpl.init, cData);
          this.diff_nodes(node.test, tpl.test, cData);
          this.diff_nodes(node.update, tpl.update, cData);
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "WhileStatement") {
          this.diff_nodes(node.test, tpl.test, cData);
          this.diff_nodes(node.body, tpl.body, cData);
        }
        if (node.type == "DoWhileStatement") {
          this.diff_nodes(node.test, tpl.test, cData);
          this.diff_nodes(node.body, tpl.body, cData);
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

        this._options = options || {};
      });

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
        var matchAST = esprima.parse(matchExpression); // .body.shift();
        var intoAST = esprima.parse(newExpression); // .body.shift();       

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
              var intoAST = esprima.parse(newExpression).body.shift();

              if (matchAST.type == "ExpressionStatement") matchAST = matchAST.expression;
              if (intoAST.type == "ExpressionStatement") intoAST = intoAST.expression;

              matchWalk.on("Identifier", function (n) {
                var toReplace = n.node,
                    name = toReplace.name,
                    exprContent = cData.slots[name];

                if (!exprContent) return;
                if (name == "codeBlock") {

                  var pArray = exprContent[0],
                      pNode = exprContent[1];
                  if (pArray) {
                    var node_index = pArray.indexOf(pNode);
                    var mp = matchWalk.getParent(toReplace);
                    if (mp.type == "ExpressionStatement") mp = matchWalk.getParent(mp);
                    if (mp.body) {
                      var match_node_index = mp.body.indexOf(toReplace);
                      mp.body.splice(i, 1);
                      for (var i = node_index; i < pArray.length; i++) {
                        mp.body.push(pArray[i]);
                      }
                      return;
                    }
                  }
                }
                Object.keys(exprContent).forEach(function (k) {
                  toReplace[k] = exprContent[k];
                });
              });
              matchWalk.startWalk(intoAST, {
                functions: {},
                vars: {}
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