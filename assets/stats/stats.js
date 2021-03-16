/**
 * @author mrdoob / http://mrdoob.com/
 *
 * Stats.js
 * GitHub: https://github.com/mrdoob/stats.js/
 *
 * This Version is adapted for JS-Racer-Turbo.
 * by Nisar Abed / https://www.nisar.it
**/

var Stats = function() {

    var startTime = Date.now(), prevTime  = startTime;
    var ms        = 0, msMin  = 1000, msMax  = 0;
    var fps       = 0, fpsMin = 1000, fpsMax = 0;
    var frames    = 0, mode   = 0;

    var container = document.createElement( 'div' );
    container.id        = 'stats_graphic';
    container.className = 'stats_graphic';
    container.addEventListener( 'mousedown', function ( event ) { 
        event.preventDefault(); 
        setMode( ++ mode % 2 ) 
    }, false );

    var fpsDiv = document.createElement( 'div' );
    fpsDiv.id           = 'fps';
    fpsDiv.className    = 'fps';
    container.appendChild( fpsDiv );

    var fpsText = document.createElement( 'div' );
    fpsText.id          = 'fpsText';
    fpsText.className   = 'fpsText';
    fpsText.innerHTML   = 'FPS';
    fpsDiv.appendChild( fpsText );

    var fpsGraph = document.createElement( 'div' );
    fpsGraph.id         = 'fpsGraph';
    fpsGraph.className  = 'fpsGraph';
    fpsDiv.appendChild( fpsGraph );

    while ( fpsGraph.children.length < 74 ) {
        var bar = document.createElement( 'span' );
        bar.className   = 'bar';
        fpsGraph.appendChild( bar );
    }

    var msDiv = document.createElement( 'div' );
    msDiv.id            = 'ms';
    msDiv.className     = 'ms';
    container.appendChild( msDiv );

    var msText = document.createElement( 'div' );
    msText.id           = 'msText';
    msText.className    = 'msText';
    msText.innerHTML    = 'MS';
    msDiv.appendChild( msText );

    var msGraph = document.createElement( 'div' );
    msGraph.id          = 'msGraph';
    msGraph.className   = 'msGraph';
    msDiv.appendChild( msGraph );

    while ( msGraph.children.length < 74 ) {
        var bar = document.createElement( 'span' );
        bar.className   = 'bar';
        msGraph.appendChild( bar );
    }

    var setMode = function ( value ) {
        mode = value;
        switch ( mode ) {
          case 0:
            fpsDiv.style.display = 'block';
            msDiv.style.display  = 'none';
            break;
          case 1:
            fpsDiv.style.display = 'none';
            msDiv.style.display  = 'block';
            break;
        }
    }

    var updateGraph = function ( dom, value ) {
        var child = dom.appendChild( dom.firstChild );
        child.style.height = value + 'px';
    }

    return {

        domElement: container,
        setMode: setMode,
        current: function() { return fps; },
        begin: function () { startTime = Date.now(); },
        end: function () {

            var time     = Date.now();
            ms           = time - startTime;
            msMin        = Math.min( msMin, ms );
            msMax        = Math.max( msMax, ms );
            msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
            updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );
            frames ++;
            if ( time > prevTime + 1000 ) {
                fps      = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
                fpsMin   = Math.min( fpsMin, fps );
                fpsMax   = Math.max( fpsMax, fps );
                fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
                updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );
                prevTime = time;
                frames   = 0;
            }
            return time;

        },
        update: function () {
            startTime = this.end();
        }

    }

};
