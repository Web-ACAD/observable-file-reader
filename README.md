[![NPM version](https://img.shields.io/npm/v/@webacad/observable-file-reader.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/observable-file-reader)
[![Build Status](https://img.shields.io/travis/Web-ACAD/observable-file-reader.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/observable-file-reader)

# WebACAD/ObservableFileReader

Read file inputs with rxjs observables.

## Dependencies

* `rxjs`

## Installation

```bash
$ npm install --save @webacad/observable-file-reader
```

or with yarn

```bash
$ yarn add @webacad/observable-file-reader
```

## Usage

```typescript
import {readFileAsDataURL} from '@webacad/observable-file-reader';

const file = (<HTMLInputElement>document.querySelector('#myFileInput')).files[0];

readFileAsDataURL(file).subscribe((data: string) => {
    console.log('done');
    console.log(data);
});
```

## Available functions

* `readFileAsDataURL`: same as [FileReader.readAsDataURL](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)
* `readFileAsBase64`: same as `readFileAsDataURL` function but strips the base64 url prefix
* `readFileInChunksAsDataURL`: same as `readFileAsDataURL` function, but emitted in chunks
* `readFileInChunksAsBase64`: same as `readFileAsBase64` function, but emitted in chunks
