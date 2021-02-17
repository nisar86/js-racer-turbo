<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// HEAD 
//=========================================================================
$jsrAppName = $jsrgame->show_game_desc('gameinfo','name');
$jsrUrlVersion = $jsrgame->show_game_desc('gameinfo','version','url');
?>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<link href="assets/animate/animate.min.css<?php echo $jsrUrlVersion; ?>" rel="stylesheet" type="text/css" />
<link href="assets/gap/css/green-audio-player.css<?php echo $jsrUrlVersion; ?>" rel="stylesheet" type="text/css" />
<link href="assets/loading-bar/loading-bar.min.css<?php echo $jsrUrlVersion; ?>" rel="stylesheet" type="text/css" />
<link href="assets/game/css/style.css<?php echo $jsrUrlVersion; ?>" rel="stylesheet" type="text/css" />
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png<?php echo $jsrUrlVersion; ?>">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png<?php echo $jsrUrlVersion; ?>">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png<?php echo $jsrUrlVersion; ?>">
<link rel="manifest" href="assets/favicon/site.webmanifest<?php echo $jsrUrlVersion; ?>">
<link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg<?php echo $jsrUrlVersion; ?>" color="#ed04fd">
<meta property="og:url" content="<?php echo $jsrgame->current_site_url('page'); ?>" />
<meta property="og:site_name" content="<?php echo $jsrAppName; ?>" />
<meta property="og:image" content="assets/game/images/share/logo.jpg<?php echo $jsrUrlVersion; ?>" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:image" content="assets/game/images/share/logo.jpg<?php echo $jsrUrlVersion; ?>" />
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="theme-color" content="#ffffff">
<meta name="apple-mobile-web-app-title" content="<?php echo $jsrAppName; ?>">
<meta name="application-name" content="<?php echo $jsrAppName; ?>">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDS4WWD');</script>
<!-- End Google Tag Manager -->
