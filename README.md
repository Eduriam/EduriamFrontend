# Eduriam Frontend

## Prerekvizity

Ke spuštění projektu lokálně je třeba mít nainstalovaný `npm` a `yarn`. Dále je třeba mít nainstalovanou aplikaci [Mockoon](https://mockoon.com/).

Projekt je přizpůsoben pro vývoj ve Visual Studio Code.

## Instalace

Před spuštěním projektu je třeba spustit příkaz `yarn install`. Pro spuštění tohoto příkazu je třeba mít zadefinovanou proměnnou prostředí `NPM_AUTH_TOKEN`, která umožňuje stažení balíčků `@eduriam/ui-core` a `@eduriam/ui-x`:

```bash
set -a; . ./.env; set +a    # Načtení lokálních proměnných .env
yarn install
```

## Lint

Kontrolu kódu pomocí ESLint lze provést příkazem `yarn lint`.

## Sestavení projektu

Projekt lze následně sestavit pomocí příkazu `yarn build`.

## Spuštění E2E testů

Spuštění e2e testů lze provést pomocí `yarn test:e2e`.

## Spuštění projektu

Před spuštěním projektu lokálně je třeba spustit v aplikaci Mockoon mock backendového API. Mock je uložen v souboru `mock/netlify/functions/datafile.json`.

Projekt lze následně spustit lokálně pomocí `yarn dev`.
