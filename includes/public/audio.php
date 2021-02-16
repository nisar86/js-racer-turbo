<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// AUDIO
//=========================================================================
?>

<div class="audio modal modal_bg wow fadeInRight">
    <?php // <div class="close modal_close">&times;</div> ?>
    <?php // Audio Options ?>
    <div class="audio_options">
        <div class="btn_modal btnAudioFxToggle btn" title="Activate and deactivate audio effects.">
            <div class="audioFxOff css_icon i_audio_off"></div> 
            <div class="audioFxOn css_icon i_audio_on"></div> 
        </div>
    </div>
    <?php // Music Options ?>
    <div class="music_options">
        <?php // Soundtrack > 1 ?>
        <span class="soundtrack_player soundtrack1">
            <div class="audio-player music-player">
                <audio id="soundtrack1" preload="none" crossorigin>
                    <source src="assets/game/music/soundtrack.mp3" type="audio/mpeg">
                    Your browser does not support the &lt;audio&gt; element.
                </audio>
            </div>
        </span>
    </div>
    <div class="clear"></div>
</div>
