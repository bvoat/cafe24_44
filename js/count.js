
function NumAni__start(selector) {
    $(selector).each(function(index, node) {
        var $el = $(node);
        
        var start = parseInt($el.attr('data-num-ani-start'));
        var interval = parseInt($el.attr('data-num-ani-interval'));

        $el.attr('data-num-ani-interval-current', interval);

        $el.text(start);

        NumAni__increaseWon($el);
    });
}

function NumAni__increaseWon($el) {
    var current = parseInt($el.text());
    var end = parseInt($el.attr('data-num-ani-end'));
    var stride = parseInt($el.attr('data-num-ani-stride'));
    var interval = parseInt($el.attr('data-num-ani-interval-current'));
    var slowPoint = parseFloat($el.attr('data-num-ani-slow-point'))

    if (current < end) {
        if ( current > end * slowPoint ) {
            interval += parseInt($el.attr('data-num-ani-slow-add-interval'));
            if ( interval > 100 ) {
                interval = 100;
            }
            $el.attr('data-num-ani-interval-current', interval);
        }
        
        if ( current + stride > end ) {
            $el.text(end);
        }
        else {
            $el.text(current + stride);
        }

        setTimeout(function () {
            NumAni__increaseWon($el);
        }, interval);
    }
    else {
        $el.addClass('num-action-done');
    }
}

