import * as fs from 'fs';
import { resolve } from 'path';
import { ViteDevServer } from 'vite';
import { default as Parser, Query } from 'tree-sitter';
import { default as TS } from 'tree-sitter-typescript';
import { inspect } from 'util';
const parser = new Parser();
const query = new Query(
  TS.tsx,
  `
declaration: (type_alias_declaration
  name: (type_identifier) @text
    (intersection_type
    (object_type

      (comment) @commnet
      .
      (property_signature
          name: (_) @prop
          type: (type_annotation (_) @type)
      )
    )
  )
)
`,
);
//const query = new Query(
//  TS.tsx,
//  `
//(type_alias_declaration
//    name: (type_identifier) @text
//(intersection_type
//(object_type) @test
//) @hi
//)
//`,
//);
parser.setLanguage(TS.tsx);
export default function autoAPI() {
  return {
    name: 'watch-monorepo-changes',
    configureServer(server: ViteDevServer) {
      const watchPath = resolve(__dirname, '../../packages/kit-headless');
      server.watcher.on('change', (file: string) => {
        if (file.startsWith(watchPath)) {
          loopOnAllChildFiles(file);
        }
      });
    },
  };
}
// the object should have this general structure, arranged from parent to child
// componentName:[subComponent,subcomponent,...]
// subComponentName:[publicType,publicType,...]
// publicType:[{ comment,prop,type },{ comment,prop,type },...]
// THEY UPPER-MOST KEY IS ALWAYS USED AS A HEADING
export type ComponentParts = Record<string, SubComponents>;
type SubComponents = SubComponent[];
export type SubComponent = Record<string, PublicType[]>;
export type PublicType = Record<string, ParsedProps[]>;
type ParsedProps = {
  comment: string;
  prop: string;
  type: string;
};
function parseSingleComponentFromDir(path: string, ref: SubComponents) {
  const component_name = /\/([\w-]*).tsx/.exec(path);
  if (component_name === null || component_name[1] === null) {
    // may need better behavior
    return;
  }
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const tree = parser.parse(sourceCode);
  const matches = query.matches(tree.rootNode);
  let count = 1;
  console.log(matches);

  matches.forEach((match) => {
    match.captures.forEach((lol) => console.log(lol.node.text));
    console.log(match, count);
    count++;
    //console.log(match.setProperties);
    //console.log(match.refutedProperties);
    //console.log(match.assertedProperties);
    //console.log(match.text);
    //console.log(match.node);
    //console.log(match.name);
  });

  const comments = extractPublicTypes(sourceCode);
  const parsed: PublicType[] = [];
  for (const comment of comments) {
    const api = extractComments(comment.string);
    const pair: PublicType = { [comment.label]: api };
    parsed.push(pair);
  }
  const completeSubComponent: SubComponent = { [component_name[1]]: parsed };
  ref.push(completeSubComponent);
  return ref;
}

function extractPublicTypes(strg: string) {
  const getPublicTypes = /type Public([A-Z][\w]*)*[\w\W]*?{([\w|\W]*?)}(;| &)/gm;
  const cms = [];
  let groups;
  while ((groups = getPublicTypes.exec(strg)) !== null) {
    const string = groups[2];
    cms.push({ label: groups[1], string });
  }
  return cms;
}
function extractComments(strg: string): ParsedProps[] {
  const magical_regex =
    /^\s*?\/[*]{2}\n?([\w|\W|]*?)\s*[*]{1,2}[/]\n[ ]*([\w|\W]*?): ([\w|\W]*?);?$/gm;

  const cms = [];
  let groups;

  while ((groups = magical_regex.exec(strg)) !== null) {
    const trimStart = /^ *|(\* *)/g;
    const comment = groups[1].replaceAll(trimStart, '');
    const prop = groups[2];
    const type = groups[3];
    cms.push({ comment, prop, type });
  }
  return cms;
}
function writeToDocs(fullPath: string, componentName: string, api: ComponentParts) {
  if (fullPath.includes('kit-headless')) {
    const relDocPath = `../website/src/routes//docs/headless/${componentName}`;
    const fullDocPath = resolve(__dirname, relDocPath);
    const dirPath = fullDocPath.concat('/auto-api');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const json = JSON.stringify(api, null, 2);
    const hacky = `export const api=${json}`;

    try {
      fs.writeFileSync(dirPath.concat('/api.ts'), hacky);
      console.log('auto-api: succesfully genereated new json!!! :)');
    } catch (err) {
      return;
    }
  }
}
function loopOnAllChildFiles(filePath: string) {
  const childComponentRegex = /\/([\w-]*).tsx$/.exec(filePath);
  if (childComponentRegex === null) {
    return;
  }
  const parentDir = filePath.replace(childComponentRegex[0], '');
  const componentRegex = /\/(\w*)$/.exec(parentDir);
  if (!fs.existsSync(parentDir) || componentRegex == null) {
    return;
  }
  const componentName = componentRegex[1];
  const allParts: SubComponents = [];
  const store: ComponentParts = { [componentName]: allParts };
  fs.readdirSync(parentDir).forEach((fileName) => {
    if (/tsx$/.test(fileName)) {
      const fullPath = parentDir + '/' + fileName;
      parseSingleComponentFromDir(fullPath, store[componentName]);
    }
  });

  writeToDocs(filePath, componentName, store);
}
