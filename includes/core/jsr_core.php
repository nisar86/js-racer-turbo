<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../') ); 
} 
//=========================================================================
// CORE > JS Racer Turbo
//=========================================================================

/*
Currently game version.
*/
define( 'JS_RACER_TURBO_VERSION', '1.2.0' );

//=========================================================================
// ADMIN
//=========================================================================

/*
the class showing php errors is
been put here to display them even when
there are errors in the following scripts.
*/
require('classes/class.jsr_admin.php');

// Activate errors (false / true).
Jsr_Admin::php_errors(true);

//=========================================================================
// PUBLIC
//=========================================================================

require('classes/class.jsr_helpers.php');

/* -----------------------------------------
Run */

/*
On the game page, include jsr_core.php
and start a new instance of Jsr_Helpers() 
indicating the gamemode you want to set.

// require('includes/core/jsr_core.php');
// $gamemode = new Jsr_Helpers('Game-Mode-Name');

The system automatically loads the page 
variables from the game data array.

Connected to the variable that contains the 
array and take the parameters you need, e.g.
// $gamemode->gamemode['page']['title'];
*/
