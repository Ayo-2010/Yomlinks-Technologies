Download Inter fonts and place `woff2` files in this `fonts/` folder.

Recommended (PowerShell):

1. Change to the project folder:

```powershell
cd "C:\Users\user\Desktop\computer"
```

2. Download the Inter release zip from GitHub and extract (this example uses v3.19 — adjust if newer):

```powershell
Invoke-WebRequest -Uri "https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip" -OutFile inter.zip
Expand-Archive -LiteralPath inter.zip -DestinationPath fonts_tmp
```

3. Copy woff2 files into `fonts/` and clean up:

```powershell
New-Item -ItemType Directory -Force -Path fonts
Get-ChildItem -Path fonts_tmp -Recurse -Include *.woff2 | ForEach-Object { Copy-Item $_.FullName -Destination fonts }
Remove-Item inter.zip
Remove-Item -Recurse -Force fonts_tmp
```

4. Verify `fonts/` contains files such as `Inter-VariableFont_slnt,wght.woff2`, `Inter-Regular.woff2`, `Inter-Bold.woff2`.

Notes:
- If GitHub release URL changes, visit https://github.com/rsms/inter/releases to pick a release and update the URL.
- Alternatively, download woff2 files from Google Fonts or the Inter GitHub repo manually and place them here.
- After placing fonts, the site will use the local fonts via the `@font-face` rules in `style.css`.
