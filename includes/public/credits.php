<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// CREDITS
//=========================================================================
?>
<div class="credits modal modal_fullscreen_bar modal_bgradius">
    <div class="modal_note dflex">
        <div class="close modal_close">&times;</div>
        <div class="modal_content txt_big txtc">
            
            <div class="modal_title">
                <span class="first_title fxrg_orange" title="Credits">
                    Credits
                </span>
            </div>
            
            <div class="modal_box">
        
                <?php // Logo and Version ?>
                <div class="row txt_big">
                    <div class="row">
                        <div class="logo_text fxrg_orange">
                            <span class="font_classicjs">JS</span>
                            <span class="font_classic">RACER</span>
                            <span class="font_turbo">TURBO</span>
                            <small>&nbsp;<?php echo $jsrgame->show_game_desc('gameinfo','version'); ?></small>
                        </div>
                    </div>
                </div>

                <?php // Developer ?>
                <div class="row txt_big separator">
                    <strong>Web Developer</strong>
                </div>
                <div class="row">
                    <strong>Nisar Abed</strong> 
                    - 
                    <a class="link_light" href="https://www.nisar.it/" title="Nisar Abed | Nisar.it" target="_blank" rel="nofollow">
                        <small>Nisar.it</small>
                    </a>
                    - 
                    <a class="link_light" href="https://github.com/nisar86/" title="nisar86 | Github Profile" target="_blank" rel="nofollow">
                        <small>Github Profile</small>
                    </a>
                    - 
                    <a class="link_light" href="https://github.com/nisar86/js-racer-turbo" title="Fork JS Racer Turbo on GitHub | GitHub Repository" target="_blank" rel="nofollow">
                        <small>Fork on GitHub</small>
                    </a>
                </div>
                <div class="row">
                    Developer of this racing game, read the  
                    <a class="link_light" href="https://github.com/nisar86/js-racer-turbo#js-racer-turbo" title="Read the readme file in Markdown format on GitHub." target="_blank" rel="nofollow">README.md</a> 
                    file to get an overview of what has been done in this version.
                </div>
                
                
                <?php // Contributors ?>
                <div class="row txt_big separator">
                    <strong>Contributors</strong>
                </div>
                <div class="row">
                    <i>
                        The contributions of third parties listed in the 
                        <a class="link_light" href="LICENSE.html" target="_blank" title="Software License">software license</a>.
                    </i>
                </div>
                <div class="row">
                    This software was developed from the work of:
                </div>
                <div class="row">
                    <strong>Jake Gordon</strong> 
                    -
                    <small>
                        <a class="link_light" href="https://codeincomplete.com/posts/javascript-racer" title="CodeIncomplete.com" target="_blank" rel="nofollow">
                            Code InComplete
                        </a>
                        -
                        <a class="link_light" href="https://github.com/jakesgordon/" title="jakesgordon | Github Profile" target="_blank" rel="nofollow">
                            Github Profile
                        </a>
                        -
                        <a class="link_light" href="https://github.com/jakesgordon/javascript-racer" title="javascript-racer (V4) | GitHub Repository" target="_blank" rel="nofollow">
                            GitHub Repository
                        </a>
                    </small>
                </div>
                <div class="row">
                    <strong>Stephen Karl Larroque</strong> 
                    - 
                    <small>
                        <a class="link_light" href="https://github.com/lrq3000/" title="lrq3000 | Github Profile" target="_blank" rel="nofollow">
                            Github Profile
                        </a> 
                        - 
                        <a class="link_light" href="https://github.com/lrq3000/javascript-racer" title="javascript-racer (V5) | GitHub Repository" target="_blank" rel="nofollow">
                            GitHub Repository
                        </a>
                    </small>
                </div>
                
                <?php // Music ?>
                <div class="row txt_big separator">
                    <strong>Music</strong>
                </div>
                <div class="row">
                    <strong>Roborama</strong> 
                    - 
                    <small>
                        <a class="link_light" href="https://ghostcity.bandcamp.com/track/i-bet-u-kunt-go-faster" title="Roborama - I Bet U Kunt Go Faster" target="_blank" rel="nofollow">
                            I Bet U Kunt Go Faster 
                        </a>
                    </small>
                </div>
                <div class="row">
                    <strong>Serpe Terror</strong> 
                    - 
                    <small>
                        Balla con me fra (Instrumental)
                    </small>
                </div>
                
                <?php // License ?>
                <div class="row txt_big separator">
                    <strong>License</strong>
                </div>
                <div class="row">
                    <a class="link_light" href="LICENSE.html" target="_blank" title="License">
                        License of JS Racer Turbo
                        <small><?php echo $jsrgame->show_game_desc('gameinfo','version'); ?></small>
                    </a>
                </div>

                <?php // Back ?>
                <div class="row separator txt_big">
                    <?php 
                    // Back Button
                    require ('menu/go_back.php'); 
                    ?>
                </div>
                
            </div>
            
        </div>
    </div>
</div>
