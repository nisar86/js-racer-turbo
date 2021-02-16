<?php 
//=========================================================================
// JS RACER TURBO > CLASSIC GAME MODE > FASTEST LAP
//=========================================================================
// Security
define('Security', TRUE); 
// Game
require('includes/core/jsr_core.php');
$jsrgame = new Jsr_Helpers('classic','fastestlap');
?>
<!doctype html>
<html lang="en-US" prefix="og: https://ogp.me/ns#" >
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <title><?php echo $jsrgame->gamedata['page']['title']; ?></title>
    <meta name="description"  content="<?php echo $jsrgame->gamedata['page']['meta_desc']; ?>" />
    <meta property="og:title" content="<?php echo $jsrgame->gamedata['page']['title']; ?>" />
    <meta property="og:description" content="<?php echo $jsrgame->gamedata['page']['meta_desc']; ?>" />
    <meta name="twitter:title" content="<?php echo $jsrgame->gamedata['page']['title']; ?>" />
    <meta name="twitter:description" content="<?php echo $jsrgame->gamedata['page']['meta_desc']; ?>" />
    <?php require('includes/public/head.php'); ?>
</head>
<body class="notranslate <?php echo $jsrgame->gamedata['page']['body_class']; ?>">
    <?php require('includes/public/open_body.php'); ?>
    <div class="content">
        <?php
        require('includes/public/menu.php');
        require('includes/public/safe_reset.php');
        require('includes/public/settings.php');
        require('includes/public/audio.php');
        require('includes/public/hud.php');
        require('includes/public/canvas.php');
        require('includes/public/gamepad.php');
        require('includes/public/how_to_play.php');
        require('includes/public/credits.php');
        require('includes/public/welcome.php');
        require('includes/public/gameover.php');
        require('includes/public/alerts.php');
        require('includes/public/cookies_notice.php');
        ?>
    </div>
    <?php require('includes/public/footer_script.php'); ?>
    <script src="assets/game/js/game/jsr-game.js<?php echo $jsrUrlVersion; ?>"></script>
    <script src="assets/game/js/game/run-classic-fastest-lap.js<?php echo $jsrUrlVersion; ?>"></script>
</body> 
</html>
