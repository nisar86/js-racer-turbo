<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// SETTINGS
//=======================================================
?>
<div class="settings modal modal_fullscreen_bar modal_bgradius">
    <div class="modal_note">
        <div class="close modal_close showBtnShowOptionsMenu">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="modal_title txtc">
                <span class="first_title fxrg_orange">Settings</span>
            </div>
            
            <div class="modal_box txtc">
                
                <div class="section">
                    <div class="row row_option">
                        <div class="title">Change View</div>
                        <div class="input">
                            <div class="btn_modal btn_settings_view btn" title="Change Settings Panel View">
                                <span class="label_view_fullscreen">Full Screen Panel</span> 
                                <span class="label_view_compact">Compact Panel</span> 
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Show Game Performance ?>
                <div class="section">
                    <div class="stats">
                        <div id="game_performance"></div>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>
                    
                <?php // Graphics ?>
                <div class="section">
                    <div class="section_title">Graphics</div>
                    <div class="row row_option ro_max_width">
                        <label>
                            <div class="title">Resolution
                                <div class="show_resolution">
                                    <span class="rautox4_update"></span>
                                    <span class="rautox2_update"></span>
                                    <span class="rauto_update"></span>
                                    <span class="rautohalf_update"></span>
                                    <span class="rautolow_update"></span>
                                </div>
                            </div>
                            <div class="input">
                                <select id="select_resolution" autocomplete="off">
                                    <?php // Add options via JS ?>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option option_textures_detail">
                        <label>
                            <div class="title">Textures Detail
                            </div>
                            <div class="input">
                                <select id="select_textures_detail" autocomplete="off">
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Road Width (<span id="currentRoadWidth"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="roadWidth" min="500" max="3000" title="Road Width (500-3000)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Draw Distance (<span id="currentDrawDistance"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="drawDistance" min="100" max="500" title="Draw Distance (100-500)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Fog Density (<span id="currentFogDensity"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="fogDensity" min="0" max="50" title="Fog Density (0-50)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Tilt Horizon</div>
                            <div class="input">
                                <div class="btn_modal btn btn_label" title="Disabled">
                                    <label>
                                        <input type="radio" name="setTiltHorizon" value="disabled" autocomplete="off">
                                        <small>Disabled</small>
                                    </label>
                                </div>
                                <div class="btn_modal btn btn_label" title="Active (CSS)">
                                    <label>
                                        <input type="radio" name="setTiltHorizon" value="css" autocomplete="off">
                                        <small>CSS</small>
                                    </label>
                                </div>
                                <div class="btn_modal btn btn_label" title="Active (Drawing)">
                                    <label>
                                        <input type="radio" name="setTiltHorizon" value="drawing" autocomplete="off">
                                        <small>Drawing</small>
                                    </label>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Landscape ?>
                <div class="section section_landscape">
                    <div class="section_title">Landscape</div>
                    <div class="row row_option">
                        <div class="title">Landscapes</div>
                        <div class="input">
                            <select id="currentLandscape" autocomplete="off">
                                <option value="night">Night</option>
                                <option value="day">Day</option>
                            </select>
                        </div>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Change Every (<span id="currentChangeLandscapeEvery"></span><span id="labelChangeLandscapeEvery"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="changeLandscapeEvery" min="0" max="10" title="Laps (0-10)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <div class="title">Next Change</div>
                        <div class="input">
                            <span id="changeLandscapeBetweenLaps"></span>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Weather ?>
                <div class="section section_weather">
                    <div class="section_title">Weather</div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Conditions
                            </div>
                            <div class="input">
                                <select id="currentWeather" autocomplete="off">
                                    <option value="clear">Clear</option>
                                    <option value="snow">Snow</option>
                                    <option value="rain">Rain</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Change Every (<span id="currentAutoWeatherChangeTime"></span>s)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="autoWeatherChangeTime" min="0" max="600" title="Seconds (0-600) | 0 is Off." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>

                <?php // View ?>
                <div class="section">
                    <div class="section_title">Point of View</div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Camera Height (<span id="currentCameraHeight"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="cameraHeight" min="500" max="5000" title="Camera Height (500-5000)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Field of View (<span id="currentFieldOfView"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="fieldOfView" min="80" max="140" title="Field of View (80-140)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>

                <?php // Appearance ?>
                <div class="section">
                    <div class="section_title">Appearance</div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Road Lanes (<span id="currentLanes"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="lanes" min="1" max="6" title="Lines (1-6)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">CSS Filter</div>
                            <div class="input">
                                <select id="cssFilter" autocomplete="off">
                                    <option value="none">None</option>
                                    <option value="pixel">Pixels</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="difference">Difference</option>
                                    <option value="blackAndWhite">Black And White</option>
                                    <option value="dynamicBlackAndWhite">Black And White (Dynamic)</option>
                                    <option value="dynamicSaturation">Saturation (Dynamic)</option>
                                    <option value="dynamicMulticolor">Multicolor (Dynamic)</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Vibration ?>
                <div class="section">
                    <div class="section_title">Vibration</div>
                    <div class="row row_option">
                        <div class="title">Browser Support</div>
                        <div class="input notice_device_support_vibration">
                            <span class="ndsv_on" title="Device Vibration Supported">Supported</span>
                            <span class="ndsv_off" title="Device Vibration Not Supported">Not Supported</span>
                        </div>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">
                                Status 
                                <?php /* (<span id="currentVibrationDeviceActive"></span>) */ ?>
                            </div>
                            <div class="input">
                                <select id="vibrationDeviceActive" autocomplete="off">
                                    <option value="0">Disabled</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Audio ?>
                <div class="section">
                    <div class="section_title">Audio</div>
                    <div class="row row_option">
                        <div class="title">Browser Support</div>
                        <div class="input notice_device_support_audiofx">
                            <span class="ndsafx_on" title="Audio Effects Supported by Device">Supported</span>
                            <span class="ndsafx_off" title="Audio Effects Not Supported by Device">Effects Not Supported</span>
                        </div>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">
                                Effects
                                <?php /* (<span id="currentAudioFxAllowedByUser"></span>) */ ?>
                            </div>
                            <div class="input">
                                <select id="audioFxAllowedByUser" autocomplete="off">
                                    <option value="0">Disabled</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Car Volume (<span class="strong" id="currentAudioFxCarVolume"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="audioFxCarVolume" min="0" max="10" title="Car Effects Volume (0-10)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">World Volume (<span class="strong" id="currentAudioFxWorldVolume"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="audioFxWorldVolume" min="0" max="10" title="World Effects Volume (0-10)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Match Volume (<span class="strong" id="currentAudioFxMatchVolume"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="audioFxMatchVolume" min="0" max="10" title="Match Effects Volume (0-10)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Music Volume (<span id="currentMusicPlayerVolume"></span>)</div>
                            <div class="input">
                                <div class="range">
                                    <input type="range" id="musicPlayerVolume" min="0" max="10" title="Music Volume (0-10)." autocomplete="off">
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Music Player</div>
                            <div class="input">
                                <div class="btn_modal setPlay btn" title="Play Player">
                                    Play
                                    <div class="css_icon i_audio_on"></div>
                                </div>
                                <div class="btn_modal setPause btn" title="Pause Player">
                                    Pause
                                    <div class="css_icon i_audio_pause"></div>
                                </div>
                                <div class="btn_modal show_audio btn" title="Show / Hide Player">
                                    <span class="txt_open">Hide</span>
                                    <span class="txt_close">Show</span> 
                                    Player
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Shuffle</div>
                            <div class="input">
                                <select id="musicPlayerShuffle" autocomplete="off">
                                    <option value="0">Disabled</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Soundtrack</div>
                            <div class="input btns_wide">
                                <div class="btn_modal btn setTrack01" title="Play the track">
                                    <small>
                                        Play track 1 <!-- Title shown by JS -->
                                    </small>
                                    <div class="css_icon i_audio_on"></div>
                                </div>
                                <div class="btn_modal btn setTrack02" title="Play the track">
                                    <small>
                                        Play track 2 <!-- Title shown by JS -->
                                    </small>
                                    <div class="css_icon i_audio_on"></div>
                                </div>
                                <div class="btn_modal btn setTrack03" title="Play the track">
                                    <small>
                                        Play track 3 <!-- Title shown by JS -->
                                    </small>
                                    <div class="css_icon i_audio_on"></div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>

                <?php // Controls ?>
                <div class="section">
                    <div class="section_title">Controls</div>
                    <div class="row row_option">
                        <label>
                            <div class="title">Gamepad</div>
                            <div class="input">
                                <?php
                                // Button > Activate Disable Touchscreen Gamepad
                                require('settings/btn_disable_activate_gamepad.php');
                                ?>
                            </div>
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>

                <?php // Reset ?>
                <div class="section">
                    <div class="section_title">Reset</div>
                    <div class="row row_option">
                        <div class="title">Cookies</div>
                        <div class="input">
                            <div class="btn btn_reset_cookies" title="Reset Cookies">
                                Reset Cookies
                            </div>
                        </div>
                    </div>
                    <div class="row row_option">
                        <div class="title">Game</div>
                        <div class="input">
                            <div class="btn btn_modal show_safe_reset" title="Reset and Restart the Game">
                                Reset Game
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                
                <?php // Close ?>
                <div class="section modal_fullscreen_bar_only">
                    <div class="row row_option row_last txtc">
                        <?php 
                        // Close Button
                        require ('menu/close.php'); 
                        ?>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</div>
