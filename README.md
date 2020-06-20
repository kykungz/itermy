# `itermy`

iTerm2 tabs and panes automation. Create multiple tabs and split panes with
JavaScript code.

## Installation

```sh
yarn add @kykungz/itermy
```

## Usage

```ts
import itermy from '@kykungz/itermy'

itermy()
  // New tab with 2 vertically split panes
  .newTab([
    { commands: `ls` }, // Single command
    { commands: [`cd ~/Desktop`, `ls`] }, // Sequential commands
  ])
  // New tab with 2 horizontally split panes and 1 pane on the right
  .newTab([
    [
      { commands: `ls` },
      { commands: `ls` }
    ],
    { commands: `ls` }
  ])
  .start()
```

## Examples

### Simple two pane window

```
.------------------.------------------.
| (0)              | (1)              |
|                  |                  |
|                  |                  |
|                  |                  |
|                  |                  |
|                  |                  |
|                  |                  |
|                  |                  |
|                  |                  |
'------------------'------------------'
```

```ts
import itermy from '@kykungz/itermy'

itermy()
  .newTab([
    { commands: `echo '0'` },
    { commands: `echo '1'` }
  ])
  .start()
```

### Simple three pane window

```
.------------.-------------.------------.
| (0)        | (1)         | (2)        |
|            |             |            |
|            |             |            |
|            |             |            |
|            |             |            |
|            |             |            |
|            |             |            |
|            |             |            |
|            |             |            |
'------------'-------------'------------'
```

```ts
import itermy from '@kykungz/itermy'

itermy()
  .newTab([
    { commands: `echo '0'` }
    { commands: `echo '1'` }
    { commands: `echo '2'` }
  ])
  .start()
```

### Simple three pane window (horizontal)

```
.------------------.------------------.
| (0)              | (2)              |
|                  |                  |
|                  |                  |
|                  |                  |
|------------------|                  |
| (1)              |                  |
|                  |                  |
|                  |                  |
|                  |                  |
'------------------'------------------'
```

```ts
import itermy from '@kykungz/itermy'

itermy()
  .newTab([
    [
      { commands: `echo '0'` },
      { commands: `echo '1'` }
    ],
    { commands: `echo '2'` }
  ])
  .start()
```

### Simple four pane window

```
.------------------.------------------.
| (0)              | (2)              |
|                  |                  |
|                  |                  |
|                  |                  |
|------------------|------------------|
| (1)              | (3)              |
|                  |                  |
|                  |                  |
|                  |                  |
'------------------'------------------'
```

```ts
import itermy from '@kykungz/itermy'

itermy()
  .newTab([
    [
      { commands: `echo '0'` },
      { commands: `echo '1'` }
    ],
    [
      { commands: `echo '2'` },
      { commands: `echo '3'` },
    ]
  ])
  .start()
```
