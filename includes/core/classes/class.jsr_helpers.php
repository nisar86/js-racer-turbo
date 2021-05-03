<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../../') ); 
} 
//=======================================================
// HELPERS > JS Racer Turbo
//=======================================================

class Jsr_Helpers {
    
    public $gameplay;
    public $gamemode;
    
    public function __construct($gameplay,$gamemode) {
        $this->gameplay = $gameplay;
        $this->gamemode = $gamemode;
        //$this->gamedata = $gamedata;
        $this->jsr_init();
        $this->show_game_info();
	}
    
    /* 
    Initialize the page with the parameters for the required gamemode.
    // $jsrgame = new Jsr_Helpers('gameplay','gamemode');
    */
    public function jsr_init() {
        
        // The value used for new Jsr_Helpers is used to check if gamemode is present.
        $detect_gameplay = $this->gameplay;
        $detect_gamemode = $this->gamemode;
        
        // The default inn this point is not set.
        $gamedata = array(
            'gameplay' => 'not-set',
            'gamemode' => 'not-set'
        );
        
        // If gameplay and gamemode exists, load the corresponding array.
        // Detect Gameplay
        switch ($detect_gameplay) {
            // GamePlay > Turbo
            case 'turbo':
                // Detect Gamemode
                switch ($detect_gamemode) {
                    // GameMode > Fastest Lap
                    case 'fastestlap':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Turbo Fastest Lap Game',
                                'meta_desc' => 'Game Mode: Turbo Fastest Lap - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_turbo gm_fastastlap'
                            ),
                            'welcome' => array(
                                'game_name' => 'FASTEST LAP',
                                'game_play' => 'TURBO'
                            )
                        );
                        break;
                    // GameMode > Out of Time
                    case 'outoftime':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Turbo Out of Time Game',
                                'meta_desc' => 'Game Mode: Turbo Out of Time - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_turbo gm_outoftime'
                            ),
                            'welcome' => array(
                                'game_name' => 'OUT OF TIME',
                                'game_play' => 'TURBO'
                            )
                        );
                        break;
                }
                break;
            // GamePlay > Classic
            case 'classic':
                // Detect Gamemode
                switch ($detect_gamemode) {
                    // GameMode > Fastest Lap
                    case 'fastestlap':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Classic Fastest Lap Game',
                                'meta_desc' => 'Game Mode: Classic Fastest Lap - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_classic gm_fastastlap'
                            ),
                            'welcome' => array(
                                'game_name' => 'FASTEST LAP',
                                'game_play' => 'CLASSIC'
                            )
                        );
                        break;
                    // GameMode > Out of Time
                    case 'outoftime':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Classic Out of Time Game',
                                'meta_desc' => 'Game Mode: Classic Out of Time - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_classic gm_outoftime'
                            ),
                            'welcome' => array(
                                'game_name' => 'OUT OF TIME',
                                'game_play' => 'CLASSIC'
                            )
                        );
                        break;
                }
                break;
            // Gameplay > Demo
            case 'demo':
                // Detect Gamemode
                switch ($detect_gamemode) {
                    // GameMode > Hills
                    case 'hills':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Hills Demo',
                                'meta_desc' => 'Technical Demo: Hills - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_demo gm_hills'
                            ),
                            'welcome' => array(
                                'game_name' => 'HILLS',
                                'game_play' => 'DEMO'
                            )
                        );
                        break;
                    // GameMode > Straight
                    case 'straight':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Straight Demo',
                                'meta_desc' => 'Technical Demo: Straight - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_demo gm_straight'
                            ),
                            'welcome' => array(
                                'game_name' => 'STRAIGHT',
                                'game_play' => 'DEMO'
                            )
                        );
                        break;
                    // GameMode > Curves
                    case 'curves':
                        $gamedata = array(
                            'gameplay' => $this->gameplay,
                            'gamemode' => $this->gamemode,
                            'page' => array(
                                'title' => 'JS Racer Turbo | Curves Demo',
                                'meta_desc' => 'Technical Demo: Curves - OutRun inspired racing game in Retrowave / Synthwave style. | Javascript Racer Turbo',
                                'body_class' => 'gp_demo gm_curves'
                            ),
                            'welcome' => array(
                                'game_name' => 'CURVES',
                                'game_play' => 'DEMO'
                            )
                        );
                        break;
                }
                break;
            // Default Gamedata "not-find".
            default:
                $gamedata = array(
                    'gameplay' => 'not-find',
                    'gamemode' => 'not-find'
                );
        }
        // Update the Jsr_Helpers instance variable with the gamemode array and return.
        $this->gamedata = $gamedata;
        return $gamedata;
    }
    
    /* 
    Current Site Url.
    // $jsrgame->current_site_url();
    */
    public function current_site_url($type=null) {
        $url = '';
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        switch ( $type ) {
            // Page
            case 'page':
                $url = $protocol . $domainName . $_SERVER['REQUEST_URI'];
                break;
            // Site
            case 'site':
                $url = $protocol . $domainName . '/';
                break;
            // Root
            case 'root':
                $url = $protocol . $domainName . '/app/js-racer-turbo/';
                break;
        }
        return $url;
    }
    
    /* 
    Show Game Desc
    Returns game descriptions by request.
    These data differ from those of the jsr_init() function because they are called in any case.
    // $jsrgame->show_game_desc( ..request.. , ..code.. , ..subcode.. );
    */
    public function show_game_desc($request=null,$code=null,$subcode=null) {
        $html = 'Not Set';
        // Define Request
        switch ( $request ) {
            // Homepage
            case 'homepage':
                switch ( $code ) {
                    // Title
                    case 'title':
                        $html = 'JS Racer Turbo | JavaScript Racing Game';
                        break;
                    // Description
                    case 'description':
                        $html = 'OutRun inspired racing game in Retrowave / Synthwave style. Responsive browser game, compatible with computers and mobile devices. | JavaScript Racer Turbo';
                        break;
                }
                break;
            // Game Info
            case 'gameinfo':
                switch ( $code ) {
                    // Name
                    case 'name':
                        $html = 'JS Racer Turbo';
                        break;
                    // Version
                    case 'version':
                        $html = JS_RACER_TURBO_VERSION;
                        // Url
                        switch ( $subcode ) {
                            case 'url':
                                $html = '?ver=' . urlencode(JS_RACER_TURBO_VERSION);
                                break;
                        }
                        break;
                    // By (Developer)
                    case 'by':
                        $name = 'Nisar Abed';
                        $html = 'by '.$name;
                        break;
                }
                break;
                // Options Menu
            case 'options_menu':
                switch ( $code ) {
                    // Gameplay
                    case 'gameplay':
                        $html = 'Select gameplay and game mode.';
                        break;
                    // Controls
                    case 'controls':
                        $html = 'Show the game controls.';
                        break;
                    // Settings
                    case 'settings':
                        $html = 'Technical and graphic settings.';
                        break;
                    // Credits
                    case 'credits':
                        $html = '';
                        break;
                }
            // Gameplay
            case 'gameplay':
                switch ( $code ) {
                    // Turbo
                    case 'turbo':
                        $html = 'Faster speed, the turbos recharge with each spin.';
                        break;
                    // Classic
                    case 'classic':
                        $html = 'Normal speed, the turbo does not recharge.';
                        break;
                    // Demo
                    case 'demo':
                        $html = 'Technical demo for developers.';
                        break;
                }
                break;
            // Gamemode
            case 'gamemode':
                switch ( $code ) {
                    // Fastest Lap
                    case 'fastestlap':
                        $html = 'Complete the laps in the shortest time possible.';
                        break;
                    // Out of Time
                    case 'outoftime':
                        $html = 'Reach the most laps before time runs out.';
                        break;
                    // Straight
                    case 'straight':
                        $html = 'The car runs on the straight road.';
                        break;
                    // Curves
                    case 'curves':
                        $html = 'The car runs on a road with curves.';
                        break;
                    // Hills
                    case 'hills':
                        $html = 'The car runs on a road with hills.';
                        break;
                }
                break;
            // Controls
            case 'controls':
                switch ( $code ) {
                    // Overview
                    case 'overview':
                        $html = 'You can <strong class="yellow">play with keyboard and touchscreen</strong>.';
                        break;
                    // Keyboard
                    case 'keyboard':
                        switch ( $subcode ) {
                            case 'device':
                                $html = '';
                                break;
                            case 'move':
                                $html = 'Use the <strong class="yellow">ARROWS</strong> or the <strong class="yellow">W, A, S, D</strong> buttons.';
                                break;
                            case 'turbo':
                                $html = 'Activate the turbo with the <strong class="orange">SPACE</strong> and <strong class="orange">CTRL</strong> buttons.';
                                break;
                        }
                    break;
                    // Touchscreen
                    case 'touchscreen':
                        switch ( $subcode ) {
                            case 'device':
                                $html = '<strong class="yellow">The gamepad must be activated</strong> (if disabled use the button).';
                                break;
                            case 'move':
                                $html = 'Use the buttons at the bottom left and right of the screen.';
                                break;
                            case 'turbo':
                                $html = 'Activate the turbo with the turbo button at the left.';
                                break;
                        }
                    break;
                    // Settings
                    case 'settings':
                        $html = 'Access the <strong class="yellow"><div class="css_icon i_menu"></div> MENU </strong> from the top left button to set gameplay, gamemode, graphics and game settings.';
                        break;
                    // Web App
                    case 'webapp':
                        switch ( $subcode ) {
                            case 'icon':
                                $html = 'Web App: Add to home screen.';
                                break;
                            case 'how':
                                $html = 'Save a link to this page from your browser with <strong class="yellow">Add to home screen</strong> to add the Web App.';
                                break;
                            case 'mobile':
                                $html = '<strong class="yellow">For the best mobile experience</strong> we recommend playing through the web app in landscape orientation.';
                                break;
                        }
                    break;
                }
                break;
        }
        return $html; 
    }
    
    /* 
    Show Game Info
    Returns current gameplay data.
    The function is executed when jsr_init() has been executed, 
    so the gamemode array is already present.
    // $jsrgame->show_game_info( ..type.. , ..request.. );
    */
    public function show_game_info($type=null,$request=null) {
        $gamedata               = $this->gamedata;
        $txt_current_gamemode   = $gamedata['welcome']['game_name'];
        $txt_current_gameplay   = $gamedata['welcome']['game_play'];
        $txt_desc_gameplay      = $this->show_game_desc('gameplay',$gamedata['gameplay']);
        $txt_desc_gamemode      = $this->show_game_desc('gamemode',$gamedata['gamemode']);
        $txt_gameplay           = 'Gameplay';
        $txt_gamemode           = 'Gamemode';
        $html                   = 'Not Set';
        // Return the html requested
        switch ( $type ) {
            /* ------------------------------
            Welcome Modal > Show Game Info 
            */
            case 'modal_welcome':
$html=<<<WELCOME
<h2>
    <span>
        $txt_current_gameplay
    </span>
    <span class="slash">/</span>
    <span>
        $txt_current_gamemode
    </span>
</h2>
<h3>
    $txt_desc_gameplay 
    <br>
    $txt_desc_gamemode
</h3>
WELCOME;
                break;
            /* ------------------------------
            Menu > Show Current Settings 
            */
            case 'modal_menu_current_settings':
$html=<<<CURRENT_SETTINGS
<strong title="$txt_gameplay">$txt_current_gameplay</strong> 
<span> / </span>
<strong title="$txt_gamemode">$txt_current_gamemode</strong>
CURRENT_SETTINGS;
                break;
            /* ------------------------------
            Controls Modal > Show Current Controls Info. 
            */
            case 'modal_howToPlay':
                // Defaults
                $gameplay               = $gamedata['gameplay'];
                // $gamemode            = $gamedata['gamemode'];
                $txt_device = '';
                $txt_move   = '';
                $txt_turbo  = '';
                // Request with keyboard or touchscreen commands.
                switch ( $request ) {
                    case 'keyboard':
                        $txt_device = $this->show_game_desc('controls','keyboard','device');
                        $txt_move   = $this->show_game_desc('controls','keyboard','move');
                        $txt_turbo  = $this->show_game_desc('controls','keyboard','turbo');
                        break;
                    case 'touchscreen':
                        $txt_device = $this->show_game_desc('controls','touchscreen','device');
                        $txt_move   = $this->show_game_desc('controls','touchscreen','move');
                        $txt_turbo  = $this->show_game_desc('controls','touchscreen','turbo');
                        break; 
                }
                // Information based on the current gameplay.
                switch ( $gameplay ) {
                    case 'turbo':
                        $html = $txt_device .' '. $txt_move .' '. $txt_turbo;
                        break;
                    case 'classic':
                        $html = $txt_device .' '. $txt_move .' '. $txt_turbo;
                        break;
                    case 'demo':
                        $html = $txt_device .' '. $txt_move;
                        break;
                }
                break;
        }
        // Return Html
        return $html; 
    }
    
}
