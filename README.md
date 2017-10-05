# codemaker

Makes code. Well.. just a simple text writer with support for:

 1. Blocks (indentation/open/close)
 2. Supports multiple files (with subdirectories)
 3. Exclusion of files

```js
import { SourceFiles } from 'codemaker'

let sources = new SourceFiles();
sources.openFile('myfile.js');
sources.line('first line');
sources.openBlock('open');
sources.line('second line');
sources.closeBlock();
sources.indent('generic open [');
sources.line('boom');
sources.line('bam');
sources.unindent(']');
sources.closeFile('myfile.js');

let yourfileRelativePath = './relative/subdirs/are/also/supported/yourfile.js';
sources.openFile(yourfileRelativePath);
sources.line('this is your file speaking');

// change indentation and block formatting
sources.indentation = 10;
sources.openBlockFormatter = s => `(--- ${s} ---`;
sources.closeBlockFormatter = s => `--- ${s} ---)`;

sources.openBlock('block1');
sources.line('block1.line1');
sources.line('block1.line2');
sources.openBlock('block2');
sources.line('block2.line1');
sources.closeBlock('block2 (close)');
sources.line('block1.line3');
sources.closeBlock('block1 (close)');

// closeFile will ensure that you are closing the same file.
sources.closeFile(yourfileRelativePath);

// files can also be excluded by adding their path to exclude()
sources.openFile('rel/excluded.txt');
sources.line('this file will not be emitted in save()');
sources.closeFile('rel/excluded.txt');

// later in the day
sources.exclude('rel/excluded.txt');

// returns a sorted list of output files
let files = await sources.save('/tmp/source-files');
```

* /tmp/source-files/myfile.js:

```
first line
open {
    second line
}
generic open [
    boom
    bam
]
```

* /tmp/source-files/relative/subdirs/are/also/supported/yourfile.js:

```
this is your file speaking
(--- block1 ---
          block1.line1
          block1.line2
          (--- block2 ---
                    block2.line1
          --- block2 (close) ---)
          block1.line3
--- block1 (close) ---)
```

Neat.

Also bundles a couple of case utils from **sindresorhus**:

```js
sources.toCamelCase(s, ...)
sources.toPascalCase(s, ...)
sources.toSnakCase(s, sep = '_')
```

# License

See [Apache License](LICENSE).
