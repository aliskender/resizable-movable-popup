jQuery(function(){
    addRPPopup({
        parent: '#rm-popup-parent',
        title: "Resizable Movable PopUp",
        content: "<p>Some new movable resizable window</p>",
        left: 'c',
        top: 'c',
        width: 480,
        height: 320
    });

    jQuery('#add-popup-form').on('submit', function( event ){
        event.preventDefault();
        
        var title = jQuery('#title').val();
        var content = jQuery('#content').val();
        var left = jQuery('#left').val();
        var top = jQuery('#top').val();
        var width = jQuery('#width').val();
        var height = jQuery('#height').val();
        
        addRPPopup({
            parent: '#rm-popup-parent',
            title: title,
            content: "<p>" + content + "</p>",
            left: left,
            top: top,
            width: width,
            height: height
        });
    });
});