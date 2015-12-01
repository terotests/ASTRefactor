(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var i=this._ev[e],n=0;n<i.length;n++)if(i[n]==t)return void i.splice(n,1)},e.trigger=function(e,t,i){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,i)}),this}}}(this),function(e){e.diff_nodes=function(e,t,i){if(i.failed)return!0;if(e||t){if(e&&!t||!e&&t)return i.failed=!0,!0;if(e instanceof Array&&t instanceof Array)for(var n=0;n<e.length;n++){var s=e[n],f=t[n],o=f;if("ExpressionStatement"==o.type&&(o=o.expression),o&&"Identifier"==o.type&&"codeBlock"==o.name){i.slots[o.name]=[e,s];break}this.diff_nodes(s,f,i)}else{if("Identifier"==t.type&&t.name&&t.name&&v_list.indexOf(t.name)>=0)return void("codeBlock"==t.name||(i.slots[t.name]=e));if(e.type!=t.type)return i.failed=!0,!0;if("Literal"==e.type&&e.value!=t.value)return i.failed=!0,!0;if("Identifier"==e.type&&e.name!=t.name)return i.failed=!0,!0;if("MemberExpression"==e.type){if(e.computed!=t.computed)return i.failed=!0,!0;this.diff_nodes(e.property,t.property,i),this.diff_nodes(e.object,t.object,i)}if("FunctionDeclaration"==e.type){if(e.generator!=t.generator)return i.failed=!0,!0;this.diff_nodes(e.params,t.params,i),this.diff_nodes(e.body,t.body,i),this.diff_nodes(e.id,t.id,i)}if("ArrowFunctionExpression"==e.type){if(e.generator!=t.generator)return i.failed=!0,!0;this.diff_nodes(e.params,t.params,i),this.diff_nodes(e.body,t.body,i),this.diff_nodes(e.id,t.id,i)}if("FunctionExpression"==e.type){if(e.generator!=t.generator)return i.failed=!0,!0;this.diff_nodes(e.params,t.params,i),this.diff_nodes(e.body,t.body,i),this.diff_nodes(e.id,t.id,i)}if("TryStatement"==e.type&&(this.diff_nodes(e.block,t.block,i),this.diff_nodes(e.handler,t.handler,i),this.diff_nodes(e.finalizer,t.finalizer,i)),"CallExpression"==e.type&&(this.diff_nodes(e.callee,t.callee,i),this.diff_nodes(e.arguments,t.arguments,i)),"SequenceExpression"==e.type&&this.diff_nodes(e.expressions,t.expressions,i),"BlockStatement"==e.type&&this.diff_nodes(e.body,t.body,i),"VariableDeclaration"==e.type&&this.diff_nodes(e.declarations,t.declarations,i),"YieldExpression"==e.type&&this.diff_nodes(e.argument,t.argument,i),"ReturnStatement"==e.type&&this.diff_nodes(e.argument,t.argument,i),"BreakStatement"==e.type&&this.diff_nodes(e.label,t.label,i),"MethodDefinition"==e.type&&(this.diff_nodes(e.key,t.key,i),this.diff_nodes(e.value,t.value,i)),"ClassDeclaration"==e.type&&(this.diff_nodes(e.id,t.id,i),this.diff_nodes(e.superClass,t.superClass,i),this.diff_nodes(e.body,t.body,i)),"ClassBody"==e.type&&this.diff_nodes(e.body,t.body,i),"CatchClause"==e.type&&(this.diff_nodes(e.param,t.param,i),this.diff_nodes(e.body,t.body,i)),"NewExpression"==e.type&&(this.diff_nodes(e.callee,t.callee,i),this.diff_nodes(e.arguments,t.arguments,i)),"ConditionalExpression"==e.type&&(this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.consequent,t.consequent,i),this.diff_nodes(e.alternate,t.alternate,i)),"DebuggerStatement"==e.type,"ThrowStatement"==e.type&&this.diff_nodes(e.argument,t.argument,i),"BlockStatement"==e.type&&this.diff_nodes(e.body,t.body,i),"LabeledStatement"==e.type&&(this.diff_nodes(e.label,t.label,i),this.diff_nodes(e.body,t.body,i)),"LogicalExpression"==e.type){if(e.operator!=t.operator)return i.failed=!0,!0;this.diff_nodes(e.left,t.left,i),this.diff_nodes(e.right,t.right,i)}if("UnaryExpression"==e.type){if(e.operator!=t.operator)return i.failed=!0,!0;this.diff_nodes(e.argument,t.argument,i)}if("Program"==e.type&&this.diff_nodes(e.body,t.body,i),"UpdateExpression"==e.type){if(e.operator!=t.operator)return i.failed=!0,!0;this.diff_nodes(e.argument,t.argument,i)}if("Property"==e.type){if(e.shorthand!=t.shorthand)return i.failed=!0,!0;this.diff_nodes(e.key,t.key,i),this.diff_nodes(e.value,t.value,i)}if("ArrayPattern"==e.type&&this.diff_nodes(e.elements,t.elements,i),"ArrayExpression"==e.type&&this.diff_nodes(e.elements,t.elements,i),"ObjectPattern"==e.type&&this.diff_nodes(e.properties,t.properties,i),"ObjectExpression"==e.type&&this.diff_nodes(e.properties,t.properties,i),"RestElement"==e.type&&this.diff_nodes(e.argument,t.argument,i),"IfStatement"==e.type&&(this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.consequent,t.consequent,i),this.diff_nodes(e.alternate,t.alternate,i)),"Super"==e.type&&this.diff_nodes(e.test,t.test,i),"SwitchStatement"==e.type&&(this.diff_nodes(e.discriminant,t.discriminant,i),this.diff_nodes(e.cases,t.cases,i)),"SwitchCase"==e.type&&(this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.consequent,t.consequent,i)),"ForOfStatement"==e.type&&(this.diff_nodes(e.left,t.left,i),this.diff_nodes(e.right,t.right,i),this.diff_nodes(e.body,t.body,i)),"ForInStatement"==e.type&&(this.diff_nodes(e.left,t.left,i),this.diff_nodes(e.right,t.right,i),this.diff_nodes(e.body,t.body,i)),"ForStatement"==e.type&&(this.diff_nodes(e.init,t.init,i),this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.update,t.update,i),this.diff_nodes(e.body,t.body,i)),"WhileStatement"==e.type&&(this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.body,t.body,i)),"DoWhileStatement"==e.type&&(this.diff_nodes(e.test,t.test,i),this.diff_nodes(e.body,t.body,i)),"BinaryExpression"==e.type){if(e.operator!=t.operator)return i.failed=!0,!0;this.diff_nodes(e.left,t.left,i),this.diff_nodes(e.right,t.right,i)}if("VariableDeclarator"==e.type){if(e.kind!=t.kind)return i.failed=!0,!0;this.diff_nodes(e.id,t.id,i),this.diff_nodes(e.init,t.init,i)}if("ExpressionStatement"==e.type&&this.diff_nodes(e.expression,t.expression,i),"AssignmentExpression"==e.type){if(e.operator!=t.operator)return i.failed=!0,!0;this.diff_nodes(e.left,t.left,i),this.diff_nodes(e.right,t.right,i)}}}},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{}}),e.refactor=function(e,t,i,n){{var s=n,f=e.split(",").map(function(e){return e.trim()}),o=esprima.parse(t);esprima.parse(i)}"ExpressionStatement"==o.type&&(o=o.expression);var r=ASTWalker(),d=this;r.on("node",function(e){var t=e.node,n={slots:{}};if(d.diff_nodes(t,o,n),!n.failed){var s=!0;if(f.forEach(function(e){n.slots[e]||(s=!1)}),s){var r=ASTWalker(),a=esprima.parse(i).body.shift();"ExpressionStatement"==o.type&&(o=o.expression),"ExpressionStatement"==a.type&&(a=a.expression),r.on("Identifier",function(e){var t=e.node,i=t.name,s=n.slots[i];if(s){if("codeBlock"==i){var f=s[0],o=s[1];if(f){var d=f.indexOf(o),a=r.getParent(t);if("ExpressionStatement"==a.type&&(a=r.getParent(a)),a.body){{a.body.indexOf(t)}a.body.splice(p,1);for(var p=d;p<f.length;p++)a.body.push(f[p]);return}}}Object.keys(s).forEach(function(e){t[e]=s[e]})}}),r.startWalk(a,{functions:{},vars:{}})}}}),r.startWalk(s,{functions:{},vars:{}});var a=ASTWalker();return a.startWalk(s,{functions:{},vars:{}}),{code:a.getCode(),ast:s}}}(this)},i=function(e,t,n,s,f,o,r,d){var a,p=this;if(!(p instanceof i))return new i(e,t,n,s,f,o,r,d);var h=[e,t,n,s,f,o,r,d];if(p.__factoryClass)if(p.__factoryClass.forEach(function(e){a=e.apply(p,h)}),"function"==typeof a){if(a._classInfo.name!=i._classInfo.name)return new a(e,t,n,s,f,o,r,d)}else if(a)return a;p.__traitInit?p.__traitInit.forEach(function(e){e.apply(p,h)}):"function"==typeof p.init&&p.init.apply(p,h)};i._classInfo={name:"ASTRefactor"},i.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTRefactor=i,this.ASTRefactor=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTRefactor=i:this.ASTRefactor=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());