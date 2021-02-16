# JS Racer Turbo

Retrowave / Synthwave style racing game inspired by Outrun, written in HTML5, Javascript (Vanilla and jQuery) and PHP, developed on the fantastic game engine created by [Jakes Gordon](https://github.com/jakesgordon/javascript-racer) ([Code InComplete](https://codeincomplete.com/articles/javascript-racer/)) and starting from the fork of [Stephen Karl Larroque](https://github.com/lrq3000/javascript-racer).

*JS Racer Turbo - Let's give the Turbo to racing and development!*

After being pleasantly impressed by the potential of the game engine, the addition of the turbo and the ability to play via the browser, I wanted to continue the development with my skills as a Front-end Developer, so in this version I focused mainly on graphic aspect (textures and interface) and user experience (usability and entertainment).
*([Nisar Abed](https://www.nisar.it/))*

![Screenshot JS Racer Turbo Out Of Time](https://www.nisar.it/app/js-racer-turbo/screenshots/js_racer_turbo_outoftime.jpg)

# Racing Game

 * [Play The Game](https://www.nisar.it/app/js-racer-turbo/)
 * View the [Source](https://github.com/nisar86/js-racer-turbo)

Incrementally built up in 7 parts:

 * Play the [Game: Turbo Fastest Lap](https://www.nisar.it/app/js-racer-turbo/turbo-fastest-lap.php)
 * Play the [Game: Turbo Out Of Time](https://www.nisar.it/app/js-racer-turbo/turbo-out-of-time.php)
 * Play the [Game: Classic Fastest Lap](https://www.nisar.it/app/js-racer-turbo/classic-fastest-lap.php)
 * Play the [Game: Classic Out Of Time](https://www.nisar.it/app/js-racer-turbo/classic-out-of-time.php)
 * Play the [Demo: Straight](https://www.nisar.it/app/js-racer-turbo/straight.php)
 * Play the [Demo: Curves](https://www.nisar.it/app/js-racer-turbo/curves.php)
 * Play the [Demo: Hills](https://www.nisar.it/app/js-racer-turbo/hills.php)

You can find the description of how each part works on [CodeIncomplete.com](http://codeincomplete.com/posts/2012/6/22/javascript_racer/).

 * Read more about [Straight Demo](http://codeincomplete.com/posts/2012/6/23/javascript_racer_v1_straight)
 * Read more about [Curves Demo](http://codeincomplete.com/posts/2012/6/24/javascript_racer_v2_curves/)
 * Read more about [Hills Demo](http://codeincomplete.com/posts/2012/6/26/javascript_racer_v3_hills/)

# Installation

JS Racer Turbo runs on **Apache Web Server**, so:

 * Save the game folder to your preferred location on your web server.
 * Start the Apache web server and from the browser open the index.php file. 
 * Have Fun!

# Performance

The performance of this game is **very** machine/browser dependent. It works quite well in modernbrowsers, especially those with GPU canvas acceleration, but a bad graphics driver can kill it stone dead. So your mileage may vary.Access the settings panel to configure the graphic settings, ***(the graphics settings below can have a major impact on performance)*** controls are available to change the rendering resolution, the quality of the textures, the drawing distance, weather conditions.

**You can play on desktops, tablets, smartphones**, on Linux, Microsoft Windows, Android, (Apple Mac and iOS) systems. 
The game system has been developed to fully adapt to the most popular browser window, at any size. 

*Currently supported browsers include:*

 * **Mozilla Firefox** - v85 tested on: Android, iOS, Windows, Mac - **Works Great**!
 * **Google Chrome** - v88 tested on: Android, iOS, Windows, Mac - **Works Great**!
 * **Safari** - v13 tested on Mac and iOS - **Works Good**.
 * **Opera** - v73 tested on Windows, Mac - **Works Good**.

**Optimization for mobile devices:**

This version offers a significant improvement in terms of user experience on mobile devices, 
but there are likely to be further improvements in terms of performance. Browsers in general 
are still quite limiting (especially on mobile) with regards to some possible but very heavy 
operations in execution (I am referring for example to some HTML5 and CSS3 specifications 
that could be applied to the game).

>> _On iOS, regarding the audio and the vibration of the device, I found important limitations in the web browser (not only Safari but all browsers) that seem to be imposed by the system._

# Project Structure

This project is mainly implemented in javascript (because it is easy for prototyping) 
but is not meant to demonstrate JavaScript techniques.
This version of the game compared to the previous ones has several additions so the structure 
and organization of the code is a bit more complex than the starting versions, 
but I tried to keep the order as much as possible by also inserting explanatory 
comments on the various components of the code.
Here, for example, there is also a small structure in php used to compose pages and contain some data. 
Surely a larger evolution of this project would require a further complex structure 
that also makes use of a database.

**The code is structured like this:**

 * **Game Pages** : In the main folder are the pages of the game, each page is a different game mode .
 * **Includes Folder** : Contains the game structure files divided into **public** and **core** folders. 
 * **Public Folder** contains all items viewed by the user. 
 * **Core Folder** contains all the php functions used to manage some options that configure the pages and texts. *Direct access to these files has been inhibited, certainly the support of an IT security specialist would be useful.*
 * **Assets Folder** : Contains javascript code, librarys, css and all multimedia materials. **All contents are divided by area of expertise,** for example **in the game folder there are game scripts, css and media.**
* **Game files** : The main game files are **jsr-engine.js, jsr-game.js** and **style.css**. *The three demos each have their own script (to maintain a good level of simplicity in the code).*
* **jsr-engine.js** : All the main scripts can be found here. This file contains the game engine and all javascript components, used by all game modes and demos. The idea is, as far as possible, never to repeat portions of similar or identical code but rather insert the code that is able to use it when necessary with a modular approach. 
* **jsr-game.js** : In this file (as in the demo files) there are all the scripts related to the game, therefore the use of the game engine and all the functions and operations related to the game. 
* **style.css** : The game's style sheet that takes care of providing the graphic aspect to all elements external to the canvas and to the canvas itself. It is closely related to some javascript functions present in the jsr-engine.js, jsr-game.js and js files of the demos.
* **run-.....js** : Files marked with this prefix are used to launch the game based on game mode, game style or demo. 

# Features 

**Features of previous releases:**

**[Initial version of Jakes Gordon](https://github.com/jakesgordon/javascript-racer)**

* Game Engine.
* First version of the game.
* Demo and technical explanations.

**[Fork by Stephen Karl Larroque](https://github.com/lrq3000/javascript-racer)**

* Outrun-style limited-time game mode.
* Generation of procedural traces with increasing length and traffic difficulties. 
* Turbo.
* Day / Night background loop.
* Mobile touch controls.
* Full-screen Mode.
* Other small improvements...

**New features in this release:**

**[Fork by Nisar Abed](https://github.com/nisar86/js-racer-turbo)**

* **Total graphic restyling for the interface:**
 * **Game loading graphics** showing elements for user interaction only when the game is loaded. 
 * **Splash screen** with game presentation, current game information, link to explanation of controls, start with sound and mute, game version.
 * **The game displayed in the browser window size**, size and (floating) orientation may change during the game.
 * **Main menu** and gameplay (or demo) selection and game mode. 
 * **How to play** section, with explanation of commands (for game and demo) keyboard and touchscreen, note Web App. 
 * **Settings Panel** (also in compact version) where you can manage all configurable settings (graphics, audio, etc.) and view the current performance benchmark.
 * **Credits screen** and **license page**.
 * **Warning screens** displayed only in certain events (browser incompatible, orientation changes combined with other situations, texture details change). 
 * **Safe restart screen** (ask for confirmation before resetting the game). 
 * **Music player** for the soundtrack and buttons to control music and change tracks in the settings panel.
 * **Cookies Notice** with request for acceptance.
 * **Game over screen with score**, message and stars (skill rating) customized to the match result, the rating ranges from 1 (Poor.) To 5 (Great!) Stars. The scores of the voting system are scalable, so they can change according to the game parameters (ex: I set the times of the objectives for one lap, if the game is three laps the time is automatically calculated). 
 * **Touchscreen Gamepad**, touch controls redesigned for full screen play on all touch and mobile devices (touchscreen sensitive buttons and mouse click).
 * **New game HUD** with current match information.
 * **Speedometer**: Added to the HUD the Speedometer with the current speed (mph / km/h), arrow indicating speed and progress bars indicating turbo level and current speed (dynamic coloring and maximum speed effect).
 * **Favicon and Web App Icons** with seo friendly game title. 
 * **Basic Web App**, compatible with Android and iOS. 
* **Resolutions**: Game Resolutions Dynamic (based on browser window size) and Fixed (4:3, 16:9, 21:9, SD, VGA, 4K, 8K, etc...) (**can have a major impact on performance**).
* **Textures level**: High, Medium, Low, (**can have a major impact on performance**).
* **New Game textures and colors**:
 * **Sprites**: New Sprites of the Car and all game elements. 
 * **Landscapes**: New day and night landscapes composed of background images and colors.
 * **Dynamic colors**: Most of the elements have a continuous cycle of colors (ranging from an initial color to a final color), these colors also change according to the landscape and current events (Turbo), or elements (Finish Line) of the game.
* **Weather effects**: Graphic effects of the weather conditions.
 * **Snow**: Particle effect that simulates snow (*connected to game events and car controls*).
 * **Rain**: Particle effect that simulates rain (*connected to game events and car controls*). 
 * **Automatically changes** the weather every certain time (set by the user in the settings panel). 
* **Random Options** for landscape and weather (settable by jsr-game.js).
* **CSS Filters**: Static and dynamic graphic effects that are applied to the canvas via css, which can be set by the user in the settings panel.
* **Date Options**: 
 * Through the file jsr-game.js it **sets for a determined period of time** (between a starting date and an ending date) **a combination of weather effects, landscape and CSS filters**. 
 * The **Halloween period** (10/29 - 11/02) and the **winter period** (**holiday season** | 12/15 - 01/15) are set so that the game starts with special conditions. 
* **Vibration device**: The device vibrates when certain game events occur (*it is not supported by all devices*).
* **Soundtrack** with multiple tracks and **audio Fx sounds**, all audio is new and licensed for this project (read the license for more info).
* **Soundtrack listening system** with a single audio file and chapters, you can switch from track to track from the settings panel.
* **Sound Fx**: Game Sounds (*it is not supported by all devices*):
 * **Car** (engine, turbo, braking, throttle, collision), 
 * **World** (sounds that play during the lap), 
 * **Events**: Lap completed, time running out, gameover (defeat and victory). 
* **Gameplay**:
 * **Turbo** (Faster speed, the turbos recharge with each spin).
 * **Classic** (Normal speed, the turbo does not recharge).
* **Revamped game modes** for a more immersive gaming experience.
 * **Fastest Lap**: The goal of this mode is to finish a number of laps in the shortest possible time *(taken from the initial version of the game)*.
 * **Out Of Time**: The objective of this mode is to be able to make as many laps as possible with an increasing difficulty of the game *(taken from Stephen Karl Lerroque's Fork)*. 
 * **To increase the challenge** the game modes have been combined with two different gameplay (the player's choice) and a score ending.
* **New folder structure and game files**.
 * **The page structure now uses PHP**.
 * The **pages in the root** are the game modes and the demos. 
 * The **include folder** contains **Core** (with the main functions) and **Public** (with all the elements included in the pages).
* **New setting of game js files** with main elements on *jsr-engine.js* and game elements on *jsr-game.js*.
* **jQuery** has been added and is used for some tasks in place of vanilla JS. 
* **Third-party scripts/libraries** (with permissive licenses) are also used. 
* **Basic localization system** (to be developed in the future), with texts present in jsr-localize.js and core / jsr support files). 
* Other small improvements...

# In the Future

*It's quite astounding what it takes to actually finish a game, even a simple one. *

**If we were to try to turn it into a real game we would have to consider:**

 * Dynamic music changes based on what happens in the game.
 * HUD in full screen mode.
 * Other HUD Fx (flash on fastest lap, confetti, etc).
 * More accurate sprite collision.
 * Better car AI (steering, braking etc).
 * An actual crash when colliding at high speed.
 * More bounce when car is off road.
 * Screen shake when off-road or collision.
 * Throw up dirt particles when off road.
 * More dynamic camera (lower at faster speed, swoop over hills etc).
 * Automatic resolution & drawDistance detection.
 * Projection based curves ? x,y rotation.
 * Sub-pixel aliasing artifacts on curves.
 * Smarter fog to cover sprites (blue against sky, cover sprites).
 * Multiple stages, different maps.
 * A lap map, with current position indicator.
 * Road splits and joins.
 * Cars coming in opposite direction.
 * Tunnels, bridges, clouds, walls, buildings.
 * Rivals, add some competetor drivers to race against as well as the 'traffic'.
 * Other game modes: one on one, more opponents, tournament, collect coins, shoot rivals.
 * A nice retro intro (for example with [codef](https://github.com/N0NameN0/CODEF), [phaser](http://phaser.io/examples/v2/demoscene/atari-intro) or others).
 * A whole lot of gameplay tuning.
 * Other landscapes, other routes.
 * Car choice for the player.
 * Other cars and traffic vehicles.
 * Localization in multiple languages.
 * Save match scores and show a leaderboard.
 * Record Ghost, save the ghost, watch replay and race against the ghost.
 * More types of routes.
 * Online multiplayer from different devices.
 * Multiplayer from the same device, (if it's a pc for example).
 * ...
 * ...
 * ...

# Related Links

 * How-To Guide: [Lou's Pseudo-3d Page](http://www.extentofthejam.com/pseudo/) *(High level Guide!!)*
 * Another Game: [Racer 10k](https://github.com/onaluf/RacerJS).
 * Another Game: [OutRun (No Canvas)](https://codepen.io/arcs/pen/aGzNKY).
 * Another Game: [Old School Racing Game](https://codepen.io/johan-tirholm/pen/PGYExJ).
 * Another Game: [HexGL](https://github.com/BKcore/HexGL).

# License

The game is licensed by MIT which includes most of the assets, with the exception of some components which are subject to the usage restrictions which are described in the license.

* [License of JS Racer Turbo](https://www.nisar.it/app/js-racer-turbo/LICENSE.html)

# Screenshot

![Screenshot JS Racer Turbo Intro](https://www.nisar.it/app/js-racer-turbo/screenshots/js_racer_turbo_intro.jpg)
![Screenshot JS Racer Turbo Intro](https://www.nisar.it/app/js-racer-turbo/screenshots/js_racer_turbo_fastestlap.jpg)
