![Logó](logo.png)

# QuizMIT ❓

Ez a projekt a Sapientia EMTE Informatika kara által szervezett Hall of Fame novemberi rendezvényre készült.
A projekt témája: Kvíz játék


## 🔰 Bevezetés
A játék egy Discord bot formájában van megvalósítva, így könnyű kezelhetőséget biztosít a felhasználónak/játékosnak.

A játék témája: **minden ami űr és űrkutatás**.

Nagy inspirációforrás a NASA és a SpaceX közti együttműködés és az elért teljesítményeik, mint például a napokban lezajlott Crew-1 6 hónapos küldetésnek a kezdete. Egy másik inspirációforrás a történelemből származott, mint például az 1994-es Shoemaker-Levy üstökös ütküzése a Jupiterrel, amely becsapódás előtt felbomlott.

Jelenleg csak 10 kérdés áll rendelkezésre, viszont a kérdések száma nagyon könnyen bővíthető ha forráskódban található `questions.json` fájl segítségével.


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

### 🎮 Hogyan tudom kipróbálni?
Nincs egyéb dolgod, csak [ide](https://discord.com/api/oauth2/authorize?client_id=775050170969882624&permissions=34880&scope=bot) kattintani! A linknek a segítségével meg tudod hívni a botot saját Discord szerveredre!

A következő jogosultságok szükségesek:

1. Üzenet küldése
2. Fájlok csatolása (így tölti be az embed üzenetek indexképét)
3. Reakció üzenethez adása


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
