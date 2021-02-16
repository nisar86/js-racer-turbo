<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// HOW TO PLAY
//=========================================================================
?>
<div class="howToPlay modal modal_fullscreen_bar modal_bgradius">
    <div class="modal_note dflex">
        <div class="close modal_close showBtnShowOptionsMenu">&times;</div>
        <div class="modal_content txt_big">
        
            <div class="modal_title txtc">
                <span class="first_title fxrg_orange" title="How to Play">
                    How To Play
                </span>
            </div>
            
            <div class="modal_box">
                
                <div class="row separator">
                    <div class="row txtc">
                        <?php echo $jsrgame->show_game_desc('controls','settings'); ?>
                    </div>
                    <div class="row row_large txtc">
                        <?php echo $jsrgame->show_game_desc('controls','overview'); ?>
                    </div>
                </div>

                <div class="row separator section">
                    <div class="section_title txtc">
                        Keyboard Controls
                    </div>
                    <div class="row row_image">
                        <img src="assets/game/images/how_to_play/keyboard_commands.svg" alt="Keyboard Commands" title="Keyboard Commands">
                    </div>
                    <div class="row row_large txtc">
                        <?php 
                        // Info about the current game controls.
                        echo $jsrgame->show_game_info('modal_howToPlay','keyboard');
                        ?>
                    </div>
                </div>

                <div class="row separator section">
                    <div class="section_title txtc">
                        Touchscreen Controls
                    </div>
                    <div class="row row_image">
                        <img src="assets/game/images/how_to_play/touchscreen_commands.png" alt="Gamepad Touchscreen Commands" title="Gamepad Touchscreen Commands">
                    </div>
                    <div class="row txtc">
                        <?php 
                        // Info about the current game controls.
                        echo $jsrgame->show_game_info('modal_howToPlay','touchscreen');
                        ?>
                    </div>
                    <div class="row row_large txtc">
                        <?php
                        // Button > Activate Disable Touchscreen Gamepad
                        require('settings/btn_disable_activate_gamepad.php');
                        ?>
                    </div>
                </div>

                <div class="row separator section">
                    <div class="section_title txtc">
                        Web App
                    </div>
                    <div class="row row_image">
                        <div class="row_web_app">
                            <img src="assets/game/images/how_to_play/mobile_devices_view.png" alt="Web App : Horizontal Orientation" title="Web App : Horizontal Orientation">
                            <div class="web_app_icon" title="<?php echo $jsrgame->show_game_desc('controls','webapp','icon'); ?>"></div>
                        </div>
                    </div>
                    <div class="row row_large txtc">
                        <?php echo $jsrgame->show_game_desc('controls','webapp','mobile'); ?>
                        <?php echo $jsrgame->show_game_desc('controls','webapp','how'); ?>
                    </div>
                </div>

                <div class="row row_last separator txtc">

                    <?php 
                    // Close Button
                    require ('menu/close.php'); 
                    ?>

                </div>
                
            </div>
            
        </div>
    </div>
</div>
