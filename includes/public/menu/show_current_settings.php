<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../../') ); 
} 
//=========================================================================
// MENU > SHOW CURRENT SETTINGS
//=========================================================================
?>
      
<span class="current_game">
    <div class="row separator txtc">
        <?php // <div class="line"></div> ?>
        <div class="font_racer">
            <small>CURRENT SETTINGS</small>
        </div>
        <small>
            <?php 
            // Show Current Game Info
            echo $jsrgame->show_game_info('modal_menu_current_settings');
            ?>
        </small>
    </div>
</span>
