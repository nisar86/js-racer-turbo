//=========================================================================
// DEMO STRAIGHT > JS RACER TURBO
//=========================================================================
/*
JS Racer Turbo
Author: Nisar Abed
Website: https://www.nisar.it
Other Authors: 
Developed starting from the work of Jake Gordon and Stephen Karl Larroque.
*/

(function($) {
    "use strict";
    function racer() {
    
        //=========================================================================
        // COMMON > JS RACER TURBO
        //=========================================================================
        
        // Load Textures by required detail.
        var texture_detail = Cookies.get('jsr-textures-detail');
        jsr.HelperLoadTexturesArray(texture_detail);

        //=========================================================================
        // CONFIG
        //=========================================================================
        
        var fps                     = 60;                                   // How many 'update' frames per second.
        var step                    = 1/fps;                                // How long is each frame (in seconds).
        var width                   = jsr.Current.window.width;             // Logical canvas width.
        var height                  = jsr.Current.window.height;            // Logical canvas height.
        var segments                = [];                                   // Array of road segments.
        var stats                   = jsr.Game.stats('game_performance');   // Mr.doobs FPS counter.
        var gameCanvasId            = 'canvas';                             // Game Canvas ID.
        var canvas                  = jsr.Dom.get(gameCanvasId);            // Game Canvas.
        var ctx                     = canvas.getContext('2d');              // ...and its drawing context.
        var background              = null;                                 // Our background image (loaded below).
        var sprites                 = null;                                 // Our spritesheet (loaded below).
        var resolution              = null;                                 // Scaling factor to provide resolution independence (computed).
        var roadWidth               = 2000;                                 // Actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth.
        var segmentLength           = 670;                                  // Length of a single segment.
        var rumbleLength            = 3;                                    // Number of segments per red/white rumble strip.
        var trackLength             = null;                                 // Z length of entire track (computed).
        var lanes                   = 3;                                    // Number of lanes.
        var fieldOfView             = 100;                                  // Angle (degrees) for field of view.
        var cameraHeight            = 1000;                                 // Z height of camera.
        var cameraDepth             = null;                                 // Z distance camera is from screen (computed).
        var drawDistance            = 300;                                  // Number of segments to draw.
        var playerX                 = 0;                                    // Player x offset from center of road (-1 to 1 to stay independent of roadWidth).
        var playerZ                 = null;                                 // Player relative z distance from camera (computed).
        var fogDensity              = 5;                                    // Exponential fog density.
        var position                = 0;                                    // Current camera Z position (add playerZ to get player's absolute Z position).
        var speed                   = 0;                                    // Current speed.
        var maxSpeed                = segmentLength/step;                   // Top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier).
        var accel                   =  maxSpeed/7;                          // Acceleration rate - tuned until it 'felt' right.
        var breaking                = -maxSpeed/2;                          // Deceleration rate when braking.
        var decel                   = -maxSpeed/6;                          // 'natural' deceleration rate when neither accelerating, nor braking.
        var offRoadDecel            = -maxSpeed/3;                          // Off road deceleration is somewhere in between.
        var offRoadLimit            =  maxSpeed/4;                          // Limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road).
        jsr.Vars.turboTriggered     = false;                                // Internal variable - turbo triggered by player.
        var vibrationDeviceActive   = 1;                                    // If activated, it vibrates under certain conditions (turbo), only on compatible devices.
        jsr.Vars.vibrationDeviceFinishLineMs = 100;                         // Vibration time to Finish Line event expressed in ms or array of ms ([vibration,pause,vibration,pause...]).
        var audioFxActive           = 1;                                    // When activated (1), it allows you to perform audio effects under certain conditions (such as turbo).
                                                                            // Since the browser also needs the user's consent to play the sounds, audioFxActive 
                                                                            // is used in combination with jsr.Vars.audioFxAllowedByUser which deals with consent (user actions).
        jsr.Vars.audioFxCarVolume   = 6;                                    // Default volume car audio effects.
        jsr.Vars.audioFxWorldVolume = 7;                                    // Default volume world audio effects.
        jsr.Vars.audioFxMatchVolume = 9;                                    // Default volume game audio effects.
        jsr.Vars.musicPlayerVolume  = 8;                                    // Default Music Player Volume.
        var keyLeft                 = false;                                // Default KeyLeft.
        var keyRight                = false;                                // Default KeyRight.
        var keyFaster               = false;                                // Default keyFaster.
        var keySlower               = false;                                // Default keySlower.
        jsr.Vars.tiltHorizonFxIsActive = 'disabled';                        // Tilt Horizon Fx, visible when cornering: disabled, drawing, css.
        jsr.Vars.currentWeather     = 'clear';                              // Adds a weather condition "clear", "snow" or "rain" (set null to disable).
        var allWeatherConditions    = ['clear','snow','rain'];              // All Weather Conditions, used to set 'random'.
        jsr.Vars.autoWeatherChangeTime = 0;                                 // After this number of seconds the weather changes randomly, if 0 is set the weather does not change.
        var currentLapTime          = 0;                                    // Current lap time.
        
        //=========================================================================
        // Changes Automatically
        //=========================================================================
        
        // If automatic weather change is required.
        // Automatically changes the time every few seconds.
        jsr.HelperAutoWeatherChange(allWeatherConditions);
        
        // Set Default Tilt Horizon Fx value for Select.
        jsr.HelperSetTiltHorizonFxForSelect();

        //=========================================================================
        // UPDATE THE GAME WORLD
        //=========================================================================

        function update(dt) {
            
            var startPosition = position;
            
            // Current Speed Mph
            // Used by Speedometer and other game components.
            jsr.Vars.currentSpeedMph = jsr.HelperGameSpeedConverter('mph',speed);

            position = jsr.Util.increase(position, dt * speed, trackLength); 

            // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
            var dx = dt * 2 * (speed/maxSpeed);

            if (keyLeft)
                playerX = playerX - dx;
            else if (keyRight)
                playerX = playerX + dx;

            if (keyFaster)
                speed = jsr.Util.accelerate(speed, accel, dt);
            else if (keySlower)
                speed = jsr.Util.accelerate(speed, breaking, dt);
            else
                speed = jsr.Util.accelerate(speed, decel, dt);

            if (((playerX < -1) || (playerX > 1)) && (speed > offRoadLimit))
                speed = jsr.Util.accelerate(speed, offRoadDecel, dt);

                playerX = jsr.Util.limit(playerX, -2, 2);     // dont ever let player go too far out of bounds
                speed   = jsr.Util.limit(speed, 0, maxSpeed); // or exceed maxSpeed
            
            //----------------------
            // Speed Percentage
            
            // Percentages of the current speed without and with the turbo.
            // jsr.Vars.currentSpeedNoTurboPercent = jsr.HelperGetCurrentSpeedPercentage(speed,maxSpeed);
            // jsr.Vars.currentSpeedPercent        = jsr.HelperGetCurrentSpeedPercentage(speed,turboMaxSpeed);
            
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
            
            // Game Laps
            if (position > playerZ) {
                // Arrived at Finish Line
                if (currentLapTime && (startPosition < playerZ)) {
                    
                    currentLapTime = 0;
                    // The device vibrates at the Finish line.
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'finish_line');
                    // Play Sound on Finish line.
                    jsr.HelperPlayAudioFx(audioFxActive,'finish_line');
                    
                // We are not yet at the finish line
                } else {
                    
                    currentLapTime += dt;
                    // The device vibrates at the Finish line.
                    jsr.HelperVibrationDevice(vibrationDeviceActive,'reset_finish_line');
                    // Play Sound on Finish line.
                    jsr.HelperPlayAudioFx(audioFxActive,'reset_finish_line');
                    
                }
            }

        }

        //=========================================================================
        // RENDER THE GAME WORLD
        //=========================================================================

        var RenderGame = function() {

            var baseSegment = findSegment(position);
            var maxy        = height;

            ctx.clearRect(0, 0, width, height);

            jsr.Render.background(ctx, background, width, height, jsr.BACKGROUND.SKY);
            jsr.Render.background(ctx, background, width, height, jsr.BACKGROUND.HILLS);
            jsr.Render.background(ctx, background, width, height, jsr.BACKGROUND.TREES);

            var n, segment;

            for(n = 0 ; n < drawDistance ; n++) {

                segment        = segments[(baseSegment.index + n) % segments.length];
                segment.looped = segment.index < baseSegment.index;
                segment.fog    = jsr.Util.exponentialFog(n/drawDistance, fogDensity);

                jsr.Util.project(segment.p1, (playerX * roadWidth), cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
                jsr.Util.project(segment.p2, (playerX * roadWidth), cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);

                if ((segment.p1.camera.z <= cameraDepth) || // behind us
                    (segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
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

                maxy = segment.p2.screen.y;
            }

            jsr.Render.player(ctx, width, height, resolution, roadWidth, sprites, speed/maxSpeed,
                cameraDepth/playerZ,
                width/2,
                height,
                speed * (keyLeft ? -1 : keyRight ? 1 : 0),
                0);
            
            // Tilt Horizon
            jsr.HelperRunTiltHorizonFx( jsr.Vars.tiltHorizonFxIsActive, baseSegment.curve, speed, maxSpeed, gameCanvasId, ctx, canvas.width, canvas.height);
            
            // Weather Conditions
            jsr.HelperRunGameWeatherConditions( ctx, jsr.Vars.currentWeather, keyLeft, keyRight,speed);
            
        }

        //=========================================================================
        // BUILD ROAD GEOMETRY
        //=========================================================================
        
        // Default colors set based on the initial background.
        jsr.HelperSetWorldColors('night');

        function resetRoad() {
            segments = [];
            for(var n = 0 ; n < 500 ; n++) {
            segments.push({
               index: n,
               p1: { world: { z:  n   *segmentLength }, camera: {}, screen: {} },
               p2: { world: { z: (n+1)*segmentLength }, camera: {}, screen: {} },
               color: Math.floor(n/rumbleLength)%2 ? jsr.COLORS.WORLD.DARK : jsr.COLORS.WORLD.LIGHT
            });
            }

            // Start and finish line
            segments[findSegment(playerZ).index + 2].color = jsr.COLORS.WORLD.START;
            segments[findSegment(playerZ).index + 1].color = jsr.COLORS.WORLD.DARK;
            for(var n = 0 ; n < rumbleLength ; n++) {
                segments[segments.length-1-n].color = jsr.COLORS.WORLD.DARK;
                trackLength = segments.length * segmentLength;
            }
        }

        function findSegment(z) {
            return segments[Math.floor(z/segmentLength) % segments.length];
        }

        //=========================================================================
        // THE GAME LOOP
        //=========================================================================

        jsr.Game.run({
            canvas: canvas, render: RenderGame, update: update, stats: stats, step: step,
            images: ["background", "sprites"],
            texture_detail: texture_detail,
            keys: [
                { keys: [jsr.KEY.LEFT,  jsr.KEY.A],    div: 'gamepad-left',  mode: 'down', action: function() { keyLeft   = true;  } },
                { keys: [jsr.KEY.RIGHT, jsr.KEY.D],    div: 'gamepad-right', mode: 'down', action: function() { keyRight  = true;  } },
                { keys: [jsr.KEY.UP,    jsr.KEY.W],    div: 'gamepad-up',    mode: 'down', action: function() { keyFaster = true;  } },
                { keys: [jsr.KEY.DOWN,  jsr.KEY.S],    div: 'gamepad-down',  mode: 'down', action: function() { keySlower = true;  } },
                { keys: [jsr.KEY.LEFT,  jsr.KEY.A],    div: 'gamepad-left',  mode: 'up',   action: function() { keyLeft   = false; } },
                { keys: [jsr.KEY.RIGHT, jsr.KEY.D],    div: 'gamepad-right', mode: 'up',   action: function() { keyRight  = false; } },
                { keys: [jsr.KEY.UP,    jsr.KEY.W],    div: 'gamepad-up',    mode: 'up',   action: function() { keyFaster = false; } },
                { keys: [jsr.KEY.DOWN,  jsr.KEY.S],    div: 'gamepad-down',  mode: 'up',   action: function() { keySlower = false; } }
            ],
            ready: function(images) {
                background = images[0];
                sprites    = images[1];
                reset();
                // Allow to put in fullscreen
                jsr.HelperGameFullScreenOnClick(gameCanvasId);
            }
        });

        // Remove Turbo Button
        $(document).ready(function() {
            $('.gamepad #gamepad-turbo').remove();
        });
        
        //=========================================================================
        // RESET
        //=========================================================================

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
            jsr.Vars.autoWeatherChangeTime  = jsr.Util.toInt(options.autoWeatherChangeTime, jsr.Vars.autoWeatherChangeTime);
            vibrationDeviceActive           = jsr.Util.toInt(options.vibrationDeviceActive, vibrationDeviceActive);
            cameraDepth                     = 1 / Math.tan((fieldOfView/2) * Math.PI/180);
            playerZ                         = (cameraHeight * cameraDepth);
            resolution                      = height/480;
            refreshTweakUI();
            if ((segments.length==0) || (options.segmentLength) || (options.rumbleLength)) {
                resetRoad(); // only rebuild road when necessary
            }
            jsr.Current.gameLoaded = true;
        }
        
        //=========================================================================
        // UPDATE > Canvas Resolution and Size
        //=========================================================================
        
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

        //=========================================================================
        // SETTINGS > RESOLUTION
        //=========================================================================

        $(document).on('change',jsr.Resolutions.target_selected_element, function(ev) {
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
            // console.log(w);
            // console.log(h);
            ratio=w/width; 
            reset({ width: w, height: h })
            jsr.Dom.blur(ev);
        });

        // Warning
        if( !(typeof jsr.HelperResolutions === "function") ) {
            console.log('JS Racer Turbo: The HelperResolutions function was not found! The only canvas resolutions that work are AUTO and AUTO HALF.');
        }

        //=========================================================================
        // TWEAK UI HANDLERS
        //=========================================================================
        
        // Default Vibration (No Support)
        if( jsr.HelperCheckDeviceVibrationSupport() == false ) {
            vibrationDeviceActive = 0;
        }

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

        function refreshTweakUI() {
            jsr.Dom.get('currentLanes').innerHTML                 = jsr.Dom.get('lanes').value                 = lanes;
            jsr.Dom.get('currentRoadWidth').innerHTML             = jsr.Dom.get('roadWidth').value             = roadWidth;
            jsr.Dom.get('currentCameraHeight').innerHTML          = jsr.Dom.get('cameraHeight').value          = cameraHeight;
            jsr.Dom.get('currentDrawDistance').innerHTML          = jsr.Dom.get('drawDistance').value          = drawDistance;
            jsr.Dom.get('currentFieldOfView').innerHTML           = jsr.Dom.get('fieldOfView').value           = fieldOfView;
            jsr.Dom.get('currentFogDensity').innerHTML            = jsr.Dom.get('fogDensity').value            = fogDensity;
            jsr.Dom.get('currentAutoWeatherChangeTime').innerHTML = jsr.Dom.get('autoWeatherChangeTime').value = jsr.Vars.autoWeatherChangeTime;
            jsr.Dom.get('vibrationDeviceActive').value            = vibrationDeviceActive;
         // jsr.Dom.get('currentVibrationDeviceActive').innerHTML = jsr.Dom.get('vibrationDeviceActive').value = vibrationDeviceActive;
        }
    
    };
    
    // Play the Game
    window.RunRacer = function(gamemode) {
        racer(gamemode);
    };
    
})(jQuery);
