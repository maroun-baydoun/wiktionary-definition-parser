## wiktionary-definition-parser
##### Parse a Wiktionary word's definitions


### Install

``` 
npm install wiktionary-definition-parser
```

### Usage

``` ts

import parse from 'wiktionary-definition-parser';
 
const wikitext = '...';
const startIndex = ...; // The text between this index and the first line not beginning with a # will be parsed

const definitions = parse(wikitext, startIndex);

[
    'first defintion',
    'second definition',
    ...
]
```