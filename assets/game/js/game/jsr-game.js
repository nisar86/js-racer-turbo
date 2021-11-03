//=======================================================
// JSR GAME > JS RACER TURBO
//=======================================================
/* 
 * JS Racer Turbo (Racing Game)
 * Copyright (c) 2020, 2021 Nisar Abed and Contributors
 * Licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0).
 * License: https://creativecommons.org/licenses/by/4.0/legalcode
 * 
 * Author: Nisar Abed (https://www.nisar.it)
 * Play the game: https://www.nisar.it/app/js-racer-turbo
 * Repository:    https://github.com/nisar86/js-racer-turbo
 * 
 * Developed starting from the work of
 * Jake Gordon: https://codeincomplete.com/articles/javascript-racer
 * Stephen Karl Larroque: https://github.com/lrq3000/javascript-racer
 */

(function($) {
    "use strict";
    function racer(gameplay=null,gamemode=null) {
        
        //=======================================================
        // DEFAULTS
        //=======================================================
        
        // The default gameplay type is turbo.
        if ( gameplay == null) { gameplay = 'turbo'; }
        // The default gamemode is fastestlap.
        if ( gamemode == null) { gamemode = 'fastestlap'; }
        
        //=======================================================
        // COMMON > JS RACER TURBO
        //=======================================================
    
        // Load Textures by required detail.
        var texture_detail = Cookies.get('jsr-textures-detail');
        jsr.HelperLoadTexturesArray(texture_detail);
        
        //=======================================================
        // GAMEPLAY > UTILITY
        //=======================================================
        
        // Switch > Gameplay > Turbo / Classic.
        function switch_gp_tc(turbo,classic) {
            switch (gameplay) {
                case 'turbo':
                    return turbo;
                break;
                case 'classic':
                    return classic;
                break;
                default:
                    return null;
            } 
        }
        
        // Switch > Gamemode > FastestLap / OutOfTime.
        function switch_gm_fo(fastestlap,outoftime) {
            switch (gamemode) {
                case 'fastestlap':
                    return fastestlap;
                break;
                case 'outoftime':
                    return outoftime;
                break;
                default:
                    return null;
            } 
        }
        
        //=======================================================
        // CONFIG
        //=======================================================
        
        // GENERAL
        var fps                     = 60;                           // How many 'update' frames per second.
        var step                    = 1/fps;                        // How long is each frame (in seconds).
        var width                   = jsr.Current.window.width;     // Logical canvas width.
        var height                  = jsr.Current.window.height;    // Logical canvas height.
        var centrifugal             = 0.3;                          // Centrifugal force multiplier when going around curves.
        var offRoadDecel            = 0.99;                         // Speed multiplier when off road (e.g. you lose 2% speed each update frame).
        var skySpeed                = 0.001;                        // Background sky layer scroll speed when going around curve (or up hill).
        var hillSpeed               = 0.002;                        // Background hill layer scroll speed when going around curve (or up hill).
        var treeSpeed               = 0.003;                        // Background tree layer scroll speed when going around curve (or up hill).
        var skyOffset               = 0;                            // Current sky scroll offset.
        var hillOffset              = 0;                            // Current hill scroll offset.
        var treeOffset              = 0;                            // Current tree scroll offset.
        var segments                = [];                           // Array of road segments.
        var cars                    = [];                           // Array of cars on the road.
        var stats = jsr.Game.stats('game_performance');             // Mr.doobs FPS counter.
        var gameCanvasId            = 'canvas';                     // Game Canvas ID.
        var canvas                  = jsr.Dom.get(gameCanvasId);    // Game Canvas.
        var ctx                     = canvas.getContext('2d');      // ...and its drawing context.
        var background              = null;                         // Our background image (loaded below).
        var sprites                 = null;                         // Our spritesheet (loaded below).
        var resolution              = null;                         // Scaling factor to provide resolution independence (computed).
        var roadWidth               = 2000;                         // Car/Road size ratio, actually half the roads width 
                                                                    // easier math if the road spans from -roadWidth to +roadWidth.
        var segmentLength           = switch_gp_tc(670,450);        // Length of a single segment.
        var rumbleLength            = 3;                            // Number of segments per red/white rumble strip.
        var trackLength             = null;                         // Z length of entire track (computed).
        var lanes                   = switch_gp_tc(4,3);            // Number of lanes.
        var fieldOfView             = 100;                          // Angle (degrees) for field of view.
        var cameraHeight            = 1000;                         // Z height of camera.
        var cameraDepth             = null;                         // Z distance camera is from screen (computed).
        var drawDistance            = 300;                          // Number of segments to draw.
        var playerX                 = 0;                            // Player x offset from center of road (-1 to 1 to stay independent of roadWidth).
        var playerZ                 = null;                         // Player relative z distance from camera (computed).
        var fogDensity              = 5;                            // Exponential fog density.
        var position                = 0;                            // Current camera Z position (add playerZ to get player's absolute Z position).
        var speed                   = 0;                            // Current speed.
        var maxSpeed                = segmentLength/step;           // Top speed (ensure we can't move more than 1 segment in a single frame 
                                                                    // to make collision detection easier).
        var accel        = switch_gp_tc( maxSpeed/7, maxSpeed/8);   // Acceleration rate - tuned until it 'felt' right.
        var breaking     = -maxSpeed/2;                             // Deceleration rate when braking.
        var decel        = switch_gp_tc(-maxSpeed/6,-maxSpeed/7);   // 'natural' deceleration rate when neither accelerating, nor braking.
        var offRoadDecel = switch_gp_tc(-maxSpeed/3,-maxSpeed/4);   // Off road deceleration is somewhere in between.
        var offRoadLimit = switch_gp_tc( maxSpeed/4, maxSpeed/3);   // Limit when off road deceleration no longer applies
                                                                    // (e.g. you can always go at least this speed even when off road).
        var raceTrafficMode         = 1;                            // If 1 the traffic is present only during the race, if 0 there is always traffic.
        var totalCars               = switch_gm_fo(25,50);          // Total number of cars on the road.
        var currentLapTime          = 0;                            // Current lap time.
        var lastLapTime             = null;                         // Last lap time.
        var cssTurboEffect          = false;                        // CSS Turbo Effect (true) (too heavy?!?).
        var currentLap              = 1;                            // Current Lap Number.
        var randomTrack             = true;                         // Rnable random procedural generation of the track.
        var randomTrackLength       = switch_gm_fo(6,5);            // If random track is enable, how many track segments/constructs to build?
        var gameOverLap             = switch_gm_fo(3,0);            // Gameover Lap (0 means no gameover per round).
        var gameOverFlag            = false;                        // Gameover Status, Set true when gameover is activated (if set to true by default it displays the gameover message).
        var gameStartedFlag         = false;                        // Start Race Staus, Becomes true when the game starts.
        // HORIZON TILT
        jsr.Vars.tiltHorizonFxIsActive = 'disabled';                // Tilt Horizon Fx, visible when cornering: disabled, drawing, css.
        // LANDSCAPE
        jsr.Vars.currentLandscape   = 'date';                       // Default landscape, internal variable that sets which background and colors of the world 
                                                                    // we are currently drawing ("night", "day", "random" or "date").
                                                                    // The Current Landscape must be set when the game is loaded.
        var allLandscapes           = ['night','day'];              // All landscapes, used to set 'random'.
                                                                    // "random" randomly runs "clear", "snow", or "rain". "date" sets the background based on today's date and time of year.
        jsr.Vars.changeLandscapeEvery = switch_gm_fo(2,3);          // Change the background image when the indicated laps are matched. Set to 0 to disable.
        jsr.Vars.changeLandscapeFlag = false;                       // Internal variable to start and stop the landscape change.
        var forceChangeLandscapeLoop = false;                       // For development, if true it continuously changes the landscape.
        // WEATHER
        jsr.Vars.currentWeather     = 'date';                       // Default weather, Adds a weather condition "clear", "snow", "rain", "random", "date" (set null to disable).
                                                                    // "random" randomly runs "clear", "snow", or "rain". "date" sets the weather based on today's date and time of year.
                                                                    // "random" and "date" are set only when the game is loaded.
        var allWeatherConditions    = ['clear','snow','rain'];      // All Weather Conditions, used to set 'random'.
        jsr.Vars.autoWeatherChangeTime = 0;                         // After this number of seconds the weather changes randomly, if 0 is set the weather does not change.
        // DATE
        var dateTodayIsThisPeriod   = null;                         // Call a time period otherwise activated via date setting: null (Default), 'winter', 'halloween'.
        // CSS FILTER
        var currentCssFilter        = 'date';                       // Sets a default css filter among those available. "none" or null does not filter.
                                                                    // All CSS Filters: pixel, red, blue, green, blackAndWhite, dynamicSaturation, difference, dynamicMulticolor.
                                                                    // "date" sets the CSS filter based on today's date and time of year.
        // TURBO
        var turboLeft               = 3.0;                          // Number of turbos left.
        var turboDuration           = switch_gm_fo(9.0,8.0);        // Duration of turbo in seconds.
        var turboAnimation          = 2.0;                          // Duration of animation to do progressive increase/decrease of fov.
        var turboFovIncrement       = 1.0;                          // Multiplier of fov during turbo.
        var turboGain               = switch_gp_tc(1.45,1.32);      // Multiplier of the maximum speed of the turbo.
        var turboMaxSpeed           = maxSpeed * turboGain;         // Maximum speed under turbo.
        var turboCentrifugal        = centrifugal/2;                // Torque when under turbo (else the player cannot turn in curves).
        jsr.Vars.turboTriggered     = false;                        // Internal variable - turbo triggered by player.
        var turboTimeDone           = 0.0;                          // Internal variable - turbo being consumed, since how much time (allow to do animation and such).
        var turboFxType             = 'dynamic';                    // Sets the type of graphic effect for the turbo ('dynamic' or 'static'), '' empty has no effect.
        var turboCurrentFov         = fieldOfView;                  // Internal variable - current fov while doing turbo.
        var turboMax                = turboLeft;                    // Indicates the total number of turbos for this race.
        var turboLeftInitial        = turboLeft;                    // Initial number of turbo.
        jsr.Vars.turboFxMinSpeedMph = switch_gp_tc(300,180);        // Minimum speed in Mph to view the turbo effect on the road.
        // VIBRATION
        var vibrationDeviceActive   = 1;                            // If activated (1 active), it vibrates under certain conditions (such as turbo), only on compatible devices,
                                                                    // ( 2020-12, not compatible with iOS Safari ).
        jsr.Vars.vibrationDeviceTurboMs = [100,50,200,50,700];      // Vibration time to turbo event expressed in ms or array of ms ([vibration,pause,vibration,pause...]).
        jsr.Vars.vibrationDeviceFinishLineMs = 100;                 // Vibration time to Finish Line event expressed in ms or array of ms ([vibration,pause,vibration,pause...]).
        jsr.Vars.vibrationDeviceCollisionMs = 80;                   // Vibration time to collision event expressed in ms or array of ms ([vibration,pause,vibration,pause...]).
        // AUDIO
        var audioFxActive           = 1;                            // When activated (1), it allows you to perform audio effects under certain conditions (such as turbo).
                                                                    // Since the browser also needs the user's consent to play the sounds, audioFxActive 
                                                                    // is used in combination with jsr.Vars.audioFxAllowedByUser which deals with consent (user actions).
        jsr.Vars.audioFxCarVolume   = 6;                            // Default volume car audio effects.
        jsr.Vars.audioFxWorldVolume = 7;                            // Default volume world audio effects.
        jsr.Vars.audioFxMatchVolume = 9;                            // Default volume game audio effects.
        // MUSIC
        jsr.Vars.musicPlayerVolume  = 8;                            // Default Music Player Volume.
        var musicPlayerShuffle      = 1;                            // If enabled (1), the audio tracks are played in random order.
        jsr.Vars.musicPlayerInfoMs  = 5000;                         // Automatically show track title for tot milliseconds, 0 is disabled.
        // KEYS
        var keyLeft                 = false;                        // Default KeyLeft.
        var keyRight                = false;                        // Default KeyRight.
        var keyFaster               = false;                        // Default keyFaster.
        var keySlower               = false;                        // Default keySlower.
        // OUT OF TIME GAMEMODE
        var currentLevel            = 0;                            // Internal variable, just a value to display the current level.
        var remainingTime           = 0;                            // internal variable, remaining time left to pass the next finish line. 
                                                                    // or it's game over, will be calculated automatically.
        var difficultyStart         = 4;                            // Starting difficulty (track length).
        var difficultyIncrement     = 0.5;                          // How much to increment the difficulty (and track length) each time player finish a track?
        var difficultyGap           = 2.0;                          // After how many track finishes do we start to increase the difficulty. 
                                                                    // In terms of number of cars on road, number of turns, etc.
        var difficultyMax           = 14;                           // Maximum difficulty, after this there will be no increase in difficulty.
        var difficultyCurrent       = difficultyStart;              // Current difficulty (will be modified ingame).
        var remainingTimeIncrease   = 0.00002;                      // TrackLength multiplier to get the seconds that will be added to the remaining time, i.e. 
                                                                    // it defines the time left for the player to finish the track in proportion 
                                                                    // to the length of the track (higher value = easier game).
        var remainingTimeStartBonus = switch_gp_tc(3.0,5.0);        // Multiplier of the remaining time given for the first level (to make game easier for newscomers), 
                                                                    // also because the player has no momentum at the beginning.
        var remainingTimeThreshold  = 20;                           // When only this amount of time is left, the remaining time HUD will be highlighted (set to 0 to disable).
        var turboGiveEvery = jsr.Vars.changeLandscapeEvery;         // Give a new turbo every x levels (set to 0 to disable).
        
        // GAME OVER SCORES
        var gameover_scores = {                                     // Goals to beat based on game mode and gameplay.
            fastestlap : {
                lapsTime : {
                    turbo   : { result_1 : 34, result_2 : 40, result_3 : 45, result_4 : 50 },
                    classic : { result_1 : 35, result_2 : 45, result_3 : 55, result_4 : 60 }
                }
            },
            outoftime : {
                lapsNumber : {
                    turbo   : { result_1 : 6,  result_2 : 5,  result_3 : 4,  result_4 : 3 },
                    classic : { result_1 : 5,  result_2 : 4,  result_3 : 3,  result_4 : 2 }
                }
            }
        }
        
        //=======================================================
        // Set Game Over Scores
        //=======================================================
        
        var outoftimeGoal   = 'not-set';    // Default Out of Time Goal.
        var fastestlapGoal  = 'not-set';    // Default Fastestlap Goal.
        
        // View goal to beat based on game mode and gameplay.
        if( gamemode == 'fastestlap' ) {
            // Total time (in seconds) to beat to complete the game.
            fastestlapGoal = switch_gp_tc( 
                gameover_scores.fastestlap.lapsTime.turbo.result_1 * gameOverLap, 
                gameover_scores.fastestlap.lapsTime.classic.result_1 * gameOverLap 
            );
        } else if ( gamemode == 'outoftime' ) {
            // Total number of laps to beat.
            outoftimeGoal = switch_gp_tc( 
                gameover_scores.outoftime.lapsNumber.turbo.result_1, 
                gameover_scores.outoftime.lapsNumber.classic.result_1 
            );
        }
        
        //=======================================================
        // Date Conditions
        //=======================================================
        
        // Boolean variables that set configurations based on date.
        var isHalloweenDays = false;
        if( jsr.HelperTodayIsInThisPeriod('10-29','11-02') || dateTodayIsThisPeriod == 'halloween' ) {
            isHalloweenDays = true;
        }
        var isWinterDays = false;
        if( jsr.HelperTodayIsInThisPeriod('12-15','12-31') || jsr.HelperTodayIsInThisPeriod('01-01','01-15') || dateTodayIsThisPeriod == 'winter' ) {
            isWinterDays = true;
        }
        
        //=======================================================
        // CSS Filters
        //=======================================================
        
        //-----------------------
        // By Date
        // Sets the css filter based on today's date and time of year.
        if( currentCssFilter == 'date' || 
            dateTodayIsThisPeriod == 'halloween' ) {
            switch (true) {
                // Days of Halloween or Halloween is required.
                // Css filter not compatible with iOS and Safari browser.
                case ( isHalloweenDays && jsr.Current.device != 'ios' && jsr.Current.browser != 'isSafari' ):
                    currentCssFilter = 'dynamicBlackAndWhite';
                    break;
                default:
                    currentCssFilter = 'none';
            }
        }
        
        // Set Default Css Filter
        jsr.HelperSetCssFilter(currentCssFilter);
        
        //=======================================================
        // Current Landscpe
        //=======================================================
        
        //-----------------------
        // Random
        // If a random current landscape is required.
        if( jsr.Vars.currentLandscape == 'random') {
            jsr.Vars.currentLandscape = jsr.HelperReturnRandomValueFromArray(allLandscapes);
        }
        
        //-----------------------
        // By Date
        // Sets the landscape based on today's date and time of year.
        if( jsr.Vars.currentLandscape == 'date' || 
            dateTodayIsThisPeriod     == 'halloween' ) {
            switch (true) {
                // Days of Halloween or Halloween is required.
                case ( isHalloweenDays ):
                    jsr.Vars.currentLandscape = 'night';
                    break;
                default:
                    jsr.Vars.currentLandscape = jsr.HelperReturnRandomValueFromArray(allLandscapes);
            }
        }
        
        // Displays the remaining laps in the settings menu (Default).
        jsr.HelperDisplaysRemaningLapsToChangeLandscape();
        
        //=======================================================
        // Current Weather
        //=======================================================
        // The colors of the landscape are set via jsr.HelperSetWorldColors() when the landscape changes, 
        // for this reason the weather must always be set after the landscape has been loaded.
        
        //-----------------------
        // Random
        // If a random current weather is required.
        if( jsr.Vars.currentWeather == 'random') {
            jsr.Vars.currentWeather = jsr.HelperReturnRandomValueFromArray(allWeatherConditions);
        }
        
        //-----------------------
        // By Date
        // Sets the weather based on today's date and time of year.
        if( jsr.Vars.currentWeather == 'date' || 
            dateTodayIsThisPeriod   == 'halloween' ||
            dateTodayIsThisPeriod   == 'winter' ) {
            switch (true) {
                // Days of Halloween or Halloween is required.
                case ( isHalloweenDays ):
                    jsr.Vars.currentWeather = 'rain';
                    jsr.Vars.autoWeatherChangeTime = 180; // 3 Miuntes
                    break;
                // End and start days of the year (Night Only) or Winter is required.
                case ( isWinterDays && jsr.Vars.currentLandscape == 'night' ):
                    jsr.Vars.currentWeather = 'snow';
                    jsr.Vars.autoWeatherChangeTime = 180; // 3 Miuntes
                    break;
                default:
                    jsr.Vars.currentWeather = 'clear';
            }
        }
        
        //-----------------------
        // Changes Automatically
        // If automatic weather change is required.
        // Automatically changes the time every few seconds.
        jsr.HelperAutoWeatherChange(allWeatherConditions);
        
        // Set Default Tilt Horizon Fx value.
        jsr.HelperSetDefaultTiltHorizonFx();
        
        //=======================================================
        // HUD
        //=======================================================
        
        var hud = {
                speed_mph:        { value: null, dom: jsr.Dom.get('speed_value_mph')        },
                speed_kmh:        { value: null, dom: jsr.Dom.get('speed_value_kmh')        },
                turbo_left:       { value: null, dom: jsr.Dom.get('turbo_left_value')       },
                turbo_max:        { value: null, dom: jsr.Dom.get('turbo_max_value')        },
                fast_lap_time:    { value: null, dom: jsr.Dom.get('fast_lap_time_value')    },
                current_lap:      { value: null, dom: jsr.Dom.get('current_lap_value')      },
                current_lap_time: { value: null, dom: jsr.Dom.get('current_lap_time_value') },
                gameover_lap:     { value: null, dom: jsr.Dom.get('gameover_lap_value')     },
                remaining_time:   { value: null, dom: jsr.Dom.get('remaining_time_value')   },
                last_lap_time:    { value: null, dom: jsr.Dom.get('last_lap_time_value')    },
                total_match_time: { value: null, dom: jsr.Dom.get('total_match_time_value') },
                fastestlap_goal:  { value: null, dom: jsr.Dom.get('fastestlap_goal_value')  },
                outoftime_goal:   { value: null, dom: jsr.Dom.get('outoftime_goal_value')   }
            }
        
        //=======================================================
        // HUD > Speed > Bars
        //=======================================================
        
        // Set Turbo Default Percentage.
        function hudSetDefaultTurboPercentage(turbo_left) {
            if( turbo_left > 0) { 
                return 100; 
            } else if ( turbo_left == 0) {
                return 0; 
            }
        }
        jsr.Vars.hudTurboPercentage = hudSetDefaultTurboPercentage(turboLeft);

        //-----------------------------------
        // Update > Speed Bar Items
        
        function hudUpdateSpeedBarItems() {
            
            //-----------------------
            // Initialize
            
            // Turbo Bar
            var turboTargetBar = '#hud .hud_speed #bar .turbo_bar_progress';
            var turboBar = new ldBar(turboTargetBar);
            turboBar.set(jsr.Vars.hudTurboPercentage);
            
            // Speed Bar
            var speedTargetBar = '#hud .hud_speed #bar .speed_bar_progress';
            var speedBar = new ldBar(speedTargetBar);
            speedBar.set(jsr.Vars.currentSpeedPercent);
            
            // Arrow Deg
            var speedTargetArrow = '#hud .hud_speed #bar .speed_arrow_progress';
            var speedMaxArrowDeg = '262'; // Max Rotation Arrow (Rapresents 100%).
            
            // Get Current Arrow Deg (Max arrow Deg / 100 * Current Speed %).
            function hudGetCurrentArrowDegValue(currentPercentage,speedMaxArrowDeg) {
                return Math.round( (speedMaxArrowDeg / 100) * currentPercentage);
            }
            var arrowDeg        = hudGetCurrentArrowDegValue(jsr.Vars.currentSpeedPercent,speedMaxArrowDeg);
            
            // Update Speed Arrow Rotation Value
            function hudUpdateArrow(speedTargetArrow,arrowDeg) {
                $(speedTargetArrow).css({'-webkit-transform':'rotate('+arrowDeg+'deg)'});
                $(speedTargetArrow).css({'-moz-transform':'rotate('+arrowDeg+'deg)'});
                $(speedTargetArrow).css({'-ms-transform':'rotate('+arrowDeg+'deg)'});
                $(speedTargetArrow).css({'-o-transform':'rotate('+arrowDeg+'deg)'});
                $(speedTargetArrow).css({'transform':'rotate('+arrowDeg+'deg)'});
            }
            hudUpdateArrow(speedTargetArrow,arrowDeg);
            
            //-----------------------
            // Speedometer Fx
            
            var speedometerFxOnce           = 0;
            var speedometerFxInterval       = 0;
            var speedometerFxArrowDeg       = 0;
            var speedometerFxIntervalOnce   = 0;
            
            // Play or Stop speedometer effect.
            function speedometerFxMaxSpeed(type,arrowMin,arrowMax,time) {
                switch( type ) {
                    case 'stop':
                        clearInterval(speedometerFxInterval);
                        break;
                    case 'play':
                        function arrowVibrationFx(speedPercent) {
                            speedBar.set(speedPercent);
                            speedometerFxArrowDeg = hudGetCurrentArrowDegValue(speedPercent,speedMaxArrowDeg);
                            hudUpdateArrow(speedTargetArrow,speedometerFxArrowDeg);
                        }
                        speedometerFxInterval = setInterval(function(){
                            if( speedometerFxOnce == 0 ) {
                                speedometerFxOnce = 1;
                                arrowVibrationFx(arrowMin);
                            } else if( speedometerFxOnce == 1 ) {
                                speedometerFxOnce = 0;
                                arrowVibrationFx(arrowMax);
                            }
                        },time);
                        break;
                }
            }
            
            //-----------------------
            // Update Hud
            
            setInterval(function(){ 
                // Turbo Bar > Update
                // Every time the turbo is started the hud_update_turbo_percentage() 
                // function called by triggerTurbo() updates the value off jsr.Vars.hudTurboPercentage.
                turboBar.set(jsr.Vars.hudTurboPercentage);
                // Arrow Deg > Update
                arrowDeg = hudGetCurrentArrowDegValue(jsr.Vars.currentSpeedPercent,speedMaxArrowDeg);
                // Current speed within the limit. 
                if ( jsr.Vars.currentSpeedPercent <= 98 ) {
                    speedBar.set(jsr.Vars.currentSpeedPercent);
                    hudUpdateArrow(speedTargetArrow,arrowDeg);
                    // Speedometer Fx > Stop Once.
                    if( speedometerFxIntervalOnce == 1 ) {
                        speedometerFxIntervalOnce = 0;
                        speedometerFxMaxSpeed('stop');
                    }
                // Current speed over limit.
                } else {
                    // Speedometer Fx > Play Once.
                    if( speedometerFxIntervalOnce == 0 ) {
                        speedometerFxIntervalOnce = 1;
                        speedometerFxMaxSpeed('play',99,100,80);
                    }
                }
                
            },100);
            
        }
        hudUpdateSpeedBarItems();
        
        //=======================================================
        // HUD > Show Hud Elements
        //=======================================================
        
        // Displays only the hud elements expected by the game (CSS default: hidden).
        if ( gamemode == 'outoftime' ) {
            document.getElementById('outoftime_goal').style.display   = 'block';
            document.getElementById('current_lap').style.display      = 'block';
            document.getElementById('current_lap_time').style.display = 'block';
            document.getElementById('total_match_time').style.display = 'block';
        } else if( gamemode == 'fastestlap' ) {
            document.getElementById('fastestlap_goal').style.display  = 'block';
            document.getElementById('current_lap').style.display      = 'block';
            document.getElementById('current_lap_time').style.display = 'block';
            document.getElementById('total_match_time').style.display = 'block';
        }
        // Shows turbo availability on Hud Speed based on game mode.
        if ( gameplay == 'classic' ) {
            document.getElementById('turbo_max_value').style.display = 'inline-block';
        }
        // Only if there is a final lap.
        if( !(gameOverLap <= 0) ) {
            document.getElementById('gameover_lap').classList.remove('hidden');
        }
        
        //=======================================================
        // SHOW GAME OVER EVENT
        //=======================================================
        // Shows the game over screen in modal and canvas.
        // Show game info with "total laps time" or "current lap number".
        // show_gameover_event('modal or canvas',total_match_laps_time,currentLap);

        function show_gameover_event(gom_type,gom_current_time,gom_current_lap) {
            
            //-----------------------
            // Set Title (and modal class).
            switch(gom_type) {
                case 'modal':
                    var modal_gameover = '.modal.gameover';
                    $(modal_gameover).find('.first_title').text(jsr.GAME_OVER.text.title);
                    break;
                case 'canvas':
                    ctx.font      = jsr.GAME_OVER.canvas.font_title;
                    ctx.fillStyle = jsr.GAME_OVER.canvas.color;
                    ctx.textAlign = jsr.GAME_OVER.canvas.align;
                    ctx.fillText(jsr.GAME_OVER.text.title, canvas.width/2.0, canvas.height/2.2);
                    break;
            }
            
            //-----------------------
            // Result
            var msg_class  = '';
            var msg_text   = '';
            var info_text1 = '';
            var info_text2 = '';
            var info_html  = '';
            var stars      = 0;
            // Gamemode
            switch(gamemode) {
                // Fastestlap
                case 'fastestlap':
                    // Result : From best to worst, default is worst.
                    var time  = gom_current_time;
                    var score = gameover_scores.fastestlap.lapsTime;
                    switch(true) {
                        case ( time <= ( switch_gp_tc( score.turbo.result_1, score.classic.result_1 ) * gameOverLap ) && time != 0 ):
                            msg_class = 'fxrg_1';
                            msg_text = jsr.GAME_OVER.text.result_1;
                            stars = 5;
                            break;
                        case ( time <= ( switch_gp_tc( score.turbo.result_2, score.classic.result_2 ) * gameOverLap ) && time != 0 ):
                            msg_class = 'fxrg_2';
                            msg_text = jsr.GAME_OVER.text.result_2;
                            stars = 4;
                            break;
                        case ( time <= ( switch_gp_tc( score.turbo.result_3, score.classic.result_3 ) * gameOverLap ) && time != 0 ):
                            msg_class = 'fxrg_3';
                            msg_text = jsr.GAME_OVER.text.result_3;
                            stars = 3;
                            break;
                        case ( time <= ( switch_gp_tc( score.turbo.result_4, score.classic.result_4 ) * gameOverLap ) && time != 0 ):
                            msg_class = 'fxrg_4';
                            msg_text = jsr.GAME_OVER.text.result_4;
                            stars = 2;
                            break;
                        default:
                            msg_class = 'fxrg_5';
                            msg_text = jsr.GAME_OVER.text.result_5;
                            stars = 1;
                    }
                    // Info
                    info_text1 = jsr.GAME_OVER.text.fastestlap;
                    info_text2 = jsr.GAME_OVER.text.fastestlap2;
                    info_html  = info_text1+' '+formatTime(total_match_laps_time)+info_text2+'.';
                    // info_html = info_text1+' '+formatTime(total_match_laps_time)+'('+total_match_laps_time+')'+info_text2+'.';
                break;
                // Out Of Time
                case 'outoftime':
                    // Result : From best to worst, default is worst.
                    var lap   = gom_current_lap;
                    var score = gameover_scores.outoftime.lapsNumber;
                    switch(true) {
                        case ( lap >= switch_gp_tc( score.turbo.result_1, score.classic.result_1 ) ):
                            msg_class = 'fxrg_1';
                            msg_text = jsr.GAME_OVER.text.result_1;
                            stars = 5;
                            break;
                        case ( lap >= switch_gp_tc( score.turbo.result_2, score.classic.result_2 ) ):
                            msg_class = 'fxrg_2';
                            msg_text = jsr.GAME_OVER.text.result_2;
                            stars = 4;
                            break;
                        case ( lap >= switch_gp_tc( score.turbo.result_3, score.classic.result_3 ) ):
                            msg_class = 'fxrg_3';
                            msg_text = jsr.GAME_OVER.text.result_3;
                            stars = 3;
                            break;
                        case ( lap >= switch_gp_tc( score.turbo.result_4, score.classic.result_4 ) ):
                            msg_class = 'fxrg_4';
                            msg_text = jsr.GAME_OVER.text.result_4;
                            stars = 2;
                            break;
                        default:
                            msg_class = 'fxrg_5';
                            msg_text = jsr.GAME_OVER.text.result_5;
                            stars = 1;
                    }
                    // Info
                    info_text1 = jsr.GAME_OVER.text.outoftime;
                    info_text2 = jsr.GAME_OVER.text.outoftime2;
                    info_html  = info_text1+' '+currentLap+info_text2+'!';
                break;
            }
            switch(gom_type) {
                case 'modal':
                    $(modal_gameover).find('.game_result .game_result_text').addClass(msg_class);
                    $(modal_gameover).find('.game_result .game_result_text').text(msg_text);
                    $(modal_gameover).find('.game_info').html(info_html);
                    break;
                case 'canvas':
                    var msg_text_font_large = msg_text.split('').join(' ');
                    ctx.font = jsr.GAME_OVER.canvas.font_result;
                    ctx.fillText(msg_text_font_large, canvas.width/2, canvas.height/1.9);
                    ctx.font = jsr.GAME_OVER.canvas.font_text;
                    ctx.fillText(info_html, canvas.width/2, canvas.height/1.7);
                    break;
            }
            
            //-----------------------
            // GameOver Audio by Stars
            // Run only if audio effects are on.
            if( audioFxActive && jsr.Vars.audioFxAllowedByUser ) {
                switch(stars) {
                     case 5:
                     case 4:
                     case 3:
                         jsr.HelperPlayAudioFx(audioFxActive,'gameWin');
                         break;
                     case 2:
                     case 1:
                    default:
                         jsr.HelperPlayAudioFx(audioFxActive,'gameLose');
                         break;
                }
            }
            
            //-----------------------
            // Stars
            // Activates the stars corresponding to the result.
            switch(gom_type) {
                case 'modal':
                    var starsArea       = modal_gameover + ' .game_result .game_result_stars ';
                    var starActiveClass = 'solid active';
                    switch(stars) {
                        case 5:
                            $(starsArea+'.star1').addClass(starActiveClass);
                            $(starsArea+'.star2').addClass(starActiveClass);
                            $(starsArea+'.star3').addClass(starActiveClass);
                            $(starsArea+'.star4').addClass(starActiveClass);
                            $(starsArea+'.star5').addClass(starActiveClass);
                            break;
                        case 4:
                            $(starsArea+'.star1').addClass(starActiveClass);
                            $(starsArea+'.star2').addClass(starActiveClass);
                            $(starsArea+'.star3').addClass(starActiveClass);
                            $(starsArea+'.star4').addClass(starActiveClass);
                            break;
                        case 3:
                            $(starsArea+'.star1').addClass(starActiveClass);
                            $(starsArea+'.star2').addClass(starActiveClass);
                            $(starsArea+'.star3').addClass(starActiveClass);
                            break;
                        case 2:
                            $(starsArea+'.star1').addClass(starActiveClass);
                            $(starsArea+'.star2').addClass(starActiveClass);
                            break;
                        case 1:
                            $(starsArea+'.star1').addClass(starActiveClass);
                            break;
                    }
                    break;
                case 'canvas':
                    ctx.font         = jsr.GAME_OVER.canvas.font_stars;
                    var ctx_stars    = '';
                    var ctxStar      = ' '+ String.fromCharCode(9734) +' ';
                    var ctxStarSolid = ' '+ String.fromCharCode(9733) +' ';
                    switch(stars) {
                        case 5:
                            ctx_stars = ctxStarSolid + ctxStarSolid + ctxStarSolid + ctxStarSolid + ctxStarSolid;
                            break;
                        case 4:
                            ctx_stars = ctxStarSolid + ctxStarSolid + ctxStarSolid + ctxStarSolid + ctxStar;
                            break;
                        case 3:
                            ctx_stars = ctxStarSolid + ctxStarSolid + ctxStarSolid + ctxStar + ctxStar;
                            break;
                        case 2:
                            ctx_stars = ctxStarSolid + ctxStarSolid + ctxStar + ctxStar + ctxStar;
                            break;
                        case 1:
                            ctx_stars = ctxStarSolid + ctxStar + ctxStar + ctxStar + ctxStar;
                            break;
                    }
                    ctx.fillText(ctx_stars, canvas.width/2, canvas.height/1.6);
                    break;
            }
            
            //-----------------------
            // Show Modal and Button or Message.
            switch(gom_type) {
                case 'modal':
                    $(modal_gameover).find('.game_reset.btn').attr('title',jsr.GAME_OVER.text.restart_title);
                    $(modal_gameover).find('.game_reset.btn').text(jsr.GAME_OVER.text.restart_btn);
                    $(modal_gameover).css('display','block');
                    $(modal_gameover).animate({ "opacity": '1' },300);
                    break;
                case 'canvas':
                    ctx.font = jsr.GAME_OVER.canvas.font_restart;
                    var text_restart = jsr.GAME_OVER.text.restart_canvas+'.';
                    ctx.fillText(text_restart, canvas.width/2, canvas.height/1.5);
                    break;
            }
        }
        
        //=======================================================
        // UPDATE THE GAME WORLD
        //=======================================================
        
        var gameover_status_once  = 0;          // Default state for the modal gameover.
        var current_lap_time_once = 0;          // Default state for the final lap time.
        var ShowCurrentLap        = 0;          // Default Hud Current lap number.
        var ShowCurrentLapTime    = 0;          // Default Hud Current lap time.
        var ShowRemainingTime     = 0;          // Default Hud Remaning Time (Out of Time).
        var total_match_time      = 0;          // Default Hud Total Match Time.
        var total_match_laps_time = 0;          // Default Hud Total Match Laps Time.
        var checkStartRaceOnce    = 0;          // Default Check Start Race.

        function update(dt) {

            var n, car, carW, sprite, spriteW;
            var playerSegment = findSegment(position+playerZ);
            var playerW       = jsr.SPRITES.PLAYER_STRAIGHT.w * jsr.SPRITES.SCALE;
            var speedPercent  = speed/maxSpeed;
            // at top speed, should be able to cross from left to right (-1 to 1) in 1 second.
            var dx            = dt * 2 * speedPercent;
            var startPosition = position;
            
            // Current Speed Mph
            // Used by Speedometer and other game components.
            jsr.Vars.currentSpeedMph = jsr.HelperGameSpeedConverter('mph',speed);

            updateCars(dt, playerSegment, playerW);

            position = jsr.Util.increase(position, dt * speed, trackLength);
            
            if (!gameOverFlag) {
                if (keyLeft)
                    playerX = playerX - dx;
                else if (keyRight)
                    playerX = playerX + dx;
            }

            if (jsr.Vars.turboTriggered) {
                // give more torque under turbo
                playerX = playerX - (dx * speedPercent * playerSegment.curve * turboCentrifugal);
            } else {
                // else manage the torque as usual
                playerX = playerX - (dx * speedPercent * playerSegment.curve * centrifugal);
            }

            if (!gameOverFlag) {
                if (keyFaster)
                    speed = jsr.Util.accelerate(speed, accel, dt);
            else if (keySlower)
                speed = jsr.Util.accelerate(speed, breaking, dt);
            else
                speed = jsr.Util.accelerate(speed, decel, dt);
            } else { // game over flag, just decelerate the car until full stop
                speed = jsr.Util.accelerate(speed, decel, dt);
            }

            if ((playerX < -1) || (playerX > 1)) {

                if (speed > offRoadLimit)
                    speed = jsr.Util.accelerate(speed, offRoadDecel, dt);

                for(n = 0 ; n < playerSegment.sprites.length ; n++) {
                    sprite  = playerSegment.sprites[n];
                    spriteW = sprite.source.w * jsr.SPRITES.SCALE;
                    // Car Collisions (sprite)
                    if (jsr.Util.overlap(playerX, playerW, sprite.offset + spriteW/2 * (sprite.offset > 0 ? 1 : -1), spriteW)) {
                        // Set Speed
                        switch( true ) {
                            // If the player accelerates, the car will be slightly faster.
                            case ( keyFaster == true ):
                                speed = jsr.HelperGameSpeedConverter('mphToSpeedValue',12);
                                break;
                            case ( keyFaster == false ):
                                speed = jsr.HelperGameSpeedConverter('mphToSpeedValue',8);
                                break;
                        }
                        // stop in front of sprite (at front of segment)
                        position = jsr.Util.increase(playerSegment.p1.world.z, -playerZ, trackLength);
                        jsr.HelperVibrationDevice(vibrationDeviceActive,'collision');
                        jsr.HelperPlayAudioFx(audioFxActive,'collision');
                        break;
                    }
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'reset_collision');
                    jsr.HelperPlayAudioFx(audioFxActive,'reset_collision');
                }

            }

            for(n = 0 ; n < playerSegment.cars.length ; n++) {
                car  = playerSegment.cars[n];
                carW = car.sprite.w * jsr.SPRITES.SCALE;
                if (speed > car.speed) {
                    // Car Collisions (cars)
                    if (jsr.Util.overlap(playerX, playerW, car.offset, carW, 0.8)) {
                        speed    = car.speed * (car.speed/speed);
                        position = jsr.Util.increase(car.z, -playerZ, trackLength);
                        jsr.HelperVibrationDevice(vibrationDeviceActive,'collision');
                        jsr.HelperPlayAudioFx(audioFxActive,'collision');
                        break;
                    }
                }
                jsr.HelperVibrationDevice(vibrationDeviceActive,'reset_collision');
                jsr.HelperPlayAudioFx(audioFxActive,'reset_collision');
            }

            // dont ever let it go too far out of bounds
            playerX = jsr.Util.limit(playerX, -3, 3);
            if (!jsr.Vars.turboTriggered) {
                // Normal speed limit, no turbo or exceed maxSpeed
                speed = jsr.Util.limit(speed, 0, maxSpeed);
            } else {
                
                //-----------------------
                // Turbo management
                speed = jsr.Util.limit(speed, 0, turboMaxSpeed); // do not exceed turbo max speed
                accel = turboMaxSpeed / 3; // increase acceleration
                turboTimeDone += dt; // increase the current consumed time of turbo
                if (turboTimeDone < turboDuration) {                
                    // if turbo time is left, we can continue
                    var turboFov = '';
                    if (turboTimeDone < turboAnimation) {
                        // turbo initialization animation, increase fov
                        turboFov = fieldOfView * turboFovIncrement;
                        if (turboCurrentFov < turboFov) {
                            turboCurrentFov += (turboFov - fieldOfView) * (dt/turboAnimation);
                            updateFOV(turboCurrentFov);
                        }
                    } else if (turboDuration <= (turboTimeDone + turboAnimation)) {
                        // turbo end animation, decrease fov
                        if (turboCurrentFov > fieldOfView) {
                            turboCurrentFov -= (turboFov - fieldOfView) * (dt/turboAnimation);
                            updateFOV(turboCurrentFov);
                        } if (speed > maxSpeed) {
                            // also decrease speed gradually
                            speed -= (turboMaxSpeed - maxSpeed) * (dt/turboAnimation)*3; 
                            // *3 is magic value to overcome the fact that the car will still 
                            // get acceleration next frame and is still capped at turboMaxSpeed 
                            // (see jsr.Util.limit above). By multiplying by 2 we cancel the next increase.
                        }
                    }
                    $('#gamepad-turbo').addClass('active');
                } else {
                    // no turbo time left, disable the turbo mode.
                    jsr.Vars.turboTriggered = false;
                    updateFOV(fieldOfView); // reinit fieldOfView
                    $('#gamepad-turbo').removeClass('active');
                }
            }

            skyOffset  = jsr.Util.increase(skyOffset,  skySpeed  * playerSegment.curve * (position-startPosition)/segmentLength, 1);
            hillOffset = jsr.Util.increase(hillOffset, hillSpeed * playerSegment.curve * (position-startPosition)/segmentLength, 1);
            treeOffset = jsr.Util.increase(treeOffset, treeSpeed * playerSegment.curve * (position-startPosition)/segmentLength, 1);
            
            //-----------------------
            // Show Game Over Modal.
            // If by default gameOverFlag is "true" it shows the modal gameover.
            if( gameOverFlag == true ) {
                // Run only the first time.
                if( gameover_status_once == 0 ) {
                    gameover_status_once = 1;
                    show_gameover_event('modal',total_match_laps_time,currentLap);
                }
            }
            
            //----------------------
            // Speed Percentage
            
            // Percentages of the current speed without and with the turbo.
            // jsr.Vars.currentSpeedNoTurboPercent = jsr.HelperGetCurrentSpeedPercentage(speed,maxSpeed);
            jsr.Vars.currentSpeedPercent           = jsr.HelperGetCurrentSpeedPercentage(speed,turboMaxSpeed);
            
            //----------------------
            // Sounds
            
            // Play the car engine sound.
            jsr.HelperPlayAudioFx(audioFxActive,'engine',null,null,null,keyFaster,keySlower);
            // Play the sound of the car when braking.
            jsr.HelperPlayAudioFx(audioFxActive,'brake',null,null,null,null,keySlower);
            // Play the sound of the car when cornering.
            jsr.HelperPlayAudioFx(audioFxActive,'curve',null,keyLeft,keyRight);
            // Play track sounds based on player position.
            jsr.HelperPlayAudioFx(audioFxActive,'world',null,null,null,null,null,trackLength,position);
            
            //----------------------
            // Music
            jsr.HelperMusicPlayerShuffle(musicPlayerShuffle);
            jsr.HelperAutoShowMusicTrackInfo(jsr.Vars.musicPlayerInfoMs);
            
            //=======================================================
            // Game Laps
            //=======================================================
            
            if (position > playerZ) {
                
                //-----------------------
                // Lap Started
                
                // If the race has started gameStartedFlag becomes true.
                if( (checkStartRaceOnce == 0) && (position > playerZ) ) {
                    gameStartedFlag = true;
                    checkStartRaceOnce = 1;
                    // Displays only the hud elements expected by the game (CSS default: hidden).
                    if ( gamemode == 'fastestlap' ) {
                        document.getElementById('fast_lap_time').style.display    = 'block';
                    } else if ( gamemode == 'outoftime' ) {
                        document.getElementById('remaining_time').style.display   = 'block';
                    }
                    // Race Traffic Mode
                    // Start the traffic at the start of the race if raceTrafficMode is 1.
                    if( raceTrafficMode == 1 ) {
                        resetCars();
                    }
                }
                
                // Turbo Fx
                jsr.HelperShowTurboFx(turboFxType);
                
                //-----------------------
                // Arrived at Finish Line
                
                // Update last lap time + Generate new track if enabled.
                if (currentLapTime && (startPosition < playerZ)) {
                    
                    //-----------------------
                    // Current Lap
                    currentLap++;
                    
                    //-----------------------
                    // Out of time Gamemode
                    if ( gamemode == 'outoftime' ) {
                        // Increase level (only useful for display, internally we use difficultyCurrent)
                        currentLevel += 1;
                        // Give the player some more time
                        var remainingTimePast = remainingTime;
                        remainingTime += trackLength * remainingTimeIncrease;
                        if ( (remainingTimePast < remainingTimeThreshold) & (remainingTime > remainingTimeThreshold) ) {
                            jsr.Dom.removeClassName('remaining_time_alert','warning_red');
                            jsr.Dom.removeClassName('remaining_time_alert','warning_yellow');
                            
                            //----------------------
                            // Stop Deadline Sound.
                            jsr.HelperPlayAudioFx(audioFxActive,'reset_deadline');
                        }
                        // Increase current difficulty unless we are already at the max
                        if (difficultyCurrent < difficultyMax) {
                            difficultyCurrent += difficultyIncrement;
                        }
                        if (randomTrack) { 
                            // generate procedurally a new track when arriving at the finish line according to difficulty
                            // Generate a new track length according to difficulty
                            randomTrackLength = Math.floor(difficultyCurrent);
                            // Regenerate the new track
                            resetRoad(randomTrack, randomTrackLength);
                            // If we crossed the difficulty gap (ie, every few levels), then we increase the number of cars
                            if (((difficultyCurrent % difficultyGap) == 0) & (difficultyCurrent < difficultyMax)) {
                                // Double the number of cars (keep in mind the track extended and we kept 
                                // the same number of cars, so it's not too much to double)
                                totalCars += Math.floor(totalCars);
                                // And we redraw all cars TODO: make it look better 
                                // (cars on screen at finish line will disappear).
                                resetCars();
                            }
                        }
                        // Add a turbo if passed enough levels
                        if ((turboGiveEvery > 0) & (currentLevel % turboGiveEvery == 0)) {
                            turboLeft += 1;
                        }
                    }
                    
                    //-----------------------
                    // Change Landscape
                    // If enabled and we have passed indicated laps.
                    jsr.HelperAutoChangeLandscapeByLapNumber();
                    
                    //-----------------------
                    // Total Match Laps Time
                    // Sum the times of complete laps.
                    // Used for scoring on fastestlap gamemode.
                    total_match_laps_time = total_match_laps_time + currentLapTime;
                    
                    
                    //-----------------------
                    // Turbo Reload
                    if ( gameplay == 'turbo' ) { 
                        turboLeft = turboLeftInitial;
                    }
                    
                    //-----------------------
                    // Last Lap Time
                    lastLapTime = currentLapTime;
                    currentLapTime = 0;

                    if ((lastLapTime <= jsr.Util.toFloat(jsr.Dom.storage.fast_lap_time)) || 
                        (jsr.Util.toFloat(jsr.Dom.storage.fast_lap_time) == 0)) {
                        
                        jsr.Dom.storage.fast_lap_time = lastLapTime;
                        updateHud('fast_lap_time', formatTime(lastLapTime));
                        jsr.Dom.addClassName('fast_lap_time_value', 'fxrg_hud');
                        jsr.Dom.addClassName('fast_lap_time_unit', 'fxrg_hud');
                        jsr.Dom.addClassName('last_lap_time_value', 'fxrg_hud');
                        jsr.Dom.addClassName('last_lap_time_unit', 'fxrg_hud');
                        
                    } else {
                        
                        jsr.Dom.removeClassName('fast_lap_time_value', 'fxrg_hud');
                        jsr.Dom.removeClassName('fast_lap_time_unit', 'fxrg_hud');
                        jsr.Dom.removeClassName('last_lap_time_value', 'fxrg_hud');
                        jsr.Dom.removeClassName('last_lap_time_unit', 'fxrg_hud');
                        
                    }
                    updateHud('last_lap_time', formatTime(lastLapTime));
                    jsr.Dom.show('last_lap_time');
                    
                    //----------------------
                    // The device vibrates at the Finish line.
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'finish_line');
                    // Play Sound on Finish line.
                    jsr.HelperPlayAudioFx(audioFxActive,'finish_line');

                } else {
                    
                    //-----------------------
                    // We are not yet at the finish line
                    
                    currentLapTime += dt;
                    
                    //-----------------------
                    // Total Match Time
                    total_match_time = total_match_laps_time + currentLapTime;
                    
                    //-----------------------
                    // Highlights the goal achieved in hud.
                    if ( gamemode == 'outoftime' && currentLap >= outoftimeGoal ) {
                        jsr.Dom.addClassName('outoftime_goal', 'highlights');
                    } else if (gamemode == 'fastestlap') {
                        if( total_match_time <= fastestlapGoal && currentLap == gameOverLap && gameOverLap != 0 ) {
                            jsr.Dom.addClassName('fastestlap_goal', 'highlights');
                        } else {
                            jsr.Dom.removeClassName('fastestlap_goal', 'highlights');
                        }
                    }
                    
                    //-----------------------
                    // Out of time Gamemode
                    
                    if ( gamemode == 'outoftime' ) {
                        // Else we are not yet at the finish line, 
                        // we increase the time/decrease remaining time.
                        if (remainingTime > 0) {
                            remainingTime -= dt;
                        } else {
                            remainingTime = 0;
                            if (currentLevel == 0) { 
                                // first level, we give some time to the player
                                remainingTime += trackLength * remainingTimeIncrease * remainingTimeStartBonus;
                            }
                        }

                        // Highlight remaining time if quite low.
                        if ( remainingTime < remainingTimeThreshold ) {
                            
                            // The initial warning is yellow, 
                            // if half the time of the warning is missing, the warning is red.
                            if ( remainingTime < (remainingTimeThreshold / 2) ) {
                                jsr.Dom.removeClassName('remaining_time_alert','warning_yellow');
                                jsr.Dom.addClassName('remaining_time_alert','warning_red');
                                jsr.HelperPlayAudioFx(audioFxActive,'deadline','fast');
                            } else {
                                jsr.Dom.addClassName('remaining_time_alert','warning_yellow');
                                jsr.HelperPlayAudioFx(audioFxActive,'deadline','slow');
                            }
                            
                        } 
                        
                        // If the time is up remove the highlight.
                        if ( gameOverFlag == true ) {
                            jsr.Dom.removeClassName('remaining_time_alert','warning_red');
                            jsr.Dom.removeClassName('remaining_time_alert','warning_yellow');
                            
                            //----------------------
                            // Stop Deadline Sound.
                            jsr.HelperPlayAudioFx(audioFxActive,'reset_deadline');
                        }
                        
                    }

                    
                    //-----------------------
                    // Highlight Turbo when in use
                    
                    if (jsr.Vars.turboTriggered) {
                        jsr.Dom.addClassName('turbo_left','turbo_left_active');
                        jsr.Dom.addClassName('current_speed','turbo_left_active');
                        if(cssTurboEffect == true) {
                            jsr.Dom.addClassName('racer','turbo_effect');
                        }
                    } else {
                        jsr.Dom.removeClassName('turbo_left','turbo_left_active');
                        jsr.Dom.removeClassName('current_speed','turbo_left_active');
                        if(cssTurboEffect == true) {
                            jsr.Dom.removeClassName('racer','turbo_effect');
                        }
                    }

                    //=======================================================
                    // GAME OVER
                    //=======================================================
                    
                    // End of game by game lap.
                    // If the current round is greater than the final round and
                    // the final lap is different from 0 and the final lap is not less than 0.
                    var gameoverByLap = false;
                    if( currentLap > gameOverLap && gameOverLap != 0 && gameOverLap >= 0 ) {
                        gameoverByLap = true;
                    }
                    
                    // Call Game Over if conditions are met
                    if ( // Out Of Time
                         // If the remaining time is less than or equal to 0.
                         ( gamemode == 'outoftime' && remainingTime <= 0 || gameoverByLap == true ) ||
                         // Fastest Lap
                         // if the current lap exceeds the gameOverLap.
                         ( gamemode == 'fastestlap' && gameoverByLap == true ) ) { 
                            gameOverFlag = true;
                    }
                    
                    //-----------------------
                    // Show Game Over Modal.
                    // If by default gameOverFlag is "true" it shows the modal gameover.
                    if ( gameOverFlag == true ) {
                        // Run only the first time.
                        if( gameover_status_once == 0 ) {
                            gameover_status_once = 1;
                            // Show Gameover Modal
                            show_gameover_event('modal',total_match_laps_time,currentLap);
                            // Race Traffic Mode.
                            // Stop traffic at the end of the race if raceTrafficMode is 1.
                            if( raceTrafficMode == 1 ) {
                                // Stop Traffic in Race Mode.
                                resetCars(0);
                            }
                        }
                    }
                    
                    //----------------------
                    // The device vibrates when the turbo is activated.
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'turbo');
                    // Play turbo sound when turbo is activated.
                    jsr.HelperPlayAudioFx(audioFxActive,'turbo',null,null,null,keyFaster,null);
                    
                    //----------------------
                    // The device vibrates at the Finish line.
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'reset_finish_line');
                    // Play Sound on Finish line.
                    jsr.HelperPlayAudioFx(audioFxActive,'reset_finish_line');
                    
                }
            }
            
            
            //=======================================================
            // UPDATE HUD
            //=======================================================
            
            updateHud('speed_mph', jsr.Vars.currentSpeedMph);                  // MPH Speedometer.
            updateHud('speed_kmh', jsr.HelperGameSpeedConverter('kmh',speed)); // KMH Speedometer.
            updateHud('turbo_max', turboMax);
            updateHud('turbo_left', turboLeft);
            updateHud('gameover_lap', gameOverLap);
            // Game in Progress
            if( gameOverFlag == false ) {
                ShowCurrentLap = currentLap;
                ShowCurrentLapTime = formatTime(currentLapTime);
                updateHud('total_match_time', formatTime(total_match_time));
                // Game in Progress > Out Of Time
                if ( gamemode == 'outoftime' ) {
                    ShowRemainingTime = formatTime(remainingTime);
                    updateHud('outoftime_goal', outoftimeGoal);
                } else if ( gamemode == 'fastestlap' ) {
                    updateHud('fastestlap_goal', formatTime(fastestlapGoal));
                }
            // Game Over
            } else {
                // If a final lap is set.
                if( !(gameOverLap <= 0) ) {
                   ShowCurrentLap = gameOverLap;
                }
                // Game Over > Fastest Lap
                if( gamemode == 'fastestlap' ) {
                    // Shows the time of the last lap.
                    ShowCurrentLapTime = formatTime(lastLapTime);
                // Game Over > Out Of Time
                } else if( gamemode == 'outoftime' ) {
                    ShowRemainingTime = 0;
                    // Stop lap time at the end of the game.
                    if( current_lap_time_once == 0 ) {
                        ShowCurrentLapTime = formatTime(currentLapTime);
                        current_lap_time_once = 1;
                    } 
                }
            }
            updateHud('current_lap', ShowCurrentLap);
            updateHud('current_lap_time', ShowCurrentLapTime);
            // Only > Out of Time
            if ( gamemode == 'outoftime' ) {
                updateHud('remaining_time', ShowRemainingTime);
            }
            
        }

        //=======================================================
        // UPDATE CARS
        //=======================================================

        function updateCars(dt, playerSegment, playerW) {
            var n, car, oldSegment, newSegment;
            for(n = 0 ; n < cars.length ; n++) {
                car         = cars[n];
                oldSegment  = findSegment(car.z);
                car.offset  = car.offset + updateCarOffset(car, oldSegment, playerSegment, playerW);
                car.z       = jsr.Util.increase(car.z, dt * car.speed, trackLength);
                car.percent = jsr.Util.percentRemaining(car.z, segmentLength); // useful for interpolation during rendering phase
                newSegment  = findSegment(car.z);
                    var index = '';
                if (oldSegment != newSegment) {
                    index = oldSegment.cars.indexOf(car);
                    oldSegment.cars.splice(index, 1);
                    newSegment.cars.push(car);
                }
            }
        }

        function updateCarOffset(car, carSegment, playerSegment, playerW) {

            var i, j, dir, segment, otherCar, otherCarW, lookahead = 20, carW = car.sprite.w * jsr.SPRITES.SCALE;

            // optimization, dont bother steering around other cars when 'out of sight' of the player
            if ((carSegment.index - playerSegment.index) > drawDistance)
            return 0;

            for(i = 1 ; i < lookahead ; i++) {
                segment = segments[(carSegment.index+i)%segments.length];

                if ((segment === playerSegment) && (car.speed > speed) && (jsr.Util.overlap(playerX, playerW, car.offset, carW, 1.2))) {
                    if (playerX > 0.5)
                      dir = -1;
                else if (playerX < -0.5)
                      dir = 1;
                else
                      dir = (car.offset > playerX) ? 1 : -1;
                      return dir * 1/i * (car.speed-speed)/maxSpeed; 
                      // the closer the cars (smaller i) and the greated the speed ratio, the larger the offset
                }

                for(j = 0 ; j < segment.cars.length ; j++) {
                    otherCar  = segment.cars[j];
                    otherCarW = otherCar.sprite.w * jsr.SPRITES.SCALE;
                    if ((car.speed > otherCar.speed) && jsr.Util.overlap(car.offset, carW, otherCar.offset, otherCarW, 1.2)) {
                        if (otherCar.offset > 0.5)
                        dir = -1;
                    else if (otherCar.offset < -0.5)
                        dir = 1;
                    else
                        dir = (car.offset > otherCar.offset) ? 1 : -1;
                        return dir * 1/i * (car.speed-otherCar.speed)/maxSpeed;
                  }
                }
            }

            // if no cars ahead, but I have somehow ended up off road, then steer back on
            if (car.offset < -0.9)
            return 0.1;
            else if (car.offset > 0.9)
            return -0.1;
            else
            return 0;
        }

        //=======================================================
        // UPDATE HUD
        //=======================================================

        function updateHud(key, value) { 
            // accessing DOM can be slow, so only do it if value has changed
            if (hud[key].value !== value) {
                hud[key].value = value;
                jsr.Dom.set(hud[key].dom, value);
            }
        }

        function formatTime(dt) {
            var minutes = Math.floor(dt/60);
            var seconds = Math.floor(dt - (minutes * 60));
            var tenths  = Math.floor(10 * (dt - Math.floor(dt)));
            if (minutes > 0)
                return minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + tenths;
            else
                return seconds + "." + tenths;
        }

        //=======================================================
        // RENDER THE GAME WORLD
        //=======================================================

        var RenderGame = function() {

            var baseSegment   = findSegment(position);
            var basePercent   = jsr.Util.percentRemaining(position, segmentLength);
            var playerSegment = findSegment(position+playerZ);
            var playerPercent = jsr.Util.percentRemaining(position+playerZ, segmentLength);
            var playerY       = jsr.Util.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
            var maxy          = height;

            var x  = 0;
            var dx = - (baseSegment.curve * basePercent);

            // Clear the canvas
            ctx.clearRect(0, 0, width, height);
            
            // Set and Changing Landscape
            jsr.HelperSetAndChangeLandscape(forceChangeLandscapeLoop, ctx, background, width, height, skyOffset, skySpeed, hillOffset, hillSpeed, treeOffset, treeSpeed, resolution, playerY);
            
            var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;

            for(n = 0 ; n < drawDistance ; n++) {

                segment        = segments[(baseSegment.index + n) % segments.length];
                segment.looped = segment.index < baseSegment.index;
                segment.fog    = jsr.Util.exponentialFog(n/drawDistance, fogDensity);
                segment.clip   = maxy;

                jsr.Util.project(segment.p1, (playerX * roadWidth) - x,      playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
                jsr.Util.project(segment.p2, (playerX * roadWidth) - x - dx, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);

                x  = x + dx;
                dx = dx + segment.curve;

                if ((segment.p1.camera.z <= cameraDepth)     ||   // behind us
                (segment.p2.screen.y >= segment.p1.screen.y) ||   // back face cull
                (segment.p2.screen.y >= maxy))                    // clip by (already rendered) hill
                continue;

                jsr.Render.segment(ctx, width, lanes,
                    segment.p1.screen.x,
                    segment.p1.screen.y,
                    segment.p1.screen.w,
                    segment.p2.screen.x,
                    segment.p2.screen.y,
                    segment.p2.screen.w,
                    segment.fog,
                    segment.color);

                maxy = segment.p1.screen.y;

            }

            for(n = (drawDistance-1) ; n > 0 ; n--) {

                segment = segments[(baseSegment.index + n) % segments.length];

                for(i = 0 ; i < segment.cars.length ; i++) {
                    car         = segment.cars[i];
                    sprite      = car.sprite;
                    spriteScale = jsr.Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, car.percent);
                    spriteX     = jsr.Util.interpolate(segment.p1.screen.x,     segment.p2.screen.x,     car.percent) + (spriteScale * car.offset * roadWidth * width/2);
                    spriteY     = jsr.Util.interpolate(segment.p1.screen.y,     segment.p2.screen.y,     car.percent);
                    jsr.Render.sprite(ctx, width, height, resolution, roadWidth, sprites, car.sprite, spriteScale, spriteX, spriteY, -0.5, -1, segment.clip);
                }

                for(i = 0 ; i < segment.sprites.length ; i++) {
                    sprite      = segment.sprites[i];
                    spriteScale = segment.p1.screen.scale;
                    spriteX     = segment.p1.screen.x + (spriteScale * sprite.offset * roadWidth * width/2);
                    spriteY     = segment.p1.screen.y;
                    jsr.Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite.source, spriteScale, spriteX, spriteY, (sprite.offset < 0 ? -1 : 0), -1, segment.clip);
                }

                if (segment == playerSegment) {
                    jsr.Render.player(ctx, width, height, resolution, roadWidth, sprites, speed/maxSpeed,
                        cameraDepth/playerZ,
                        width/2,
                        (height/2) - (cameraDepth/playerZ * jsr.Util.interpolate(playerSegment.p1.camera.y, playerSegment.p2.camera.y, playerPercent) * height/2),
                        speed * (keyLeft ? -1 : keyRight ? 1 : 0),
                        playerSegment.p2.world.y - playerSegment.p1.world.y);
                }

            }
            
            // Tilt Horizon
            jsr.HelperRunTiltHorizonFx( jsr.Vars.tiltHorizonFxIsActive, baseSegment.curve, speed, maxSpeed, gameCanvasId, ctx, canvas.width, canvas.height);
            
            // Weather Conditions
            jsr.HelperRunGameWeatherConditions( ctx, jsr.Vars.currentWeather, keyLeft, keyRight, speed);
            
            //-----------------------
            // Show Game Over in Canvas.
            // If the game is over and you are in fullscreen mode enter the gameover message in the canvas.
            if ( gameOverFlag == true && jsr.Vars.gameIsFullscreen == true ) {
                
                show_gameover_event('canvas',total_match_laps_time,currentLap);
                
            }
            
        }

        function findSegment(z) {
            return segments[Math.floor(z/segmentLength) % segments.length]; 
        }
        
        
        //=======================================================
        // BUILD ROAD GEOMETRY
        //=======================================================
        
        // Default colors set based on the initial background.
        jsr.HelperSetWorldColors(jsr.Vars.currentLandscape);
        
        function lastY() { return (segments.length == 0) ? 0 : segments[segments.length-1].p2.world.y; }
        
        
        function addSegment(curve, y) {
            var n = segments.length;
            segments.push({
                index: n,
                   p1: { world: { y: lastY(), z:  n   *segmentLength }, camera: {}, screen: {} },
                   p2: { world: { y: y,       z: (n+1)*segmentLength }, camera: {}, screen: {} },
                curve: curve,
              sprites: [],
                 cars: [],
                color: Math.floor(n/rumbleLength)%2 ? jsr.COLORS.WORLD.DARK : jsr.COLORS.WORLD.LIGHT
            });
        }
        
        function addSprite(n, sprite, offset) {
            segments[n].sprites.push({ source: sprite, offset: offset });
        }

        function addRoad(enter, hold, leave, curve, y) {
            var startY   = lastY();
            var endY     = startY + (jsr.Util.toInt(y, 0) * segmentLength);
            var n, total = enter + hold + leave;
            for(n = 0 ; n < enter ; n++)
                addSegment(jsr.Util.easeIn(0, curve, n/enter), jsr.Util.easeInOut(startY, endY, n/total));
            for(n = 0 ; n < hold  ; n++)
                addSegment(curve, jsr.Util.easeInOut(startY, endY, (enter+n)/total));
            for(n = 0 ; n < leave ; n++)
                addSegment(jsr.Util.easeInOut(curve, 0, n/leave), jsr.Util.easeInOut(startY, endY, (enter+hold+n)/total));
        }

        var ROAD = {
            LENGTH: { NONE: 0, SHORT:  25, MEDIUM:   50, LONG:  100 },
            HILL:   { NONE: 0, LOW:    20, MEDIUM:   40, HIGH:   60 },
            CURVE:  { NONE: 0, EASY:    2, MEDIUM:    4, HARD:    6 }
        };

        function addStraight(num) {
            num = num || ROAD.LENGTH.MEDIUM;
            addRoad(num, num, num, 0, 0);
        }

        function addHill(num, height) {
            num    = num    || ROAD.LENGTH.MEDIUM;
            height = height || ROAD.HILL.MEDIUM;
            addRoad(num, num, num, 0, height);
        }

        function addCurve(num, curve, height) {
            num    = num    || ROAD.LENGTH.MEDIUM;
            curve  = curve  || ROAD.CURVE.MEDIUM;
            height = height || ROAD.HILL.NONE;
            addRoad(num, num, num, curve, height);
        }

        function addLowRollingHills(num, height) {
            num    = num    || ROAD.LENGTH.SHORT;
            height = height || ROAD.HILL.LOW;
            addRoad(num, num, num,  0,                height/2);
            addRoad(num, num, num,  0,               -height);
            addRoad(num, num, num,  ROAD.CURVE.EASY,  height);
            addRoad(num, num, num,  0,                0);
            addRoad(num, num, num, -ROAD.CURVE.EASY,  height/2);
            addRoad(num, num, num,  0,                0);
        }

        function addSCurves() {
            addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.NONE);
            addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.MEDIUM,  ROAD.HILL.MEDIUM);
            addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.EASY,   -ROAD.HILL.LOW);
            addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.MEDIUM);
            addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM);
        }

        function addBumps() {
            addRoad(10, 10, 10, 0,  5);
            addRoad(10, 10, 10, 0, -2);
            addRoad(10, 10, 10, 0, -5);
            addRoad(10, 10, 10, 0,  8);
            addRoad(10, 10, 10, 0,  5);
            addRoad(10, 10, 10, 0, -7);
            addRoad(10, 10, 10, 0,  5);
            addRoad(10, 10, 10, 0, -2);
        }

        function addDownhillToEnd(num) {
            num = num || 200;
            addRoad(num, num, num, -ROAD.CURVE.EASY, -lastY()/segmentLength);
        }

        function resetRoad(random, mintracklength) {
            segments = [];

            if (random==true) {
                // Build the list of possible constructs
                var constructs = ['straight', 'scurves', 'curve', 'bumps', 'hill', 'lowrollinghills'];
                
                // Minimum track length needs to be 2 (between start and end), else it will fail
                if (!mintracklength) { mintracklength = 2; }
                
                // Build start part of the track
                addStraight(ROAD.LENGTH.LONG); 
                // use a long road length to hide the regeneration of the next track when arriving at finish line. 
                // TODO: fix this by preloading in parallel the new track, and when riding the last construct before 
                // the finish line, modify the rendering functions to render the new track

                // Procedurally and randomly build the rest of the track
                var i = -1;
                while ((i+=1) < mintracklength) { 
                    // TODO: sometimes, 2 tracks are not enough and the loading fails, try to find out why? 
                    // (there must be an incompatibility between constructs somewhere)
                    // Pick randomly a construct
                    var randc = constructs[Math.floor(Math.random() * constructs.length)];
                    if (randc == 'straight') {
                        var posvals = [ROAD.LENGTH.SHORT, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.LONG, null];
                        var randval = posvals[Math.floor(Math.random() * posvals.length)];
                        addStraight(randval);
                    } else if (randc == 'scurves') {
                        addSCurves();
                    } else if (randc == 'curve') {
                        var posroad = [ROAD.LENGTH.SHORT, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.LONG];
                        var randroad = posroad[Math.floor(Math.random() * posroad.length)];
                        var poscurve = [ROAD.CURVE.SHORT, ROAD.CURVE.MEDIUM, ROAD.CURVE.LONG];
                        var randcurve = poscurve[Math.floor(Math.random() * poscurve.length)];
                        var poshill = [ROAD.HILL.LOW, ROAD.HILL.MEDIUM, ROAD.HILL.HIGH];
                        var randhill = poshill[Math.floor(Math.random() * poshill.length)];
                        addCurve(randroad, randcurve, randhill);
                    } else if (randc == 'bumps') {
                        addBumps();
                    } else if (randc == 'hill') {
                        var posroad = [ROAD.LENGTH.SHORT, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.LONG];
                        var randroad = posroad[Math.floor(Math.random() * posroad.length)];
                        var poshill = [ROAD.HILL.LOW, ROAD.HILL.MEDIUM, ROAD.HILL.HIGH];
                        var randhill = poshill[Math.floor(Math.random() * poshill.length)];
                        addHill(randroad, randhill);
                    } else if (randc == 'curve') {
                        addLowRollingHills();
                    }
                }
                // Build end part of the track
                addDownhillToEnd();
            } else {
                addStraight(ROAD.LENGTH.SHORT);
                addLowRollingHills();
                addSCurves();
                addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW);
                addBumps();
                addLowRollingHills();
                addCurve(ROAD.LENGTH.LONG*2, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
                addStraight();
                addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
                addSCurves();
                addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
                addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
                addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
                addBumps();
                addHill(ROAD.LENGTH.LONG, -ROAD.HILL.MEDIUM);
                addStraight();
                addSCurves();
                addDownhillToEnd();
            }

            try { 
                // workaround for the exception raised sometimes when the tracklength is too small (<5). 
                // TODO: fix the root cause of this.
                resetSprites(); 
                // reset (or create) the environmental sprites
            } catch (exc) {
                console.log(exc);
            }
            // resetCars(); 
            // don't necessarily reset cars, if we generate procedurally we just want the cars to continue
            
            // Start and finish line
            segments[findSegment(playerZ).index + 2].color = jsr.COLORS.WORLD.START;
            segments[findSegment(playerZ).index + 1].color = jsr.COLORS.WORLD.DARK;
            for(var n = 0 ; n < rumbleLength ; n++) {
                segments[segments.length-1-n].color = jsr.COLORS.WORLD.DARK;
                trackLength = segments.length * segmentLength;
            }
            
        }

        function resetSprites() {
            var n, i;

            addSprite(20,  jsr.SPRITES.BILLBOARD07, -1);
            addSprite(40,  jsr.SPRITES.BILLBOARD06, -1);
            addSprite(60,  jsr.SPRITES.BILLBOARD08, -1);
            addSprite(80,  jsr.SPRITES.BILLBOARD09, -1);
            addSprite(100, jsr.SPRITES.BILLBOARD01, -1);
            addSprite(120, jsr.SPRITES.BILLBOARD02, -1);
            addSprite(140, jsr.SPRITES.BILLBOARD03, -1);
            addSprite(160, jsr.SPRITES.BILLBOARD04, -1);
            addSprite(180, jsr.SPRITES.BILLBOARD05, -1);

            addSprite(240,                  jsr.SPRITES.BILLBOARD07, -1.2);
            addSprite(240,                  jsr.SPRITES.BILLBOARD06,  1.2);
            addSprite(segments.length - 25, jsr.SPRITES.BILLBOARD07, -1.2);
            addSprite(segments.length - 25, jsr.SPRITES.BILLBOARD06,  1.2);

            for(n = 10 ; n < 200 ; n += 4 + Math.floor(n/100)) {
                addSprite(n, jsr.SPRITES.PALM_TREE, 0.5 + Math.random()*0.5);
                addSprite(n, jsr.SPRITES.PALM_TREE,   1 + Math.random()*2);
            }

            for(n = 250 ; n < 1000 ; n += 5) {
                addSprite(n,     jsr.SPRITES.COLUMN, 1.1);
                addSprite(n + jsr.Util.randomInt(0,5), jsr.SPRITES.TREE1, -1 - (Math.random() * 2));
                addSprite(n + jsr.Util.randomInt(0,5), jsr.SPRITES.TREE2, -1 - (Math.random() * 2));
            }

            for(n = 200 ; n < segments.length ; n += 3) {
                addSprite(n, jsr.Util.randomChoice(jsr.SPRITES.PLANTS), jsr.Util.randomChoice([1,-1]) * (2 + Math.random() * 5));
            }

            var side, sprite, offset;
            for(n = 1000 ; n < (segments.length-50) ; n += 100) {
                side      = jsr.Util.randomChoice([1, -1]);
                addSprite(n + jsr.Util.randomInt(0, 50), jsr.Util.randomChoice(jsr.SPRITES.BILLBOARDS), -side);
                for(i = 0 ; i < 20 ; i++) {
                    sprite = jsr.Util.randomChoice(jsr.SPRITES.PLANTS);
                    offset = side * (1.5 + Math.random());
                    addSprite(n + jsr.Util.randomInt(0, 50), sprite, offset);
                }
            }

        }
        
        //-----------------------
        // Reset Traffic Cars
        function resetCars(setTotalCars) {
            // Cars Number
            // If setTotalCars contains a number greater than 0, this number is used instead of totalCars.
            var currentCars = 0;
            if( setTotalCars >= 0 ) { currentCars = setTotalCars; } else { currentCars = totalCars; }
            // Reset Cars
            cars = [];
            var n, car, segment, offset, z, sprite, speed;
            for (var n = 0 ; n < currentCars ; n++) {
                offset = Math.random() * jsr.Util.randomChoice([-0.8, 0.8]);
                // ensure that cars do not respawn just in front of the player, 
                // so we generate cars in all segments except the first and last (after and before finish line)
                // TODO: fix me in a more elegant way, without using constants.
                z = (Math.floor(Math.random() * (segments.length-400)) * segmentLength) + (100*segmentLength);
                sprite = jsr.Util.randomChoice(jsr.SPRITES.CARS);
                speed  = maxSpeed/4 + Math.random() * maxSpeed/(sprite == jsr.SPRITES.SEMI ? 4 : 2);
                car = { offset: offset, z: z, sprite: sprite, speed: speed };
                segment = findSegment(car.z);
                segment.cars.push(car);
                cars.push(car);
            }
        }
            
        //=======================================================
        // THE GAME LOOP
        //=======================================================
        
        jsr.Game.run({
            canvas: canvas, render: RenderGame, update: update, stats: stats, step: step,
            images: ["background", "sprites"],
            texture_detail: texture_detail,
            keys: [
                { keys: [jsr.KEY.LEFT,  jsr.KEY.A],    div: 'gamepad-left',  mode: 'down', action: function() { keyLeft   = true;  $('#gamepad-left').addClass('active');     } },
                { keys: [jsr.KEY.RIGHT, jsr.KEY.D],    div: 'gamepad-right', mode: 'down', action: function() { keyRight  = true;  $('#gamepad-right').addClass('active');    } },
                { keys: [jsr.KEY.UP,    jsr.KEY.W],    div: 'gamepad-up',    mode: 'down', action: function() { keyFaster = true;  $('#gamepad-up').addClass('active');       } },
                { keys: [jsr.KEY.DOWN,  jsr.KEY.S],    div: 'gamepad-down',  mode: 'down', action: function() { keySlower = true;  $('#gamepad-down').addClass('active');     } },
                { keys: [jsr.KEY.LEFT,  jsr.KEY.A],    div: 'gamepad-left',  mode: 'up',   action: function() { keyLeft   = false; $('#gamepad-left').removeClass('active');  } },
                { keys: [jsr.KEY.RIGHT, jsr.KEY.D],    div: 'gamepad-right', mode: 'up',   action: function() { keyRight  = false; $('#gamepad-right').removeClass('active'); } },
                { keys: [jsr.KEY.UP,    jsr.KEY.W],    div: 'gamepad-up',    mode: 'up',   action: function() { keyFaster = false; $('#gamepad-up').removeClass('active');    } },
                { keys: [jsr.KEY.DOWN,  jsr.KEY.S],    div: 'gamepad-down',  mode: 'up',   action: function() { keySlower = false; $('#gamepad-down').removeClass('active');  } },
                { keys: [jsr.KEY.SPACE, jsr.KEY.CTRL], div: 'gamepad-turbo', mode: 'down', action: triggerTurbo }
            ],
            ready: function(images) {
                background = images[0];
                sprites    = images[1];
                reset();
                jsr.Dom.storage.fast_lap_time = jsr.Dom.storage.fast_lap_time || 0;
                updateHud('fast_lap_time', formatTime(jsr.Util.toFloat(jsr.Dom.storage.fast_lap_time)));
                // Allow to put in fullscreen
                jsr.HelperGameFullScreenOnClick(gameCanvasId);
            }
        });

        //=======================================================
        // RESET
        //=======================================================
        
        function reset(options) {
            options       = options || {};
            canvas.width  = width           = jsr.Util.toInt(options.width,                 width);
            canvas.height = height          = jsr.Util.toInt(options.height,                height);
            lanes                           = jsr.Util.toInt(options.lanes,                 lanes);
            roadWidth                       = jsr.Util.toInt(options.roadWidth,             roadWidth);
            cameraHeight                    = jsr.Util.toInt(options.cameraHeight,          cameraHeight);
            drawDistance                    = jsr.Util.toInt(options.drawDistance,          drawDistance);
            fogDensity                      = jsr.Util.toInt(options.fogDensity,            fogDensity);
            fieldOfView                     = jsr.Util.toInt(options.fieldOfView,           fieldOfView);
            segmentLength                   = jsr.Util.toInt(options.segmentLength,         segmentLength);
            rumbleLength                    = jsr.Util.toInt(options.rumbleLength,          rumbleLength);
            raceTrafficMode                 = jsr.Util.toInt(options.raceTrafficMode,       raceTrafficMode);
            jsr.Vars.changeLandscapeEvery   = jsr.Util.toInt(options.changeLandscapeEvery,  jsr.Vars.changeLandscapeEvery);
            jsr.Vars.autoWeatherChangeTime  = jsr.Util.toInt(options.autoWeatherChangeTime, jsr.Vars.autoWeatherChangeTime);
            vibrationDeviceActive           = jsr.Util.toInt(options.vibrationDeviceActive, vibrationDeviceActive);
            jsr.Vars.audioFxAllowedByUser   = jsr.Util.toInt(options.audioFxAllowedByUser,  jsr.Vars.audioFxAllowedByUser);
            jsr.Vars.audioFxCarVolume       = jsr.Util.toInt(options.audioFxCarVolume,      jsr.Vars.audioFxCarVolume);
            jsr.Vars.audioFxWorldVolume     = jsr.Util.toInt(options.audioFxWorldVolume,    jsr.Vars.audioFxWorldVolume);
            jsr.Vars.audioFxMatchVolume     = jsr.Util.toInt(options.audioFxMatchVolume,    jsr.Vars.audioFxMatchVolume);
            jsr.Vars.musicPlayerVolume      = jsr.Util.toInt(options.musicPlayerVolume,     jsr.Vars.musicPlayerVolume);
            musicPlayerShuffle              = jsr.Util.toInt(options.musicPlayerShuffle,    musicPlayerShuffle);
            cameraDepth                     = 1 / Math.tan((fieldOfView/2) * Math.PI/180);
            playerZ                         = (cameraHeight * cameraDepth);
            resolution                      = height/width;
            refreshTweakUI();
            
            if ((segments.length==0) || (options.segmentLength) || (options.rumbleLength)) {
                resetRoad(randomTrack, randomTrackLength); // only rebuild road when necessary
                // Race Traffic Mode
                // If race traffic mode is enabled by default the traffic is disabled.
                // If race traffic mode is disabled by default traffic is active.
                if( raceTrafficMode == 1 ) {
                    resetCars(0);
                } else {
                    resetCars();
                }
            }
            jsr.Current.gameLoaded = true;
        }

        function updateFOV(fov) {
            cameraDepth            = 1 / Math.tan((fov/2) * Math.PI/180);
            playerZ                = (cameraHeight * cameraDepth);
        }
        
        //=======================================================
        // UPDATE > Canvas Resolution and Size
        //=======================================================
        
        function update_resolution_size_canvas() {
            // Current Selected Resolution
            var selected_resolution = jsr.Resolutions.target_selected_value;
            // If the resolution is automatic (fullscreen).
            if ( jsr.HelperCheckResolutionIsAuto(selected_resolution) ) {
                // Update the canvas Size and resolution values.
                jsr.HelperUpdateCanvasSize();
                jsr.HelperUpdateCanvasResoutionValues();
                // Update current canvas resolution.
                reset({
                    width : jsr.Resolutions.selected_resolution_current_width,
                    height : jsr.Resolutions.selected_resolution_current_height
                });
            }
        }
        // Update on resize.
        window.addEventListener('resize', function() {
            update_resolution_size_canvas();
        });
        // Update on orientation change.
        window.addEventListener("orientationchange", function() {
            update_resolution_size_canvas();
        });

        //=======================================================
        // SETTINGS > RESOLUTION
        //=======================================================

        $(document).on('change',jsr.Resolutions.target_selected_element, function(ev) {
        // jsr.Dom.on('select_resolution', 'change', function(ev) {
            var w, h, ratio;
            // If Function Works, Run.
            if(typeof jsr.HelperResolutions === "function" ) {
                // Height and Width by function set_resolution().
                [w, h] = jsr.HelperResolutions(ev.target.options[ev.target.selectedIndex].value);
            // If the function is not present.
            } else {
                switch(ev.target.options[ev.target.selectedIndex].value) {
                case 'auto':   
                    w = jsr.Current.window.width; h = jsr.Current.window.height;  
                    break;
                case 'rautohalf': // Auto > Half
                    w = jsr.Current.window.half_width; h = jsr.Current.window.half_height;  
                    break;
                }
            }
            // console.log('JSR Change Resolution - Width: '+w+' Height: '+h);
            ratio=w/width; 
            reset({ width: w, height: h })
            jsr.Dom.blur(ev);
        });

        // Warning
        if( !(typeof jsr.HelperResolutions === "function") ) {
            console.log('JS Racer Turbo: The HelperResolutions function was not found! The only canvas resolutions that work are AUTO and AUTO HALF.');
        }

        //=======================================================
        // TWEAK UI HANDLERS
        //=======================================================
        
        // Default Vibration (No Support)
        if( jsr.HelperCheckDeviceVibrationSupport() == false ) {
            vibrationDeviceActive = 0;
        }
        
        // Default Audio Effetcs (No Support)
        if( jsr.HelperCheckDeviceAudioFxSupport() == false ) { 
            jsr.Vars.audioFxAllowedByUser = 0;
        }
        
        // Default Audio Fx & Music Player Volume
        jsr.HelperUpdateMusicPlayerVolume();
        jsr.HelperUpdateAudioFxVolume();

        jsr.Dom.on('lanes','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                lanes: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('roadWidth','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                roadWidth: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('cameraHeight','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                cameraHeight: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('drawDistance','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                drawDistance: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('fieldOfView','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                fieldOfView: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('fogDensity','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                fogDensity: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('changeLandscapeEvery','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                changeLandscapeEvery: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('autoWeatherChangeTime','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                autoWeatherChangeTime: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            }); 
        });
        jsr.Dom.on('vibrationDeviceActive','change', function(ev) { 
            jsr.Dom.blur(ev); 
            if( jsr.HelperCheckDeviceVibrationSupport() == true ) {
                reset({ 
                    vibrationDeviceActive: ev.target.options[ev.target.selectedIndex].value 
                });
            } else {
                reset({ 
                    vibrationDeviceActive: 0 
                });
            }
        });
        jsr.Dom.on('audioFxAllowedByUser','change', function(ev) {
            jsr.Dom.blur(ev);
            if( jsr.HelperCheckDeviceAudioFxSupport() == true ) {
                reset({ 
                    audioFxAllowedByUser: ev.target.options[ev.target.selectedIndex].value 
                });
            } else {
                reset({ 
                    audioFxAllowedByUser: 0 
                });
            }
            jsr.HelperUpdateAudioFxControls('toggleButton');
        });
        jsr.Dom.on('audioFxCarVolume','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                audioFxCarVolume: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            });
            jsr.HelperUpdateAudioFxVolume('car');
        });
        jsr.Dom.on('audioFxWorldVolume','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                audioFxWorldVolume: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            });
            jsr.HelperUpdateAudioFxVolume('world');
        });
        jsr.Dom.on('audioFxMatchVolume','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                audioFxMatchVolume: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            });
            jsr.HelperUpdateAudioFxVolume('game');
        });
        jsr.Dom.on('musicPlayerVolume','change', function(ev) { 
            jsr.Dom.blur(ev); reset({ 
                musicPlayerVolume: jsr.Util.limit(jsr.Util.toInt(ev.target.value), jsr.Util.toInt(ev.target.getAttribute('min')), jsr.Util.toInt(ev.target.getAttribute('max'))) 
            });
            jsr.HelperUpdateMusicPlayerVolume();
        });
        jsr.Dom.on('musicPlayerShuffle','change', function(ev) { 
            reset({ 
                musicPlayerShuffle: ev.target.options[ev.target.selectedIndex].value
            });
        });

        function refreshTweakUI() {
            jsr.Dom.get('currentLanes').innerHTML                 = jsr.Dom.get('lanes').value                 = lanes;
            jsr.Dom.get('currentRoadWidth').innerHTML             = jsr.Dom.get('roadWidth').value             = roadWidth;
            jsr.Dom.get('currentCameraHeight').innerHTML          = jsr.Dom.get('cameraHeight').value          = cameraHeight;
            jsr.Dom.get('currentDrawDistance').innerHTML          = jsr.Dom.get('drawDistance').value          = drawDistance;
            jsr.Dom.get('currentFieldOfView').innerHTML           = jsr.Dom.get('fieldOfView').value           = fieldOfView;
            jsr.Dom.get('currentFogDensity').innerHTML            = jsr.Dom.get('fogDensity').value            = fogDensity;
            jsr.Dom.get('currentChangeLandscapeEvery').innerHTML  = jsr.Dom.get('changeLandscapeEvery').value  = jsr.Vars.changeLandscapeEvery;
            jsr.Dom.get('currentAutoWeatherChangeTime').innerHTML = jsr.Dom.get('autoWeatherChangeTime').value = jsr.Vars.autoWeatherChangeTime;
            jsr.Dom.get('vibrationDeviceActive').value            = vibrationDeviceActive;
         // jsr.Dom.get('currentVibrationDeviceActive').innerHTML = jsr.Dom.get('vibrationDeviceActive').value = vibrationDeviceActive;
            jsr.Dom.get('audioFxAllowedByUser').value             = jsr.Vars.audioFxAllowedByUser;
         // jsr.Dom.get('currentAudioFxAllowedByUser').innerHTML  = jsr.Dom.get('audioFxAllowedByUser').value  = jsr.Vars.audioFxAllowedByUser;
            jsr.Dom.get('currentAudioFxCarVolume').innerHTML      = jsr.Dom.get('audioFxCarVolume').value      = jsr.Vars.audioFxCarVolume;
            jsr.Dom.get('currentAudioFxWorldVolume').innerHTML    = jsr.Dom.get('audioFxWorldVolume').value    = jsr.Vars.audioFxWorldVolume;
            jsr.Dom.get('currentAudioFxMatchVolume').innerHTML    = jsr.Dom.get('audioFxMatchVolume').value    = jsr.Vars.audioFxMatchVolume;
            jsr.Dom.get('currentMusicPlayerVolume').innerHTML     = jsr.Dom.get('musicPlayerVolume').value     = jsr.Vars.musicPlayerVolume;
            jsr.Dom.get('musicPlayerShuffle').selectedIndex       = musicPlayerShuffle;
        }
        
        //=======================================================
        // HUD > Update Turbo Percentage
        //=======================================================
        
        // Updates the variable containing the percentage of the turbo for the period of turbo activity.
        function hud_update_turbo_percentage(turbo_duration_s,turbo_left) {
            // Default percentage of the turbo.
            // The function checks whether the turbo is available or not.
            jsr.Vars.hudTurboPercentage = hudSetDefaultTurboPercentage(turbo_left);
            // Turbo duration in ms, represents 100% of the time.
            var turbo_duration_ms = turbo_duration_s * 1000;
            // Total turbo time in 100ms intervals (time in ms / 100).
            var time = turbo_duration_ms / 100;
            // Every 100 ms.
            var timer = setInterval(function() {
                var countdown = time--;
                // If the countdown is within the turbo time.
                if (countdown > 0) {
                    // Update the variable with the percentage of the turbo.
                    // ( Remaining time in ms / 10) / Total time in seconds * 100 = Current Percentage.
                    jsr.Vars.hudTurboPercentage = Math.round( ( (countdown / 10) / turbo_duration_s ) * 100);
                } else if (countdown == 0) {
                    // When the timer runs out, it returns the initial value.
                    jsr.Vars.hudTurboPercentage = hudSetDefaultTurboPercentage(turbo_left);
                    // And stop the timer.
                    clearInterval(timer);
                }
            }, 100);
        }
        
        //=======================================================
        // Turbo
        //=======================================================

        // Turbo trigger function
        function triggerTurbo() {
            if (turboLeft > 0 && !jsr.Vars.turboTriggered) {
                turboCurrentFov = fieldOfView;
                turboTimeDone = 0.0;
                jsr.Vars.turboTriggered = true;
                turboLeft -= 1;
                // HUD > Update Turbo Percentage
                hud_update_turbo_percentage(turboDuration,turboLeft);
            }
        }
            
    };
    
    // Play the Game
    window.RunRacer = function(gameplay,gamemode) {
        racer(gameplay,gamemode);
    };
    
})(jQuery);
