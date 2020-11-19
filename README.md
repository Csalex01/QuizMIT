# QuizMIT ❓

Ez a projekt a Sapientia EMTE Informatika kara által szervezett Hall of Fame novemberi rendezvényre készült.

A projekt témája: Kvíz játék


## 🔰 Bevezetés
Téma: űr és űrkutatás


### 🧾 Használati útmutató

Ha a QuizMIT bot jelenlétét szeretnéd ellenőrizni azt megteheted a `.ping` paranccsal.

❓ Ha valami nem világos és segítséget szeretnél, használd a `.help`, `.segitseg` és a `.segits` parancsokat.

🏁 Ha a játékot el szeretnéd indítani, használd a `.start`, `.kezd` vagy `.kezdes` parancsokat.
Ez után nincs más dolgod, csak az üzenet alatt megjelenő ✅-ra kattintani.

❌ Ha a játékot be szeretnéd fejezni, használd a `.stop` vagy a `.kilep` parancsokat. 
Ezt a játék bármely pontjában megteheted!


### 🤔 Hogyan válaszoljak kérdésekre?

1. Minden egyes kérdés alatt megjelenik négy féle válaszlehetőség egy emoji reakció formájában (0️⃣, 1️⃣, 2️⃣ vagy 3️⃣)
2. Ha válaszolni szeretnél, akkor csak annyi teendőd van, hogy a megadott válaszlehetőségnek megfelelő emojira kattintasz.
3. Ha helyes választ adtál meg, akkor az elért pontszámod növekszik 1-el, különben pedig változatlan marad.


## 🔬 Használt eszközök

- Visual Studio Code
    - Könnyen kezelhető fejlesztői környezet

- Node.js
    - Discord.js 
        - Discord API hívásokra szolgál
    - Nodemon 
        - Kézenfekvő eszköz hibakeresés szempontjából
    - Dotenv 
        - Saját privát környezeti változókat hoz létre egy `.env` állományban, így a forráskód közzétételekor nem kerülnek publikussá.
        - Ilyen például a BOT_TOKEN, amely segítségével hitelesítjük a botot, vagy a PREFIX, amely segítségével meg tudjuk adni a bot hívókarakterét.

- Heroku
    - Internetre való közzétételt valósítja meg, így folyamatos üzemidőre képes az applikáció.

- Verziókontrol
    - Git/GitHub
    - GitHub Desktop