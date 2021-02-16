<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// MENU
//=========================================================================
?>
<?php // Main Menu ?>
<div class="menu main-menu modal_bg hideInGameLoading wow heartBeat">
    <ul class="linear">
        <li>
            <div class="btn_modal show_options_menu hideBtnShowOptionsMenu link" title="Main Menu | JS Racer Turbo">
                <div class="css_icon i_menu"></div> MENU
            </div>
        </li>
    </ul>
</div>


<?php // Menu Options ?>
<div class="menu options_menu modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex dflex_res_off">
        <div class="close modal_close showBtnShowOptionsMenu">&times;</div>
        <div class="modal_content txt_big">

            <div class="row separator first_title txtc">
                <div class="logo_text fxrg_orange">
                    <span class="font_classicjs">JS</span>
                    <span class="font_classic">RACER</span>
                    <span class="font_turbo">TURBO</span>
                </div>
            </div>

            <div class="row txtc">
                <ul class="racer_menu">
                    <li>
                        <div class="btn_modal show_gameplay_menu link" title="Set Game Mode">
                            <div class="title">GAME MODE</div>
                            <div class="desc"><?php echo $jsrgame->show_game_desc('options_menu','gameplay'); ?></div>
                        </div>
                    </li>
                    <li>
                        <div class="btn_modal show_howToPlay modal_close link" title="Game controls and options">
                            <div class="title">HOW TO PLAY</div>
                            <div class="desc"><?php echo $jsrgame->show_game_desc('options_menu','controls'); ?></div>
                        </div>
                    </li>
                    <li>
                        <div class="btn_modal show_settings modal_close link" title="Game Setup">
                            <div class="title">SETTINGS</div>
                            <div class="desc"><?php echo $jsrgame->show_game_desc('options_menu','settings'); ?></div>
                        </div>
                    </li>
                    <li>
                        <div class="btn_modal show_credits link" title="View Credits">
                            <div class="title">CREDITS</div>
                            <div class="desc"><?php echo $jsrgame->show_game_desc('options_menu','credits'); ?></div>
                        </div>
                    </li>
                    <li>
                        <?php 
                        // Close Button
                        require ('menu/close.php'); 
                        ?>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</div>


<?php // Menu Game Play ?>
<div class="menu gameplay_menu modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex dflex_res_off">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="row separator txtc">
                <div class="first_title fxrg_yellow">
                    GAME MODE
                </div>
                <div class="first_title fxrg_yellow">
                    <small>SELECT GAME PLAY</small>
                </div>
            </div>
            
            <div class="row txtc">
                <ul class="racer_menu">
                    <li>
                        <div class="btn_modal link show_gmturbo_menu gp_turbo" title="Select Turbo Game Mode">
                            <div class="title">TURBO</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gameplay','turbo'); ?>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="btn_modal link show_gmclassic_menu gp_classic" title="Select Classic Game Mode">
                            <div class="title">CLASSIC</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gameplay','classic'); ?>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="btn_modal link show_gmdemo_menu gp_demo" title="Select Technical Demo">
                            <div class="title">DEMO</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gameplay','demo'); ?>
                            </div>
                        </div>
                    </li>
                    <li>
                        <?php 
                        // Back Button
                        require ('menu/go_back.php'); 
                        ?>
                    </li>
                </ul>
            </div>
            
            <?php 
            // Show Current Settings
            require ('menu/show_current_settings.php'); 
            ?>
            
        </div>
    </div>
</div>


<?php /* Menu Turbo Game Play */ ?>
<div class="menu gmturbo_menu modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex dflex_res_off">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="row txtc">
                <div class="first_title fxrg_yellow">TURBO GAME PLAY</div>
                <small class="txt_light">
                    <?php echo $jsrgame->show_game_desc('gameplay','turbo'); ?>
                </small>
            </div>
            <div class="row separator txtc">
                <span class="first_title fxrg_yellow">
                    <small>SELECT GAME MODE</small>
                </span>
            </div>
        
            <div class="row separator txtc">
                <ul class="racer_menu">
                    <li>
                        <a href="turbo-fastest-lap.php" class="gm_fastastlap" title="Javascript Racer Turbo - Turbo Fastest Lap Game Mode">
                            <div class="title">FASTEST LAP</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','fastestlap'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="turbo-out-of-time.php" class="gm_outoftime" title="Javascript Racer Turbo - Turbo Out of Time Game Mode">
                            <div class="title">OUT OF TIME</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','outoftime'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <?php 
                        // Back Button
                        require ('menu/go_back.php'); 
                        ?>
                    </li>
                </ul>
            </div>
            
            <?php 
            // Show Current Settings
            require ('menu/show_current_settings.php');
            ?>
            
        </div>
    </div>
</div>


<?php /* Menu Classic Game Play */ ?>
<div class="menu gmclassic_menu modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex dflex_res_off">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="row txtc">
                <div class="first_title fxrg_yellow">CLASSIC GAME PLAY</div>
                <small class="txt_light">
                    <?php echo $jsrgame->show_game_desc('gameplay','classic'); ?>
                </small>
            </div>
            <div class="row separator txtc">
                <span class="first_title fxrg_yellow">
                    <small>SELECT GAME MODE</small>
                </span>
            </div>
        
            <div class="row separator txtc">
                <ul class="racer_menu">
                    <li>
                        <a href="fastest-lap.php" class="gm_fastastlap" title="Javascript Racer - Fastest Lap Game Mode (v4 Updated)">
                            <div class="title">FASTEST LAP</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','fastestlap'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="out-of-time.php" class="gm_outoftime" title="Javascript Racer - Out of Time Game Mode (v5 Updated)">
                            <div class="title">OUT OF TIME</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','outoftime'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <?php 
                        // Back Button
                        require ('menu/go_back.php'); 
                        ?>
                    </li>
                </ul>
            </div>
            
            <?php 
            // Show Current Settings
            require ('menu/show_current_settings.php'); 
            ?>
            
        </div>
    </div>
</div>


<?php /* Menu Demo Game Play */ ?>
<div class="menu gmdemo_menu modal modal_fullscreen modal_bgradius">
    <div class="modal_note dflex dflex_res_off">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="row txtc">
                <div class="first_title fxrg_yellow">DEMO MODE</div>
                <small class="txt_light">
                    <?php echo $jsrgame->show_game_desc('gameplay','demo'); ?>
                </small>
            </div>
            <div class="row separator txtc">
                <span class="first_title fxrg_yellow">
                    <small>SELECT TECHNICAL DEMO</small>
                </span>
            </div>
        
            <div class="row separator txtc">
                <ul class="racer_menu">
                    <li>
                        <a href="straight.php" class="gm_straight" title="Javascript Racer - Straight Demo (v1)">
                            <div class="title">STRAIGHT</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','straight'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="curves.php" class="gm_curves" title="Javascript Racer - Curves Demo (v2)">
                            <div class="title">CURVES</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','curves'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="hills.php" class="gm_hills" title="Javascript Racer - Hills Demo (v3)">
                            <div class="title">HILLS</div>
                            <div class="desc">
                                <?php echo $jsrgame->show_game_desc('gamemode','hills'); ?>
                            </div>
                        </a>
                    </li>
                    <li>
                        <?php 
                        // Back Button
                        require ('menu/go_back.php'); 
                        ?>
                    </li>
                </ul>
            </div>
            
            <?php 
            // Show Current Settings
            require ('menu/show_current_settings.php'); 
            ?>
            
        </div>
    </div>
</div>
