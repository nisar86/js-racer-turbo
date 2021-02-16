<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// CANVAS
//=========================================================================
?>
<div class="game_canvas wow fadeIn" id="racer">
    <canvas id="canvas" title="Double click for fullscreen.">
        Sorry, this web app cannot be run because your browser does not support the &lt;canvas&gt; element.
    </canvas>
</div>
<div class="game_loader">
    <div class="loader" title="Loading...">
        <div class="info">Loading</div>
    </div>
</div>
