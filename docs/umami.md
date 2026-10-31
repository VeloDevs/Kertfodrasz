# Umami oldalmegtekintések

A mérés futásidőben kapcsolható, az alábbi három publikus környezeti változóval.
Hiányzó vagy üres változó esetén nincs követőscript. Nincs szükség új buildre a
webhelyazonosító vagy az Umami-eredet módosításakor; az appot újra kell indítani.

Preprod:

```dotenv
PUBLIC_UMAMI_URL=https://umami.szaboek.com
PUBLIC_UMAMI_WEBSITE_ID=c2dc1309-cf67-4001-b6ec-2f7dd3609a80
PUBLIC_UMAMI_DOMAINS=kertfodrasz.szaboek.com
```

Élesítéskor külön azonosító: `bc04d810-0386-4c18-a81d-eadea9bc9cf4`, és
`PUBLIC_UMAMI_DOMAINS=kertfodrasz.hu,www.kertfodrasz.hu`.
Az éles weboldal bekapcsolása külön telepítési lépés.

Az Umami automatikus követése méri az első oldalbetöltést és a kliensoldali
navigációt; ne adj mellé kézi `afterNavigate` oldalmegtekintést, mert duplázna.
A query és hash kizárt. A Do Not Track jelzést a script tiszteletben tartja.
Nincs egyedi látogatóazonosító, űrlapadat, session replay vagy egyedi kattintási
esemény bekötve. A látogatószám becslés, a blokkolók befolyásolják.

A validált HTTPS-eredet a futásidejű CSP report-only `script-src` és
`connect-src` direktívájába kerül. A script aszinkron, halasztott betöltésű;
az analitika kiesése nem akadályozza az oldal kiszolgálását.

A szerveroldali telepítési konfiguráció a workspace `ops/umami/` könyvtárában
található. Az adatkezelési tájékoztatót a ténylegesen bekapcsolt méréshez kell
igazítani. Az itt szereplő változók publikus beállítások, nem hitelesítő adatok.
