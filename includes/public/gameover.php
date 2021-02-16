<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// GAMEOVER
//=========================================================================
?>
<div class="gameover modal modal_fullscreen modal_bgend">
    <div class="modal_note dflex">
        <?php // <div class="close modal_close">&times;</div> ?>
        <div class="modal_content txt_big">
        
            <?php // Title ?>
            <div class="row txtc">
                <div class="first_title fxrg_orange">
                    <!-- Title by js -->
                </div>
            </div>
            
            <?php // Result ?>
            <div class="row txtc">
                <div class="game_result">
                    <div class="wow flip">
                        <div class="game_result_text font_racer">
                            <!-- Text by js -->
                        </div>
                    </div>
                    <div class="wow flipInX">
                        <div class="game_result_stars">
                            <!-- Stars by js -->
                            <div class="css_icon i_star star1"></div>
                            <div class="css_icon i_star star2"></div>
                            <div class="css_icon i_star star3"></div>
                            <div class="css_icon i_star star4"></div>
                            <div class="css_icon i_star star5"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <?php // Info ?>
            <div class="row txtc">
                <div class="game_info">
                    <!-- Info by js -->
                </div>
            </div>
            
            <?php // Action ?>
            <div class="row txtc">
                <?php // Restart Button ?>
                <div class="game_reset btn css_zoom">
                    <!-- Button by js -->
                </div>
            </div>
            
        </div>
    </div>
</div>
