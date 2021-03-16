<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=======================================================
// HUD
//=======================================================
?>
<div id="hud" class="hideInGameLoading">
    
    <?php 
    // Hud Right 
    // The same for all game modes.
    ?>
    <div class="hud_right">

        <?php // Current Lap ?>
        <div id="current_lap" class="hud_info highlights txt_big wow fadeInRight" title="Current Lap">
            <div id="gameover_lap" class="value hidden"><small id="gameover_lap_value"><!-- Final Lap by JS --></small></div>
            <div class="unit">&ring;</div>
            <div id="current_lap_value" class="value">1</div>
            <div class="clear"></div>
            <div class="desc">LAP</div>
        </div>

        <?php // Lap Time ?>
        <div id="current_lap_time" class="hud_info wow fadeInRight" title="Lap Time">
            <div id="current_lap_time_value" class="value">0.0</div>
            <div class="unit">s</div>
            <div class="desc">LAP TIME</div>
        </div>

    </div>
    
    <?php
    // Hud Center & Left
    // For Fastest Lap game mode.
    if( $jsrgame->gamedata['gamemode'] == 'fastestlap' ) {
    ?>
    
        <div class="hud_center">
            
            <?php // Fast Lap Time ?>
            <div id="fast_lap_time" class="hud_info wow fadeInDown" title="Fast Lap Time">
                <div id="fast_lap_time_value" class="value">0.0</div>
                <div id="fast_lap_time_unit" class="unit">s</div>
                <div class="desc">FASTEST LAP</div>
            </div>

        </div>
        <div class="hud_left">

            <?php // Fastestlap Goal ?>
            <div id="fastestlap_goal" class="hud_info wow fadeInLeft" title="Total time to beat">
                <div class="css_icon i_cup"></div>
                <div id="fastestlap_goal_value" class="value">0</div>
                <div class="unit">s</div>
                <div class="desc">BEST RACE TIME</div>
            </div>
            
            <?php // Total Match Time ?>
            <div id="total_match_time" class="hud_info highlights wow fadeInLeft" title="Total Match Time">
                <div id="total_match_time_value" class="value">0.0</div>
                <div class="unit">s</div>
                <div class="desc">RACE TIME</div>
            </div>

            <?php // Last Lap Time ?>
            <div id="last_lap_time" class="hud_info wow fadeInLeft" title="Last Lap Time">
                <div id="last_lap_time_value" class="value">0.0</div>
                <div id="last_lap_time_unit" class="unit">s</div>
                <div class="desc">LAST LAP</div>
            </div>
            
            <?php // Out of time Goal (Hidden) ?>
            <div id="outoftime_goal" class="hud_info wow fadeInLeft" title="Laps to reach">
                <div class="css_icon i_cup"></div>
                <div id="outoftime_goal_value" class="value">0</div>
                <div class="unit">&ring;</div>
                <div class="desc">BEST LAPS</div>
            </div>
            
            <?php // Remaning Time (Hidden) ?>
            <div id="remaining_time" class="hud_info highlights txt_big wow fadeInDown" title="Remaning Time">
                <div id="remaining_time_alert">
                    <div id="remaining_time_value" class="value">0.0</div>
                    <div class="unit">s</div>
                    <div class="desc">DEADLINE</div>
                </div>
            </div>

        </div>
    
    <?php
    // Hud Center & Left
    // For Out Of Time game mode.
    } else if( $jsrgame->gamedata['gamemode'] == 'outoftime' ) {
    ?>
    
        <div class="hud_center">

            <?php // Remaning Time ?>
            <div id="remaining_time" class="hud_info highlights txt_big wow fadeInDown" title="Remaning Time">
                <div id="remaining_time_alert">
                    <div id="remaining_time_value" class="value">0.0</div>
                    <div class="unit">s</div>
                    <div class="desc">DEADLINE</div>
                </div>
            </div>

        </div>
        <div class="hud_left">

            <?php // Out of time Goal ?>
            <div id="outoftime_goal" class="hud_info wow fadeInLeft" title="Laps to reach">
                <div class="css_icon i_cup"></div>
                <div id="outoftime_goal_value" class="value">0</div>
                <div class="unit">&ring;</div>
                <div class="desc">BEST LAPS</div>
            </div>

            <?php // Total Match Time ?>
            <div id="total_match_time" class="hud_info wow fadeInLeft" title="Total Match Time">
                <div id="total_match_time_value" class="value">0.0</div>
                <div class="unit">s</div>
                <div class="desc">RACE TIME</div>
            </div>
            
            <?php // Last Lap Time ?>
            <div id="last_lap_time" class="hud_info wow fadeInLeft" title="Last Lap Time">
                <div id="last_lap_time_value" class="value">0.0</div>
                <div id="last_lap_time_unit" class="unit">s</div>
                <div class="desc">LAST LAP</div>
            </div>
            
            <?php // Fast Lap Time (Hidden) ?>
            <div id="fast_lap_time" class="hud_info wow fadeInDown" title="Fast Lap Time">
                <div id="fast_lap_time_value" class="value">0.0</div>
                <div id="fast_lap_time_unit" class="unit">s</div>
                <div class="desc">FASTEST LAP</div>
            </div>
            
            <?php // Fastestlap Goal (Hidden) ?>
            <div id="fastestlap_goal" class="hud_info wow fadeInLeft" title="Total time to beat">
                <div class="css_icon i_cup"></div>
                <div id="fastestlap_goal_value" class="value">0</div>
                <div class="unit">s</div>
                <div class="desc">BEST RACE TIME</div>
            </div>

        </div>
    
    <?php 
    }
    ?>
    
    
    <?php 
    // Hud Speed 
    // The same for all game modes.
    ?>
    <div class="hud_speed wow fadeInRight">
        <?php // Turbo ?>
        <div id="turbo_left" class="hs_item" title="Turbo">
            <div class="show_turbo">
                <div class="icon"></div>
                <div id="turbo_left_value" class="value">0</div>
                <div id="turbo_max_value" class="value">0</div>
                <div class="desc txtc">TURBO</div>
            </div>
        </div>
        <?php // Current Speed ?>
        <div id="current_speed" class="hs_item" title="Speed : km/h | mph">
            <div class="show_speed">
                <span class="view_speed_kmh btn_show_speed_mph">
                    <div class="title">km/h</div>
                    <div id="speed_value_kmh" class="value font_speed">0</div> 
                </span>
                <span class="view_speed_mph btn_show_speed_kmh">
                    <div class="title">mph</div>
                    <div id="speed_value_mph" class="value font_speed">0</div> 
                </span>
                <div class="desc">CHANGE</div>
            </div>
        </div>
        <?php // Speedometer ?>
        <div id="bar" class="hs_item">
            <?php 
            /*
            // Speed > Bar
            // In common.css is present: 
            // #hud .hud_speed #bar .speed_bar_progress path { mask: url(#speed_bar_mask); }
            */
            $sbar_vars = array(
                'path' => 'M30.7,159.7c-13.8-16-22.1-36.9-22.1-59.7c0-50.5,41-91.5,91.5-91.5s91.5,41,91.5,91.5c0,22.8-8.3,43.6-22.1,59.7',
                'stroke-width' => '6',
                'data-stroke' => 'data:ldbar/res,gradient(0,1,#ff8900,#ff8900,#ff0000)',
                'stroke' => '#ffffff',
                'stroke-trail-width' => '15',
                'stroke-dasharray-1' => '40 8',
                'stroke-trail' => '#3c3c3c',
                'type' => 'stroke'
            ); 
            ?>
            <div class="speed_bar_progress" data-path="<?php echo $sbar_vars['path']; ?>" data-type="<?php echo $sbar_vars['type']; ?>" data-stroke-width="<?php echo $sbar_vars['stroke-width']; ?>" data-stroke="<?php echo $sbar_vars['data-stroke']; ?>" data-stroke-trail-width="<?php echo $sbar_vars['stroke-trail-width']; ?>" data-stroke-trail="<?php echo $sbar_vars['stroke-trail']; ?>">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="100%" height="100%" viewBox="-13.899999618530273 -14 228 196.1999969482422">
                    <defs>
                        <mask id="speed_bar_mask">
                            <path d="<?php echo $sbar_vars['path']; ?>" stroke-width="<?php echo $sbar_vars['stroke-width']; ?>" stroke="<?php echo $sbar_vars['stroke']; ?>" stroke-dasharray="<?php echo $sbar_vars['stroke-dasharray-1']; ?>" data-stroke-trail-width="<?php echo $sbar_vars['stroke-trail-width']; ?>" data-stroke-trail="<?php echo $sbar_vars['stroke-trail']; ?>"></path>
                        </mask>
                        <?php 
                        /*
                        // Custom Pattern
                        // To use the pattern:
                        1) Insert the following code in this position.
                        // <pattern id="speed_bar_stroke" width="250" height="250" patternUnits="userSpaceOnUse">
                        //     <image href="assets/game/images/hud/speedometer_stroke.jpg" width="250" height="250"></image>
                        // </pattern>
                        2) Enter this data-stroke to connect it.
                        // data-stroke="url(#speed_bar_stroke)"
                        */ 
                        ?>
                    </defs>
                    <g>
                        <path d="<?php echo $sbar_vars['path']; ?>" stroke-width="<?php echo $sbar_vars['stroke-width']; ?>" stroke="<?php echo $sbar_vars['stroke']; ?>" stroke-dasharray="<?php echo $sbar_vars['stroke-dasharray-1']; ?>" data-stroke-trail-width="<?php echo $sbar_vars['stroke-trail-width']; ?>" data-stroke-trail="<?php echo $sbar_vars['stroke-trail']; ?>"></path>
                    </g>
                </svg>
            </div>
            <?php // Speed > Arrow ?>
            <div class="speed_arrow_area">
                <div class="speed_arrow_progress">
                    <div class="speed_arrow_icon"></div>
                </div>
            </div>
            <?php 
            // Turbo > Bar
            $tbar_vars = array(
                'preset' => 'fan',
                'stroke-width' => '3',
                'data-stroke' => 'data:ldbar/res,gradient(0,1,#ff8900,#ff8900,#ff0000)',
                'stroke-trail-width' => '3',
                'stroke-trail' => '#3c3c3c',
                'type' => 'stroke'
            ); ?>
            <div class="turbo_bar_area">
                <div class="turbo_bar_progress label-center" data-preset="<?php echo $tbar_vars['preset']; ?>" data-type="<?php echo $tbar_vars['type']; ?>" data-stroke-width="<?php echo $tbar_vars['stroke-width']; ?>" data-stroke="<?php echo $tbar_vars['data-stroke']; ?>" data-stroke-trail-width="<?php echo $tbar_vars['stroke-trail-width']; ?>" data-stroke-trail="<?php echo $tbar_vars['stroke-trail']; ?>"></div>
            </div>
        </div>
    </div>
    
    
</div>
