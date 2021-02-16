<?php 
// Security
if(!defined('Security')) { 
    die( header('location: ../../../') ); 
} 
//=========================================================================
// ADMIN > JS Racer Turbo
//=========================================================================

class Jsr_Admin {
    
    /* 
    Show PHP Errors (true)
    Jsr_Admin::php_errors(false); 
    */
    public static function php_errors($status=false) {
        if( $status == true ) {
            ini_set('display_errors', 1);
            ini_set('display_startup_errors', 1);
            error_reporting(E_ALL);
        }
    }
    
}
