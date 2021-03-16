<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// GAMEPAD
//=======================================================
?>
<div id="gamepad" class="gamepad modal">
    <?php // Left Hand ?>
    <div class="left-hand">
        <div class="row">
            <div id="gamepad-turbo" class="gamepad-button">
                <div class="icon"></div>
            </div>
        </div>
        <div class="row">
            <div class="gamepad_left_right_wheel">
                <div id="gamepad-left" class="gamepad-button">
                    <div class="icon"></div>
                </div>
                <div id="gamepad-right" class="gamepad-button">
                    <div class="icon"></div>
                </div>
                <div class="steering_wheel">
                    <div class="steering"></div>
                </div>
            </div>
        </div>
    </div>
    <?php // Center Bottom ?>
    <div class="center-bottom">
        <div id="gamepad-clacson" class="gamepad-button">
            
        </div>
    </div>
    <?php // Right Hand ?>
    <div class="right-hand">
        <div class="row"></div>
        <div class="row">
            <div id="gamepad-up" class="gamepad-button">
                <div class="icon"></div>
            </div>
            <div id="gamepad-down" class="gamepad-button">
                <div class="icon"></div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>