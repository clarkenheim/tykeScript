'use strict';

const fs = require('fs');
const path = require('path');

const parser = require('./tykescript').parser;
const TykeBuild = require('./TykeBuild');
const TykeTranslate = require('./TykeTranslate');
const TykeGenerate = require('./TykeGenerate');

var source = fs.readFileSync(process.argv[2], 'utf-8');
var outputPath = path.basename(process.argv[2], '.tyke');

var tBuild = new TykeBuild();

parser.yy = tBuild;

// try{
	var parsed = parser.parse(source);
// }catch(e){
//  	console.log('Ey Up!');
//  	console.log(e.message);
//  	process.exit();
// }

var tree = parsed.getTree();
var translator = new TykeTranslate(tree);
var jsTree = translator.translate();
var generator = new TykeGenerate(jsTree);
var output = generator.generate();

fs.writeFileSync(outputPath + '.js', output, 'utf-8');
