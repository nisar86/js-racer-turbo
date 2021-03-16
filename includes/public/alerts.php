<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// ALERTS
//=======================================================
?>
<?php // Modal Alerts ?>
<div class="alerts modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <?php // Message > Browser ?>
            <div class="one_notice notice_browser_compatibility hidden">
                <div class="row txtc">
                    <span class="first_title">Performance Notice</span>
                </div>
                <div class="row txtc">
                    <strong>The browser you are using may not be supported!</strong>
                </div>
                <div class="row txtc">
                    <strong>Recommended web browsers are:</strong>
                </div>
                <div class="row txtc">
                    <a class="btn" href="https://www.mozilla.org/firefox/" title="Mozilla Firefox Website" target="_blank" rel="nofollow">Mozilla Firefox</a>
                    <a class="btn" href="https://www.google.com/chrome/" title="Google Chrome Website" target="_blank" rel="nofollow">Google Chrome</a>

                    <a class="btn" href="https://www.opera.com/" title="Opera Website" target="_blank" rel="nofollow">Opera</a>

                    <a class="btn" href="https://support.apple.com/downloads/safari" title="Safari Website" target="_blank" rel="nofollow">Safari</a>
                </div>
                <div class="row separator txtc">
                    If you experience problems change browser.
                </div>
                <div class="row txtc">
                    <div class="btn modal_close">
                        OK. Play the Game!
                    </div>
                </div>
            </div>
            
            <?php // Message > Not Landscape Orientation ?>
            <div class="one_notice notice_not_landscape_orientation hidden">
                <div class="row txtc">
                    <span class="first_title">Screen <br> Orientation</span>
                </div>
                <div class="row txtc">
                    <div class="rotate_horizontal_smartphone modal_close" title="Ok Thanks! Close"></div>
                </div>
                <div class="row txtc">
                    Play the way you want, but...<br> 
                    it is best with the screen horizontally.
                </div>
                <div class="row txtc">
                    <div class="btn modal_close">
                        OK. Play the Game!
                    </div>
                </div>
            </div>
            
            <?php // Message > Orientation has changed (mobile) ?>
            <div class="one_notice notice_orientation_changed hidden">
                <div class="row txtc">
                    <span class="first_title">Screen <br> Orientation</span>
                </div>
                <div class="row txtc">
                    The orientation of the screen has changed. <br>
                    I recommend you reset the game.
                </div>
                <div class="row txtc">
                    <div class="btn game_reset">
                        OK. Reset the Game!
                    </div>
                    <div class="btn modal_close">
                        No Thanks
                    </div>
                </div>
            </div>
        
            <?php // Message > Change Textures Details ?>
            <div class="one_notice notice_textures_detail hidden">
                <div class="row txtc">
                    <span class="first_title">Change Textures Detail</span>
                </div>
                <div class="row txtc">
                    <strong>Game reset required! Are you sure?</strong>
                </div>
                <div class="row txtc">
                    <div class="btn game_reset_textures_detail">
                        Reset the Game
                        - 
                        <span class="label_detail"></span>
                    </div>
                    <div class="btn modal_close">
                        Cancel
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
