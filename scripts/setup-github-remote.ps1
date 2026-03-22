# EngiBin — GitHub köprüsü
# Önkoşul: https://cli.github.com/ (gh) ve `gh auth login` ile giriş yapılmış olmalı.
#
# Seçenek A — GitHub’da yeni depo oluştur + bağla + gönder (önerilen):
#   cd c:\Users\tekno\EngiBin
#   gh auth login
#   gh repo create EngiBin --private --source=. --remote=origin --push
#
# Seçenek B — Boş depoyu elle oluşturduysanız (HTTPS):
#   .\scripts\setup-github-remote.ps1 -RepoUrl "https://github.com/KULLANICI/EngiBin.git"
#
# Seçenek B — SSH:
#   .\scripts\setup-github-remote.ps1 -RepoUrl "git@github.com:KULLANICI/EngiBin.git"

param(
  [Parameter(Mandatory = $true)]
  [string] $RepoUrl
)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git bulunamadı. Git for Windows kurulu olmalı."
}

$hasOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Mevcut 'origin' kaldırılıyor: $hasOrigin"
  git remote remove origin
}

Write-Host "origin ekleniyor: $RepoUrl"
git remote add origin $RepoUrl

Write-Host "main dalı gönderiliyor..."
git push -u origin main

Write-Host "Tamam. Uzak adres:"
git remote -v
