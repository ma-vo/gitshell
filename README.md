Gitshell
==========================
These rules are adopted from [the AngularJS commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

* [Goal](#goal)
* [Requierments](#requierments)
* [How to install](#how-to-install)
* [Format of the commit message](#format-of-the-commit-message)
  * [Subject line](#subject-line)
    * [Allowed `<type>`](#allowed-type)
    * [Allowed `<scope>`](#allowed-scope)
    * [`<subject>` text](#subject-text)
* [Examples](#examples)

Goal
-----
* enhace git commiting syntax in teams or organizations

Requierments
-----
* [node](https://nodejs.org/en/) >= v6.4

How to install
-----------------------
install gitshell
```bash
npm i -g @mavo/gitshell
```

change directory to gitshell and create symlinks
```bash
cd /usr/local/lib/node_modules/@mavo/gitshell
npm link
```

How to develop
-----------------------
try module out
```bash
node ./bin/gitshell.js m
```

---

Format of the commit message
----------------------------
```
<type>(<scope>:<ticket>): <subject>
```

### Subject line        
Subject line contains succinct description of the change.

#### Allowed `<type>`
* feat (feature)
* fix (bug fix)
* docs (documentation)
* style (formatting, missing semi colons, …)
* refactor
* test (when adding missing tests)
* chore (maintain)

#### Allowed `<scope>`
Scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...

#### `<subject>` text
* use imperative, present tense: “change” not “changed” nor “changes”
* don't capitalize first letter
* no dot (.) at the end

Examples
--------
```
feat($browser:JIRA-123) onUrlChange event (popstate/hashchange/polling)

fix($compile:SHC-123) couple of unit tests for IE9

feat(directive:ELD-123) ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected

style($location:JIRA-123) add couple of missing semi colons

docs(guide:JIRA-123) updated fixed docs from Google Docs

feat($compile:JIRA-123) simplify isolate scope bindings
```
