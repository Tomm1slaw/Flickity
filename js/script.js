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

    var marker = [];
    
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 3,
            center: sliderData[1].coords
        });

    for (var i = 0; i < sliderData.length; i++) {
        var coordinations = sliderData[i].coords;
        marker [i]= new google.maps.Marker({
            position: coordinations,
            map: map
        });
        addClickToMarker(marker[i], i);
    };

// change slide after click marker

    function addClickToMarker(marker, index) {
            marker.addListener('click', function(){
                console.log('Index', index);
                flkty.select(index);
            });
        }

// center map after change active slide

    flkty.on( 'change', function( index ) {
          map.panTo(sliderData[index].coords);
          map.setZoom(10);
          console.log('Change to' + sliderData[index].coords)
        });
};
