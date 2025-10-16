# Linguino-Frontend

## Prerekvizity

Ke spuštění projektu lokálně je třeba mít nainstalovaný `npm` a `yarn`. Dále je třeba mít nainstalovanou aplikaci [Mockoon](https://mockoon.com/).

Projekt je přizpůsoben pro vývoj ve Visual Studio Code.

## Instalace

Před spuštěním projektu je třeba spustit příkaz `yarn install`:

```bash
export NPM_AUTH_TOKEN=... # Nastavení GitHub PAT tokenu s permission read:packages z EduriamUI repozitáře pro stažení EduriamUI závislostí
yarn install
```

## Lint

Kontrolu kódu pomocí ESLint lze provést příkazem `yarn lint`.

## Sestavení projektu

Projekt lze následně sestavit pomocí příkazu `yarn build`.

## Spuštění projektu

Před spuštěním projektu je třeba spustit v aplikaci Mockoon mock backendového API. Mock je uložen v jiném repozitáři, který lze nalézt v přílohách této bakalářské práce.

Projekt lze následně spustit lokálně pomocí `yarn dev`.
