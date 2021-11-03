//=============================================
// JSR ENGINE > JS RACER TURBO
//=============================================
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
    $(document).ready(function() {
        
        //=============================================
        // Default Config
        //=============================================
        
        // jsr is the object that contains the global variables of the game.
        window.jsr = {};
        
        // Localize > Default (EN).
        var jsr_localize_default = {
            // Localize Texts
            localize : {
                // Stats
                stats : {
                    label          : 'Performance is',
                    label_good     : 'Good',
                    label_ok       : 'Ok',
                    label_bad      : 'Bad',
                    label_disabled : 'Stats Disabled'
                },
                // Game Over
                game_over : {
                    title          : 'GAME OVER',
                    fastestlap     : 'Your race time is',
                    fastestlap2    : 's',
                    outoftime      : 'You have reached the',
                    outoftime2     : 'th lap',
                    restart_title  : 'Reload and Play Again',
                    restart_btn    : 'Play Again',
                    restart_canvas : 'Go out and play again',
                    result_1       : 'GREAT!',
                    result_2       : 'VERY GOOD!',
                    result_3       : 'GOOD!',
                    result_4       : 'POOR!',
                    result_5       : 'MAH!'
                },
                // Settings
                settings : {
                    lap            : 'Lap',
                    laps           : 'Laps'
                }
            }
        };
        
        // Set jsr.Vars which contains the main game variables with localized texts.
        // If there is no translation, load the default.
        if( typeof jsr_localize === 'undefined' ) {
            jsr.Vars = jsr_localize_default;
        } else {
            jsr.Vars = jsr_localize;
        }
        
        
        //=================================================
        // Constans
        //=================================================
        
        // Stats
        jsr.STATS = {
            color_good : 'rgb(10, 173, 79)',
            color_ok   : 'rgb(255, 255, 255)',
            color_bad  : 'rgb(255, 0, 0)',
            text : jsr.Vars.localize.stats
        };
        
        // Gameover
        jsr.GAME_OVER = {
            canvas : {
                font_title   : '30px "Racer-Font", sans-serif, Helvetica, Arial',
                font_result  : '40px "Racer-Font", sans-serif, Helvetica, Arial',
                font_stars   : '20px "Speed-Font", sans-serif, Helvetica, Arial',
                font_text    : '25px "Speed-Font", sans-serif, Helvetica, Arial',
                font_restart : '20px "Speed-Font", sans-serif, Helvetica, Arial',
                color        : 'rgba(224, 224, 224, 0.9)',
                align        : 'center'
            },
            text : jsr.Vars.localize.game_over
        };
        
        // Keyboard Commands
        jsr.KEY = {
            LEFT  : 37,
            UP    : 38,
            RIGHT : 39,
            DOWN  : 40,
            A     : 65,
            D     : 68,
            S     : 83,
            W     : 87,
            SPACE : 32,
            CTRL  : 17
        };
        
        // Low Details Textures
        var SPRITES_LOW_1500x1500 = {
            PLAYER_LEFT:            { x:    12, y:    19, w:   134, h:    78 },
            PLAYER_STRAIGHT:        { x:   150, y:    19, w:   134, h:    78 },
            PLAYER_RIGHT:           { x:   287, y:    19, w:   134, h:    78 },
            PLAYER_UPHILL_LEFT:     { x:    12, y:   101, w:   134, h:    78 },
            PLAYER_UPHILL_STRAIGHT: { x:   150, y:   101, w:   134, h:    78 },
            PLAYER_UPHILL_RIGHT:    { x:   287, y:   101, w:   134, h:    78 },
            CAR01:                  { x:   648, y:    19, w:   128, h:    82 },
            CAR02:                  { x:   780, y:    19, w:   128, h:    79 },
            CAR03:                  { x:   912, y:    20, w:   128, h:    88 },
            CAR04:                  { x:  1045, y:    20, w:   128, h:    71 },
            TRUCK:                  { x:  1177, y:    20, w:   142, h:   109 },
            SEMI:                   { x:  1324, y:    20, w:   164, h:   202 },
            BILLBOARD01:            { x:    14, y:   202, w:   291, h:   167 },
            BILLBOARD02:            { x:    14, y:   379, w:   213, h:   225 },
            BILLBOARD03:            { x:    14, y:   613, w:   232, h:   226 },
            BILLBOARD04:            { x:    14, y:   861, w:   271, h:   186 },
            BILLBOARD05:            { x:    14, y:  1054, w:   311, h:   212 },
            BILLBOARD06:            { x:    14, y:  1275, w:   298, h:   209 },
            BILLBOARD07:            { x:   311, y:   201, w:   299, h:   198 },
            BILLBOARD08:            { x:   320, y:   408, w:   290, h:   248 },
            BILLBOARD09:            { x:   293, y:   664, w:   317, h:   220 },
            CACTUS:                 { x:   293, y:   904, w:   277, h:   142 },
            BUSH1:                  { x:   346, y:  1054, w:   223, h:   212 },
            BUSH2:                  { x:   335, y:  1274, w:   235, h:   212 },
            DEAD_TREE1:             { x:   906, y:   171, w:   189, h:   437 },
            DEAD_TREE2:             { x:   906, y:   638, w:   234, h:   474 },
            TREE1:                  { x:  1105, y:   230, w:   378, h:   377 },
            TREE2:                  { x:  1149, y:   639, w:   334, h:   344 },
            PALM_TREE:              { x:   619, y:   171, w:   277, h:   690 },
            COLUMN:                 { x:   578, y:   894, w:   319, h:   590 },
            STUMP:                  { x:   907, y:  1138, w:   226, h:   173 },
            BOULDER1:               { x:  1213, y:   995, w:   271, h:   239 },
            BOULDER2:               { x:   907, y:  1337, w:   224, h:   147 },
            BOULDER3:               { x:  1142, y:  1244, w:   342, h:   240 }
        };
        
        var BACKGROUND_LOW_1320x4090 = {
            SKY:                    { x:    20, y:    20, w:  1280, h:   640 },
            HILLS:                  { x:    20, y:   700, w:  1280, h:   640 },
            TREES:                  { x:    20, y:  1382, w:  1280, h:   640 },
            SKY2:                   { x:    20, y:  2062, w:  1280, h:   640 },
            HILLS2:                 { x:    20, y:  2744, w:  1280, h:   640 },
            TREES2:                 { x:    20, y:  3424, w:  1280, h:   640 }
        };
        
        // Medium Details Textures
        var SPRITES_MEDIUM_5500x5500 = {
            PLAYER_LEFT:            { x:    52, y:    80, w:   470, h:   270 },
            PLAYER_STRAIGHT:        { x:   560, y:    80, w:   470, h:   270 },
            PLAYER_RIGHT:           { x:  1060, y:    80, w:   470, h:   270 },
            PLAYER_UPHILL_LEFT:     { x:    52, y:   380, w:   470, h:   270 },
            PLAYER_UPHILL_STRAIGHT: { x:   560, y:   380, w:   470, h:   270 },
            PLAYER_UPHILL_RIGHT:    { x:  1060, y:   380, w:   470, h:   270 },
            CAR01:                  { x:  2371, y:    70, w:   464, h:   289 },
            CAR02:                  { x:  2856, y:    70, w:   465, h:   278 },
            CAR03:                  { x:  3341, y:    70, w:   461, h:   319 },
            CAR04:                  { x:  3826, y:    70, w:   464, h:   250 },
            TRUCK:                  { x:  4311, y:    70, w:   518, h:   393 },
            SEMI:                   { x:  4850, y:    70, w:   596, h:   734 },
            BILLBOARD01:            { x:    50, y:   740, w:  1065, h:   620 },
            BILLBOARD02:            { x:    50, y:  1385, w:   789, h:   834 },
            BILLBOARD03:            { x:    50, y:  2245, w:   855, h:   835 },
            BILLBOARD04:            { x:    50, y:  3157, w:  1000, h:   683 },
            BILLBOARD05:            { x:    50, y:  3865, w:  1146, h:   781 },
            BILLBOARD06:            { x:    50, y:  4675, w:  1102, h:   775 },
            BILLBOARD07:            { x:  1141, y:   740, w:  1099, h:   727 },
            BILLBOARD08:            { x:  1174, y:  1495, w:  1069, h:   916 },
            BILLBOARD09:            { x:  1072, y:  2434, w:  1165, h:   806 },
            CACTUS:                 { x:  1072, y:  3317, w:  1019, h:   525 },
            BUSH1:                  { x:  1262, y:  3866, w:   828, h:   781 },
            BUSH2:                  { x:  1226, y:  4672, w:   866, h:   779 },
            DEAD_TREE1:             { x:  3323, y:   625, w:   699, h:  1615 },
            DEAD_TREE2:             { x:  3320, y:  2338, w:   864, h:  1744 },
            TREE1:                  { x:  4046, y:   840, w:  1404, h:  1408 },
            TREE2:                  { x:  4208, y:  2338, w:  1241, h:  1280 },
            PALM_TREE:              { x:  2266, y:   622, w:  1029, h:  2542 },
            COLUMN:                 { x:  2116, y:  3271, w:  1181, h:  2182 },
            STUMP:                  { x:  3322, y:  4171, w:   834, h:   652 },
            BOULDER1:               { x:  4441, y:  3643, w:  1011, h:   893 },
            BOULDER2:               { x:  3322, y:  4898, w:   835, h:   550 },
            BOULDER3:               { x:  4181, y:  4559, w:  1270, h:   894 }
        };
        
        var BACKGROUND_MEDIUM_1960x6070 = {
            SKY:                    { x:    30, y:    30, w:  1900, h:   960 },
            HILLS:                  { x:    30, y:  1040, w:  1900, h:   960 },
            TREES:                  { x:    30, y:  2052, w:  1900, h:   960 },
            SKY2:                   { x:    30, y:  3062, w:  1900, h:   960 },
            HILLS2:                 { x:    30, y:  4074, w:  1900, h:   960 },
            TREES2:                 { x:    30, y:  5085, w:  1900, h:   960 }
        };
        
        // High Details Textures
        var SPRITES_HIGH_11000x11000 = {
            PLAYER_LEFT:            { x:    88, y:   146, w:   972, h:   560 },
            PLAYER_STRAIGHT:        { x:  1102, y:   146, w:   972, h:   560 },
            PLAYER_RIGHT:           { x:  2110, y:   146, w:   972, h:   560 },
            PLAYER_UPHILL_LEFT:     { x:    88, y:   746, w:   972, h:   560 },
            PLAYER_UPHILL_STRAIGHT: { x:  1102, y:   746, w:   972, h:   560 },
            PLAYER_UPHILL_RIGHT:    { x:  2110, y:   746, w:   972, h:   560 },
            CAR01:                  { x:  4748, y:   150, w:   934, h:   585 },
            CAR02:                  { x:  5720, y:   148, w:   936, h:   562 },
            CAR03:                  { x:  6690, y:   146, w:   936, h:   648 },
            CAR04:                  { x:  7660, y:   148, w:   934, h:   513 },
            TRUCK:                  { x:  8630, y:   148, w:  1044, h:   801 },
            SEMI:                   { x:  9708, y:   148, w:  1203, h:  1477 },
            BILLBOARD01:            { x:    88, y:  1470, w:  2152, h:  1256 },
            BILLBOARD02:            { x:    88, y:  2758, w:  1593, h:  1683 },
            BILLBOARD03:            { x:    88, y:  4486, w:  1713, h:  1665 },
            BILLBOARD04:            { x:    88, y:  6306, w:  2011, h:  1379 },
            BILLBOARD05:            { x:    88, y:  7724, w:  2310, h:  1581 },
            BILLBOARD06:            { x:    88, y:  9342, w:  2219, h:  1559 },
            BILLBOARD07:            { x:  2276, y:  1476, w:  2206, h:  1468 },
            BILLBOARD08:            { x:  2342, y:  2982, w:  2142, h:  1841 },
            BILLBOARD09:            { x:  2142, y:  4862, w:  2347, h:  1632 },
            CACTUS:                 { x:  2140, y:  6622, w:  2044, h:  1062 },
            BUSH1:                  { x:  2524, y:  7726, w:  1662, h:  1573 },
            BUSH2:                  { x:  2450, y:  9338, w:  1737, h:  1567 },
            DEAD_TREE1:             { x:  6634, y:  1242, w:  1414, h:  3243 },
            DEAD_TREE2:             { x:  6636, y:  4672, w:  1742, h:  3498 },
            TREE1:                  { x:  8088, y:  1660, w:  2818, h:  2824 },
            TREE2:                  { x:  8414, y:  4676, w:  2489, h:  2561 },
            PALM_TREE:              { x:  4526, y:  1242, w:  2069, h:  5091 },
            COLUMN:                 { x:  4224, y:  6534, w:  2371, h:  4367 },
            STUMP:                  { x:  6636, y:  8334, w:  1683, h:  1311 },
            BOULDER1:               { x:  8878, y:  7278, w:  2031, h:  1795 },
            BOULDER2:               { x:  6632, y:  9788, w:  1685, h:  1117 },
            BOULDER3:               { x:  8358, y:  9112, w:  2546, h:  1790 }
        };
        
        var BACKGROUND_HIGH_2600x8050 = {
            SKY:                    { x:    40, y:    40, w:  2520, h:  1280 },
            HILLS:                  { x:    40, y:  1380, w:  2520, h:  1280 },
            TREES:                  { x:    40, y:  2722, w:  2520, h:  1280 },
            SKY2:                   { x:    40, y:  4062, w:  2520, h:  1280 },
            HILLS2:                 { x:    40, y:  5404, w:  2520, h:  1280 },
            TREES2:                 { x:    40, y:  6745, w:  2520, h:  1280 }
        };
        
        // World Colors
        jsr.COLORS = {
            WORLD : {
                START   : {},                                   // Default Start
                LIGHT   : {},                                   // Default Light
                DARK    : {},                                   // Default Dark
                FOG     : {},                                   // Default Fog
                TURBO   : {},                                   // Default Turbo 
                WEATHER : {},                                   // Default Weather
                NIGHT   : {                                     // Night Landscape
                    START   : {                                 // Start Line
                        lane    : 'rgb(255, 0, 255)',           // Road Line
                        lanefx  : 'rgb(255, 0, 0)',             // Road Line Fx Effect
                        road    : 'rgb(255, 0, 255)',           // Road Asphalt
                        rumble  : 'rgb(0, 255, 255)',           // Rumble Strips
                        grass   : 'rgb(255, 0, 255)'            // Road Outside
                    },
                    LIGHT   : {                                 // Light Cross Line
                        lane    : 'rgb(0, 255, 255)',
                        road    : 'rgb(8, 8, 8)', 
                        rumble  : 'rgb(0, 255, 255)', 
                        grass   : 'rgb(255, 0, 255)',
                        grassfx : 'rgb(110, 0, 221)'
                    },
                    DARK    : {                                 // Dark Cross Line.
                        lane    : 'rgb(8, 8, 8)', 
                        road    : 'rgb(8, 8, 8)', 
                        rumble  : 'rgb(0, 255, 255)',
                        grass   : 'rgb(93, 0, 93)',
                        grassfx : 'rgb(40, 0, 78)'
                    },
                    TURBO   : {
                        lane    : 'rgb(0, 255, 255)',
                        lanefx  : 'rgb(255, 0, 255)'
                    },
                    FOG     : {                                 // Fog of the landscape
                        fog     : 'rgba(255, 0, 255, 0.8)',
                        fogfx   : 'rgba(0, 196, 255, 0.6)'
                    },
                    WEATHER : {
                        snow    : 'rgba(255, 255, 255, 0.9)',
                        rain    : 'rgba(175, 237, 255, 0.8)'
                    }
                },
                DAY   : {                                       // Day Landscape
                    START   : { 
                        lane    : 'rgb(204, 165, 0)',
                        lanefx  : 'rgb(255, 0, 0)',
                        road    : 'rgb(204, 165, 0)',    
                        rumble  : 'rgb(206, 206, 206)',    
                        grass   : 'rgb(204, 165, 0)'      
                    },
                    LIGHT   : { 
                        lane    : 'rgb(206, 206, 206)',
                        road    : 'rgb(25, 25, 25)', 
                        rumble  : 'rgb(206, 206, 206)', 
                        grass   : 'rgb(204, 165, 0)',
                        grassfx : 'rgb(193, 126, 0)'
                    },
                    DARK    : { 
                        lane    : 'rgb(25, 25, 25)', 
                        road    : 'rgb(25, 25, 25)', 
                        rumble  : 'rgb(206, 206, 206)',
                        grass   : 'rgb(157, 127, 0)',
                        grassfx : 'rgb(172, 66, 0)'
                    },
                    TURBO   : {
                        lane    : 'rgb(206, 206, 206)',
                        lanefx  : 'rgb(255, 49, 0)'
                    },
                    FOG     : {
                        fog     : 'rgba(229, 132, 0, 0.8)',
                        fogfx   : 'rgba(216, 175, 0, 0.8)'
                    },
                    WEATHER : {
                        snow    : 'rgba(255, 255, 255, 0.95)',
                        rain    : 'rgba(175, 255, 252, 0.8)'
                    }
                }
            }
        };
        
        
        //=============================================
        // Dynamic Values 
        //=============================================
        
        jsr.Vars.currentSpeedMph = 'not-set';           // Current speed in Mph updated by game.
        
        //=============================================
        // Dynamic Colors
        //=============================================
        
        // Variables set by the game script.
        jsr.Vars.changeLandscapeFlag     = 'not-set';   // internal variable to start and stop the landscape change.
        jsr.Vars.turboTriggered          = 'not-set';   // internal variable - turbo triggered by player.
        jsr.Vars.turboFxMinSpeedMph      = 'not-set';   // Min speed for turbo fx, set by game.
        jsr.Vars.stopFxColorCycleByTurbo = false;       // It only becomes true when the effect is stopped due to the turbo.
        
        // Color Cycle
        jsr.HelperFxColorCycle = function(type,fxTriggerFlag,duration,rgbaColor1,rgbaColor2) {
            // Extract values from RGB/RGBa color string.
            function splitRgbaColor(rgba_color) {
                return rgba_color.replace('rgba(','').replace('rgb(','').replace(')','').split(',');
            };
            var color1 = splitRgbaColor(rgbaColor1);
            var color2 = splitRgbaColor(rgbaColor2);
            // Fx Interval
            var interval = 10;
            var u = 0.0;
            var step = 1.0 / (duration/interval);
            var colorDirection = 'regular';
            // Linear interpolation between (a) and (b), u controls amount of a/b and is in range [0.0,1.0].
            function linearInterpolation(a,b,u) {
                return (1-u) * a + u * b;
            };
            // Assemble the color in the transition RGBa.
            function returnColor(type) {
                // Compatibility rgb() colors that have no opacity, if opacity is missing set it to 1.
                if( color1[3] == null ) { color1[3] = 1; }
                if( color2[3] == null ) { color2[3] = 1; }
                // The transition can go in two alternating directions.
                switch(type) {
                    case 'regular':
                        var r = parseInt( linearInterpolation(color1[0],color2[0],u) );
                        var g = parseInt( linearInterpolation(color1[1],color2[1],u) );
                        var b = parseInt( linearInterpolation(color1[2],color2[2],u) );
                        var a = Number( linearInterpolation(color1[3],color2[3],u).toFixed(2) );
                    break;
                    case 'reverse':
                        var r = parseInt( linearInterpolation(color2[0],color1[0],u) );
                        var g = parseInt( linearInterpolation(color2[1],color1[1],u) );
                        var b = parseInt( linearInterpolation(color2[2],color1[2],u) );
                        var a = Number( linearInterpolation(color1[3],color2[3],u).toFixed(2) );
                    break;
                }
                var this_color = 'rgba('+r+','+g+','+b+','+a+')';
                return this_color;
            }
            function stopFxInterval(stop_interval) {
                if( stop_interval == true ) {
                    clearInterval(fxInterval);
                }
            }
            // Return Colors
            var fxInterval = setInterval(function() {
                var currentColor = returnColor(colorDirection);
                if( fxTriggerFlag == 'landscape' ) {
                    switch(type) {
                        case 'fog':
                            jsr.COLORS.WORLD.FOG.fog = currentColor;
                            break;
                        case 'start':
                            jsr.COLORS.WORLD.START.lane  = currentColor;
                            jsr.COLORS.WORLD.START.road  = currentColor;
                            break;
                        case 'light_grass':
                            jsr.COLORS.WORLD.LIGHT.grass = currentColor;
                            jsr.COLORS.WORLD.START.grass = currentColor;
                            break;
                        case 'dark_grass':
                            jsr.COLORS.WORLD.DARK.grass  = currentColor;
                            break;
                    }
                    // Stop on background change.
                    stopFxInterval(jsr.Vars.changeLandscapeFlag);
                } else if( fxTriggerFlag == 'turbo' ) {
                    switch(type) {
                        case 'light_lane':
                            jsr.COLORS.WORLD.LIGHT.lane   = currentColor;
                            break;
                        case 'dark_lane':
                            jsr.COLORS.WORLD.DARK.lane    = currentColor;
                            break;
                        case 'light_rumble':
                            jsr.COLORS.WORLD.LIGHT.rumble = currentColor;
                            break;
                        case 'dark_rumble':
                            jsr.COLORS.WORLD.DARK.rumble  = currentColor;
                            break;
                    }
                    // Stop at the end of the turbo or if the turbo is running but the speed is below the minimum speed.
                    if( jsr.Vars.turboTriggered == false || 
                        jsr.Vars.turboTriggered == true && jsr.Vars.currentSpeedMph < jsr.Vars.turboFxMinSpeedMph ) {
                        stopFxInterval(true);
                        // Tells the game's showTurboFx() that the effect has stopped, 
                        // so the game can reload the textures at the right time and at the end reset to false;
                        // it is preferable not to start these operations from here because they could generate problems.
                        jsr.Vars.stopFxColorCycleByTurbo = true;
                    }
                }
                if (u >= 1.0) {
                    u = 0.0; 
                    // stopFxInterval(true);
                    switch(colorDirection) {
                        case 'regular':
                            colorDirection = 'reverse';
                            break;
                        case 'reverse':
                            colorDirection = 'regular';
                            break;
                    }
                }
                u += step;
            }, interval);
        };
        
        //=============================================
        // Set & Update World Colors
        //=============================================
        
        // Sets the colors based on the current background.
        // The default colors are set via this function within the game script.
        jsr.HelperSetWorldColors = function(current_landscape) {
            var StartMs   = 200;
            var WorldMs   = 10000;
            var fxTrigger = 'landscape';
            switch(current_landscape) {
                case 'night':
                    // Static Colors
                    jsr.COLORS.WORLD.FOG.fog      = jsr.COLORS.WORLD.NIGHT.FOG.fog;
                    jsr.COLORS.WORLD.START.lane   = jsr.COLORS.WORLD.NIGHT.START.lane;
                    jsr.COLORS.WORLD.START.road   = jsr.COLORS.WORLD.NIGHT.START.road;
                    jsr.COLORS.WORLD.START.rumble = jsr.COLORS.WORLD.NIGHT.START.rumble;
                    jsr.COLORS.WORLD.START.grass  = jsr.COLORS.WORLD.NIGHT.START.grass;
                    jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.NIGHT.LIGHT.lane;
                    jsr.COLORS.WORLD.LIGHT.road   = jsr.COLORS.WORLD.NIGHT.LIGHT.road;
                    jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.NIGHT.LIGHT.rumble;
                    jsr.COLORS.WORLD.LIGHT.grass  = jsr.COLORS.WORLD.NIGHT.LIGHT.grass;
                    jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.NIGHT.DARK.lane;
                    jsr.COLORS.WORLD.DARK.road    = jsr.COLORS.WORLD.NIGHT.DARK.road;
                    jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.NIGHT.DARK.rumble;
                    jsr.COLORS.WORLD.DARK.grass   = jsr.COLORS.WORLD.NIGHT.DARK.grass;
                    jsr.COLORS.WORLD.WEATHER.snow = jsr.COLORS.WORLD.NIGHT.WEATHER.snow;
                    jsr.COLORS.WORLD.WEATHER.rain = jsr.COLORS.WORLD.NIGHT.WEATHER.rain;
                    // Timed Dynamic Colors
                    jsr.HelperFxColorCycle('fog',         fxTrigger, WorldMs, jsr.COLORS.WORLD.NIGHT.FOG.fog,     jsr.COLORS.WORLD.NIGHT.FOG.fogfx);
                    jsr.HelperFxColorCycle('start',       fxTrigger, StartMs, jsr.COLORS.WORLD.NIGHT.START.lane,  jsr.COLORS.WORLD.NIGHT.START.lanefx);
                    jsr.HelperFxColorCycle('light_grass', fxTrigger, WorldMs, jsr.COLORS.WORLD.NIGHT.LIGHT.grass, jsr.COLORS.WORLD.NIGHT.LIGHT.grassfx);
                    jsr.HelperFxColorCycle('dark_grass',  fxTrigger, WorldMs, jsr.COLORS.WORLD.NIGHT.DARK.grass,  jsr.COLORS.WORLD.NIGHT.DARK.grassfx);
                    break;
                case 'day':
                    // Static Colors
                    jsr.COLORS.WORLD.FOG.fog      = jsr.COLORS.WORLD.DAY.FOG.fog;
                    jsr.COLORS.WORLD.START.lane   = jsr.COLORS.WORLD.DAY.START.lane;
                    jsr.COLORS.WORLD.START.road   = jsr.COLORS.WORLD.DAY.START.road;
                    jsr.COLORS.WORLD.START.rumble = jsr.COLORS.WORLD.DAY.START.rumble;
                    jsr.COLORS.WORLD.START.grass  = jsr.COLORS.WORLD.DAY.START.grass;
                    jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.DAY.LIGHT.lane;
                    jsr.COLORS.WORLD.LIGHT.road   = jsr.COLORS.WORLD.DAY.LIGHT.road;
                    jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.DAY.LIGHT.rumble;
                    jsr.COLORS.WORLD.LIGHT.grass  = jsr.COLORS.WORLD.DAY.LIGHT.grass;
                    jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.DAY.DARK.lane;
                    jsr.COLORS.WORLD.DARK.road    = jsr.COLORS.WORLD.DAY.DARK.road;
                    jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.DAY.DARK.rumble;
                    jsr.COLORS.WORLD.DARK.grass   = jsr.COLORS.WORLD.DAY.DARK.grass;
                    jsr.COLORS.WORLD.WEATHER.snow = jsr.COLORS.WORLD.DAY.WEATHER.snow;
                    jsr.COLORS.WORLD.WEATHER.rain = jsr.COLORS.WORLD.DAY.WEATHER.rain;
                    // Timed Dynamic Colors
                    jsr.HelperFxColorCycle('fog',         fxTrigger, WorldMs, jsr.COLORS.WORLD.DAY.FOG.fog,     jsr.COLORS.WORLD.DAY.FOG.fogfx);
                    jsr.HelperFxColorCycle('start',       fxTrigger, StartMs, jsr.COLORS.WORLD.DAY.START.lane,  jsr.COLORS.WORLD.DAY.START.lanefx);
                    jsr.HelperFxColorCycle('light_grass', fxTrigger, WorldMs, jsr.COLORS.WORLD.DAY.LIGHT.grass, jsr.COLORS.WORLD.DAY.LIGHT.grassfx);
                    jsr.HelperFxColorCycle('dark_grass',  fxTrigger, WorldMs, jsr.COLORS.WORLD.DAY.DARK.grass,  jsr.COLORS.WORLD.DAY.DARK.grassfx);
                    break;
            }
        }
        
        // Sets the colors based on the current background.
        // Set the colors during the turbo and reset.
        jsr.HelperSetWorldColorsTurbo = function(current_landscape,turbo_status,fxtype) {
            var TurboMs   = 200;
            var RegularMs = 0;
            if( turbo_status == true ) {
                switch(current_landscape) {
                    case 'night':
                        // Timed Dynamic Colors
                        if( fxtype == 'dynamic' ) {
                            jsr.HelperFxColorCycle('light_lane',   'turbo', TurboMs, jsr.COLORS.WORLD.NIGHT.TURBO.lane, jsr.COLORS.WORLD.NIGHT.TURBO.lanefx);
                            jsr.HelperFxColorCycle('light_rumble', 'turbo', TurboMs, jsr.COLORS.WORLD.NIGHT.TURBO.lane, jsr.COLORS.WORLD.NIGHT.TURBO.lanefx);
                            jsr.HelperFxColorCycle('dark_lane',    'turbo', TurboMs, jsr.COLORS.WORLD.NIGHT.TURBO.lane, jsr.COLORS.WORLD.NIGHT.TURBO.lanefx);
                            jsr.HelperFxColorCycle('dark_rumble',  'turbo', TurboMs, jsr.COLORS.WORLD.NIGHT.TURBO.lane, jsr.COLORS.WORLD.NIGHT.TURBO.lanefx);
                        // Static Colors
                        } else if( fxtype == 'static' ) {
                            jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.NIGHT.TURBO.lane;
                            jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.NIGHT.TURBO.lane;
                            jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.NIGHT.TURBO.lane;
                            jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.NIGHT.TURBO.lane;
                        }
                        break;
                    case 'day':
                        // Timed Dynamic Colors
                        if( fxtype == 'dynamic' ) {
                            jsr.HelperFxColorCycle('light_lane',   'turbo', TurboMs, jsr.COLORS.WORLD.DAY.TURBO.lane, jsr.COLORS.WORLD.DAY.TURBO.lanefx);
                            jsr.HelperFxColorCycle('light_rumble', 'turbo', TurboMs, jsr.COLORS.WORLD.DAY.TURBO.lane, jsr.COLORS.WORLD.DAY.TURBO.lanefx);
                            jsr.HelperFxColorCycle('dark_lane',    'turbo', TurboMs, jsr.COLORS.WORLD.DAY.TURBO.lane, jsr.COLORS.WORLD.DAY.TURBO.lanefx);
                            jsr.HelperFxColorCycle('dark_rumble',  'turbo', TurboMs, jsr.COLORS.WORLD.DAY.TURBO.lane, jsr.COLORS.WORLD.DAY.TURBO.lanefx);
                        // Static Colors
                        } else if( fxtype == 'static' ) {
                            jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.DAY.TURBO.lane;
                            jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.DAY.TURBO.lane;
                            jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.DAY.TURBO.lane;
                            jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.DAY.TURBO.lane;
                        }
                        break;
                }
            } else {
                switch(current_landscape) {
                    case 'night':
                        // Static Colors
                        jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.NIGHT.LIGHT.lane;
                        jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.NIGHT.LIGHT.rumble;
                        jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.NIGHT.DARK.lane;
                        jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.NIGHT.DARK.rumble;
                        break;
                    case 'day':
                        // Static Colors
                        jsr.COLORS.WORLD.LIGHT.lane   = jsr.COLORS.WORLD.DAY.LIGHT.lane;
                        jsr.COLORS.WORLD.LIGHT.rumble = jsr.COLORS.WORLD.DAY.LIGHT.rumble;
                        jsr.COLORS.WORLD.DARK.lane    = jsr.COLORS.WORLD.DAY.DARK.lane;
                        jsr.COLORS.WORLD.DARK.rumble  = jsr.COLORS.WORLD.DAY.DARK.rumble;
                        break;
                }
            }
        }
    
        //=============================================
        // Load Required Textures
        //=============================================
        
        // Textures
        jsr.SPRITES = {};
        jsr.BACKGROUND = {};
        
        // Loads the textures array according to the required detail.
        jsr.HelperLoadTexturesArray = function(texture_detail=null) {
            switch( texture_detail ) {
                // High Textures
                case 'high':
                    jsr.SPRITES = SPRITES_HIGH_11000x11000;
                    jsr.BACKGROUND = BACKGROUND_HIGH_2600x8050;
                break;
                // Medium Textures
                case 'medium':
                    jsr.SPRITES = SPRITES_MEDIUM_5500x5500;
                    jsr.BACKGROUND = BACKGROUND_MEDIUM_1960x6070;
                break;
                // Low Textures
                case 'low':
                    jsr.SPRITES = SPRITES_LOW_1500x1500;
                    jsr.BACKGROUND = BACKGROUND_LOW_1320x4090;
                break;
                // Default > Low Textures
                default:
                    jsr.SPRITES = SPRITES_LOW_1500x1500;
                    jsr.BACKGROUND = BACKGROUND_LOW_1320x4090;
            }
            
            // The reference sprite width should be 1/3rd the (half-)roadWidth
            jsr.SPRITES.SCALE = 0.3 * (1/jsr.SPRITES.PLAYER_STRAIGHT.w);

            jsr.SPRITES.BILLBOARDS = [
                jsr.SPRITES.BILLBOARD01, jsr.SPRITES.BILLBOARD02, 
                jsr.SPRITES.BILLBOARD03, jsr.SPRITES.BILLBOARD04, 
                jsr.SPRITES.BILLBOARD05, jsr.SPRITES.BILLBOARD06, 
                jsr.SPRITES.BILLBOARD07, jsr.SPRITES.BILLBOARD08, 
                jsr.SPRITES.BILLBOARD09
            ];

            jsr.SPRITES.PLANTS = [
                jsr.SPRITES.TREE1, jsr.SPRITES.TREE2, 
                jsr.SPRITES.DEAD_TREE1, jsr.SPRITES.DEAD_TREE2, jsr.SPRITES.PALM_TREE, 
                jsr.SPRITES.BUSH1, jsr.SPRITES.BUSH2, 
                jsr.SPRITES.CACTUS, jsr.SPRITES.STUMP, 
                jsr.SPRITES.BOULDER1, jsr.SPRITES.BOULDER2, jsr.SPRITES.BOULDER3
            ];

            jsr.SPRITES.CARS = [
                jsr.SPRITES.CAR01, jsr.SPRITES.CAR02, 
                jsr.SPRITES.CAR03, jsr.SPRITES.CAR04, 
                jsr.SPRITES.SEMI, jsr.SPRITES.TRUCK
            ];
        }
        // Load Textures by required detail (Loaded by game js).
        // jsr.HelperLoadTexturesArray();
        
        //=============================================
        // minimalist DOM helpers
        //=============================================

        jsr.Dom = {

            get:  function(id)                       { return ((id instanceof HTMLElement) || (id === document)) ? id : document.getElementById(id); },
            set:  function(id, html)                 { jsr.Dom.get(id).innerHTML = html;                        },
            on:   function(ele, type, fn, capture)   { jsr.Dom.get(ele).addEventListener(type, fn, capture);    },
            un:   function(ele, type, fn, capture)   { jsr.Dom.get(ele).removeEventListener(type, fn, capture); },
            show: function(ele, type)                { jsr.Dom.get(ele).style.display = (type || 'block');      },
            blur: function(ev)                       { ev.target.blur();                                        },
            
            addClassName:    function(ele, name)     { jsr.Dom.toggleClassName(ele, name, true);  },
            removeClassName: function(ele, name)     { jsr.Dom.toggleClassName(ele, name, false); },
            toggleClassName: function(ele, name, on) {
                ele = jsr.Dom.get(ele);
                // console.log(ele);
                var classes = ele.className.split(' ');
                var n = classes.indexOf(name);
                on = (typeof on == 'undefined') ? (n < 0) : on;
                if (on && (n < 0))
                    classes.push(name);
                else if (!on && (n >= 0))
                    classes.splice(n, 1);
                ele.className = classes.join(' ');
            },

            storage: window.localStorage || {}

        }

        //=============================================
        // General purpose helpers (mostly math)
        //=============================================

        jsr.Util = {

            timestamp:        function()                  { return new Date().getTime();                                    },
            toInt:            function(obj, def)          { if (obj !== null) { var x = parseInt(obj, 10); if (!isNaN(x)) return x; } return jsr.Util.toInt(def, 0); },
            toFloat:          function(obj, def)          { if (obj !== null) { var x = parseFloat(obj);   if (!isNaN(x)) return x; } return jsr.Util.toFloat(def, 0.0); },
            limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));                     },
            randomInt:        function(min, max)          { return Math.round(jsr.Util.interpolate(min, max, Math.random()));   },
            randomChoice:     function(options)           { return options[jsr.Util.randomInt(0, options.length-1)];            },
            percentRemaining: function(n, total)          { return (n%total)/total;                                         },
            accelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },
            interpolate:      function(a,b,percent)       { return a + (b-a)*percent                                        },
            easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
            easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
            easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },
            exponentialFog:   function(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density))); },

            increase:  function(start, increment, max) { // with looping
                var result = start + increment;
                while (result >= max)
                  result -= max;
                while (result < 0)
                  result += max;
                return result;
            },

            project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
                p.camera.x     = (p.world.x || 0) - cameraX;
                p.camera.y     = (p.world.y || 0) - cameraY;
                p.camera.z     = (p.world.z || 0) - cameraZ;
                p.screen.scale = cameraDepth/p.camera.z;
                p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
                p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
                p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
            },

            overlap: function(x1, w1, x2, w2, percent) {
                var half = (percent || 1)/2;
                var min1 = x1 - (w1*half);
                var max1 = x1 + (w1*half);
                var min2 = x2 - (w2*half);
                var max2 = x2 + (w2*half);
                return ! ((max1 < min2) || (min1 > max2));
            }

        }

        //=============================================
        // POLYFILL for requestAnimationFrame
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        //=============================================

        if ( !window.requestAnimationFrame ) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame || 
                window.oRequestAnimationFrame   || 
                window.msRequestAnimationFrame  || 
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                }
        }

        //=============================================
        // Game Loop Helpers
        //=============================================

        jsr.Current = {};
        jsr.Current.stats = {};
        jsr.Current.stats.fps = 0;

        jsr.Game = {

            // A modified version of the game loop from my previous boulderdash game 
            // http://codeincomplete.com/posts/2011/10/25/javascript_boulderdash/#gameloop

            run: function(options) {

                jsr.Game.loadImages(options.images, options.texture_detail, function(images) {

                    // tell caller to initialize itself because images are loaded and we're ready to rumble
                    options.ready(images);

                    jsr.Game.setKeyListener(options.keys);

                    jsr.Game.setDivListener(options.keys);

                    var canvas = options.canvas,    // canvas render target is provided by caller
                        update = options.update,    // method to update game logic is provided by caller
                        render = options.render,    // method to render the game is provided by caller
                        step   = options.step,      // fixed frame step (1/fps) is specified by caller
                        stats  = options.stats,     // stats instance is provided by caller
                        now    = null,
                        last   = jsr.Util.timestamp(),
                        dt     = 0,
                        gdt    = 0;

                    function frame() {
                        now = jsr.Util.timestamp();
                        // using requestAnimationFrame have to be able to handle large delta's caused 
                        // when it 'hibernates' in a background or non-visible tab
                        dt  = Math.min(1, (now - last) / 1000);
                        gdt = gdt + dt;
                        while (gdt > step) {
                            gdt = gdt - step;
                            update(step);
                        }
                        render();
                        // If stats exists, update the game stats.
                        if ( typeof stats != 'undefined' || stats != null ) {
                            stats.update();
                        }
                        last = now;
                        requestAnimationFrame(frame, canvas);
                    }
                    frame(); // lets get this party started
                });

            },

            //=============================================
            // Load Images
            //=============================================

            loadImages: function(names, texture_detail, callback) { 
                // load multiple images and callback when ALL images have loaded.
                var result = [];
                var count  = names.length;
                var onload = function() {
                    if (--count == 0)
                    callback(result);
                };
                // Details Swith.
                // Upload the image texture file based on the required details.
                function texture_file_swith(texture_name=null,texture_detail=null) {
                    var result = '';
                    var sprites = '';
                    var background = '';
                    // Only for Sprites and Background set the correct file name.
                    if( texture_name == 'sprites' || texture_name == 'background' ) {
                        // Set file name of the requested detail.
                        switch( texture_detail ) {
                            // High Textures
                            case 'high':
                                sprites = '_high_11000x11000';
                                background = '_high_2600x8050';
                            break;
                            // Medium Textures
                            case 'medium':
                                sprites = '_medium_5500x5500';
                                background = '_medium_1960x6070';
                            break;
                            // Low Textures
                            case 'low':
                                sprites = '_low_1500x1500';
                                background = '_low_1320x4090';
                            break;
                            // Default > Low Textures
                            default:
                                sprites = '_low_1500x1500';
                                background = '_low_1320x4090';
                        }
                        // Set file name for the current texture.
                        switch( texture_name ) {
                            case 'sprites':
                                result = sprites;
                            break;
                            case 'background':
                                result = background;
                            break;
                        }
                    }
                    return texture_name+result;
                }
                // Textures vars.
                var texture_directyory = 'assets/game/images/canvas/';
                var texture_file_name = '';
                var texture_file_type = '.png';
                // Load Textures
                for(var n = 0 ; n < names.length ; n++) {
                    var name = names[n];
                    result[n] = document.createElement('img');
                    jsr.Dom.on(result[n], 'load', onload);
                    // Load the required textures by file name.
                    var texture_file_name = texture_file_swith(name,texture_detail);
                    result[n].src = texture_directyory + texture_file_name + texture_file_type;
                    // console.log(result[n].src);
                }
            },

            //=============================================
            // Keys Listener
            //=============================================

            setKeyListener: function(keys) {
                // Setup listeners on keys to activate functions
                var onkey = function(keyCode, mode) {
                    var n, k;
                    for(n = 0 ; n < keys.length ; n++) {
                      k = keys[n];
                      k.mode = k.mode || 'up';
                      if ((k.key == keyCode) || (k.keys && (k.keys.indexOf(keyCode) >= 0))) {
                        if (k.mode == mode) {
                          k.action.call();
                        }
                      }
                    }
                };
                jsr.Dom.on(document, 'keydown', function(ev) { onkey(ev.keyCode, 'down'); } );
                jsr.Dom.on(document, 'keyup',   function(ev) { onkey(ev.keyCode, 'up');   } );
            },

            //=============================================
            // Divs Listener
            //=============================================

            setDivListener: function(keys) {
                // Setup listeners on div to activate functions (for mobile devices)
                var n, k;
                for(n = 0 ; n < keys.length ; n++) {
                    k = keys[n]
                    if (k.div) {
                        var elt = document.getElementById(k.div);
                        if (elt) { // if the specified div element does not exist, just skip (probably the gamepad is not coded in the html)
                            if (k.mode == 'up') {
                                elt.onmouseup = k.action;
                                elt.addEventListener('mouseup', k.action);
                                elt.addEventListener('touchend', k.action);
                            } else {
                                elt.onmousedown = k.action; // fallback for old devices
                                elt.addEventListener('mousedown', k.action);
                                elt.addEventListener('touchstart', k.action);
                            }
                        }
                    }
                }
            },

            //=============================================
            // FPS counter
            //=============================================

            // Construct mr.doobs FPS counter
            // along with friendly good/bad/ok message box.

            stats: function(parentId, id) {

                // if Stats is defined.
                if (typeof Stats !== 'undefined' ) {

                    // Stats Istance
                    var result = new Stats();
                    result.domElement.id = id || 'stats_graphic';
                    jsr.Dom.get(parentId).appendChild(result.domElement);

                    var msg = document.createElement('div');
                    msg.className = 'stats_info';
                    msg.innerHTML = jsr.STATS.text.label;
                    jsr.Dom.get(parentId).appendChild(msg);

                    var value = document.createElement('div');
                    value.innerHTML = "";
                    value.className = 'stats_current';
                    msg.appendChild(value);
                    value.innerHTML = ' ... ';

                    setInterval(function() {
                        var fps   = result.current();
                        var ok    = (fps > 50) ? jsr.STATS.text.label_good : (fps < 30) ? jsr.STATS.text.label_bad : jsr.STATS.text.label_ok;
                        var color = (fps > 50) ? jsr.STATS.color_good      : (fps < 30) ? jsr.STATS.color_bad      : jsr.STATS.color_ok;
                        value.innerHTML       = ok;
                        value.style.color     = color;
                        msg.style.borderColor = color;
                        // FPS
                        jsr.Current.stats.fps = fps;
                    }, 5000);
                    return result;
                    
                } else {
                    
                    // Show Message.
                    var noStats = document.createTextNode(jsr.STATS.text.label_disabled);
                    jsr.Dom.get(parentId).appendChild(noStats);
                    // console.log('Stats Disabled');
                    
                }

            },

        }

        //=============================================
        // Canvas Rendering Helpers
        //=============================================

        jsr.Render = {

            polygon: function(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
                ctx.lineTo(x4, y4);
                ctx.closePath();
                ctx.fill();
            },

            //=============================================
            // Segment
            //=============================================
            
            segment: function(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {

                var r1 = jsr.Render.rumbleWidth(w1, lanes),
                    r2 = jsr.Render.rumbleWidth(w2, lanes),
                    l1 = jsr.Render.laneMarkerWidth(w1, lanes),
                    l2 = jsr.Render.laneMarkerWidth(w2, lanes),
                    lanew1, lanew2, lanex1, lanex2, lane;

                ctx.fillStyle = color.grass;
                ctx.fillRect(0, y2, width, y1 - y2);

                jsr.Render.polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, color.rumble);
                jsr.Render.polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, color.rumble);
                jsr.Render.polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);

                if (color.lane) {
                    lanew1 = w1*2/lanes;
                    lanew2 = w2*2/lanes;
                    lanex1 = x1 - w1 + lanew1;
                    lanex2 = x2 - w2 + lanew2;
                    for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
                        jsr.Render.polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
                }

                jsr.Render.fog(ctx, 0, y1, width, y2-y1, fog);

            },

            //=============================================
            // Background
            //=============================================

            background: function(ctx, background, width, height, layer, rotation, offset, alpha) {

                rotation = rotation || 0;
                offset   = offset   || 0;

                // By default the background image has the window size.
                // If the window size is greater than the texture, use the texture size
                // (in this case the space will be filled by stretching the backgound image).
                // Textures dimensions: The background must be twice the width of the canvas.
                // Ex: Canvas: 1x1 --> Background image: 2x1.
                var imageW = jsr.Current.window.width;
                if ( layer.w < jsr.Current.window.width ) {
                    imageW = layer.w;
                }
                var imageH = jsr.Current.window.height;
                if ( layer.h < jsr.Current.window.height ) {
                    imageH = layer.h;
                }

                var sourceX = layer.x + Math.floor(layer.w * rotation);
                var sourceY = layer.y
                var sourceW = Math.min(imageW, layer.x+layer.w-sourceX);
                var sourceH = imageH;

                var destX = 0;
                var destY = offset;
                var destW = Math.floor(width * (sourceW/imageW));
                var destH = height;

                ctx.save(); // save the current drawing parameters
                ctx.globalAlpha = alpha; // change alpha for next drawing

                ctx.drawImage(background, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
                if (sourceW < imageW)
                    ctx.drawImage(background, layer.x, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);

                // restore previous alpha and drawing parameters
                ctx.restore()

            },

            //=============================================
            // Sprite
            //=============================================

            sprite: function(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {

                //  scale for projection AND relative to roadWidth (for tweakUI)
                var destW  = (sprite.w * scale * width/2) * (jsr.SPRITES.SCALE * roadWidth);
                var destH  = (sprite.h * scale * width/2) * (jsr.SPRITES.SCALE * roadWidth);

                destX = destX + (destW * (offsetX || 0));
                destY = destY + (destH * (offsetY || 0));

                var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
                if (clipH < destH)
                    ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), destX, destY, destW, destH - clipH);

            },

            //=============================================
            // Player
            //=============================================

            player: function(ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown) {

                var bounce = (1.5 * Math.random() * speedPercent * resolution) * jsr.Util.randomChoice([-1,1]);
                var sprite;
                if (steer < 0)
                  sprite = (updown > 0) ? jsr.SPRITES.PLAYER_UPHILL_LEFT : jsr.SPRITES.PLAYER_LEFT;
                else if (steer > 0)
                  sprite = (updown > 0) ? jsr.SPRITES.PLAYER_UPHILL_RIGHT : jsr.SPRITES.PLAYER_RIGHT;
                else
                  sprite = (updown > 0) ? jsr.SPRITES.PLAYER_UPHILL_STRAIGHT : jsr.SPRITES.PLAYER_STRAIGHT;

                jsr.Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY + bounce, -0.5, -1);

            },

            //=============================================
            // Fog
            //=============================================

            fog: function(ctx, x, y, width, height, fog) {
                if (fog < 1) {
                    ctx.globalAlpha = (1-fog)
                    ctx.fillStyle = jsr.COLORS.WORLD.FOG.fog;
                    ctx.fillRect(x, y, width, height);
                    ctx.globalAlpha = 1;
                }
            },
            rumbleWidth:     function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(6,  2*lanes); },
            laneMarkerWidth: function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(32, 8*lanes); }

        }
        
        //=============================================
        // HELPERS
        //=============================================
        
        // If the object is contained in the array is true.
        jsr.HelplerInclude = function(arr, obj) {
            for(var i=0; i<arr.length; i++) {
                if (arr[i] == obj) return true;
            }
        }
        
        // Disable keyboard in .modal.settings <select> tags.
        // Corrects the problem that can occur if parameters are changed while driving the car. 
        // In this way the user can use the select elements only with the mouse or with the touchscreen.
        // https://stackoverflow.com/questions/1227146/disable-keyboard-in-html-select-tag
        $('.modal.settings select').on('keydown', function(event) {
            if (!event) {
                event = window.event;
            }
            // KeyCodes: W, S, A, D, G, SPACE, CTRL, UP, DOWN, LEFT, RIGHT.
            var all_keycode = ['87','83','65','68','71','32','17','38','40','37','39'];
            var keycode = (event.keyCode ? event.keyCode : event.which);
            // If the button is pressed only once.
            if ( jsr.HelplerInclude(all_keycode,keycode) ) {
                event.returnValue = false;
                event.cancel      = true;
                // console.log('Disabled ('+event.keyCode+')');
            }
        });

        // Converts an object into a string and
        // limits the number of characters in a string.
        function limit_string(string) {
            string = JSON.stringify(string);
            return string.substring(0, 10);
        }
        
        // Returns a random value from an array.
        jsr.HelperReturnRandomValueFromArray = function(array) {
            var value = array[Math.floor(Math.random() * array.length)];
            return value;
        }
        
        // Return a random number
        // Returns a random number between 0 and the set number,
        // if no number is set, randomly returns the number 0 or 1.
        jsr.HelperReturnRandomNumber = function(numbers = null) {
            if( numbers ) {
                return Math.floor(Math.random() * (numbers + 1));
            } else {
                return Math.round(Math.random());
            }
        }
        
        // Returns an array with records shuffled in random order.
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        jsr.HelperReturnShuffleArray = function(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle.
            while (0 !== currentIndex) {
                // Pick a remaining element.
                randomIndex   = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue      = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex]  = temporaryValue;
            }
            return array;
        }
        
        // Check if HTML5 audio is playning.
        // https://stackoverflow.com/questions/9437228/html5-check-if-audio-is-playing
        jsr.HelperCheckHtml5AudioIsPlaying = function(audioElement) {
            return !audioElement.paused; 
        }
        
        // Game Speed Converter
        // Convert game speed to Mph or Kmh.
        jsr.HelperGameSpeedConverter = function(type,currentSpeed) {
            var result = 0;
            switch( type ) {
                // From game speed value to miles per hour.
                case 'mph':
                    result = 5 * Math.round(currentSpeed/900);
                break;
                // From game speed value to kilometers per hour.
                case 'kmh':
                    result = 8 * Math.round(currentSpeed/900);
                break;
                // From miles per hour to Game Speed Value.
                case 'mphToSpeedValue':
                    result = Math.round(currentSpeed*900) / 5;
                break;
                // From kilometers per hour to Game Speed Value.
                case 'kmhToSpeedValue':
                    result = Math.round(currentSpeed*900) / 8;
                break; 
            }
            return result;
        }
        
        // If today's date is in the period between two dates, return true.
        // jsr.HelperTodayIsInThisPeriod('MM-DD','MM-DD'); 
        // Check on a date by entering it as the third argument (YYYY-MM-DD) or leave blank (null) to automatically use today's date.
        // Enable debugging with the fourth argument to true ('MM-DD','MM-DD',null,true).
        jsr.HelperTodayIsInThisPeriod = function(dateFrom,dateTo,dateToday = null,debug = false) {
            // Default
            var result      = false;
            var currentYear = null;
            
            // Set Dates
            // The date format is YYYY-MM-DD (Cross Browser: ISO 8601 by ECMAScript specification.)
            // If today's date is not entered as an argument, set it automatically.
            if( dateToday == null ) {
                // Set Current Date
                var currentDate  = new Date().toISOString();
                    currentYear  = currentDate.substr(0,4);
                var currentMonth = currentDate.substr(5,2);
                var currentDay   = currentDate.substr(8,2);
                dateToday        = currentYear+'-'+currentMonth+'-'+currentDay; // YYYY-MM-DD
            // If today's date is entered as an argument.
            } else {
                currentYear = dateToday.substr(0,4);    // Extract the year by YYYY-MM-DD.
            }
            var dateFrom = currentYear+'-'+dateFrom;
            var dateTo   = currentYear+'-'+dateTo;
            
            // I set the dates for checking with new Date().
            var newDateToday = new Date(dateToday);
            var newDateFrom  = new Date(dateFrom);
            var newDateTo    = new Date(dateTo);
            // If the date is included the result is true.
            if( newDateToday >= newDateFrom && newDateToday <= newDateTo ){
                result = true;
            }
            
            // Debug by Console
            if( debug == true ) {
                console.log('Result: '+result+' Today '+dateToday+' is between '+dateFrom+' and '+dateTo+'.');
                console.log(dateToday+' >= '+dateFrom+' ('+(dateToday >= dateFrom)+') && '+dateToday+' <= '+dateTo+' ('+(dateToday <= dateTo)+')');
                console.log(newDateToday+' >= '+newDateFrom+' ('+(newDateToday >= newDateFrom)+') && '+newDateToday+' <= '+newDateTo  +' ('+(newDateToday <= newDateTo)+')');
            }
            
            return result;
        }
        
        //=============================================
        // HELPERS > Current Speed Percentage
        //=============================================
        
        // Get Current Speed Percentage
        jsr.HelperGetCurrentSpeedPercentage = function(speed,turboMaxSpeed) {
            return Math.round( speed / turboMaxSpeed * 100 );
        }
        
        // Percentages of the current speed (Set by Game).
        // jsr.Vars.currentSpeedNoTurboPercent = 0;    // Without the turbo.
        jsr.Vars.currentSpeedPercent           = 0;    // With the turbo.

        //=============================================
        // HELPERS > Detect Devices
        //=============================================

        // Current Device > Default
        jsr.Current.device = 'not-set';

        // I check the user agent to find out if they are on mobile or desktop.
        function getOS() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/windows phone/i.test(userAgent)) {
                return "windows-phone";
            }
            if (/android/i.test(userAgent)) {
                return "android";
            }
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "ios";
            }
            return "desktop";
        }
        jsr.Current.device = getOS();
        // console.log(jsr.Current.device); 
        
        //=============================================
        // HELPERS > Detect Browser
        //=============================================
        
        function getBrowser() {
            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';
            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;
            // Chrome 1 - 71
            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
            // Edge (based on chromium) detection
            var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
            // Blink engine detection
            var isBlink = (isChrome || isOpera) && !!window.CSS;
            // Return
            switch(true) {
                case isOpera:
                    return 'isOpera';
                    break;
                case isFirefox:
                    return 'isFirefox';
                    break;
                case isSafari:
                    return 'isSafari';
                    break;
                case isIE:
                    return 'isIE';
                    break;
                case isEdge:
                    return 'isEdge';
                    break;
                case isChrome:
                    return 'isChrome';
                    break;
                case isEdgeChromium:
                    return 'isEdgeChromium';
                    break;
                case isBlink:
                    return 'isBlink';
                    break;
                default:
                    return 'isNotDetected';
            }
        }
        jsr.Current.browser = getBrowser();
        // console.log(jsr.Current.browser);
        
        //=============================================
        // Set and Changing Landscape
        //=============================================
        
        function gameChangeLandscape() {
            
            //------------------------
            // Defaults
            jsr.Vars.currentLandscape           = 'night';  // Default landscape, sets background and colors of the world ("night", "day", Set by game).
            jsr.Vars.changeLandscapeFlag        = false;    // Default internal variable to start and stop the landscape change.
            var setBackgroundTexturesOnce       = 0;        // Default value for updating textures (update with 0).
            var currentLandscapeBackgroundAlpha = 0.0;      // Default current state of background switching (0.0 to 1.0) for progressing blending animation.
            var landscapeBackgroundCurr         = [];       // Default current background textures.
            var landscapeBackgroundNext         = [];       // Default next background textures.
            var autoSwitchChangeLandscapeFlag   = true;     // By default the flag changes automatically at each landscape change.
            var changeLandscapeSelectTarget     = '.settings.modal #currentLandscape';  // Select tag for manual landscape change.
            var initchangeLandscapeOnce         = 0;        // Run only the first time the function is run by the game.
            var currentLapChangeLandscapeFlag   = 0;        // Internal variable, value used for the background change, 
                                                            // it takes into account the current lap starting from 0.
            jsr.Vars.changeLandscapeEvery       = 0;        // Change the background image when the indicated laps are matched. Set to 0 to disable. (Set by game).
            
            //------------------------
            // Set and Changing Landscape
            
            // Whenever modification is required (by jsr.Vars.changeLandscapeFlag), 
            // perform landscape change with gradual effect (Set by Game).
            jsr.HelperSetAndChangeLandscape = function(changeLoop, ctx, background, width, height, skyOffset, skySpeed, hillOffset, hillSpeed, treeOffset, treeSpeed, resolution, playerY) {
                
                // Run only the first time.
                if( initchangeLandscapeOnce == 0 ) {
                    initchangeLandscapeOnce = 1;
                    // Displays the landscape controls in the settings menu.
                    $('.settings.modal .section.section_landscape').show(0);
                    // Updates the select based on the landscape set.
                    $(changeLandscapeSelectTarget).val(jsr.Vars.currentLandscape);
                }
                
                // Order background layers only when required.
                if( setBackgroundTexturesOnce == 0 ) {
                    setBackgroundTexturesOnce = 1;
                    // Depending on the current background, load as current the night or day version.
                    // Build the list of positions in the image to extract the appropriate background.
                    switch (jsr.Vars.currentLandscape) {
                        case 'night':
                            landscapeBackgroundCurr = [ jsr.BACKGROUND.SKY,  jsr.BACKGROUND.HILLS,  jsr.BACKGROUND.TREES  ];
                            landscapeBackgroundNext = [ jsr.BACKGROUND.SKY2, jsr.BACKGROUND.HILLS2, jsr.BACKGROUND.TREES2 ];
                            break;
                        case 'day':
                            landscapeBackgroundCurr = [ jsr.BACKGROUND.SKY2, jsr.BACKGROUND.HILLS2, jsr.BACKGROUND.TREES2 ];
                            landscapeBackgroundNext = [ jsr.BACKGROUND.SKY,  jsr.BACKGROUND.HILLS,  jsr.BACKGROUND.TREES  ];
                            break;
                    }
                }
                
                // if changeLoop is enabled.
                if ( changeLoop == true ) {
                    // the state of landscape change is always active.
                    jsr.Vars.changeLandscapeFlag = true;
                }
                
                // Draw the background layers
                if (!jsr.Vars.changeLandscapeFlag) {
                    // No switching, we draw one set of backgrounds
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[0], skyOffset,  resolution * skySpeed  * playerY, 1.0);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[1], hillOffset, resolution * hillSpeed * playerY, 1.0);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[2], treeOffset, resolution * treeSpeed * playerY, 1.0);
                } else {
                    // Else we are in the process of switching, do a progressive blending, continue the blending.
                    // Increase the alpha for one, and decrease for the next background set.
                    currentLandscapeBackgroundAlpha += 0.01;
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[0],  skyOffset, resolution *  skySpeed * playerY, 1.0-currentLandscapeBackgroundAlpha);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[1], hillOffset, resolution * hillSpeed * playerY, 1.0-currentLandscapeBackgroundAlpha);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundCurr[2], treeOffset, resolution * treeSpeed * playerY, 1.0-currentLandscapeBackgroundAlpha);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundNext[0],  skyOffset, resolution *  skySpeed * playerY, currentLandscapeBackgroundAlpha);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundNext[1], hillOffset, resolution * hillSpeed * playerY, currentLandscapeBackgroundAlpha);
                    jsr.Render.background(ctx, background, width, height, landscapeBackgroundNext[2], treeOffset, resolution * treeSpeed * playerY, currentLandscapeBackgroundAlpha);
                    // Blending is done, disable the flags and reinit all related vars.
                    // Note: it is important to still do the drawing (and not put it in an if statement) because else the last drawing won't be done, 
                    // there will be no background for a split-second and this will produce a flickering effect.
                    if (currentLandscapeBackgroundAlpha >= 1.0) {
                        currentLandscapeBackgroundAlpha = 0.0;
                        // if changeLoop is disabled.
                        if ( changeLoop == false ) {
                            // blocks the change of the landscape once the change is complete.
                            jsr.Vars.changeLandscapeFlag = false;
                        }
                        // If automatic switch is required.
                        if( autoSwitchChangeLandscapeFlag == true ) {
                            // Update current background flag.
                            switch (jsr.Vars.currentLandscape) {
                                case 'night':
                                    jsr.Vars.currentLandscape = 'day';
                                    $(changeLandscapeSelectTarget).val('day');
                                    break;
                                case 'day':
                                    jsr.Vars.currentLandscape = 'night';
                                    $(changeLandscapeSelectTarget).val('night');
                                    break;
                            }
                        }
                        // if automatic switching is deactivated.
                        if( autoSwitchChangeLandscapeFlag == false ) {
                            autoSwitchChangeLandscapeFlag = true;
                        }
                        // Schedule the texture update for the new landscape.
                        setBackgroundTexturesOnce = 0;
                        // Update Road Colors by Landscape.
                        jsr.HelperSetWorldColors(jsr.Vars.currentLandscape);
                    }
                }
                
            }
            
            //------------------------
            // Change Landscape by Select
            
            // Change the landscape via the selection tag in the settings.
            $(document).on('change',changeLandscapeSelectTarget,function(){
                // Perform the timed change on the required landscape. 
                var requestedLandscape = $('option:selected',this).val();
                var startingLandscape  = jsr.Vars.currentLandscape;
                // If the requested landscape is different from the original landscape. 
                if( startingLandscape != requestedLandscape ) {
                    // If the case is allowed set the required flag. 
                    if( requestedLandscape == 'night' || requestedLandscape == 'day' ) {
                        switch (requestedLandscape) {
                            case 'night':
                                jsr.Vars.currentLandscape = 'night';
                                break;
                            case 'day':
                                jsr.Vars.currentLandscape = 'day';
                                break;
                        }
                        // Disable the switch (the flag is already set). 
                        autoSwitchChangeLandscapeFlag = false;
                        // Request the immediate change of landscape.
                        jsr.Vars.changeLandscapeFlag  = true;
                    }
                }
            });
            
            //------------------------
            // Get Remaning Laps
            
            // Get the laps remaining (before the landscape change).
            function getRemaningLapsNumber() {
                // Not return NaN.
                if( jsr.Vars.changeLandscapeEvery != 0 ) {
                    return currentLapChangeLandscapeFlag % jsr.Vars.changeLandscapeEvery;
                } else {
                    return 0;
                }
            }
            
            //------------------------
            // Displays Remaning Laps
            
            // Displays the remaining laps in the settings menu.
            // Also used for the default data (Set by Game).
            jsr.HelperDisplaysRemaningLapsToChangeLandscape = function() {
                // Show remaining number of laps.
                var targetBetweenLaps    = '.settings.modal #changeLandscapeBetweenLaps';
                var currentRemaningLaps  = jsr.Vars.changeLandscapeEvery - getRemaningLapsNumber();
                if( currentRemaningLaps == 1 ) {
                    $(targetBetweenLaps).html(currentRemaningLaps+' '+jsr.Vars.localize.settings.lap);
                } else {
                    $(targetBetweenLaps).html(currentRemaningLaps+' '+jsr.Vars.localize.settings.laps);
                }
                // Displays the label for the number of laps that is set.
                var targetSetLapsLabel   = '.settings.modal #labelChangeLandscapeEvery';
                if( jsr.Vars.changeLandscapeEvery == 1 ) {
                    $(targetSetLapsLabel).html(' '+jsr.Vars.localize.settings.lap);
                } else {
                    $(targetSetLapsLabel).html(' '+jsr.Vars.localize.settings.laps);
                }
            }
            
            //------------------------
            // Change and View the laps number.
            
            // Updates the display of the number of laps remaining when the number 
            // is changed via the selection tag in the configuration menu.
            $(document).on('change','.settings.modal #changeLandscapeEvery',function(){
                jsr.HelperDisplaysRemaningLapsToChangeLandscape();
            });
            
            //------------------------
            // Automatically changes based on laps.
            
            // Automatically changes the landscape according to the lap number (Set by Game).
            jsr.HelperAutoChangeLandscapeByLapNumber = function() {
                currentLapChangeLandscapeFlag += 1;
                // Update and view remaning laps number.
                jsr.HelperDisplaysRemaningLapsToChangeLandscape();
                // Changes landscape every few laps (0 disables the change). 
                if ((jsr.Vars.changeLandscapeEvery > 0) && (getRemaningLapsNumber() == 0)) {
                    jsr.Vars.changeLandscapeFlag = true;
                }
            }
            
        }
        gameChangeLandscape();

        //=============================================
        // Get and Update Window Size
        //=============================================

        // Defaults
        jsr.Current.window = {};

        // Window Dimensions
        function update_window_dimensions() {
            jsr.Current.window.x4_width = $(window).width() * 4;
            jsr.Current.window.x4_height = $(window).height() * 4;
            jsr.Current.window.x2_width = $(window).width() * 2;
            jsr.Current.window.x2_height = $(window).height() * 2;
            jsr.Current.window.width = $(window).width();
            jsr.Current.window.height = $(window).height();
            jsr.Current.window.half_width = $(window).width() / 2;
            jsr.Current.window.half_height = $(window).height() / 2;
            jsr.Current.window.low_width = $(window).width() / 4;
            jsr.Current.window.low_height = $(window).height() / 4;
            // Display Text
            $('.rautox4_update').html(
                limit_string(jsr.Current.window.x4_width)+
                'x'+
                limit_string(jsr.Current.window.x4_height)+
                'px');
            $('.rautox2_update').html(
                limit_string(jsr.Current.window.x2_width)+
                'x'+
                limit_string(jsr.Current.window.x2_height)+
                'px');
            $('.rauto_update').html(
                limit_string(jsr.Current.window.width)+
                'x'+
                limit_string(jsr.Current.window.height)+
                'px'); 
            $('.rautohalf_update').html(
                limit_string(jsr.Current.window.half_width)+
                'x'+
                limit_string(jsr.Current.window.half_height)+
                'px');
            $('.rautolow_update').html(
                limit_string(jsr.Current.window.low_width)+
                'x'+
                limit_string(jsr.Current.window.low_height)+
                'px');
        };
        // Default
        update_window_dimensions();

        //------------------------
        // Update Dimensions
        
        // On Resize Window.
        $(window).on('resize', function(){
            update_window_dimensions();
        });
        // On change of orientation.
        window.addEventListener("orientationchange", function() {
            update_window_dimensions();
        });

        //=============================================
        // All Display Resolutions and Defaults
        //=============================================

        // Resolutions
        jsr.Resolutions = {};
        jsr.Resolutions.target_selected_element = '#select_resolution';
        jsr.Resolutions.target_selected_option = '#select_resolution option:selected';
        jsr.Resolutions.target_selected_value = $('#select_resolution option:selected').val();
        // All Resolutions > Settings.
        jsr.Resolutions.all = {
            // Auto Resolutions
            rautox4 : { 
                w : jsr.Current.window.x4_width,   
                h : jsr.Current.window.x4_height,   
                label : 'Auto Maximum (Window Pixel x4) | Window Size'},
            rautox2 : { 
                w : jsr.Current.window.x2_width,   
                h : jsr.Current.window.x2_height,   
                label : 'Auto High (Window Pixel x2) | Window Size'},
            rauto : { 
                w : jsr.Current.window.width,      
                h : jsr.Current.window.height,      
                label : 'Auto (Window Pixel) | Window Size'},
            rautohalf : { 
                w : jsr.Current.window.half_width, 
                h : jsr.Current.window.half_height, 
                label : 'Auto Half (Window Pixel &#247;2) | Window Size'},
            rautolow : { 
                w : jsr.Current.window.low_width,  
                h : jsr.Current.window.low_height,   
                label : 'Auto Low (Window Pixel &#247;4) | Window Size'},
            // Normal Resolutions
            r7680x4320 : { w : 7680, h : 4320 , label :'7680x4320px (8K) | 16:9'                    },
            r5760x2400 : { w : 5760, h : 2400 , label :'5760x2400px (Ultrawide 2400 5K) | 21:9'     },
            r4320x7680 : { w : 4320, h : 7680 , label :'4320x7680px (8K Reverse) | 16:9'            }, 
            r3840x2160 : { w : 3840, h : 2160 , label :'3840x2160px (UltraHD 4K) | 16:9'            }, 
            r3440x1440 : { w : 3440, h : 1440 , label :'3440x1440px (Ultrawide 1440 WQHD) | 21:9'   }, 
            r2880x1200 : { w : 2880, h : 1200 , label :'2880x1200px (Ultrawide 1200 WFHD+) | 21:9'  }, 
            r2560x1080 : { w : 2560, h : 1080 , label :'2560x1080px (Ultrawide 1080 WFHD) | 21:9'   },
            r2160x3840 : { w : 2160, h : 3840 , label :'2160x3840px (Ultra HD 4K Reverse) | 16:9'   },
            r2160x900  : { w : 2160, h : 900  , label :'2160x900px (Ultrawide 900 WHD+) | 21:9'     }, 
            r1920x1080 : { w : 1920, h : 1080 , label :'1920x1080px (Full HD) | 16:9'               },
            r1720x720  : { w : 1720, h : 720  , label :'1720x720px (Ultrawide 720 WHD) | 21:9'      },
            r1536x864  : { w : 1536, h : 864  , label :'1536x864px (HD 864p) | 16:9'                },
            r1365x768  : { w : 1365, h : 768  , label :'1365x768px (HD 768p) | 16:9'                },
            r1280x960  : { w : 1280, h : 960  , label :'1280x960px (SXGA) | 4:3'                    },
            r1280x720  : { w : 1280, h : 720  , label :'1280x720px (HD Ready) | 16:9'               },
            r1147x480  : { w : 1147, h : 480  , label :'1147x480px (Ultrawide 480 WHD) | 21:9'      },
            r1080x1920 : { w : 1080, h : 1920 , label :'1080x1920px (Full HD Reverse) | 16:9'       },
            r1024x768  : { w : 1024, h : 768  , label :'1024x768px (XVGA) | 4:3'                    },
            r864x1536  : { w : 864,  h : 1536 , label :'864x1536px (HD 864p Reverse) | 16:9'        },
            r860x360   : { w : 860,  h : 360  , label :'860x360px (Ultrawide 360 WHD) | 21:9'       },
            r853x480   : { w : 853,  h : 480  , label :'853x480px (SD 480p) | 16:9'                 },
            r800x600   : { w : 800,  h : 600  , label :'800x600px (SVGA) | 4:3'                     },
            r768x1365  : { w : 768,  h : 1365 , label :'768x1365px (HD 768p Reverse) | 16:9'        },
            r768x1024  : { w : 768,  h : 1024 , label :'768x1024px (XVGA Reverse) | 4:3'            },
            r720x1280  : { w : 720,  h : 1280 , label :'720x1280px (HD Ready Reverse) | 16:9'       },
            r640x480   : { w : 640,  h : 480  , label :'640x480px (VGA) | 4:3'                      },
            r640x360   : { w : 640,  h : 360  , label :'640x360px (SD 360p) | 16:9'                 },
            r480x853   : { w : 480,  h : 853  , label :'480x853px (SD 480p Reverse) | 16:9'         },
            r480x360   : { w : 480,  h : 360  , label :'480x360px (Low) | 4:3'                      },
            r427x240   : { w : 427,  h : 240  , label :'427x240px (SD 240p) | 16:9'                 },
            r360x640   : { w : 360,  h : 640  , label :'360x640px (SD 360p Reverse) | 16:9'         },
            r240x427   : { w : 240,  h : 427  , label :'240x427px (SD 240p Reverse) | 16:9'         }
        };

        //=============================================
        // Setup > Create Display Resolution Select
        //=============================================

        function add_options_resolutions() {
            // Resolutions Array
            var all_resolution_id = Object.keys(jsr.Resolutions.all);
            // For each record in the array, create an option and add it to the menu.
            $.each(all_resolution_id,function(res_index,res) {
                var id = res;
                var label = jsr.Resolutions.all[id]['label'];
                var option_res = '<option value="'+id+'">'+label+'</option>';
                $(jsr.Resolutions.target_selected_element).append(option_res);
            });
        };
        add_options_resolutions();
        
        //=============================================
        // Setup > Auto Set Resolution
        //=============================================
        
        // Set the default resolution value for the current device.
        function auto_set_resolution() {
            
            // Default Resolution > Native Resolution.
            $(jsr.Resolutions.target_selected_element).val("rauto");
            
            //---------------------------
            // Detect devices (Roughly)
            
            var device_current = jsr.Current.device;        // Current device Type.
            var device_width   = jsr.Current.window.width;  // Current device Width.
            var device_height  = jsr.Current.window.height; // Current device Height.
            // var device_fps  = jsr.Current.stats.fps;     // Current fps updated every 5000ms.
            
            // Detect Not Powerful Devices
            // If the device is mobile and the size of the short side of the screen is less than 320px. 
            // (320x568px iPhone5 browser window).
            var device_detect_Not_Powerful = false;
            if( device_current != 'desktop' && 
                ((device_width <= '320') || (device_height <= '320')) ) { 
                device_detect_Not_Powerful = true;
            };
            // Detect Modern Mobile Devices
            // If the device is mobile and the size of the short edge of the screen is greater than 320px,
            // and the size of the short side is less than or equal to 414px.
            // (414x736px iPhone 6/7/8 Plus browser window).
            var device_detect_Mobile_Modern = false;
            if( device_current != 'desktop' && 
               ((device_width > '320') || (device_height > '320')) &&
               ((device_width <= '414') || (device_height <= '414')) ) { 
                device_detect_Mobile_Modern = true;
            };
            // Detect More Full HD Devices
            // If the size of the short edge of the screen is greater than 1080px.
            var device_detect_More_Full_hd = false;
            if( (device_width >= '1080') && (device_height >= '1080') ) { 
                device_detect_More_Full_hd = true;
            };
            
            //---------------------------
            // Set Default Resolution.
            // Let's try to make anyone play smoothly and with the best resolution.
            
            // Not Powerful Devices and and screens with high resolutions > Half of Native Resolution.
            if( device_detect_Not_Powerful || device_detect_More_Full_hd ) {
                $(jsr.Resolutions.target_selected_element).val("rautohalf");
            // Detect Modern Mobile Devices > x2 Resolution.
            } else if( device_detect_Mobile_Modern ) {
                $(jsr.Resolutions.target_selected_element).val("rautox2");
            };
            
        }
        auto_set_resolution();

        //=============================================
        // Setup > Change Display Resolution
        //=============================================

        // This function switches the canvas resolution.
        jsr.HelperResolutions = function(current_value) {
            var w = 0; 
            var h = 0; 
            var resolutions_consistent = Object.keys(jsr.Resolutions.all);
            // If current_value is contained in the resolutions_consistent array.
            if ( jsr.HelplerInclude(resolutions_consistent,current_value) ) {
                // Read object height and width.
                w = jsr.Resolutions.all[current_value]['w'];
                h = jsr.Resolutions.all[current_value]['h'];
                // console.log(w);
                // console.log(h);
                return [w, h];
            };
        };
        
        //=============================================
        // Full Screen Game
        //=============================================
        
        jsr.Vars.gameIsFullscreen = false;  // Default (Used by the game).
        
        // Manage full screen mode on double click.
        jsr.HelperGameFullScreenOnClick = function(gameCanvasId) {
            // Game Canvas
            var gameCanvas = document.getElementById(gameCanvasId);
            // Info: https://www.sitepoint.com/use-html5-full-screen-api/
            gameCanvas.ondblclick = function() {
                // If Fullscreen is active.
                if (document.fullscreenElement    || document.webkitFullscreenElement ||
                    document.mozFullScreenElement || document.msFullscreenElement) {
                    // Exit Fullscreen.
                    if (document.exitFullscreen)            { document.exitFullscreen(); } 
                    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); } 
                    else if (document.mozCancelFullScreen)  { document.mozCancelFullScreen(); } 
                    else if (document.msExitFullscreen)     { document.msExitFullscreen(); }
                    jsr.Vars.gameIsFullscreen = false;
                // If Fullscreen is not active. 
                } else {
                    // Go Full Screen.
                    if (gameCanvas.requestFullscreen)            { gameCanvas.requestFullscreen(); } 
                    else if (gameCanvas.webkitRequestFullscreen) { gameCanvas.webkitRequestFullscreen(); } 
                    else if (gameCanvas.mozRequestFullScreen)    { gameCanvas.mozRequestFullScreen(); } 
                    else if (gameCanvas.msRequestFullscreen)     { gameCanvas.msRequestFullscreen(); }
                    jsr.Vars.gameIsFullscreen = true;
                }
            }
            
        }
        
        //=============================================
        // Setup > Auto Set Textures Details
        //=============================================
        
        // Textures
        jsr.Textures = {};
        jsr.Textures.target_selected_element = '#select_textures_detail';
        jsr.Textures.target_selected_option = '#select_textures_detail option:selected';
        jsr.Textures.target_selected_value = $(jsr.Textures.target_selected_option).val();
        
        // Since changing the details requires restarting the script, the required details are saved in a cookie.
        // If the Texture Details Cookie does not exist, create it.
        if( Cookies.get('jsr-textures-detail') == null ) { 
            Cookies.set('jsr-textures-detail', 'not-set', { sameSite:'strict' });
        };
        
        // Set the required texture level and default.
        jsr.HelperSetTexturesDetailValue = function(texture_detail=null) {
            // Set Required Detail
            function set_textures_detail(textures_detail_value) {
                Cookies.set('jsr-textures-detail',textures_detail_value, { sameSite:'strict' });
                $(jsr.Textures.target_selected_element).val(textures_detail_value);
            };
            // Set Default Detail
            function set_default() {
                //If the Texture Details Cookie does not exist or not set.
                if( Cookies.get('jsr-textures-detail') == null || Cookies.get('jsr-textures-detail') == 'not-set' ) {
                    // Current device Type.
                    var device_current = jsr.Current.device;
                    // Sets the texture detail value based on the current device.
                    // On phones we put minimum details while on PCs medium details.
                    if( device_current != 'desktop') {
                        set_textures_detail('low');
                    } else {
                        set_textures_detail('medium');
                    }
                // If the cookie is already set.
                } else {
                    // Set the current detail in the settings texture details menu.
                    var current_value = Cookies.get('jsr-textures-detail');
                    $(jsr.Textures.target_selected_element).val(current_value);
                }
            }
            // Detail Swith
            switch ( texture_detail ) {
                // High Detail
                case 'high':
                    set_textures_detail('high');
                    break;
                // Medium Detail
                case 'medium':
                    set_textures_detail('medium');
                    break;   
                // Low Detail
                case 'low':
                    set_textures_detail('low');
                    break;
                // Default
                default:
                    set_default();
            }
        }
        jsr.HelperSetTexturesDetailValue();
        
        //=============================================
        // Settings > Textures Detail Changes.
        //=============================================

        function change_textures_details_modal() {
            // When I click on the select it stores the current value.
            var current_value = '';
            $(document).on('focus',jsr.Textures.target_selected_element,function() {
                current_value = $(jsr.Textures.target_selected_option).val();
            });
            // When change the value.
            $(document).on('change',jsr.Textures.target_selected_element,function() {
                // Selected setting.
                var selected_value = $(jsr.Textures.target_selected_option).val();
                // show Alerts modal.
                var modal = '.modal.alerts';
                jsr.HelperShowModal(modal);
                // Show Message in modal.
                $('.modal.alerts .notice_textures_detail').removeClass('hidden');
                $('.modal.alerts .notice_textures_detail .label_detail').text('textures'+': '+selected_value);
                // If proceed, set the new cookie and reset the game.
                $(document).on('click','.modal.alerts .notice_textures_detail .game_reset_textures_detail',function() {
                    Cookies.set('jsr-textures-detail', selected_value, { sameSite:'strict' });
                    location.reload();
                });
                // If cancel, restore the current option in the <select>.
                $(document).on('click','.modal.alerts .modal_close',function() {
                    $(jsr.Textures.target_selected_element).val(current_value);
                });
            });
        }
        change_textures_details_modal();
        
        //=============================================
        // HELPER > Check if the resolution is Auto
        //=============================================
        
        // If the resolution is automatic, return true.
        jsr.HelperCheckResolutionIsAuto = function(check_resolution) {
            var auto_resolutions = ['rautox4','rautox2','rauto','rautohalf','rautolow'];
            if ( jsr.HelplerInclude(auto_resolutions,check_resolution) ) {
                return true;
            }
            return false;
        }
        
        //=============================================
        // UPDATE > Canvas Size
        //=============================================
        
        // Updates canvas height and width with current window height and width.
        jsr.HelperUpdateCanvasSize = function() {
            var width = 'not-set';
            var height = 'not-set';
            var selected_resolution = jsr.Resolutions.target_selected_value;
            // If the resolution is automatic, the canvas is fullscreen.
            if( jsr.HelperCheckResolutionIsAuto(selected_resolution) ) {
                width = jsr.Current.window.width;
                height = jsr.Current.window.height;
            // Otherwise it has the resolution size set.
            } else {
                width = jsr.Resolutions.all[jsr.Resolutions.target_selected_value]['w'];
                height = jsr.Resolutions.all[jsr.Resolutions.target_selected_value]['h'];
            }
            // Update Canvas Dimensions
            var target = '.game_canvas #canvas';
            $(target).attr('width',width);
            $(target).attr('height',height);
            $(target).css('width',width);
            $(target).css('height',height);
            // Update current settings resolution value.
            $(jsr.Resolutions.target_selected_element).val(jsr.Resolutions.target_selected_value);
        }
        
        //=============================================
        // UPDATE > Canvas Resolution Values
        //=============================================
        
        // Resolution Values
        jsr.Resolutions.selected_resolution_current_width = 'not-set';
        jsr.Resolutions.selected_resolution_current_height = 'not-set';
        
        jsr.HelperUpdateCanvasResoutionValues = function() {
            // Current Selected Resolution
            var selected_resolution = jsr.Resolutions.target_selected_value;
            // Update > Canvas resolution with the current window size resolution.
            switch(selected_resolution) {
                case 'rautox4':
                    jsr.Resolutions.selected_resolution_current_width = jsr.Current.window.x4_width;
                    jsr.Resolutions.selected_resolution_current_height = jsr.Current.window.x4_height;
                    break;
                case 'rautox2':
                    jsr.Resolutions.selected_resolution_current_width = jsr.Current.window.x2_width;
                    jsr.Resolutions.selected_resolution_current_height = jsr.Current.window.x2_height;
                    break;
                case 'rauto':
                    jsr.Resolutions.selected_resolution_current_width = jsr.Current.window.width;
                    jsr.Resolutions.selected_resolution_current_height = jsr.Current.window.height;
                    break;
                case 'rautohalf':
                    jsr.Resolutions.selected_resolution_current_width = jsr.Current.window.half_width;
                    jsr.Resolutions.selected_resolution_current_height = jsr.Current.window.half_height;
                    break;
                case 'rautolow':
                    jsr.Resolutions.selected_resolution_current_width = jsr.Current.window.low_width;
                    jsr.Resolutions.selected_resolution_current_height = jsr.Current.window.low_height;
                    break;
            }
        }

        //=============================================
        // Update CSS classes and styles related to resolution
        //=============================================

        function play_update_resolution_css() {
            
            // Update Class and Styles
            function update_resolution_css() {
                var target_class = 'body';
                var target_style = '.game_canvas #canvas';
                var selected_res_value = jsr.Resolutions.target_selected_value;
                var selected_res_width = jsr.Resolutions.all[jsr.Resolutions.target_selected_value]['w'];
                var selected_res_height = jsr.Resolutions.all[jsr.Resolutions.target_selected_value]['h'];
                var prefix = 'game_res';
                var selected_resolution = prefix+'_'+selected_res_value;
                // Imports all the resolution IDs to use them as a suffix of the css classes.
                var suffix = Object.keys(jsr.Resolutions.all);
                // Update the unique css class of the current resolution in the body.
                function update_css_classes() {
                    // Create an array with CSS classes of allowed resolutions (For each suffix).
                    var allowed_resolutions_classes = [];
                    for (var i = 0; i < suffix.length; i++) {
                        allowed_resolutions_classes.push( prefix+'_'+suffix[i] );
                    };
                    // If the class name is allowed.
                    if ( jsr.HelplerInclude( allowed_resolutions_classes , selected_resolution ) ) {
                        // Remove the old class and add the new one.
                        $(target_class).removeClass(allowed_resolutions_classes);
                        $(target_class).addClass(selected_resolution);
                    };
                }
                // Update the CSS class that limits the size of the canvas to keep it inside the window.
                function update_max_size_class() {
                    $(target_style).removeClass(['canvas_max_window_width','canvas_max_window_height']);
                    // For non-automatic resolutions only.
                    if( !(jsr.HelperCheckResolutionIsAuto(selected_res_value)) ) {
                        // If the width is larger than the height.
                        if( selected_res_width > selected_res_height ) {
                            $(target_style).addClass('canvas_max_window_width');
                        // If the width is smaller than the height.
                        } else if( selected_res_width < selected_res_height ) {
                            $(target_style).addClass('canvas_max_window_height');
                        } 
                    }
                }
                // Update the size (height and width) of the canvas.
                function update_canvas_size() {
                    // Checks whether the selected resolution is present in the array of allowed resolution IDs.
                    if ( jsr.HelplerInclude(suffix,selected_res_value) ) {
                        // Updates the height and width of the canvas.
                        jsr.HelperUpdateCanvasSize();
                    }
                }
                update_css_classes();
                update_max_size_class();
                update_canvas_size();
            };
            // Update Resolution value and class.
            $(jsr.Resolutions.target_selected_element).change(function() {
                $(jsr.Resolutions.target_selected_option).each(function() {
                    jsr.Resolutions.target_selected_value = $(this).val();
                    update_resolution_css();
                });
            }).change();
            
        };
        play_update_resolution_css();
        
        //=============================================
        // GAMEPAD > Steering Wheel
        //=============================================
        
        function gamepad_starring_whell() {
        
            // Position the steering wheel.
            function starring_whell(direction) {
                var target_starring = '.gamepad .steering_wheel .steering';
                var all_classes = ['left','right'];
                $(target_starring).removeClass(all_classes);
                if( direction == 'left') {
                    $(target_starring).addClass('left');

                }
                if( direction == 'right') {
                    $(target_starring).addClass('right');
                }
            }
            // Left
            $(document).on('keydown', function(event) {
                // KeyCodes: A / ARROW LEFT
                var all_keycode = ['65','37'];
                var keycode = (event.keyCode ? event.keyCode : event.which);
                // If the button is pressed only once.
                if ( jsr.HelplerInclude(all_keycode,keycode) ) {
                    starring_whell('left');
                }
            });
            $(document).on('mousedown','#gamepad #gamepad-left', function() {
                starring_whell('left');
            });
            $(document).on('touchstart','#gamepad #gamepad-left', function() {
                starring_whell('left');
            });
            // Right
            $(document).on('keydown', function(event) {
                // KeyCodes: D / ARROW RIGHT
                var all_keycode = ['68','39'];
                var keycode = (event.keyCode ? event.keyCode : event.which);
                // If the button is pressed only once.
                if ( jsr.HelplerInclude(all_keycode,keycode) ) {
                    starring_whell('right');
                }
            });
            $(document).on('mousedown','#gamepad #gamepad-right', function() {
                starring_whell('right');
            });
            $(document).on('touchstart','#gamepad #gamepad-right', function() {
                starring_whell('right');
            });
            // Center
            $(document).on('keyup', function(event) {
                // KeyCodes: A / ARROW LEFT / D / ARROW RIGHT
                var all_keycode = ['65','37','68','39'];
                var keycode = (event.keyCode ? event.keyCode : event.which);
                // If the button is pressed only once.
                if ( jsr.HelplerInclude(all_keycode,keycode) ) {
                    starring_whell();
                }
            });
            $(document).on('mouseup','#gamepad #gamepad-left', function() {
                starring_whell();
            });
            $(document).on('touchend','#gamepad #gamepad-left', function() {
                starring_whell();
            });
            $(document).on('mouseup','#gamepad #gamepad-right', function() {
                starring_whell();
            });
            $(document).on('touchend','#gamepad #gamepad-right', function() {
                starring_whell();
            });
            
        }
        gamepad_starring_whell();

        //=============================================
        // MODALS
        //=============================================
        
        function play_modals() {
            
            // All Modals List
            var modals = [
                'settings','howToPlay','audio','gamepad','gameplay_menu','gmturbo_menu','gmclassic_menu',
                'gmdemo_menu','options_menu','safe_reset','credits','welcome','gameover','alerts','cookies_notice'
            ];
            // Defaults
            var modalSettingsCompactIsOpen = 'not-set';                         // if a modal compact is in use it is true (.modal.settings).
            var btnShowMainMenu            = '.btn_modal.show_options_menu';    // Btn Show Main Menu.
            // For all modals
            $.each(modals,function(modal_index,modal) {
                // Show BTN.
                var btn_modal_show = '.show_'+modal;
                // Hide BTN.
                var btn_modal_hide = '.show_'+modal+'.modal_open';
                // Hide In the modal.
                var on_modal_hide = '.modal.'+modal+' .modal_close';
                // Modal.
                var modal = '.modal.'+modal;
                // Open Modal > BTN
                $(document).on('click',btn_modal_show,function() {
                    $(btn_modal_show).addClass('modal_open');
                    // Modal gamepad
                    if(btn_modal_show == '.show_gamepad') {
                        $(modal).animate({ "opacity": '1' },0);
                        $(modal).slideDown(300);
                        // Move Hud & Compact Modal CSS
                        $('body').addClass('gamepad_open');
                    // Others modals
                    } else {
                        $(modal).css('display','block');
                        $(modal).animate({ "opacity": '1' },300);
                    };
                    // If open the gameplay-menu, hide option menu.
                    if( btn_modal_show == '.show_gameplay_menu' || 
                        btn_modal_show == '.show_credits' ) {
                        $('.modal.options_menu').animate({ "opacity": "0" },300);
                        setTimeout(function(){
                            $('.modal.options_menu').css("display","none"); 
                        },300);
                    // else if open settings menu and the modal compact is active.
                    // shows the button to enter the main menu.
                    } else if( btn_modal_show == '.show_settings' && modalSettingsCompactIsOpen == true ) {
                        $(btnShowMainMenu).show();
                    }
                    // Hide Gameplay Modal.
                    function hide_gameplay_modal(){
                        $('.modal.gameplay_menu').animate({ "opacity": "0" },300);
                        setTimeout(function(){ 
                            $('.modal.gameplay_menu').css("display","none"); 
                        },300);
                    }
                    // If open the gmturbo_menu, gmclassic_menu, gmdemo_menu, hide game mode menu.
                    if( btn_modal_show == '.show_gmturbo_menu'   || 
                        btn_modal_show == '.show_gmclassic_menu' ||
                        btn_modal_show == '.show_gmdemo_menu' ) {
                        hide_gameplay_modal();
                    };
                });
                // Close Modal > BTN.
                $(document).on('click',btn_modal_hide,function(){
                    $(btn_modal_show).removeClass('modal_open');
                    // Modal gamepad
                    if(btn_modal_show == '.show_gamepad') {
                        $(modal).slideUp(300);
                        $(modal).animate({ "opacity": "0" },300);
                        // Move Hud & Compact Modal CSS
                        $('body').removeClass('gamepad_open');
                    // Others modals
                    } else {
                        $(modal).animate({ "opacity": "0" },300);
                        setTimeout(function(){ 
                            $(modal).css("display","none"); 
                        },300);
                    }
                });
                // Close Modal > In the modal.
                $(document).on('click',on_modal_hide,function(){
                    $(btn_modal_show).removeClass('modal_open');
                    var target = $(this).parents('.modal');
                    $(target).animate({ "opacity": "0" },300);
                    setTimeout(function(){ 
                        $(target).css("display","none"); 
                    },300);
                    // If close the nav menu it brings up the options menu.
                    if( btn_modal_show == '.show_gameplay_menu' || 
                        btn_modal_show == '.show_credits' ) {
                        $('.modal.options_menu').css('display','block');
                        $('.modal.options_menu').animate({ "opacity": '1' },300);
                    }
                    // Show the Gamepaly Manu
                    function show_gameplay_modal() {
                        $('.modal.gameplay_menu').css('display','block');
                        $('.modal.gameplay_menu').animate({ "opacity": '1' },300);
                    }
                    // If close the nav menu it brings up the options menu.
                    if( btn_modal_show == '.show_gmturbo_menu'   || 
                        btn_modal_show == '.show_gmclassic_menu' ||
                        btn_modal_show == '.show_gmdemo_menu' ) {
                        show_gameplay_modal();
                    };
                });
            });
            
            //=============================================
            // MODAL > Show / Hide > Main Menu Btn
            //=============================================
            
            // Hide or show menu button via a class.
            $(document).on('click','.hideBtnShowOptionsMenu',function(){
                $(btnShowMainMenu).hide();
            });
            $(document).on('click','.showBtnShowOptionsMenu',function(){
                $(btnShowMainMenu).show();
            });
            
            //=============================================
            // MODAL > Show modals by default ( + Alerts & Cookies ).
            //=============================================

            var modals_show_default = ['welcome','audio'];
            
            // Modal > Alerts
            // Check if the orientation is not landscape.
            // The cookie hides the message has already been viewed.
            if( Cookies.get('jsr-isTouchDeviceNotHorizontal-notice') == null ) { 
                Cookies.set('jsr-isTouchDeviceNotHorizontal-notice', 'not-set', { sameSite:'strict' });
            };
            
            // If the device is touchscreen, with non-landscape orientation and the Cookie is not set.
            function isTouchDeviceNotHorizontal() {
                return ( (jsr.Current.window.width < jsr.Current.window.height) && 
                         ("ontouchstart" in document.documentElement) &&
                         Cookies.get('jsr-isTouchDeviceNotHorizontal-notice') != 'seen' );
            }
            
            // When the orientation changes hide the modal.
            function hide_isTouchDeviceNotHorizontal(modalAlerts){
                // Close automatically only if there are no other messages.
                if( isNotCompatibleBrowser() == false ) {
                    var checkChangeOrientation = setInterval(function(){
                        if( isTouchDeviceNotHorizontal() == false ) {
                            // Hide Modal
                            $(modalAlerts).animate({ "opacity": "0" },300);
                            setTimeout(function(){ 
                                $(modalAlerts).css("display","none");
                            },300);
                            // Hide Message, update cookie, stop check.
                            $(modalAlerts+' .notice_not_landscape_orientation').addClass('hidden');
                            Cookies.set('jsr-isTouchDeviceNotHorizontal-notice', 'seen', { sameSite:'strict' });
                            clearInterval(checkChangeOrientation);
                            // Mobile browsers behave differently from desktop, when needed, reload the game.
                            if( jsr.HelperWeatherAfterChangingOrientationReloadGame() == true ) {
                                setTimeout(function(){
                                        location.reload();
                                },300);
                            }
                        }
                    }, 100);
                }
            }
            
            // Check your browser is considered compatible.
            function isNotCompatibleBrowser() {
                var getBrowser_var = getBrowser();
                return ( getBrowser_var == 'isIE' || getBrowser_var == 'isEdge' || getBrowser_var == 'isEdgeChromium' || getBrowser_var == 'isNotDetecte' );
            }
            
            // If the condition requires the notice, enter the modal.
            if( isTouchDeviceNotHorizontal() == true || isNotCompatibleBrowser() == true ) {
                // Add browser Alerts
                modals_show_default.push('alerts');
                // Show correct message in modal alert.
                var modalAlerts = '.modal.alerts';
                // It is not landscape orientation on mobile devices (Only the first time).
                if( isTouchDeviceNotHorizontal() == true ) {
                    // Show Message
                    $(modalAlerts+' .notice_not_landscape_orientation').removeClass('hidden');
                    // update the cookie when you close the modal
                    $(document).on('click',modalAlerts+' .modal_close',function(){
                        Cookies.set('jsr-isTouchDeviceNotHorizontal-notice', 'seen', { sameSite:'strict' });
                    });
                    // When the orientation changes hide the modal.
                    hide_isTouchDeviceNotHorizontal(modalAlerts);
                }
                // Is Not Compatibile Browser
                if( isNotCompatibleBrowser() == true ) {
                    // Show Message
                    $(modalAlerts+' .notice_browser_compatibility').removeClass('hidden');
                }
            };
            
            // Show > GDPR Cookies Consent.
            if( Cookies.get('jsr-cookies-modal') == null || Cookies.get('jsr-cookies-modal') == 'not-set' ) { 
                // if agree it has not been pressed set "not-set" and show the modal.
                Cookies.set('jsr-cookies-modal', 'not-set', { sameSite:'strict' });
                modals_show_default.push('cookies_notice');
            };
            
            // Graphics Show Modal
            jsr.HelperShowModal = function(modal) {
                $(modal).animate({ "opacity": "1" },0);
                $(modal).css('display','block');
                $(modal).animate({ "opacity": '1' },300);
            }
            
            // Show by default
            $.each(modals_show_default,function(modal_index,modal) {
                var btn_modal_show = '.show_'+modal;
                var modal = '.modal.'+modal;
                jsr.HelperShowModal(modal);
                $(btn_modal_show).addClass('modal_open');
            });
            
            //=============================================
            // MODAL > Settings
            //=============================================
            
            // Change the display style of the settings panel by clicking on the button.
            // The panel will switch from modal_fullscreen_bar to modal_compact and vice versa.
            // 'type' can be fullscreen, compact, button (toggle for button).
            // 'button' is the element the script starts from. 
            // 'time' is the time of animation.
            function set_view_settings_modal(type,button,time) {
                // Default
                var modalSettings  = $(button).closest('.modal.settings');
                var isMsFullscreen = false;
                var isMsCompact    = false;
                // Become Fullscreen
                function changeFullscreen(time) {
                    function changetoFullscreen(){
                        // Button
                        $(button).find('.label_view_fullscreen').hide();
                        $(button).find('.label_view_compact').show();
                        // Modal Appearance
                        modalSettings.removeClass('modal_compact').addClass('modal_fullscreen_bar');
                        modalSettings.removeClass('modal_bg').addClass('modal_bgradius');
                        modalSettings.find('.modal_note').addClass('dflex'); 
                        modalSettings.find('.modal_content').addClass('txt_big');
                        modalSettings.find('.modal_title').removeClass('txtl').addClass('txtc');
                        modalSettings.find('.modal_box').removeClass('txtl').addClass('txtc');
                        // for Main Menu Btn
                        modalSettingsCompactIsOpen = false;
                    }
                    if( time > 0 ){
                        modalSettings.slideUp(time);
                        setTimeout(function(){
                            changetoFullscreen();
                        }, time);
                        modalSettings.slideDown(time);
                    } else {
                        changetoFullscreen();
                    }
                }
                // Become Compact
                function changeCompact(time) {
                    function changetoCompact(){
                        // Button
                        $(button).find('.label_view_compact').hide();
                        $(button).find('.label_view_fullscreen').show();
                        // Modal Appearance
                        modalSettings.removeClass('modal_fullscreen_bar').addClass('modal_compact');
                        modalSettings.removeClass('modal_bgradius').addClass('modal_bg');
                        modalSettings.find('.modal_note').removeClass('dflex');
                        modalSettings.find('.modal_content').removeClass('txt_big');
                        modalSettings.find('.modal_title').removeClass('txtc').addClass('txtl');
                        modalSettings.find('.modal_box').removeClass('txtc').addClass('txtl');
                        // for Main Menu Btn.
                        modalSettingsCompactIsOpen = true;
                    }
                    if( time > 0 ){
                        modalSettings.slideUp(time);
                        setTimeout(function(){
                            changetoCompact();
                        }, time);
                        modalSettings.slideDown(time);
                    } else {
                        changetoCompact();
                    }
                }
                // Fullscreen
                if( type == 'fullscreen' ) {
                    isMsFullscreen = true;
                    changeFullscreen(0);
                // Compact
                } else if( type == 'compact' ) {
                    isMsCompact = true;
                    changeCompact(0);
                // Change via button.
                } else if( type == 'button' ) {
                    // Check if the modal settings is ms fullscreen or compact.
                    isMsFullscreen = modalSettings.hasClass('modal_fullscreen_bar');
                    isMsCompact = modalSettings.hasClass('modal_compact');
                    // If the modal is fullscreen it becomes Compact
                    if ( isMsFullscreen == true ) {
                        changeCompact(time);
                        $(btnShowMainMenu).show();
                    // If the modal is Compact it becomes Fullscreen.
                    } else if ( isMsCompact == true ) {
                        changeFullscreen(time);
                        $(btnShowMainMenu).hide();
                    }
                }
            }
            // Default
            var modal_settings = '.settings.modal .btn_settings_view';
            set_view_settings_modal('fullscreen',modal_settings,0);
            // BTN > Settings Panel
            $(document).on('click',modal_settings,function(){
                set_view_settings_modal('button',this,400);
            });

            //=============================================
            // MODAL > GDPR Cookies Consent
            //=============================================
            
            // Set Cookies accepted in dataLayer Object 
            // to activate Google Tag Manager by Trigger.
            function setCookiesAcceptedInDataLayer() {
                // Only if the dataLayer object exists. 
                if ( window.dataLayer ) {
                    // Set DataLayer (Trigger Custom Event Name).
                    window.dataLayer.push( {'event': 'jsrCookiesAccepted'} );
                    // console.log('dataLayer Enabled');
                }
            }

            // Set the value of dataLayer if cookies have been accepted. 
            if( Cookies.get('jsr-cookies-modal') == 'approved' ) {
                setCookiesAcceptedInDataLayer();
            }
            
            // Btn > Accept Cookies and set the value of dataLayer.
            $(document).on('click','.modal.cookies_notice .modal_note .btn_accept',function() {
                Cookies.set('jsr-cookies-modal', 'approved', { sameSite:'strict' });
                setCookiesAcceptedInDataLayer();
            });
            
            // Delete Cookies
            function deleteAllJsrCookies() {
                // Delete all Cookies
                Cookies.remove('jsr-textures-detail');
                Cookies.remove('jsr-cookies-modal');
                Cookies.remove('jsr-isTouchDeviceNotHorizontal-notice');
                jsr.Dom.storage.fast_lap_time = 0;
                // Show Modal
                var modal = '.modal.cookies_notice';
                jsr.HelperShowModal(modal);
            }
            
            // Btn > Not Accept Cookies
            $(document).on('click','.modal.cookies_notice .modal_note .btn_not_accept',function() {
                deleteAllJsrCookies();
                var url_redirect = $(this).attr('data-href');
                // If there is no referrer, redirect to the host site home, otherwise go back to the browser history.
                if ( document.referrer == '' ) { 
                    window.location.href = url_redirect;
                } else { 
                    window.history.back();
                }
            });
            
            // Btn > Reset Cookies
            $(document).on('click','.modal.settings .btn_reset_cookies',function() {
                deleteAllJsrCookies();
            });

            //=============================================
            // MODAL > Gamepad > Default Show / Hide by Touch Screen Device
            //=============================================

            // If the device has the touch screen
            if ("ontouchstart" in document.documentElement) {
                // Show GamePad
                $('.modal.gamepad').animate({ "opacity": "1" },0);
                $('.modal.gamepad').slideDown(0);
                $('.show_gamepad').addClass('modal_open');
                // Move Hud & Compact Modal CSS
                $('body').addClass('gamepad_open');
            };

            //=============================================
            // HUD > Speedometer
            //=============================================
            
            // Show by Default
            $('#hud #current_speed .view_speed_kmh').show(0);
            
            // Btn > Show Speed : km/h | mph.
            $(document).on('click','#hud #current_speed',function(){
                $('#hud #current_speed .btn_show_speed_mph').toggle();
                $('#hud #current_speed .btn_show_speed_kmh').toggle();
            });
        
        };
        play_modals();
        
        //=============================================
        // SHOW GAME LOADING
        //=============================================
        
        // When game textures are loaded it becomes true.
        jsr.Current.gameLoaded = false;
        
        // Shows some elements based on the game loading status.
        function show_game_loading() {
            
            // Show modal welcome when game is loaded
            function show_wellcome_modal_game_ready() {

                // Show hidden items while loading.
                $(document).find('.hideInGameLoading').slideDown(200).removeClass('hideInGameLoading');
                // Remove game loading classes.
                $(document).find('.inGameLoading').animate({opacity:1},200).removeClass('inGameLoading');

                // Close the welcome modal if a button is in use by the game on the keyboard.
                var round = 0;
                $(document).on('keydown', function(event) {
                    // KeyCodes: W, S, A, D, SPACE, CTRL, UP, DOWN, LEFT, RIGHT.
                    var all_keycode = ['87','83','65','68','32','17','38','40','37','39'];
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    // If the button is pressed only once.
                    if ( jsr.HelplerInclude(all_keycode,keycode) && round==0 ) {
                        // Close Modal Welcome.
                        $('.modal.welcome').animate({ "opacity": "0" },300);
                        setTimeout(function(){ 
                            $('.modal.welcome').css("display","none"); 
                        },300);
                        round++;
                    }
                });

            }

            // Check if the game is loaded
            var checkGameLoadingStatus = setInterval(checkGameIsLoaded, 500);

            function checkGameIsLoaded() {
                // When the game is loaded.
                if( jsr.Current.gameLoaded == true ) {
                    show_wellcome_modal_game_ready();
                    // Hide loading when finished.
                    $('.game_loader').animate({opacity: '0'},200);
                    // Finish the check.
                    clearInterval(checkGameLoadingStatus);
                }
            }
            
        }
        show_game_loading();

        //=============================================
        // CSS Class > Only Desktop / Only Mobile
        //=============================================

        // Shows the correct CSS class in desktop or mobile case.
        function only_device_classes(device) {
            if( device == 'desktop' ) {
                $('.only_desktop').show();
            } else {
                $('.only_mobile').show();
            };
        };
        // Shows the correct CSS class in desktop or mobile case.
        only_device_classes(jsr.Current.device);

        //=============================================
        // Music Player (Soundtrack)
        //=============================================

        function gameMusicPlayer() {
            
            //------------------------
            // Init Music Player
            
            GreenAudioPlayer.init({
                selector: '.music-player',
                stopOthersOnPlay: true
            });
            
            // Show Music Player
            $('.modal.audio .soundtrack1').show(0);
            
            //------------------------
            // Soundtrack Propertys
            
            var soundtrack = document.getElementById("soundtrack1");
            
            // Load the soundtrack after the page loads.
            $(window).on('load', function() {
                soundtrack.load();
            });
            
            // Loop
            $(soundtrack).on("ended", function() {
                soundtrack.currentTime = 0;
                soundtrack.play();
            });
            
            // Start music on click to close the welcome mode.
            $(document).on('click','.modal.welcome .start_with_audio', function(){
                soundtrack.play();
                // Play by Trigger
                // $(".modal.audio .audio-player.green-audio-player.soundtrack1 .play-pause-btn").trigger("click");
            });
            
            //------------------------
            // Volume
            
            // Default Music Player Volume.
            jsr.Vars.musicPlayerVolume = 10;
            
            // Set/Update Music Player Volume. > Set by Game
            jsr.HelperUpdateMusicPlayerVolume = function() {
                // The volume ranges from 0.0 to 1.0.
                var volume = jsr.Vars.musicPlayerVolume / 10;
                // Music from a file.
                soundtrack.volume = volume;
            }
            
            // Stop and Play Soundtrack by Event. > Set by Audio Fx.
            // Pause the music while the victory and defeat sounds are played.
            // If the music is playing, stop it for the required amount of time.
            // Two types of stop and play: "pause" pauses the track, 
            // "volume" lowers the volume but the track remains in play.
            jsr.HelperStopAndPlaySoundtrack = function(type, stopSeconds = null, stopVolume = 0) {
                // If music is playing and the tempo is greater than 0.
                if( !soundtrack.paused && stopSeconds > 0 ) {
                    var soundtrackVolume = 0;
                    // Get the time of the audio Fx in milliseconds.
                    stopSeconds = stopSeconds * 1000;
                    switch( type ) {
                         case 'pause':
                            soundtrack.pause();
                            break;
                        case 'volume':
                            soundtrackVolume = soundtrack.volume;
                            soundtrack.volume = stopVolume;
                            break;
                    }
                    // console.log("Soundtrack Stop");
                    setTimeout(function(){
                        switch( type ) {
                             case 'pause':
                                soundtrack.play();
                                break;
                            case 'volume':
                                soundtrack.volume = soundtrackVolume;
                                break;
                        }
                        // console.log("Soundtrack Play");
                    },stopSeconds);
                }
            }
            
            // Update the volume in the settings panel if it is changed in the music player.
            $(document).on('click','.modal.audio .audio-player.music-player .volume__slider.slider',function(){
                jsr.Vars.musicPlayerVolume = (soundtrack.volume * 10).toFixed();
                $(".modal.settings #musicPlayerVolume").val(jsr.Vars.musicPlayerVolume);
                $(".modal.settings #currentMusicPlayerVolume").text(jsr.Vars.musicPlayerVolume);
            });
            
            //------------------------
            // Chapters
            // This method does not generate warnings, 
            // all the audio tracks of the column are ra must be in the same file.
            // It is possible to switch from one track to another via the chapters set in seconds.
            // Note: on some browsers there may be a slight delay using HTML5 Audio.currentTime
            
            // Music Information (Default)
            var jsr_soundtrack_default = {
                track1 : { chapter : 0  , title : 'Roborama - I Bet U Kunt Go Faster'              },
                track2 : { chapter : 219, title : 'Ankubu - Sentinel'                              },
                track3 : { chapter : 429, title : 'Serpe Terror - Balla con me fra (Instrumental)' }
            }
            
            // View Soundtrack CurrentTime.
            // setInterval(function(){ console.log(soundtrack.currentTime); }, 50);
            
            // Set jsr.SOUNDTRACK which contains the game soundtrack information.
            // If the soundtrack information is missing, load the default information.
            if( typeof jsr_soundtrack === 'undefined' ) {
                jsr.SOUNDTRACK = jsr_soundtrack_default;
            } else {
                jsr.SOUNDTRACK = jsr_soundtrack;
            }
            
            // Get track times a precise delay (1s).
            // These times are necessary so as not to interfere with the shuffle of the music player when active.
            jsr.SOUNDTRACK.track1.chapterAfter = jsr.SOUNDTRACK.track1.chapter + 1;
            jsr.SOUNDTRACK.track2.chapterAfter = jsr.SOUNDTRACK.track2.chapter + 1;
            jsr.SOUNDTRACK.track3.chapterAfter = jsr.SOUNDTRACK.track3.chapter + 1;
            
            // Shows the track titles in the settings panel buttons.
            $('.modal.settings .setTrack01 small').text('1. '+jsr.SOUNDTRACK.track1.title);
            $('.modal.settings .setTrack02 small').text('2. '+jsr.SOUNDTRACK.track2.title);
            $('.modal.settings .setTrack03 small').text('3. '+jsr.SOUNDTRACK.track3.title);
            
            // Set time and play.
            function setMusicTrack(time) {
                soundtrack.pause();
                soundtrack.currentTime = time;
                soundtrack.play();
            }
            
            //------------------------
            // Show soundtrack info
            
            // Defaults
            var musicTrackInfoItem        = '.content .soundtrack_info';
            var musicTrackInfoTimeout     = null;
            var musicTrackInfoHideTimeout = null;
            var musicTrackInfoStatus      = false;
            jsr.Vars.musicPlayerInfoMs    = 0; // Shows the info for this duration in ms (Set by Game).
            
            // Get track number from current time.
            function getCurrentTrackByCurrentTime(currentTime) {
                switch( true ) {
                    case ( currentTime >= jsr.SOUNDTRACK.track1.chapter && currentTime < jsr.SOUNDTRACK.track2.chapter ):
                        return 1;
                        break;
                    case ( currentTime >= jsr.SOUNDTRACK.track2.chapter && currentTime < jsr.SOUNDTRACK.track3.chapter ):
                        return 2;
                        break;
                    case ( currentTime >= jsr.SOUNDTRACK.track3.chapter ):
                        return 3;
                        break;
                }
            }
            
            // Show and Hide info soundtrack.
            function showAndHideMusicTrackInfo(showTimeMs) {
                // If the number of ms is valid.
                if( Number.isInteger(showTimeMs) && showTimeMs != 0 ) {
                    // Show
                    function showInfo() {
                        // Get Info.
                        musicTrackInfoStatus = true;
                        var info         = null;
                        var currentTime  = Math.round(soundtrack.currentTime);
                        var currentTrack = getCurrentTrackByCurrentTime(currentTime);
                        switch( currentTrack ) {
                            case 1:
                                info = jsr.SOUNDTRACK.track1.title;
                                break;
                            case 2:
                                info = jsr.SOUNDTRACK.track2.title;
                                break;
                            case 3:
                                info = jsr.SOUNDTRACK.track3.title;
                                break;
                        }
                        // Show Info.
                        var icon = '<span class="css_icon i_music_note"></span>';
                        $('.content').append('<div class="soundtrack_info"><div class="box_info">'+icon+'&nbsp;'+info+'</div></div>');
                        var itemWidth = $(musicTrackInfoItem).width();
                        $(musicTrackInfoItem).css({'width':'0','opacity':'0'}).animate({width:itemWidth,opacity:1},1000);
                        // Hide Info.
                        musicTrackInfoTimeout = setTimeout(function(){
                            $(musicTrackInfoItem).animate({ width:0, opacity:0 }, 1000);
                            musicTrackInfoHideTimeout = setTimeout(function(){ 
                                $(musicTrackInfoItem).remove();
                                musicTrackInfoStatus = false;
                            }, 1000);
                        }, showTimeMs);
                    }
                    // Hide
                    function hideInfo() {
                        $(musicTrackInfoItem).remove();
                        clearTimeout(musicTrackInfoHideTimeout);
                        clearTimeout(musicTrackInfoTimeout);
                    }
                    // Run
                    if( musicTrackInfoStatus == false ) {
                        showInfo();
                    } else if( musicTrackInfoStatus == true ) {
                        hideInfo();
                        showInfo();
                    }
                }
            }
            
            //------------------------
            // Automatically show soundtrack info
            
            // Defaults
            var autoShowMusicTrackInfoOnce = 0;
            
            // When the track is playing, it automatically shows the information at the beginning of each track.
            jsr.HelperAutoShowMusicTrackInfo = function(showTimeMs) {
                // If the number of ms is valid and the soundtrack is playing.
                if( Number.isInteger(showTimeMs) && showTimeMs != 0 && 
                    jsr.HelperCheckHtml5AudioIsPlaying(soundtrack) == true ) {
                    var currentTime = Math.round(soundtrack.currentTime);
                    if( jsr.HelperCheckHtml5AudioIsPlaying(soundtrack) == true &&
                        (currentTime == (jsr.SOUNDTRACK.track1.chapterAfter) || 
                         currentTime == (jsr.SOUNDTRACK.track2.chapterAfter) || 
                         currentTime == (jsr.SOUNDTRACK.track3.chapterAfter)) ) {
                        if( autoShowMusicTrackInfoOnce == 0) {
                            autoShowMusicTrackInfoOnce = 1;
                            showAndHideMusicTrackInfo(showTimeMs);
                        }
                    } else {
                        if( autoShowMusicTrackInfoOnce == 1) {
                            autoShowMusicTrackInfoOnce = 0;
                        }
                    }
                }
            }
            
            //------------------------
            // Change the current track.
            // Go to the next or previous one.
            function changeCurrentTrackToNextPrev(type) {
                var currentTime  = Math.round(soundtrack.currentTime);
                var currentTrack = getCurrentTrackByCurrentTime(currentTime);
                if( type == 'next' ) {
                    switch( currentTrack ) {
                        case 1:
                            setMusicTrack(jsr.SOUNDTRACK.track2.chapterAfter);
                            break;
                        case 2:
                            setMusicTrack(jsr.SOUNDTRACK.track3.chapterAfter);
                            break;
                        case 3:
                            setMusicTrack(jsr.SOUNDTRACK.track1.chapterAfter);
                            break;
                    }
                } else if( type == 'prev' ) {
                    switch( currentTrack ) {
                        case 1:
                            setMusicTrack(jsr.SOUNDTRACK.track3.chapterAfter);
                            break;
                        case 2:
                            setMusicTrack(jsr.SOUNDTRACK.track1.chapterAfter);
                            break;
                        case 3:
                            setMusicTrack(jsr.SOUNDTRACK.track2.chapterAfter);
                            break;
                    }
                }
            }
            
            //------------------------
            // Settings Controls
            
            // Play
            $(document).on('click','.modal.settings .setPlay',function(){
                soundtrack.play();
                showAndHideMusicTrackInfo(jsr.Vars.musicPlayerInfoMs);
            });
            
            // Pause
            $(document).on('click','.modal.settings .setPause',function(){
                soundtrack.pause();
            });
            
            // Play Tracks (Chapters).
            $(document).on('click','.modal.settings .setTrack01',function(){
                setMusicTrack(jsr.SOUNDTRACK.track1.chapterAfter);
            });
            
            $(document).on('click','.modal.settings .setTrack02',function(){
                setMusicTrack(jsr.SOUNDTRACK.track2.chapterAfter);
            });
            
            $(document).on('click','.modal.settings .setTrack03',function(){
                setMusicTrack(jsr.SOUNDTRACK.track3.chapterAfter);
            });
            
            //------------------------
            // Music Player Controls
            
            // Start next track.
            $(document).on('click','.modal.audio .music_options .btnMusicPlayerNextTrack', function(){
                changeCurrentTrackToNextPrev('next');
            });
            
            // Start previous track.
            $(document).on('click','.modal.audio .music_options .btnMusicPlayerPrevTrack', function(){
                changeCurrentTrackToNextPrev('prev');
            });
            
            // Show info when I start the track from the player.
            $(document).on('click','.modal.audio .soundtrack_player .audio-player .play-pause-btn', function(){
                if( jsr.HelperCheckHtml5AudioIsPlaying(soundtrack) == true ) {
                    showAndHideMusicTrackInfo(jsr.Vars.musicPlayerInfoMs);
                }
            });
            
            // Show info when interacting with the tempo control and only when the track is playing.
            $(document).on('click','.modal.audio .soundtrack_player .audio-player .controls__slider', function(){
                if( jsr.HelperCheckHtml5AudioIsPlaying(soundtrack) == true ) {
                    showAndHideMusicTrackInfo(jsr.Vars.musicPlayerInfoMs);
                }
            });
            
            //------------------------
            // Music Player Shuffle.

            // Defaults
            var musicPlayerAllowedByUser     = 0;
            var musicPlayerAllowedByUserOnce = 0;
            var musicPlayerShuffleChangeOnce = 0;
            var musicPlayerCurrentTrack      = 1;
            var musicPlayerShuffleArray      = [];
            
            // Soundtrack in random order.
            jsr.HelperMusicPlayerShuffle = function(isActive) {
                // If shuffle is on.
                if( isActive == 1 ) {
                    // If the user has interacted at least once by starting the music.
                    if( musicPlayerAllowedByUserOnce == 0 && !soundtrack.paused ) {
                        musicPlayerAllowedByUserOnce = 1;
                        musicPlayerAllowedByUser     = 1;
                        musicPlayerShuffleArray      = jsr.HelperReturnShuffleArray(Object.keys(jsr.SOUNDTRACK));
                    }
                    // If the user has interacted.
                    if( musicPlayerAllowedByUser == 1 ) {
                        // Check when it's time to change tracks. 
                        var currentTime = Math.round(soundtrack.currentTime);
                        // So a second before the tracks begin.
                        if( (currentTime == jsr.SOUNDTRACK.track1.chapter) || 
                            (currentTime == jsr.SOUNDTRACK.track2.chapter) || 
                            (currentTime == jsr.SOUNDTRACK.track3.chapter) ) {
                            // Just for once.
                            if( musicPlayerShuffleChangeOnce == 0 ) {
                                musicPlayerShuffleChangeOnce = 1;
                                // Find the current track ID.
                                var trackID = null;
                                switch( musicPlayerCurrentTrack ) {
                                    case 1:
                                        trackID = musicPlayerShuffleArray[0];
                                    break;
                                    case 2:
                                        trackID = musicPlayerShuffleArray[1];
                                    break;
                                    case 3:
                                        trackID = musicPlayerShuffleArray[2];
                                    break;
                                }
                                // Play the current track by ID.
                                switch( trackID ) {
                                    case 'track1':
                                        setMusicTrack(jsr.SOUNDTRACK.track1.chapterAfter);
                                    break;
                                    case 'track2':
                                        setMusicTrack(jsr.SOUNDTRACK.track2.chapterAfter);
                                    break;
                                    case 'track3':
                                        setMusicTrack(jsr.SOUNDTRACK.track3.chapterAfter);
                                    break;
                                }
                                // console.log(musicPlayerShuffleArray);
                                // console.log(musicPlayerCurrentTrack);
                                // console.log(trackID);
                                // Schedule playback of subsequent tracks.
                                switch( true ) {
                                    // Regulars Tracks.
                                    case (musicPlayerCurrentTrack < musicPlayerShuffleArray.length):
                                        musicPlayerCurrentTrack++;   // Proceed to the next track.
                                        // console.log('REGULAR');
                                        break;
                                    // Last Track.
                                    case (musicPlayerCurrentTrack == musicPlayerShuffleArray.length):
                                        musicPlayerCurrentTrack = 1; // The next track is the first.
                                        // Mix the array.
                                        musicPlayerShuffleArray = jsr.HelperReturnShuffleArray(Object.keys(jsr.SOUNDTRACK));
                                        // console.log('UPDATE '+musicPlayerShuffleArray);
                                        break;
                                }
                            }
                        } else {
                            if( musicPlayerShuffleChangeOnce == 1 ) {
                                // Prepare for the next track change.
                                musicPlayerShuffleChangeOnce = 0;
                                // console.log('RESET');
                            }
                        }
                    }
                }
            } 
            
        };
        gameMusicPlayer();
        
        //=============================================
        // Audio Fx
        //=============================================
        
        function gameAudioFx() {
            
            // Defaults
            jsr.Vars.audioFxCarVolume        = 10;      // Default volume car audio effects.
            jsr.Vars.audioFxWorldVolume      = 10;      // Default volume world audio effects.
            jsr.Vars.audioFxMatchVolume      = 10;      // Default volume game audio effects.
            jsr.Vars.audioFxAllowedByUser    = 0;       // User permission to play audio (Default false).
            
            // Check if the current browser is compatible with AudioFx.
            // iOS mobile is not supported for the following limitations:
            // - A single audio stream is supported at a time. 
            // - Preload 'none' is not compatible.
            // Info: https://www.ibm.com/developerworks/library/wa-ioshtml5/
            jsr.HelperCheckDeviceAudioFxSupport = function() {
                var userAgent = window.navigator.userAgent;
                // iPad & iPhone
                if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                    return false;
                } else {
                    return true;
                }
            }
            
            // Init Sounds
            var audioFxCarEngineIdle      = new Audio();
            var audioFxCarEngineRun       = new Audio();
            var audioFxCarEngineUpGear    = new Audio();
            var audioFxCarEngineDownGear  = new Audio();
            var audioFxCarTurbo1          = new Audio();
            var audioFxCarCurve1          = new Audio();
            var audioFxCarCurve2          = new Audio();
            var audioFxCarCurve3          = new Audio();
            var audioFxCarBrake1          = new Audio();
            var audioFxCarBrake2          = new Audio();
            var audioFxCarCollision1      = new Audio();
            var audioFxCarCollision2      = new Audio();
            var audioFxCarCollision3      = new Audio();
            var audioFxCarClacson         = new Audio();
            var audioFxWorldSound1        = new Audio();
            var audioFxWorldSound2        = new Audio();
            var audioFxWorldSound3        = new Audio();
            var audioFxWorldSound4        = new Audio();
            var audioFxWorldSound5        = new Audio();
            var audioFxGameDeadlineSlow   = new Audio();
            var audioFxGameDeadlineFast   = new Audio();
            var audioFxGameFinishLine     = new Audio();
            var audioFxGameLose           = new Audio();
            var audioFxGameWin            = new Audio();

            // Loops
            audioFxCarEngineIdle.loop     = true;
            audioFxCarEngineRun.loop      = true;
            audioFxCarEngineUpGear.loop   = true;
            audioFxCarEngineDownGear.loop = true;
            audioFxCarTurbo1.loop         = true;
            audioFxGameDeadlineSlow.loop  = true;
            audioFxGameDeadlineFast.loop  = true;
            
            //------------------------
            // Follow the instructions to load audio files only if AudioFx is supported.
            if( jsr.HelperCheckDeviceAudioFxSupport() == true ) {

                // Sources
                audioFxCarEngineIdle.src         = 'assets/game/sounds/car_engine_idle.wav';
                audioFxCarEngineRun.src          = 'assets/game/sounds/car_engine_run.wav';
                audioFxCarEngineUpGear.src       = 'assets/game/sounds/car_engine_up_gear.wav';
                audioFxCarEngineDownGear.src     = 'assets/game/sounds/car_engine_down_gear.wav';
                audioFxCarTurbo1.src             = 'assets/game/sounds/car_turbo_1.wav';
                audioFxCarCurve1.src             = 'assets/game/sounds/car_curve_1.wav';
                audioFxCarCurve2.src             = 'assets/game/sounds/car_curve_2.wav';
                audioFxCarCurve3.src             = 'assets/game/sounds/car_curve_3.wav';
                audioFxCarBrake1.src             = 'assets/game/sounds/car_brake_1.wav';
                audioFxCarBrake2.src             = 'assets/game/sounds/car_brake_2.wav';
                audioFxCarCollision1.src         = 'assets/game/sounds/car_collision_1.wav';
                audioFxCarCollision2.src         = 'assets/game/sounds/car_collision_2.wav';
                audioFxCarCollision3.src         = 'assets/game/sounds/car_collision_3.wav';
                audioFxCarClacson.src            = 'assets/game/sounds/car_clacson.wav';
                audioFxWorldSound1.src           = 'assets/game/sounds/world_waves_1.wav';
                audioFxWorldSound2.src           = 'assets/game/sounds/world_wind.wav';
                audioFxWorldSound3.src           = 'assets/game/sounds/world_wolf.wav';
                audioFxWorldSound4.src           = 'assets/game/sounds/world_waves_2.wav';
                audioFxWorldSound5.src           = 'assets/game/sounds/world_seagulls.wav';
                audioFxGameDeadlineSlow.src      = 'assets/game/sounds/game_deadline_slow.wav';
                audioFxGameDeadlineFast.src      = 'assets/game/sounds/game_deadline_fast.wav';
                audioFxGameFinishLine.src        = 'assets/game/sounds/game_finishline.wav';
                audioFxGameLose.src              = 'assets/game/sounds/game_lose.wav';
                audioFxGameWin.src               = 'assets/game/sounds/game_win.wav';

                // No Preload
                audioFxCarEngineIdle.preload     = 'none';
                audioFxCarEngineRun.preload      = 'none';
                audioFxCarEngineUpGear.preload   = 'none';
                audioFxCarEngineDownGear.preload = 'none';
                audioFxCarTurbo1.preload         = 'none';
                audioFxCarCurve1.preload         = 'none';
                audioFxCarCurve2.preload         = 'none';
                audioFxCarCurve3.preload         = 'none';
                audioFxCarBrake1.preload         = 'none';
                audioFxCarBrake2.preload         = 'none';
                audioFxCarCollision1.preload     = 'none';
                audioFxCarCollision2.preload     = 'none';
                audioFxCarCollision3.preload     = 'none';
                audioFxCarClacson.preload        = 'none';
                audioFxWorldSound1.preload       = 'none';
                audioFxWorldSound2.preload       = 'none';
                audioFxWorldSound3.preload       = 'none';
                audioFxWorldSound4.preload       = 'none';
                audioFxWorldSound5.preload       = 'none';
                audioFxGameDeadlineSlow.preload  = 'none';
                audioFxGameDeadlineFast.preload  = 'none';
                audioFxGameFinishLine.preload    = 'none';
                audioFxGameLose.preload          = 'none';
                audioFxGameWin.preload           = 'none';

                // Load after loading the document.
                $(window).on('load', function() {
                    audioFxCarEngineIdle.load();
                    audioFxCarEngineRun.load();
                    audioFxCarEngineUpGear.load();
                    audioFxCarEngineDownGear.load();
                    audioFxCarTurbo1.load();
                    audioFxCarCurve1.load();
                    audioFxCarCurve2.load();
                    audioFxCarCurve3.load();
                    audioFxCarBrake1.load();
                    audioFxCarBrake2.load();
                    audioFxCarCollision1.load();
                    audioFxCarCollision2.load();
                    audioFxCarCollision3.load();
                    audioFxCarClacson.load();
                    audioFxWorldSound1.load();
                    audioFxWorldSound2.load();
                    audioFxWorldSound3.load();
                    audioFxWorldSound4.load();
                    audioFxWorldSound5.load();
                    audioFxGameDeadlineSlow.load();
                    audioFxGameDeadlineFast.load();
                    audioFxGameFinishLine.load();
                    audioFxGameLose.load();
                    audioFxGameWin.load();
                });
                
            }

            // Set/Update Audio Fx Volume
            // If a value is not set, it updates all volumes, else only the requested type.
            jsr.HelperUpdateAudioFxVolume = function(type) {
                var volume = 0;
                // The volume ranges from 0.0 to 1.0.
                // Set the volume according to the type.
                switch (true) {
                    case ( type == 'car' || type == '' ):
                        volume = jsr.Vars.audioFxCarVolume / 10;
                        audioFxCarEngineIdle.volume     = volume;
                        audioFxCarEngineRun.volume      = volume;
                        audioFxCarEngineUpGear.volume   = volume;
                        audioFxCarEngineDownGear.volume = volume;
                        audioFxCarTurbo1.volume         = volume;
                        audioFxCarCurve1.volume         = volume;
                        audioFxCarCurve2.volume         = volume;
                        audioFxCarCurve3.volume         = volume;
                        audioFxCarBrake1.volume         = volume;
                        audioFxCarBrake2.volume         = volume;
                        audioFxCarCollision1.volume     = volume;
                        audioFxCarCollision2.volume     = volume;
                        audioFxCarCollision3.volume     = volume;
                        audioFxCarClacson.volume        = volume;
                        break;
                    case ( type == 'world' || type == '' ):
                        volume = jsr.Vars.audioFxWorldVolume / 10;
                        audioFxWorldSound1.volume       = volume;
                        audioFxWorldSound2.volume       = volume;
                        audioFxWorldSound3.volume       = volume;
                        audioFxWorldSound4.volume       = volume;
                        audioFxWorldSound5.volume       = volume;
                        break;
                    case ( type == 'game' || type == '' ):
                        volume = jsr.Vars.audioFxMatchVolume / 10;
                        audioFxGameDeadlineSlow.volume  = volume;
                        audioFxGameDeadlineFast.volume  = volume;
                        audioFxGameFinishLine.volume    = volume;
                        audioFxGameLose.volume          = volume;
                        audioFxGameWin.volume           = volume;
                        break;
                }
            }
            
            // Default
            // jsr.HelperUpdateAudioFxVolume(...type...); // Set by Game

            // Play and stop only once at each state change.
            var audioFxCarEngineActivatedOnce      = 0;
            var audioFxCarEngineDeactivateOnce     = 0;
            var audioFxCarEngineIdleOnce           = 0;
            var audioFxCarEngineRunOnce            = 0;
            var audioFxCarEngineMuteOnce           = 0;
            var audioFxCarEngineUpGearOnce         = 0;
            var audioFxCarEngineDownGearOnce       = 0;
            var audioFxCarTurboActivationOnce      = 0;
            var audioFxCarCurveOnce                = 0;
            var audioFxCarBrakeOnce                = 0;
            var audioFxCarCollisionOnce            = 0;
            var audioFxWorldCalcTrackPositionsOnce = 0;
            var audioFxWorldOnce5                  = 0;
            var audioFxWorldOnce4                  = 0;
            var audioFxWorldOnce3                  = 0;
            var audioFxWorldOnce2                  = 0;
            var audioFxWorldOnce1                  = 0;
            var audioFxWorldSoundsToggleOnce       = 0;
            var audioFxGameDeadlineOnce            = 0;
            var audioFxGameDeadlineTypeOnce        = 0;
            var audioFxGameFinishLineOnce          = 0;
            var audioFxGameLoseOnce                = 0;
            var audioFxGameWinOnce                 = 0;

            // Audio Fx World Defaults
            var audioFxWorldTrackPosition          = 0;
            var audioFxWorldPosition0              = 0;
            var audioFxWorldPosition20             = 0;
            var audioFxWorldPosition40             = 0;
            var audioFxWorldPosition60             = 0;
            var audioFxWorldPosition80             = 0;
            var audioFxWorldPosition100            = 0;

            //------------------------
            // Play Audio Fx by Game.
            
            // Play Audio Fx
            // Audio effects must be active and allowed by the user to play, so isActive and jsr.Vars.audioFxAllowedByUser must be true.
            jsr.HelperPlayAudioFx = function (
                isActive, eventType, requestType = null, 
                keyLeft = null, keyRight = null, keyFaster = null, keySlower = null, 
                trackLength = null, trackPosition = null) {

                // If AudioFx is supported.
                if( jsr.HelperCheckDeviceAudioFxSupport() == true ) {
                    
                    // Returns the playback speed of loops based on the speed of the car.
                    function getEngineSoundPlaySpeed(mphGameCurrentSpeed,mphGameMaxSpeed,increaseMaxPlaySpeedValue,minPlaySpeedValue) {
                        return (minPlaySpeedValue + (mphGameCurrentSpeed * increaseMaxPlaySpeedValue) / mphGameMaxSpeed).toFixed(1);
                    }
                    var enginePlaybackRateValue = getEngineSoundPlaySpeed(jsr.Vars.currentSpeedMph,300,1.5,1);
                    var minRunSpeed             = 15;
                    
                    // Play souns by events
                    switch( eventType ) {
                            
                        // Car Engine.
                        // The engine sound is continuous and changes according to the speed.   
                        case 'engine':
                            // Returns true if the car engine status.
                            function getEngineStatus() {
                                // Engine Data
                                var speed  = jsr.Vars.currentSpeedMph;
                                var result = null;
                                // Engine Status
                                switch( true ) {
                                    // The car is stationary or almost stationary.
                                    case (speed <= minRunSpeed):
                                        result = 'idle';
                                        break;
                                    // The car is running under acceleration and the turbo is off.
                                    case (speed > minRunSpeed && keyFaster == true && jsr.Vars.turboTriggered == false):
                                        result = 'upGear';
                                        break;
                                    // The car is in gear and is lowering the speed.
                                    case (speed > minRunSpeed && keySlower == true):
                                        result = 'downGear';
                                        break;
                                    // The car is in gear and the turbo is off or if the turbo is on and not accelerating.
                                    case (speed > minRunSpeed && (jsr.Vars.turboTriggered == false || (jsr.Vars.turboTriggered == true && keyFaster == false))):
                                        result = 'run';
                                        break;
                                    // No sound, When the car accelerates while the turbo is active.
                                    default:
                                        result = 'mute';
                                }
                                return result;
                            }
                            // Pause all motor loops.
                            function getEnginePauseStatus() {
                                audioFxCarEngineIdle.pause();
                                audioFxCarEngineUpGear.pause();
                                audioFxCarEngineDownGear.pause();
                                audioFxCarEngineRun.pause();
                            }
                            // Unlook All Engine Loops.
                            function unlockAllEngineLoops() {
                                audioFxCarEngineIdleOnce     = 0;
                                audioFxCarEngineUpGearOnce   = 0;
                                audioFxCarEngineDownGearOnce = 0;
                                audioFxCarEngineRunOnce      = 0;
                                audioFxCarEngineMuteOnce     = 0;
                            }
                            // Audio Fx Active.
                            if( isActive && jsr.Vars.audioFxAllowedByUser ) {
                                // Initialize the engine sound loop.
                                if( audioFxCarEngineActivatedOnce == 1 ) {
                                    audioFxCarEngineActivatedOnce = 0;
                                    audioFxCarEngineDeactivateOnce = 0;
                                    unlockAllEngineLoops();
                                    // console.log('Engine: INIT');
                                }
                                // if the actual speed is below the limit value.
                                switch( getEngineStatus() ) {
                                    case 'idle':
                                        if( audioFxCarEngineIdleOnce == 0 ) {
                                            unlockAllEngineLoops();
                                            audioFxCarEngineIdleOnce = 1;
                                            getEnginePauseStatus();
                                            audioFxCarEngineIdle.currentTime = 0;
                                            audioFxCarEngineIdle.play();
                                            // console.log('Engine: PLAY (Idle)');
                                        }
                                        break;
                                    case 'upGear':
                                        if( audioFxCarEngineUpGearOnce == 0 ) {
                                            unlockAllEngineLoops();
                                            audioFxCarEngineUpGearOnce = 1;
                                            getEnginePauseStatus();
                                            audioFxCarEngineUpGear.currentTime = 0;
                                            audioFxCarEngineUpGear.play();
                                            // console.log('Engine: PLAY (UpGear)');
                                        }
                                        break;
                                    case 'downGear':
                                        if( audioFxCarEngineDownGearOnce == 0 ) {
                                            unlockAllEngineLoops();
                                            audioFxCarEngineDownGearOnce = 1;
                                            getEnginePauseStatus();
                                            audioFxCarEngineDownGear.currentTime = 0;
                                            audioFxCarEngineDownGear.play();
                                            // console.log('Engine: PLAY (DownGear)');
                                        }
                                        break;
                                    case 'run':
                                        if( audioFxCarEngineRunOnce == 0 ) {
                                            unlockAllEngineLoops();
                                            audioFxCarEngineRunOnce = 1;
                                            getEnginePauseStatus();
                                            audioFxCarEngineRun.currentTime = 0;
                                            audioFxCarEngineRun.play();
                                            // console.log('Engine: PLAY (Run)');
                                        }
                                        break;
                                    case 'mute':
                                        if( audioFxCarEngineMuteOnce == 0 ) {
                                            unlockAllEngineLoops();
                                            audioFxCarEngineMuteOnce = 1;
                                            getEnginePauseStatus();
                                            // console.log('Engine: MUTE');
                                        }
                                        break;
                                }
                                
                                // Update the car engine speed of the engine according to the speed of the car.
                                audioFxCarEngineIdle.playbackRate         = enginePlaybackRateValue;
                                audioFxCarEngineUpGear.playbackRate       = enginePlaybackRateValue;
                                audioFxCarEngineDownGear.playbackRate     = enginePlaybackRateValue;
                                audioFxCarEngineRun.playbackRate          = enginePlaybackRateValue;
                                
                            // Audio Fx Disabled.
                            } else {
                                if( audioFxCarEngineDeactivateOnce == 0 ) {
                                    audioFxCarEngineDeactivateOnce = 1;
                                    audioFxCarEngineActivatedOnce = 1;
                                    getEnginePauseStatus();
                                    // console.log('Engine: STOP');
                                }
                            }
                            break;
                            
                        // Turbo Event.
                        // When the turbo starts the sound starts, there are more sounds than the turbo.
                        case 'turbo':
                            // If the audio effects are active.
                            if( isActive && jsr.Vars.audioFxAllowedByUser ) {
                                // If the turbo is active.
                                if( jsr.Vars.turboTriggered == true && jsr.Vars.currentSpeedMph >= minRunSpeed && keyFaster == true ) {
                                    // Start the turbo sound once.
                                    if( audioFxCarTurboActivationOnce == 0 ) {
                                        audioFxCarTurboActivationOnce = 1;
                                        audioFxCarTurbo1.currentTime = 0;
                                        audioFxCarTurbo1.play();
                                        // console.log('Turbo: PLAY');
                                    }
                                    // Update the turbo speed according to the speed of the car.
                                    audioFxCarTurbo1.playbackRate = enginePlaybackRateValue;
                                    
                                // else the turbo is deactivated.
                                } else {
                                    // Reset the limit.
                                    if( audioFxCarTurboActivationOnce == 1 ) {
                                        audioFxCarTurboActivationOnce = 0;
                                        audioFxCarTurbo1.pause();
                                        // console.log('Turbo: RELOAD');
                                    }
                                }
                            } else {
                                if( audioFxCarTurboActivationOnce == 0 ) {
                                    audioFxCarTurboActivationOnce = 1;
                                    audioFxCarTurbo1.pause();
                                    // console.log('Turbo: STOP');
                                }
                            }
                            break;
                            
                        // Curve Event.
                        // When the curve player hears the sound, there are more sounds for the curve event.
                        case 'curve':
                            // If the audio effects are active.
                            if( isActive && jsr.Vars.audioFxAllowedByUser) {
                                // if the speed is greater than the limit set in ms and the player performs the curve.
                                if( jsr.Vars.currentSpeedMph >= 100 && (keyLeft == true || keyRight == true) ) {
                                    // Start the curve sound once.
                                    if( audioFxCarCurveOnce == 0 ) {
                                        audioFxCarCurveOnce = 1;
                                        switch( jsr.HelperReturnRandomNumber(2) ) {
                                            case 0:
                                                audioFxCarCurve3.pause();
                                                audioFxCarCurve2.pause();
                                                audioFxCarCurve1.currentTime = 0;
                                                audioFxCarCurve1.play();
                                            break;
                                            case 1:
                                                audioFxCarCurve3.pause();
                                                audioFxCarCurve1.pause();
                                                audioFxCarCurve2.currentTime = 0;
                                                audioFxCarCurve2.play();
                                            break;
                                            case 2:
                                                audioFxCarCurve2.pause();
                                                audioFxCarCurve1.pause();
                                                audioFxCarCurve3.currentTime = 0;
                                                audioFxCarCurve3.play();
                                            break;
                                        }
                                        // console.log('Curve: PLAY');
                                    }
                                } else {
                                    if( audioFxCarCurveOnce == 1 ) {
                                        audioFxCarCurveOnce = 0;
                                        // console.log('Curve: RELOAD');
                                    }
                                }
                            } else {
                                if( audioFxCarCurveOnce == 0 ) {
                                    audioFxCarCurveOnce = 1;
                                    audioFxCarCurve1.pause();
                                    audioFxCarCurve2.pause();
                                    audioFxCarCurve3.pause();
                                    // console.log('Curve: STOP');
                                }
                            }
                            break;
                            
                        // Brake Event.
                        // When the player brakes hears the sound, there are more sounds for the braking event.
                        case 'brake':
                            // If the audio effects are active.
                            if( isActive && jsr.Vars.audioFxAllowedByUser) {
                                // if the speed is greater than the limit set and the player brakes.
                                if( jsr.Vars.currentSpeedMph >= minRunSpeed && keySlower == true ) {
                                    // Start the braking sound.
                                    if( audioFxCarBrakeOnce == 0 ) {
                                        audioFxCarBrakeOnce = 1;
                                        switch( jsr.HelperReturnRandomNumber() ) {
                                            case 0:
                                                audioFxCarBrake2.pause();
                                                audioFxCarBrake1.currentTime = 0;
                                                audioFxCarBrake1.play();
                                            break;
                                            case 1:
                                                audioFxCarBrake1.pause();
                                                audioFxCarBrake2.currentTime = 0;
                                                audioFxCarBrake2.play();
                                            break;
                                        }
                                        // console.log('Brake: PLAY');
                                    }
                                // else if the speed is less than the set limit or the player is not braking.
                                } else if( jsr.Vars.currentSpeedMph <= 20 || keySlower == false ) {
                                    if( audioFxCarBrakeOnce == 1 ) {
                                        audioFxCarBrakeOnce = 0;
                                        audioFxCarBrake1.pause();
                                        audioFxCarBrake2.pause();
                                        // console.log('Brake: RELOAD');
                                    }
                                } 
                            } else {
                                if( audioFxCarBrakeOnce == 0 ) {
                                    audioFxCarBrakeOnce = 1;
                                    audioFxCarBrake1.pause();
                                    audioFxCarBrake2.pause();
                                    // console.log('Brake: STOP');
                                }
                            }
                        break;
                            
                        // Collision Event.
                        // When the player collides, there are more sounds for the event.
                        case 'collision':
                            // If the audio effects are active.
                            if (isActive && jsr.Vars.audioFxAllowedByUser) {
                                if( audioFxCarCollisionOnce == 0 ) {
                                    audioFxCarCollisionOnce = 1;
                                    switch( jsr.HelperReturnRandomNumber(2) ) {
                                        case 0:
                                            audioFxCarCollision3.pause();
                                            audioFxCarCollision2.pause();
                                            audioFxCarCollision1.currentTime = 0;
                                            audioFxCarCollision1.play();
                                        break;
                                        case 1:
                                            audioFxCarCollision3.pause();
                                            audioFxCarCollision1.pause();
                                            audioFxCarCollision2.currentTime = 0;
                                            audioFxCarCollision2.play();
                                        break;
                                        case 2:
                                            audioFxCarCollision2.pause();
                                            audioFxCarCollision1.pause();
                                            audioFxCarCollision3.currentTime = 0;
                                            audioFxCarCollision3.play();
                                        break;
                                    }
                                    // console.log('Collision: PLAY');
                                }
                            } else {
                                if( audioFxCarCollisionOnce == 0 ) {
                                    audioFxCarCollisionOnce = 1;
                                    audioFxCarCollision1.pause();
                                    audioFxCarCollision2.pause();
                                    audioFxCarCollision3.pause();
                                    // console.log('Collision: STOP');
                                }
                            }
                            break;
                            
                        // Reset Collision Event.
                        case 'reset_collision':
                            if( audioFxCarCollisionOnce == 1 ) {
                                audioFxCarCollisionOnce = 0;
                                // console.log('Collision: RELOAD');
                            }
                            break;
                            
                        // World Sounds.
                        // In play sounds at certain points on the track.
                        case 'world':
                            // Current Player Position.
                            audioFxWorldTrackPosition = Math.round(trackPosition);
                            // Track positions.
                            // Calculates track locations the first time only.
                            if( audioFxWorldCalcTrackPositionsOnce == 0 ) {
                                audioFxWorldCalcTrackPositionsOnce = 1;
                                audioFxWorldPosition0   = Math.round(trackLength / 10     ); // Start of the track.
                                audioFxWorldPosition20  = Math.round(trackLength / 10 * 2 ); // 20% of the track.
                                audioFxWorldPosition40  = Math.round(trackLength / 10 * 4 ); // 40% of the track.
                                audioFxWorldPosition60  = Math.round(trackLength / 10 * 6 ); // 60% of the track.
                                audioFxWorldPosition80  = Math.round(trackLength / 10 * 8 ); // 80% of the track.
                                audioFxWorldPosition100 = Math.round(trackLength          ); // End of the track.
                            }
                            // If the audio effects are active.
                            if( isActive && jsr.Vars.audioFxAllowedByUser ) {
                                // Check the state of the sounds toggle.
                                // If the sound is activated (audioFxWorldSoundsToggleOnce == 0).
                                if( audioFxWorldSoundsToggleOnce == 0 ) {
                                    // Play the sound once.
                                    switch(true) {
                                        // Section from 80% to 100% of the track.
                                        case ( audioFxWorldTrackPosition > audioFxWorldPosition80 && 
                                               audioFxWorldTrackPosition < audioFxWorldPosition100 ):
                                            if( audioFxWorldOnce5 == 0 ) {
                                                audioFxWorldOnce5 = 1;
                                                audioFxWorldOnce1 = 0;
                                                audioFxWorldSound4.pause();
                                                audioFxWorldSound5.currentTime = 0;
                                                audioFxWorldSound5.play();
                                            }
                                            break;
                                        // Section from 60% to 80% of the track.
                                        case ( audioFxWorldTrackPosition > audioFxWorldPosition60 && 
                                               audioFxWorldTrackPosition < audioFxWorldPosition80 ):
                                            if( audioFxWorldOnce4 == 0 ) {
                                                audioFxWorldOnce4 = 1;
                                                audioFxWorldOnce5 = 0;
                                                audioFxWorldSound3.pause();
                                                audioFxWorldSound4.currentTime = 0;
                                                audioFxWorldSound4.play();
                                            }
                                            break;
                                        // Section from 40% to 60% of the track.
                                        case ( audioFxWorldTrackPosition > audioFxWorldPosition40 && 
                                               audioFxWorldTrackPosition < audioFxWorldPosition60 ):
                                            if( audioFxWorldOnce3 == 0 ) {
                                                audioFxWorldOnce3 = 1;
                                                audioFxWorldOnce4 = 0;
                                                audioFxWorldSound2.pause();
                                                audioFxWorldSound3.currentTime = 0;
                                                audioFxWorldSound3.play();
                                            }
                                            break;
                                        // Section from 20% to 40% of the track.
                                        case ( audioFxWorldTrackPosition > audioFxWorldPosition20 && 
                                               audioFxWorldTrackPosition < audioFxWorldPosition40 ):
                                            if( audioFxWorldOnce2 == 0 ) {
                                                audioFxWorldOnce2 = 1;
                                                audioFxWorldOnce3 = 0;
                                                audioFxWorldSound1.pause();
                                                audioFxWorldSound2.currentTime = 0;
                                                audioFxWorldSound2.play();
                                            }
                                            break;
                                        // Section from 0% to 20% of the track.
                                        case ( audioFxWorldTrackPosition > audioFxWorldPosition0 && 
                                               audioFxWorldTrackPosition < audioFxWorldPosition20 ):
                                            if( audioFxWorldOnce1 == 0 ) {
                                                audioFxWorldOnce1 = 1;
                                                audioFxWorldOnce2 = 0;
                                                audioFxWorldSound5.pause();
                                                audioFxWorldSound1.currentTime = 0;
                                                audioFxWorldSound1.play();
                                            }
                                            break;
                                    }
                                    // console.log('World Sounds: PLAY');
                                // Reload the state of the sounds for playback.
                                } else {
                                    audioFxWorldSoundsToggleOnce = 0;
                                    audioFxGameDeadlineOnce = 0;
                                    audioFxWorldOnce1 = 0;
                                    audioFxWorldOnce2 = 0;
                                    audioFxWorldOnce3 = 0;
                                    audioFxWorldOnce4 = 0;
                                    audioFxWorldOnce5 = 0;
                                    // console.log('World Sounds: RELOAD');
                                }
                            } else {
                                // Stop all world sounds.
                                if( audioFxWorldOnce1 == 0 || audioFxWorldOnce2 == 0 || 
                                    audioFxWorldOnce3 == 0 || audioFxWorldOnce4 == 0 || 
                                    audioFxWorldOnce5 == 0 ) {
                                    // Programs resume sounds upon activation.
                                    audioFxWorldSoundsToggleOnce = 1;
                                    // Pause everything once.
                                    audioFxWorldOnce1 = 1;
                                    audioFxWorldOnce2 = 1;
                                    audioFxWorldOnce3 = 1;
                                    audioFxWorldOnce4 = 1;
                                    audioFxWorldOnce5 = 1;
                                    audioFxWorldSound1.pause();
                                    audioFxWorldSound2.pause();
                                    audioFxWorldSound3.pause();
                                    audioFxWorldSound4.pause();
                                    audioFxWorldSound5.pause();
                                    // console.log('World Sounds: STOP');
                                }
                            }
                            break;
                            
                        // Deadline Event
                        // If the time is close to expiration the sound is heard.
                        case 'deadline':
                            // If the audio effects are active.
                            if (isActive && jsr.Vars.audioFxAllowedByUser) {
                                if( audioFxGameDeadlineOnce == 0 ) {
                                    audioFxGameDeadlineOnce = 1;
                                    if( requestType == 'slow' ) {
                                        audioFxGameDeadlineFast.pause();
                                        audioFxGameDeadlineSlow.currentTime = 0;
                                        audioFxGameDeadlineSlow.play();
                                        audioFxGameDeadlineTypeOnce = 'slow';
                                    } else if( requestType == 'fast' ) {
                                        audioFxGameDeadlineSlow.pause();
                                        audioFxGameDeadlineFast.currentTime = 0;
                                        audioFxGameDeadlineFast.play();
                                        audioFxGameDeadlineTypeOnce = 'fast';
                                    }
                                    // console.log('Deadline: PLAY');
                                }
                                // Update on change of state.
                                if( requestType != audioFxGameDeadlineTypeOnce ) {
                                    audioFxGameDeadlineOnce = 0;
                                    // console.log('Deadline: CHANGE SOUND');
                                }
                            } else {
                                if( audioFxGameDeadlineOnce == 1 ) {
                                    audioFxGameDeadlineOnce = 0;
                                    audioFxGameDeadlineSlow.pause();
                                    audioFxGameDeadlineFast.pause();
                                    // console.log('Deadline: STOP');
                                }
                            }
                            break;
                            
                        // Deadline Reset Event.
                        case 'reset_deadline':
                            if( audioFxGameDeadlineOnce == 1 ) {
                                audioFxGameDeadlineOnce = 0;
                                audioFxGameDeadlineSlow.pause();
                                audioFxGameDeadlineFast.pause();
                                // console.log('Reset Deadline: RESET');
                            }
                            break;
                            
                        // Finisch Line Event.
                        // When the player completes a round.
                        case 'finish_line':
                            // If the audio effects are active.
                            if (isActive && jsr.Vars.audioFxAllowedByUser) {
                                if( audioFxGameFinishLineOnce == 0 ) {
                                    audioFxGameFinishLineOnce = 1;
                                    audioFxGameFinishLine.currentTime = 0;
                                    jsr.HelperStopAndPlaySoundtrack('volume',audioFxGameFinishLine.duration,0.5);
                                    audioFxGameFinishLine.play();
                                    // console.log('Finish Line: PLAY');
                                }
                            } else {
                                if( audioFxGameFinishLineOnce == 0 ) {
                                    audioFxGameFinishLineOnce = 1;
                                    audioFxGameFinishLine.pause();
                                    // console.log('Finish Line: STOP');
                                }
                            }
                            break;
                            
                        // Reset Finisch Line Event.
                        // During the lap.
                        case 'reset_finish_line':
                            if( audioFxGameFinishLineOnce == 1 ) {
                                audioFxGameFinishLineOnce = 0;
                                // console.log('Reset Finish Line: RESET');
                            }
                            break;
                            
                        // Game Lose
                        // if the game is over and the player has Lost the game.
                        case 'gameLose':
                            if( audioFxGameLoseOnce == 0 ) {
                                audioFxGameLoseOnce = 1;
                                audioFxGameLose.pause();
                                audioFxGameLose.currentTime = 0;
                                jsr.HelperStopAndPlaySoundtrack('pause',audioFxGameLose.duration);
                                audioFxGameLose.play();
                                // console.log('Finish Line: PLAY');
                            }
                            break;
                            
                        // Game Win
                        // If the game is over and the player has Win the game.
                        case 'gameWin':
                            if( audioFxGameWinOnce == 0 ) {
                                audioFxGameWinOnce = 1;
                                audioFxGameWin.pause();
                                audioFxGameWin.currentTime = 0;
                                jsr.HelperStopAndPlaySoundtrack('pause',audioFxGameWin.duration);
                                audioFxGameWin.play();
                                // console.log('Finish Line: PLAY');
                            }
                            break;
                            
                    }
                    
                }

            }
            
            //------------------------
            // Clacson
            
            // If AudioFx is supported.
            if( jsr.HelperCheckDeviceAudioFxSupport() == true ) {

                // Clacson Sound.
                function playCarClacsonSound() {
                    // If the audio effects are active.
                    if (jsr.Vars.audioFxAllowedByUser) {
                        audioFxCarClacson.pause();
                        audioFxCarClacson.currentTime = 0;
                        audioFxCarClacson.play();
                    }
                }

                // Clacson Event > Gamepad.
                $(document).on('click','#gamepad #gamepad-clacson',function() {
                    playCarClacsonSound();
                });

                // Clacson Event > Keyboard.
                $(document).on('keydown', function(event) {
                    // KeyCodes: G (Like GTA5)
                    var all_keycode = ['71'];
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    // If the button is pressed only once.
                    if ( jsr.HelplerInclude(all_keycode,keycode) ) {
                        playCarClacsonSound();
                    }
                });
                
            }
            
            //------------------------
            // Audio Controls
            
            // Updates the appearance of the Toggle controls.
            jsr.HelperUpdateAudioFxControls = function(type = null) {
                // Updates the sound effects On/off toggle button.
                function updateToggleButton(){
                    if( jsr.Vars.audioFxAllowedByUser == 1 ) {
                        $('.btn.btnAudioFxToggle .audioFxOff').show();
                        $('.btn.btnAudioFxToggle .audioFxOn').hide();
                    } else {
                        $('.btn.btnAudioFxToggle .audioFxOn').show();
                        $('.btn.btnAudioFxToggle .audioFxOff').hide();
                    }
                }
                // Updates the selection of the AudioFxAllowedByUser select
                // (if the state is changed by another item).
                function updateToggleSelect(){
                    if( jsr.Vars.audioFxAllowedByUser == 1 ) {
                        $('.modal.settings #audioFxAllowedByUser').val(1);
                    } else {
                        $('.modal.settings #audioFxAllowedByUser').val(0);
                    }
                }
                // Only Button
                if( type == 'toggleButton' ) {
                    updateToggleButton();
                // Only Select
                } else if( type == 'toggleSelect' ) {
                    updateToggleSelect();
                // All
                } else {
                    updateToggleButton();
                    updateToggleSelect();
                }
            }
            jsr.HelperUpdateAudioFxControls('toggleButton');
            
            // If Audio Fx are supported.
            if( jsr.HelperCheckDeviceAudioFxSupport() == true ) {
            
                // Avoid blocking or browser notification by starting audio after user interaction.
                $(document).on('click','.modal.welcome .start_with_audio', function(){
                    jsr.Vars.audioFxAllowedByUser = 1;
                    jsr.HelperUpdateAudioFxControls();
                });
                
                // Show Audio Fx Controls.
                $('.audio.modal .audio_options').show(0);

                // Activate and deactivate audio effects on click.
                $(document).on('click','.btn.btnAudioFxToggle', function() {
                    if( jsr.Vars.audioFxAllowedByUser == 1 ) {
                        jsr.Vars.audioFxAllowedByUser = 0;
                    } else {
                        jsr.Vars.audioFxAllowedByUser = 1;
                    }
                    jsr.HelperUpdateAudioFxControls();
                });
                
            // else if Audio Fx not supported.
            } else {
                
                // Display as disabled.
                $('.settings.modal #audioFxCarVolume').closest('.input').addClass('disabled');
                $('.settings.modal #audioFxWorldVolume').closest('.input').addClass('disabled');
                $('.settings.modal #audioFxMatchVolume').closest('.input').addClass('disabled');
                $('.settings.modal #audioFxCarVolume').attr('readonly', true);
                $('.settings.modal #audioFxWorldVolume').attr('readonly', true);
                $('.settings.modal #audioFxMatchVolume').attr('readonly', true);
                
            }
            
            // Show vibration support satatus.
            function showDeviceAudioFxSupport() {
                if ( jsr.HelperCheckDeviceAudioFxSupport() == true ) {
                    $('.notice_device_support_audiofx .ndsafx_on').show(0);
                } else {
                    $('.notice_device_support_audiofx .ndsafx_off').show(0);
                }
            }
            showDeviceAudioFxSupport();
        
        }
        gameAudioFx();

        //=============================================
        // WOW.js + Animate.css
        //=============================================

        function play_wow_animate() {
            // Start effects animations.css when they enter viewport.
            // (class="wow effect-name")
            new WOW().init(); 
            $.fn.extend({
                animateCss: function (animationName) {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    this.addClass('animated ' + animationName).one(animationEnd, function() {
                        $(this).removeClass('animated ' + animationName);
                    });
                }
            });
            // Start effects animations.css in Hover.
            // (class="hwow" data-effect="effect-name")
            $('.hwow').hover(function(){
                $(this).animateCss($(this).attr('data-effect'));
            },function(){
                return true;
            });
        };
        play_wow_animate();

        //=============================================
        // Reset and Restart the Game
        //=============================================

        function safe_reset() {
            $(document).on('click','.safe_reset .game_reset',function(){ 
                location.reload();
            });
            $(document).on('click','.gameover .game_reset',function(){
                location.reload();
            });
        };
        safe_reset();
        
        //=============================================
        // Turbo FX
        //=============================================
        
        function gameTurboFx() {
            
            // The operations must be performed only once or at each change of state.
            var checkTurboStatusOnce = 0;

            // Restores normal conditions.
            function resetColorsAfterTurboFx(fx_type) {
                jsr.HelperSetWorldColorsTurbo(jsr.Vars.currentLandscape,false,fx_type);
                jsr.Vars.stopFxColorCycleByTurbo = false;
            }

            // Apply graphic effects during the turbo.
            jsr.HelperShowTurboFx = function(fx_type) {
                // If an effect is set.
                if(fx_type) {
                    // Check the condition of the turbo.
                    // If the turbo is active
                    if( jsr.Vars.turboTriggered == true ) {
                        // If the minimum speed is reached.
                        if( jsr.Vars.currentSpeedMph >= jsr.Vars.turboFxMinSpeedMph && checkTurboStatusOnce == 0 ) {
                            checkTurboStatusOnce = 1;
                            // Apply turbo effects.
                            jsr.HelperSetWorldColorsTurbo(jsr.Vars.currentLandscape,true,fx_type);
                            // console.log('Turbo Fx ON');
                        // else if the minimum speed is not sufficient.
                        } else if( jsr.Vars.currentSpeedMph <= jsr.Vars.turboFxMinSpeedMph && checkTurboStatusOnce == 1 ) {
                            // If the fx is dynamic and HelperFxColorCycle has stopped the effect or fx is static.
                            if( (fx_type == 'dynamic' && jsr.Vars.stopFxColorCycleByTurbo == true) || fx_type == 'static' ) {
                                checkTurboStatusOnce = 0;
                                // Restores normal conditions.
                                resetColorsAfterTurboFx(fx_type);
                                // console.log('Turbo Fx ON > Stop Speed');
                            }
                        }
                    // else the turbo is deactivated.
                    } else {
                        // Restores default normal conditions.
                        checkTurboStatusOnce = 0;
                        resetColorsAfterTurboFx(fx_type);
                        // console.log('Turbo Fx OFF');
                    }
                }
            }
            
        }
        gameTurboFx();

        //=============================================
        // DISPLAY > Set > CSS Filter
        //=============================================

        function play_cssFilter() {
            // Default
            var cfDefault    = 'none'; // None is without filters.
            var cfSelect     = '.settings #cssFilter';
            var cfTarget     = '.game_canvas';
            var cfClass      = 'cssFilter';
            var cfAllFilters = {
                'pixel'                : {'class' : cfClass+' '+'cssFilter_Pixel'},
                'red'                  : {'class' : cfClass+' '+'cssFilter_Red'},
                'blue'                 : {'class' : cfClass+' '+'cssFilter_Blue'},
                'green'                : {'class' : cfClass+' '+'cssFilter_Green'},
                'difference'           : {'class' : cfClass+' '+'cssFilter_Difference'},
                'blackAndWhite'        : {'class' : cfClass+' '+'cssFilter_BlackAndWhite'},
                'dynamicBlackAndWhite' : {'class' : cfClass+' '+'cssFilter_DynamicBlackAndWhite'},
                'dynamicSaturation'    : {'class' : cfClass+' '+'cssFilter_DynamicSaturation'},
                'dynamicMulticolor'    : {'class' : cfClass+' '+'cssFilter_DynamicMulticolor'}
            };
            // All Filters List
            var cfAllFilterList = Object.keys(cfAllFilters);
            // All Filters Classes
            var cfAllFilterClasses = Array.from(Object.values(cfAllFilters), cssFilterClass => cssFilterClass.class);
            // Clean Classes
            function cleanCssClasses() {
                $.each(cfAllFilterClasses, function(i, v){
                    $(cfTarget).removeClass(v);
                });
            };
            // Set CSS filter.
            function set_cssFilter(cssFilter) {
                // Set the select
                $(cfSelect).val(cssFilter);
                cleanCssClasses();
                // Add CSS Filter Class
                switch (cssFilter) {
                    case 'pixel':
                        $(cfTarget).addClass(cfAllFilters.pixel.class);
                        break;
                    case 'red':
                        $(cfTarget).addClass(cfAllFilters.red.class);
                        break;
                    case 'blue':
                        $(cfTarget).addClass(cfAllFilters.blue.class);
                        break;
                    case 'green':
                        $(cfTarget).addClass(cfAllFilters.green.class);
                        break;
                    case 'difference':
                        $(cfTarget).addClass(cfAllFilters.difference.class);
                        break;
                    case 'blackAndWhite':
                        $(cfTarget).addClass(cfAllFilters.blackAndWhite.class);
                        break;
                    case 'dynamicBlackAndWhite':
                        $(cfTarget).addClass(cfAllFilters.dynamicBlackAndWhite.class);
                        break;
                    case 'dynamicSaturation':
                        $(cfTarget).addClass(cfAllFilters.dynamicSaturation.class);
                        break;
                    case 'dynamicMulticolor':
                        $(cfTarget).addClass(cfAllFilters.dynamicMulticolor.class);
                        break;
                };
            };
            // Load Default
            set_cssFilter(cfDefault);
            // On Change
            $(document).on('change',cfSelect, function() { 
                var current_cssFilter = $(this).val();
                set_cssFilter(current_cssFilter);
            });
            // Set the required filter.
            jsr.HelperSetCssFilter = function(filter) {
                // If the required filter is not present in the array, set none.
                if( !(jsr.HelplerInclude(cfAllFilterList, filter)) ) {
                    filter = 'none';
                }
                set_cssFilter(filter);
            }
            
        };
        play_cssFilter();
        
        //=============================================
        // WEATHER CONDITIONS
        //=============================================
        
        // Weather condition was developed starting from Snow.js by Mahefnawy (2008 MIT license).
        // https://github.com/mahefnawy/snowflake
        
        function gameWeatherConditions() {
            
            //-------------------------
            // Default
            
            jsr.Vars.currentWeather        = 'not-set'; // Weather request, set by game.
            jsr.Vars.changeWeatherFlag     = true;      // Default true, if the weather change should not be performed it is false.
            jsr.Vars.updateWeatherFlag     = false;     // Default false, if the canvas size change is to be performed it is true.
            jsr.Vars.autoWeatherChangeTime = 0;         // Value in seconds set by the game.
            var weatherParticles           = [];        // All Weather Particles
            
            var weatherData = {                         // Waeather Data
                snow : {
                    particleMaxSize     : 5,
                    particleMinSize     : 2,
                    particleDensity     : 1,
                    particlesMax        : 0,
                    particlesMaxDesktop : 50,
                    particlesMaxMobile  : 30,
                    particlesMaxSmall   : 20,
                    particlesAngle      : 0,
                    mphGameGainSpeed    : 0,
                    mphGameMaxSpeed     : 310,
                    particleMaxSpeed    : 11,
                    particleMinSpeed    : 1
                },
                rain : {
                    particleMaxSize     : 1,
                    particleMinSize     : 1,
                    particleDensity     : 2,
                    particlesMax        : 0,
                    particlesMaxDesktop : 70,
                    particlesMaxMobile  : 40,
                    particlesMaxSmall   : 20,
                    particlesAngle      : 0,
                    mphGameGainSpeed    : 100,
                    mphGameMaxSpeed     : 310,
                    particleMaxSpeed    : 11,
                    particleMinSpeed    : 2
                }
            }
            
            //-------------------------
            // Weather Helpers
            
            // Mobile browsers behave differently from desktop, when you need to reload, the result is true.
            // Helper > After changing the orientation if you need to reload the game, it's true.
            jsr.HelperWeatherAfterChangingOrientationReloadGame = function() {
                var result = false;
                // If Waeather is active and the device is mobile.
                // If a scheduled weather change or weather condition is set.
                if( jsr.Vars.currentWeather != null && jsr.Current.device != 'desktop' &&
                    (jsr.Vars.autoWeatherChangeTime > 0 || jsr.Vars.currentWeather != 'clear') ) {
                    result = true;
                } 
                return result;
            }

            // Set Weather Particles > Apply attributes to particles, updates the particle array.
            function setWeatherParticles(ctx,particlesMax,particleMaxSize,particleMinSize,particleDensity) {
                var allParticles = [];
                for(var i = 0; i < particlesMax; i++) {
                    allParticles.push({
                        x: Math.random() * ctx.canvas.width,
                        y: Math.random() * ctx.canvas.height,
                        r: Math.random() * particleMaxSize + particleMinSize,
                        d: Math.random() + particleDensity
                    })
                }
                return allParticles;
            }

            // Animate the particles
            function weatherMoveParticles(data,weatherParticles,keyLeft,keyRight,speed) {
                // The speed of the particles changes in relation to the speed of the car.
                // Current Speed in MPH, Maximum speed in MPH, Maximum particle speed value *, Minimum particle velocity value *.
                // * The particle speed value is relative to RenderGame();
                function weatherDynamicSpeedIncrease(mphGameCurrentSpeed,mphGameGainSpeed,mphGameMaxSpeed,particleMaxSpeed,particleMinSpeed) {
                    return particleMinSpeed * ((mphGameCurrentSpeed + mphGameGainSpeed) / mphGameMaxSpeed * particleMaxSpeed).toFixed(2);
                }
                // Dynamic Particle Speed Increase
                var particleSpeedIncrease = weatherDynamicSpeedIncrease(jsr.Vars.currentSpeedMph, data.mphGameGainSpeed, data.mphGameMaxSpeed, data.particleMaxSpeed, data.particleMinSpeed);
                // Motion particles
                if( jsr.Vars.currentWeather == 'snow' ) {
                    data.particlesAngle += 0.01;
                }
                // Particles Positions
                for(var i = 0; i < data.particlesMax; i++) {
                    // Store current Particle.
                    var f = weatherParticles[i];
                    // Update X and Y coordinates of each weatherParticles.
                    var particleSpeed = Math.pow(f.d, 2);
                    // Move on the Y axis
                    f.y += particleSpeed + particleSpeedIncrease; // Stop f.y=0
                    // Move on the X axis.
                    // When the car moves and turns.
                    if( keyLeft == true && speed > 0 ) {
                        f.x += particleSpeed + particleSpeedIncrease;
                    } else if( keyRight == true && speed > 0 ) {
                        f.x -= particleSpeed + particleSpeedIncrease;
                    // if the car is stationary or going straight.
                    } else {
                        // Alternating lateral movement.
                        f.x += Math.sin(data.particlesAngle) * 2;
                    }
                    // If the particles reaches the bottom, send a new one to the top.
                    if(f.y > jsr.Current.window.height ){
                        weatherParticles[i] = {x: Math.random()* jsr.Current.window.width, y: 0, r: f.r, d: f.d};
                    }
                }
            }
            
            // Set the maximum number of particles based on the current window size.
            function setParticlesMax(data) {
                var particlesMax  = 0;
                var device_width  = jsr.Current.window.width;     // Current device Width.
                var device_height = jsr.Current.window.height;    // Current device Height.
                // If height or width is up to 320px.
                if( (device_width <= '360') || (device_height <= '360') ) {
                    particlesMax = data.particlesMaxSmall;
                // If height or width is up to 414px.
                } else if( (device_width <= '414') || (device_height <= '414') ) {
                    particlesMax = data.particlesMaxMobile;
                // If the height or width exceeds 414px.
                } else {
                    particlesMax = data.particlesMaxDesktop;
                }
                return particlesMax;
            }

            
            //-------------------------
            // Run Weather Conditions
            jsr.HelperRunGameWeatherConditions = function(ctx,weather,keyLeft,keyRight,speed) {
                if( weather == 'snow' ) {
                    ctx.fillStyle = jsr.COLORS.WORLD.WEATHER.snow;
                    var data      = weatherData.snow;
                } else if( weather == 'rain' ) {
                    ctx.fillStyle = jsr.COLORS.WORLD.WEATHER.rain;
                    var data      = weatherData.rain;
                }
                if( weather == 'snow' || weather == 'rain' ) {
                    // Update only when the weather is set.
                    if( jsr.Vars.changeWeatherFlag == true ) {
                        jsr.Vars.changeWeatherFlag = false;
                        // Set weather particles (maximum number and data array).
                        data.particlesMax = setParticlesMax(data);
                        weatherParticles = setWeatherParticles(ctx,data.particlesMax,data.particleMaxSize,data.particleMinSize,data.particleDensity);
                        // Set the current weather in the settings.
                        $('.settings.modal #currentWeather').val(weather);
                    }
                    // Update only when canvas size is changed.
                    if( jsr.Vars.updateWeatherFlag == true ) {
                        jsr.Vars.updateWeatherFlag = false;
                        // Set weather particles (maximum number and data array).
                        data.particlesMax = setParticlesMax(data);
                        weatherParticles = setWeatherParticles(ctx,data.particlesMax,data.particleMaxSize,data.particleMinSize,data.particleDensity);
                    }
                    ctx.beginPath();
                    for(var i = 0; i < data.particlesMax; i++){
                        var f = weatherParticles[i];
                        ctx.moveTo(f.x, f.y);
                        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
                    }
                    ctx.fill();
                    weatherMoveParticles(data, weatherParticles, keyLeft, keyRight, speed);
                } else if( weather == 'clear' ) {
                    // Update only when the weather is set.
                    if( jsr.Vars.changeWeatherFlag == true ) {
                        jsr.Vars.changeWeatherFlag = false;
                        // Set the current weather in the settings.
                        $('.settings.modal #currentWeather').val('clear');
                    }
                } else {
                    // Update only when the weather is set.
                    if( jsr.Vars.changeWeatherFlag == true ) {
                        jsr.Vars.changeWeatherFlag = false;
                        // Hide the settings if the weather is off.
                        $('.settings.modal .section_weather').hide(0);
                    }
                }
            }
            
            //-------------------------
            // Set Weather Conditions
            
            // Change Weather Button
            $(document).on('change','.settings.modal #currentWeather',function(){
                jsr.Vars.changeWeatherFlag = true;
                jsr.Vars.currentWeather = $('.settings.modal #currentWeather option:selected').val();
            });
            // Update Weather by Canvas size.
            $(window).on('resize', function(){
                jsr.Vars.updateWeatherFlag = true;
            });
            // Update Weather by Canvas size.
            window.addEventListener("orientationchange", function() {
                jsr.Vars.updateWeatherFlag = true;
                // Mobile browsers behave differently from the desktop, when you need to reload, show a message.
                // If the message related to the "TouchDeviceNotHorizontal" cookie is already displayed, it is not necessary to show this message
                if( jsr.HelperWeatherAfterChangingOrientationReloadGame() == true && 
                    Cookies.get('jsr-isTouchDeviceNotHorizontal-notice') == 'seen' ) {
                    // show Alerts modal.
                    var modal = '.modal.alerts';
                    jsr.HelperShowModal(modal);
                    // Show Message in modal.
                    $('.modal.alerts .notice_orientation_changed').removeClass('hidden');
                    // BTN > Reset
                    $(document).on('click','.modal.alerts .notice_orientation_changed .game_reset',function() {
                        location.reload();
                    });
                }
            });
            
            //-------------------------
            // Automatic Change Weather
            // Changes the weather every few seconds.
            jsr.HelperAutoWeatherChange = function(weatherConditions) {
                // Converts Seconds to ms
                function getTimeinMs(ms) { return ms * 1000; }
                // Default time to change.
                var changeSeconds = getTimeinMs(jsr.Vars.autoWeatherChangeTime);
                // Starts the timer that performs the change.
                function startAutoWeatherTimer() {
                    // Every few seconds.
                    var changeWeatherTimer = setInterval(function() {
                        // If the time is less than 0 stop the timer.
                        if( changeSeconds <= 0 ) {
                            clearInterval(changeWeatherTimer);
                        // If the time is greater than 0 it starts the timer.
                        } else {
                            // Randomly extract a weather from the array.
                            var newWeather = jsr.HelperReturnRandomValueFromArray(weatherConditions);
                            // If the current weather is different from the next weather.
                            if( jsr.Vars.currentWeather != newWeather ) {
                                // Change the Weather
                                jsr.Vars.currentWeather = newWeather;
                                jsr.Vars.changeWeatherFlag = true;
                                $('.settings.modal #currentWeather').val(newWeather);
                            }
                        }
                    }, changeSeconds);
                    // Controls the change of settings.
                    setInterval(function(){
                        // if the seconds change, set the new time.
                        if( ( getTimeinMs(jsr.Vars.autoWeatherChangeTime) ) != changeSeconds ) {
                            // Stop the active timer, change the time and restart the timer.
                            clearInterval(changeWeatherTimer);
                            changeSeconds = getTimeinMs(jsr.Vars.autoWeatherChangeTime);
                            startAutoWeatherTimer();
                            console.log(changeSeconds);
                        }
                    }, 1000);
                }
                // Default
                startAutoWeatherTimer();
            }
            
        }
        gameWeatherConditions();
        
        //=============================================
        // Tilt Horizon Fx 
        //=============================================
        
        function gameTiltHorizonFx() {

            // Defaults
            jsr.Vars.tiltHorizonFxIsActive     = 'disabled'; // (Set by Game)
            var tiltHorizonFxRotation          = 0;
            var tiltHorizonFxCurrentRotation   = 0;
            var tiltHorizonFxNewRotation       = 0;
            var tiltHorizonFxDeg               = 0;
            var tiltHorizonFxTarget            = null;
            var tiltHorizonFxResetOnce         = 0;
            var tiltHorizonFxLast              = null;
            var tiltHorizonFxSaveStateOnce     = 0;
            
            // Run by Game > Tilt Horizon Fx.
            jsr.HelperRunTiltHorizonFx = function( isActive, baseSegmentCurve, currentSpeed, maxSpeed, id, ctx, canvasWidth, canvasHeight) {
                
                // Save context status.
                if( tiltHorizonFxSaveStateOnce == 0 ) {
                    tiltHorizonFxSaveStateOnce = 1;
                    ctx.save();
                }
                
                // Stores the status
                if( tiltHorizonFxResetOnce == 0 ) {
                    tiltHorizonFxResetOnce = 1;
                    tiltHorizonFxLast = isActive;
                }
                
                // If the state changes.
                if( tiltHorizonFxLast != isActive ) {
                    // Update the stored status.
                    tiltHorizonFxResetOnce = 0;
                    // Restores the initial conditions.
                    switch( tiltHorizonFxLast ) {
                        case 'css':
                            tiltHorizonFxTarget = document.getElementById(id);
                            tiltHorizonFxTarget.style.transform  = 'rotate(0deg)';
                            tiltHorizonFxTarget.style.transition = 'initial';
                            // console.log('RESET (Css)');
                            break;
                        case 'drawing':
                            ctx.restore();
                            ctx.save();
                            // console.log('RESET (Drawing)');
                            break;
                    }
                }
                
                // If is Active
                if ( isActive != 'disabled' ) {
                    // Calc Deg
                    if ( baseSegmentCurve == 0 ) {
                        tiltHorizonFxRotation = -tiltHorizonFxCurrentRotation;
                        tiltHorizonFxCurrentRotation = 0;
                    } else {
                        tiltHorizonFxNewRotation     = Math.round( baseSegmentCurve * currentSpeed / maxSpeed * 100) / 100;
                        tiltHorizonFxRotation        = tiltHorizonFxNewRotation - tiltHorizonFxCurrentRotation;
                        tiltHorizonFxCurrentRotation = tiltHorizonFxNewRotation;
                    }
                    // Apply Fx by tiltHorizonFxRotation.
                    // The left curve is negative (-) and the right curve is positive (+).
                    switch( isActive ) {
                        case 'css':
                            tiltHorizonFxTarget   = document.getElementById(id);
                            tiltHorizonFxDeg      = Math.round(tiltHorizonFxRotation * 45);
                            tiltHorizonFxTarget.style.transform  = 'rotate('+tiltHorizonFxDeg+'deg)';
                            tiltHorizonFxTarget.style.transition = '0.5s ease all';
                            // console.log('PLAY (CSS)');
                            break;
                        case 'drawing':
                            ctx.translate(  canvasWidth / 2,  canvasHeight / 2);
                            ctx.rotate( -tiltHorizonFxRotation * (Math.PI/90) );
                            ctx.translate( -canvasWidth / 2, -canvasHeight / 2);
                            // console.log('PLAY (DRAWING)');
                            break;
                    }
                }

            }
            
            // Change Tilt Horizon Fx Buttons
            $(document).on('click','input[name=setTiltHorizon][value="disabled"]',function() {
                jsr.Vars.tiltHorizonFxIsActive = 'disabled';
            });
            $(document).on('click','input[name=setTiltHorizon][value="css"]',function() {
                jsr.Vars.tiltHorizonFxIsActive = 'css';
            });
            $(document).on('click','input[name=setTiltHorizon][value="drawing"]',function() {
                jsr.Vars.tiltHorizonFxIsActive = 'drawing';
            });
            
            // Set Default Tilt Horizon Fx value.
            jsr.HelperSetDefaultTiltHorizonFx = function() {
                switch( jsr.Vars.tiltHorizonFxIsActive ) {
                    case 'disabled':
                        $('input[name=setTiltHorizon][value="disabled"]').attr('checked', 'checked');
                        break;
                    case 'css':
                        $('input[name=setTiltHorizon][value="css"]').attr('checked', 'checked');
                        break;
                    case 'drawing':
                        $('input[name=setTiltHorizon][value="drawing"]').attr('checked', 'checked');
                        break;
                }
            }

        }
        gameTiltHorizonFx();
        
        //=============================================
        // Device Vibration
        //=============================================
        
        function gameVibrationDevice() {
            
            // Vibration times expressed in ms or 
            // array of ms ([vibration,pause,vibration,pause...]).
            jsr.Vars.vibrationDeviceTurboMs          = 100;
            jsr.Vars.vibrationDeviceFinishLineMs     = 100;
            jsr.Vars.vibrationDeviceCollisionMs      = 100;
        
            // Play and stop only once at each state change.
            var vibrationDeviceSetByTurboOnce        = 0;
            var vibrationDeviceSetByFinishLineOnce   = 0;
            var vibrationDeviceSetByCarCollisionOnce = 0;

            // Vibrate the device at certain times.
            jsr.HelperVibrationDevice = function (isActive,eventType) {
                // If vibration is enabled and vibration on this device is available.
                if (isActive && window.navigator && window.navigator.vibrate) {
                    // Turbo Event.
                    if( eventType == 'turbo' ) {
                        // If the turbo is active.
                        if( jsr.Vars.turboTriggered == true ) {
                            // Start the vibration command once.
                            if( vibrationDeviceSetByTurboOnce == 0 ) {
                                vibrationDeviceSetByTurboOnce = 1;
                                navigator.vibrate(jsr.Vars.vibrationDeviceTurboMs);
                            }
                        // else the turbo is deactivated.
                        } else {
                            // Reset the limit to the vibration event.
                            if( vibrationDeviceSetByTurboOnce == 1 ) {
                                vibrationDeviceSetByTurboOnce = 0;
                            }
                        }
                    }
                    // Finisch Line Event.
                    if( eventType == 'finish_line' ) {
                        if( vibrationDeviceSetByFinishLineOnce == 0 ) {
                            vibrationDeviceSetByFinishLineOnce = 1;
                            navigator.vibrate(jsr.Vars.vibrationDeviceFinishLineMs);
                        }
                    // We are not yet at the finish line.
                    } else if( eventType == 'reset_finish_line' ) {
                        // Reset the limit to the vibration event.
                        if( vibrationDeviceSetByFinishLineOnce == 1 ) {
                            vibrationDeviceSetByFinishLineOnce = 0;
                        }
                    }
                    // Car Collisions Event.
                    if( eventType == 'collision' ) {
                        if( vibrationDeviceSetByCarCollisionOnce == 0 ) {
                            vibrationDeviceSetByCarCollisionOnce = 1;
                            navigator.vibrate(jsr.Vars.vibrationDeviceCollisionMs);
                        }
                    // When there is no car collision.
                    } else if( eventType == 'reset_collision' ) {
                        // Reset the limit to the vibration event.
                        if( vibrationDeviceSetByCarCollisionOnce == 1 ) {
                            vibrationDeviceSetByCarCollisionOnce = 0;
                        }
                    }
                }
            }
            
            // If the vibration is supported by the device it returns true.
            jsr.HelperCheckDeviceVibrationSupport = function() {
                if (window.navigator && window.navigator.vibrate) {
                    return true;
                } else {
                    return false;
                }
            }
            
            // Show vibration support satatus.
            function showDeviceVibrationSupport() {
                if ( jsr.HelperCheckDeviceVibrationSupport() == true ) {
                    $('.notice_device_support_vibration .ndsv_on').show(0);
                } else {
                    $('.notice_device_support_vibration .ndsv_off').show(0);
                }
            }
            showDeviceVibrationSupport();
            
        }
        gameVibrationDevice();
    
    });   
})(jQuery);
