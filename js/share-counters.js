$(document).ready(function() {
    var url = location.protocol + '//' + location.hostname + location.pathname;
    console.log(url);
    var pageuri = 'http://amalgama-web.ru/kidsbookia/meeting.html';
    var pageuri = url;
    $.getJSON('http://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + pageuri + '&format=json', function(data) {
            $('.fb-counter').text(data[0].share_count);
    });
    VK = {};
    VK.Share = {};
    VK.Share.count = function(index, count){
        $('.vk-counter').text(count);
    };
    $.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + pageuri + '&format=json&callback=?');
    $('.tw-counter').text(0);

    $.ajax({
        url: 'https://cdn.api.twitter.com/1/urls/count.json?url=' + url,
        dataType: 'jsonp',
        success: function(data) {
            console.log('ajax response ' + data.count);
            $('.tw-counter').text(data.count || 0);
        }
    });
    // $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + pageuri + '&callback=?', function(data) {
    //     $('.tw-counter').text(data.count);
    // });
    // $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + pageuri + '&callback=?', function(data) {
    //     $('.tw-counter').text(data.count);
    // });
});

