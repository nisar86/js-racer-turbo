<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// COOKIES NOTICE
//=======================================================
?>
<div class="cookies_notice modal modal_bg">
    <div class="modal_note txtc">
        <div class="legal_note">
            This App uses cookies for technical and statistical purposes necessary for operation and development.
            By continuing to browse or clicking on "Accept", you consent to the use of cookies.
        </div>
        <div class="btn btn_accept modal_close" title="I accept and use the app with necessary cookies.">
            Accept
        </div>
        <div data-href="<?php echo $jsrgame->current_site_url('site'); ?>" class="btn btn_not_accept" title="I don't accept and go out.">
            Not Accept
        </div>
    </div>
</div>
