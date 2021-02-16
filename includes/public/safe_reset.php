<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// SAFE RESET
//=========================================================================
?>
<div class="safe_reset modal modal_bgradius modal_fullscreen">
    <div class="modal_note dflex">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big">
            
            <div class="row txtc">
                <span class="first_title">RESET THE GAME</span>
            </div>
            <div class="row txtc">
                Are you sure?
            </div>
            <div class="row txtc">
                <div class="game_reset btn" title="Game Reset">
                    Reset
                </div>
                <div class="modal_close btn" title="Cancel">
                    Cancel
                </div>
            </div>
            
        </div>
    </div>
</div>
