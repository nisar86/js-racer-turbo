<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// WELCOME
//=======================================================
?>
<div class="welcome modal modal_bg modal_fullscreen inGameLoading">
    <div class="modal_note txtc dflex font_wbold">
        <div class="modal_content">
        
            <?php // Logo ?>
            <div class="row row_logo">
                <div class="jsr_logo inGameLoading">
                    <div class="logo_content wow flip">
                        <h1 class="fxrg_orange">
                            <span class="font_classicjs">JS</span> 
                            <span class="font_classic">RACER</span>
                            <div class="clear"></div>
                            <span class="font_turbo">TURBO</span>
                        </h1>
                    </div>
                    <div class="logo_image_wow wow zoomInDown">
                        <div class="logo_image"></div>
                    </div>
                </div>
            </div>
            
            <?php // Current Game Description ?>
            <div class="row game_desc hideInGameLoading">
                <div class="wow flipInX">
                    <?php 
                    // Show Current Game Info
                    echo $jsrgame->show_game_info('modal_welcome');
                    ?>
                </div>
            </div>
            
            <?php // Play the Game ?>
            <div class="row row_slim hideInGameLoading">
                <div class="link link_play game_audio_on start_with_audio modal_close" title="Play the game!">
                    <div class="hwow" data-effect="heartBeat">
                        <span class="only_desktop">CLICK TO PLAY THE GAME!</span>
                        <span class="only_mobile">TAP TO PLAY THE GAME!</span>
                    </div>
                </div>
            </div>
            
            <?php // Shows how to play ?>
            <div class="row row_slim hideInGameLoading">
                <div class="link link_play btn_modal show_howToPlay hideBtnShowOptionsMenu yellow" title="How to play the game.">
                    <div class="hwow" data-effect="jello">
                        <small>HOW TO PLAY</small>
                    </div>
                </div>
            </div>
            
            <?php // Other options to start the game ?>
            <div class="gameoptions hideInGameLoading">
                <?php // Play the Game (without music) ?>
                <div class="link link_play game_audio_off modal_close white" title="Play the game in silent mode.">
                    <div class="hwow" data-effect="headShake">
                        <div class="css_icon i_audio_off"></div>
                        <small>PLAY IN SILENT MODE</small>
                    </div>
                </div>
            </div>
            
            <?php // Game version information ?>
            <div class="gameinfol">
                <?php echo $jsrgame->show_game_desc('gameinfo','name'); ?> 
                <?php echo $jsrgame->show_game_desc('gameinfo','version'); ?>
                <?php echo $jsrgame->show_game_desc('gameinfo','by'); ?>
            </div>
            <?php // <div class="gameinfor"></div> ?>
            
            <?php // Area > Play the Game ?>
            <div class="area game_audio_on start_with_audio modal_close hideInGameLoading" title="Start the game!"></div>
            
        </div>
    </div>
</div>
