//mustache
var templateListItem = document.getElementById('template-list-item').innerHTML;
Mustache.parse(templateListItem);
var listItems = '';
for (var i = 0; i < sliderData.length; i++) {
    listItems += Mustache.render(templateListItem, sliderData[i]);
}
console.log(listItems);

var results = document.getElementById('results');
results.insertAdjacentHTML('beforeend', listItems);


// carousel

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true
});

// button previous

var buttonRestart = document.querySelector('.button');

buttonRestart.addEventListener('click', function(event) {
    flkty.select(0);
});

// scroll

var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function(progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

// map
// Initialize and add the map
window.initMap =  function() {
    
    var coordinations = sliderData[i].coords;
    
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 3,
            center: coordinations
        });
    var marker = new google.maps.Marker({
        position: coordinations,
        map: map
    });
    for (var i = 0; i < sliderData.length; i++) {
        var coordinations = sliderData[i].coords;
        var marker = new google.maps.Marker({
            position: coordinations,
            map: map
        });
        console.log(coordinations);
    };
};
