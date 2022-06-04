function addRPPopup( params ){
    var parentNode = jQuery( params.parent ).first();

    var popups = 0;
    var group = 0;
    if ( parentNode.hasClass('rm-popup-parent') ){
        popups = parseInt( parentNode.attr('data-popups') ) || 0;
        group = parseInt( parentNode.attr('data-popups-group') ) || 0;

        parentNode.attr('data-popups', popups + 1);
    } else {
        jQuery('.rm-popup-parent').each(function(){
            var group_ = parseInt( jQuery(this).attr('data-popups-group') );
            if ( group_ > group ) group = group_;
        });
        group++;
        
        parentNode.addClass('rm-popup-parent');
        parentNode.attr('data-popups-group', group);
        parentNode.attr('data-popups', 1);

        var tabs = document.createElement('DIV');
        jQuery( tabs ).addClass('rm-popup-tabs');
        jQuery( tabs ).attr( 'data-popups-group', group );

        parentNode.append( tabs );
    }

    var popup = document.createElement('DIV');
    jQuery(popup).addClass('rm-popup');
    jQuery(popup).attr( 'data-popups-group', group );
    jQuery(popup).attr( 'data-left', params.left );
    jQuery(popup).attr( 'data-top', params.top );
    jQuery(popup).attr( 'data-width', params.width );
    jQuery(popup).attr( 'data-height', params.height );
    
    var header = document.createElement('DIV');
    jQuery(header).addClass('rmp-header');
    popup.appendChild( header );
    
    var close = document.createElement('DIV');
    jQuery(close).addClass('rmp-close');
    header.appendChild( close );
    
    var collapse = document.createElement('DIV');
    jQuery(collapse).addClass('rmp-collapse');
    header.appendChild( collapse );
    
    var resize = document.createElement('DIV');
    jQuery(resize).addClass('rmp-resize');
    header.appendChild( resize );
    
    var title = document.createElement('DIV');
    jQuery(title).addClass('rmp-title');
    jQuery(title).addClass('rmp-move');
    jQuery(title).attr( 'title', params.title );
    jQuery(title).html( params.title );
    header.appendChild( title );
    
    var content = document.createElement('DIV');
    jQuery(content).addClass('rmp-content');
    jQuery(content).html( params.content );
    popup.appendChild( content );
    
    var leftBorder = document.createElement('DIV');
    jQuery(leftBorder).addClass('rmp-left-border');
    popup.appendChild( leftBorder );
    
    var topBorder = document.createElement('DIV');
    jQuery(topBorder).addClass('rmp-top-border');
    popup.appendChild( topBorder );
    
    var rightBorder = document.createElement('DIV');
    jQuery(rightBorder).addClass('rmp-right-border');
    popup.appendChild( rightBorder );
    
    var bottomBorder = document.createElement('DIV');
    jQuery(bottomBorder).addClass('rmp-bottom-border');
    popup.appendChild( bottomBorder );
    
    var leftTopAngle = document.createElement('DIV');
    jQuery(leftTopAngle).addClass('rmp-left-top-angle');
    popup.appendChild( leftTopAngle );
    
    var rightTopAngle = document.createElement('DIV');
    jQuery(rightTopAngle).addClass('rmp-right-top-angle');
    popup.appendChild( rightTopAngle );
    
    var rightBottomAngle = document.createElement('DIV');
    jQuery(rightBottomAngle).addClass('rmp-right-bottom-angle');
    popup.appendChild( rightBottomAngle );
    
    var leftBottomAngle = document.createElement('DIV');
    jQuery(leftBottomAngle).addClass('rmp-left-bottom-angle');
    popup.appendChild( leftBottomAngle );
    
    parentNode.append( popup );
    createRPPopup( popups, popup );
}

function createRPPopup( i, popup ){
    jQuery(popup).attr( 'id', 'rm-popup-' + i );
    jQuery(popup).css({ zIndex: 100 + i });

    jQuery(popup).on('mousedown', function(){
        jQuery('.rm-popup').removeClass('active');
        jQuery(popup).addClass('active');
    });

    var group = jQuery(popup).attr('data-popups-group');

    jQuery(popup).data( 'parent', jQuery('.rm-popup-parent[data-popups-group=' + group + ']').first() );

    setMRPopup( popup, {} );
    
    var activated = false;
    var allowRM = true;

    jQuery(document).on('selectstart', function( event ){
        if ( activated ){
            event.preventDefault();
            return false;
        }
    });

    var lX = null;
    var rX = null;
    var tY = null;
    var bY = null;

    jQuery(popup).find('.rmp-left-border').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            lX = event.touches ? event.touches[0].pageX : event.pageX;
            activated = true;
        }
    });
    jQuery(popup).find('.rmp-right-border').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            rX = event.touches ? event.touches[0].pageX : event.pageX;
            activated = true;
        }
    });
    jQuery(popup).find('.rmp-top-border').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            tY = event.touches ? event.touches[0].pageY : event.pageY;
            activated = true;
        }
    });
    jQuery(popup).find('.rmp-bottom-border').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            bY = event.touches ? event.touches[0].pageY : event.pageY;
            activated = true;
        }
    });
    
    jQuery(popup).find('.rmp-left-top-angle').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            lX = event.touches ? event.touches[0].pageX : event.pageX;
            tY = event.touches ? event.touches[0].pageY : event.pageY;
        }

        activated = true;
    });
    jQuery(popup).find('.rmp-left-bottom-angle').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            lX = event.touches ? event.touches[0].pageX : event.pageX;
            bY = event.touches ? event.touches[0].pageY : event.pageY;
        }

        activated = true;
    });
    jQuery(popup).find('.rmp-right-bottom-angle').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            rX = event.touches ? event.touches[0].pageX : event.pageX;
            bY = event.touches ? event.touches[0].pageY : event.pageY;
        }

        activated = true;
    });
    jQuery(popup).find('.rmp-right-top-angle').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            rX = event.touches ? event.touches[0].pageX : event.pageX;
            tY = event.touches ? event.touches[0].pageY : event.pageY;
        }

        activated = true;
    });

    var mX = null;
    var mY = null;
    jQuery(popup).find('.rmp-move').on('mousedown touchstart', function( event ){
        if ( allowRM ){
            mX = event.touches ? event.touches[0].pageX : event.pageX;
            mY = event.touches ? event.touches[0].pageY : event.pageY;
        }

        activated = true;
    });

    jQuery('body').bind('mousemove touchmove', function( event ){
        if ( activated ){
            var x = event.touches ?  event.touches[0].pageX : event.pageX;
            var y = event.touches ?  event.touches[0].pageY : event.pageY;

            var p = getMRPParams( popup );

            if ( lX ){
                var plus = x - lX;

                p.leftUnfixed = p.left + plus;
                p.widthUnfixed = p.width - plus;
            } else if ( rX ){
                var plus = x - rX;

                p.widthUnfixed = p.width + plus;
            }

            if ( tY ){
                var plus = y - tY;

                p.topUnfixed = p.top + plus;
                p.heightUnfixed = p.height - plus;
            } else if ( bY ){
                var plus = y - bY;

                p.heightUnfixed = p.height + plus;
            }

            if ( mX && mY ){
                var plusX = x - mX;
                var plusY = y - mY;

                p.leftUnfixed = p.left + plusX;
                p.topUnfixed = p.top + plusY;

                p.sizeFixed = true;
            }

            setMRPopup( popup, p );
        }
    });
    jQuery('body').bind('mouseup touchend', function(){
        if ( activated ) setMRPopup(popup, { fix: true });

        lX = null;
        rX = null;
        tY = null;
        bY = null;
        
        mX = null;
        mY = null;

        activated = false;
    });


    jQuery(popup).find('.rmp-resize').first().on('click', function(){
        if ( jQuery(popup).hasClass('fullsize') ){
            jQuery(popup).removeClass('fullsize');
            allowRM = true;
        } else {
            jQuery(popup).addClass('fullsize');
            allowRM = false;
        }

        jQuery(popup).addClass('fullsize-clicked');
        setTimeout(function(){
            jQuery(popup).removeClass('fullsize-clicked');
        }, 500);
    });

    jQuery(popup).find('.rmp-collapse').first().on('click', function(){
        var tabs = jQuery('.rm-popup-tabs[data-popups-group=' + group + ']').first();

        tabs.append( popup );
        tabs.addClass('active');

        jQuery(popup).addClass('collapsed');

        allowRM = false;
    });
    jQuery(popup).find('.rmp-title').first().on('click', function(){
        if ( jQuery(popup).hasClass('collapsed') ){
            var tabs = jQuery('.rm-popup-tabs[data-popups-group=' + group + ']').first();

            jQuery(popup).data('parent').append( popup );
            tabs.removeClass('active');

            jQuery(popup).removeClass('collapsed');
            setMRPopup( popup, {} );

            allowRM = true;
        }
    });

    jQuery(popup).find('.rmp-close').first().on('click', function(){
        jQuery(popup).fadeOut( 1000, function(){
            jQuery(popup).remove();
        });

        allowRM = false;
    });
}

function getMRPParams( popup ){
    var widthUnfixed = parseFloat( jQuery( popup ).attr('data-width-unfixed') );
    var heightUnfixed = parseFloat( jQuery( popup ).attr('data-height-unfixed') );
    var leftUnfixed = parseFloat( jQuery( popup ).attr('data-left-unfixed') );
    var topUnfixed = parseFloat( jQuery( popup ).attr('data-top-unfixed') );

    var width = parseFloat( jQuery( popup ).attr('data-width') );
    if ( !widthUnfixed ) widthUnfixed = width;

    var height = parseFloat( jQuery( popup ).attr('data-height') );
    if ( !heightUnfixed ) heightUnfixed = height;

    var left = jQuery( popup ).attr('data-left');
    if ( left == 'c' ) left = ( jQuery(window).width() - width ) / 2;
    if ( !leftUnfixed ) leftUnfixed = left;
    left = parseFloat( left );

    var top = jQuery( popup ).attr('data-top');
    if ( top == 'c' ) top = ( jQuery(window).height() - height ) / 2;
    if ( !topUnfixed ) topUnfixed = top;
    top = parseFloat( top );
    
    return {
        left: left,
        top: top,
        width: width,
        height: height,
        widthUnfixed: widthUnfixed,
        heightUnfixed: heightUnfixed,
        leftUnfixed: leftUnfixed,
        topUnfixed: topUnfixed
    };
}

function setMRPopup( popup, params ){
    var p = getMRPParams( popup );

    for ( var i in params ) p[i] = params[i];

    var borderLimit = 8;

    var contentWidth = 120;
    var contentHeight = 64;

    var windowWidth = jQuery(window).width() - borderLimit;
    var windowHeight = jQuery(window).height() - borderLimit;

    if ( p.widthUnfixed < contentWidth ){
        if ( p.left != p.leftUnfixed ) p.leftUnfixed = p.left + p.width - contentWidth;
        p.widthUnfixed = contentWidth;
    } else if ( p.widthUnfixed + p.leftUnfixed > windowWidth ){
        if ( p.sizeFixed ) p.leftUnfixed = windowWidth - p.widthUnfixed;
        else p.widthUnfixed = windowWidth - p.leftUnfixed;
    }

    if ( p.heightUnfixed < contentHeight ){
        if ( p.top != p.topUnfixed ) p.topUnfixed = p.top + p.height - contentHeight;
        p.heightUnfixed = contentHeight;
    } else if ( p.heightUnfixed + p.topUnfixed > windowHeight ){
        if ( p.sizeFixed ) p.topUnfixed = windowHeight - p.heightUnfixed;
        else p.heightUnfixed = windowHeight - p.topUnfixed;
    }

    if ( p.leftUnfixed < borderLimit ){
        p.leftUnfixed = borderLimit;
        if ( !p.sizeFixed ) p.widthUnfixed = p.left + p.width - p.leftUnfixed;
    }
    
    if ( p.topUnfixed < borderLimit ){
        p.topUnfixed = borderLimit;
        if ( !p.sizeFixed ) p.heightUnfixed = p.top + p.height - p.topUnfixed;
    }

    if ( params.fix ){
        p.left = p.leftUnfixed;
        p.top = p.topUnfixed;
        p.width = p.widthUnfixed;
        p.height = p.heightUnfixed;
    }

    jQuery(popup)
        .css({
            left: p.leftUnfixed + 'px',
            top: p.topUnfixed + 'px',
            width: p.widthUnfixed + 'px',
            height: p.heightUnfixed + 'px'
        })
        .attr( 'data-left', p.left )
        .attr( 'data-top', p.top )
        .attr( 'data-width', p.width )
        .attr( 'data-height', p.height )
        .attr( 'data-left-unfixed', p.leftUnfixed )
        .attr( 'data-top-unfixed', p.topUnfixed )
        .attr( 'data-width-unfixed', p.widthUnfixed )
        .attr( 'data-height-unfixed', p.heightUnfixed );
}