# TypeScript API for TestComplete

Inspired by https://github.com/falafelsoftware/testcomplete-typescript

## How to use

1. Clone this repo somewhere around, for example in `./tools/` inside your TestComplete project folder

```powershell
git clone https://github.com/deitry/testcomplete-ts-api ./tools/
```

2. Run code generation scripts that will expose project-dependent things:

```powershell
# name mappings
python3.exe ./tools/nameMapping.gen.py "./NameMapping/NameMapping.tcNM" "./tools/api/nameMapping.d.ts"

# project variables
python3.exe ./tools/project.gen.py "./ProjectName.mds" "./tools/api/project.d.ts"

# tested apps
python3.exe ./tools/testedApps.gen.py "./TestedApps/TestedApps.tcTAs" "./tools/api/testedApps.d.ts"
```

3. Add `jsconfig.json` to your `Script` folder where you can set path to TypeScript API modules and whatever you like:

```json
{
    "compilerOptions": {
        "target": "es5",
        "checkJs": true,
        "strict": true,
        "strictFunctionTypes": true,
        "baseUrl": ".",
    },
    "include": [
        "./*.js",
        "../tools/api/*.ts",
    ],
}
```

4. Use the power of type checking in your `Script/*.js`! Search through TestComplete API via IntelliSense in VS Code!
