<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// Footer Script (for All)
//=======================================================
// The $jsrUrlVersion is set on head.php.
?>

    <script src="assets/jquery/jquery-3.4.1.min.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/js-cookie/js.cookie.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/gap/js/green-audio-player.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/wow/wow.min.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/loading-bar/loading-bar.min.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/stats/stats.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/game/js/jsr-localize.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/game/js/jsr-soundtrack.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/game/js/jsr-engine.js<?php echo $jsrUrlVersion; ?>"></script>
