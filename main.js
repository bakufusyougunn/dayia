/**
 * Created by iOnly on 2017/1/20.
 */

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function openUrl(url) {
    window.open(url, 'Share_page', 'width = 550, height = 400, toolbar = 0, scrollbar = 1, statusbar = 0, location = 0, menubar = 0, resizable = 0');
}

var newQuote = '',
    newAuthor = '';

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "3o1U7cB8rtmshf9iqXqPHnUIbjcBp15bNjLjsnPMmzbogTMxdq",
            Accpet: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
        success: function (response) {
            var quotes = JSON.parse(response);
            newAuthor = quotes.author;
            newQuote = quotes.quote;
            $('.btn-secondary').attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
            $('.quote_text').animate({opacity:0}, 500, function () {
                $(this).animate({opacity:1},500);
                $('.quote_text').text(newQuote);
            });

            $('.quote_author').animate({opacity:0}, 500, function () {
                $(this).animate({opacity:1},500);
                $('.quote_author').text(newAuthor);
            });
        }
    });
}

$(document).ready(function () {
    $('.dayia_display').height($(window).height());
    $(window).on('resize', function () {
        $('.dayia_display').height($(window).height());
    });
    getQuote();
    $('.btn-info').on("click", getQuote);
    $('.btn-secondary').on("click", function () {
        if(!inIframe){
            openUrl('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
        }
    });
});