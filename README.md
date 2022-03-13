# simple-workbook

A sandbox tool that lets users bundle and execute JavaScript code via in-browser compilation.

Content creation and result generation is done using re-sizeable cells.

As of now, <strong>simple-workbook</strong> enables users to create content utilizing markdown and HTML/CSS/JS.

Following are the features supported by <strong>simple-workbook</strong>:

- ✅ Execute HTML/CSS/JS code in-browser
- ✅ Generate previews for markdown text
- ✅ Create/Edit/Delete or re-order cells
- ✅ Supports JSX syntax
- ✅ Resizable cells
- ✅ Intellisense for JavaScript powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- ✅ Create/Save/Edit workbooks
- ✅ Cell duplication
- ✅ Context binding for JavaScript across different cells

This project can also be downloaded as set of NPM packages
- CLI package : [@simple-workbook/cli](https://www.npmjs.com/package/@simple-workbook/cli)
- React App package : [@simple-workbook/local-client](https://www.npmjs.com/package/@simple-workbook/local-client)
- Local API package : [@simple-workbook/local-api](https://www.npmjs.com/package/@simple-workbook/local-api)
                        
For trying the CLI, run the following code to download and execute the package:
```console
$ npx @simple-workbook/cli serve
```

The bundling of the JavaScript code is done with the help of [esbuild](https://esbuild.github.io/).

The frontend application is built with the help of [React](https://reactjs.org/) and [Redux](https://redux.js.org/) for state management.

## Basic Architecture

<img src="images\simple-workbook-arch.png"
     alt="basic architecture"/>
                         
