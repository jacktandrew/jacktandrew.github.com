//<![CDATA[
// this variable will collect the html which will eventually be placed in the side_bar 
// var side_bar_html = "";
// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there 
$(function() {
  $('ul#location_side_bar > li').click(function(){
    var num = +$(this).data('store')
    google.maps.event.trigger(gmarkers[num], "click");
  });
});


var gmarkers = []; 
var map = null;

function initialize() {
    // create the map
    var myOptions = {
        zoom: 11,
        maxZoom: 15,
        minZoom: 10,
        zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
        center: new google.maps.LatLng(47.6585, -122.3376),
        mapTypeControl: false,
        // mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(document.getElementById("location_map_canvas"),myOptions);

    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    var point = new google.maps.LatLng(47.662575, -122.341381);
    var marker = createMarker(point,'<div class="bubble"><p>Wallingford</p><p>4612 Stone Way N</p><p>(between 45th & 50th)</p><p>(206) 297-1334</p><p></p><p>Su-Th: 1pm-9:30pm</p><p>F & Sa: 1pm-10pm</p><p>Delivery: 4:30pm-9pm</p></div>')
    //<img class="facade" src="images/wallingford.jpg"/>

    var point = new google.maps.LatLng(47.615399,-122.312864);
    var marker = createMarker(point,'<div class="bubble"><p>Capitol Hill</p><p>1424 East Pine St</p><p>(at 15th Ave)</p><p>(206) 325-5528</p><p>Everyday: 2pm-10:30pm</p><p>Delivery: 4:30pm-10pm</p></div>')
    //<img class="facade" src="images/capitol.jpg"/>

    var point = new google.maps.LatLng(47.634578,-122.357134);
    var marker = createMarker(point,'<div class="bubble"><p>Queen Anne</p><p>1635 Queen Anne Ave</p><p>(at Blaine St.)</p><p>(206) 787-1198</p><p></p><p>Su-Th: 2pm-9:30pm</p><p>F & Sa: 2pm-10pm</p><p>Delivery: 4:30pm-9pm</p></div>')
    //<img class="facade" src="images/queenanne.jpg"/>

    var point = new google.maps.LatLng(47.623002,-122.330241);
    var marker = createMarker(point,'<div class="bubble"><p>South Lake Union</p><p>434 Yale Avenue N</p><p>(at Republican St.)</p><p>(206) 623-0299</p><p></p><p>Everyday: 3pm-10:30pm</p><p>Delivery: 4:30pm-10pm</p></div>')
    //<img class="facade" src="images/SLU.jpg"/>

    var point = new google.maps.LatLng(47.681905,-122.290209);
    var marker = createMarker(point,'<div class="bubble"><p>Wedgwood</p><p>7320 35th Ave NE</p><p>(at 75th St.)</p><p>(206) 658-2929</p><p></p><p>Su-Th: 1pm-9:30pm</p><p>F & Sa: 1pm-10pm</p><p>Delivery: 4:30pm-9pm</p></div>')
    //<img class="facade" src="images/wedgwood.jpg"/>
    
    var point = new google.maps.LatLng(47.589147, -122.237177);
    var marker = createMarker(point,'<div class="bubble"><p>Mercer Island</p><p>7635 SE 27th Street </p><p>(Tabit Village Square)</p><p>206-232-0515</p><p></p><p>Su-Th: 1pm-9:30pm</p><p>F & Sa: 1pm-10pm</p></div>')
    //<img class="facade" src="images/mercer_island.jpg"/>

  // put the assembled side_bar_html contents into the side_bar div
  // document.getElementById("hide_them").innerHTML = side_bar_html;
}

    var infowindow = new google.maps.InfoWindow({ 
        size: new google.maps.Size(150,50),
        pixelOffset: new google.maps.Size(0,65)
    });

// This function picks up the click and opens the corresponding info window
    // function myclick(i) {
      // google.maps.event.trigger(gmarkers[i], "click");
    // }


    // A function to create the marker and set up the event window function 
    function createMarker(latlng, html) {
        var contentString = html;
        var image = 'images/pin_icon2.png';
        var shadow = 'images/shadow.png';
        var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              icon: image,
              shadow: shadow,
              zIndex: Math.round(latlng.lat()*-100000)<<5
            });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(contentString); 
            infowindow.open(map,marker);
            });
        // save the info we need to use later for the side_bar
        gmarkers.push(marker);
        // add a line to the side_bar html
//        side_bar_html += '<a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + name + '<\/a><br>';
    
    function initPolygons() {
        //Wedgwood Delivery Zone
        var wedgwood;
        var wedgwoodCoords = [
          new google.maps.LatLng(47.70185100781849, -122.3021998167682),
          new google.maps.LatLng(47.69748105166541, -122.3055020572442),
          new google.maps.LatLng(47.69588935329752, -122.3055760190296),
          new google.maps.LatLng(47.69165160037823, -122.3061374362496),
          new google.maps.LatLng(47.6888668947777, -122.3101325378534),
          new google.maps.LatLng(47.68515734621811, -122.3151471973006),
          new google.maps.LatLng(47.68335241176176, -122.3161423942675),
          new google.maps.LatLng(47.68202789740331, -122.3203713819407),
          new google.maps.LatLng(47.67421520935219, -122.3206661326714),
          new google.maps.LatLng(47.67335860255731, -122.3198051764988),
          new google.maps.LatLng(47.67333028048918, -122.3142354461619),
          new google.maps.LatLng(47.67397241467234, -122.3119035062397),
          new google.maps.LatLng(47.67396092523498, -122.3103078001067),
          new google.maps.LatLng(47.67259771302786, -122.3065388759968),
          new google.maps.LatLng(47.67267930642356, -122.3040029982511),
          new google.maps.LatLng(47.67208714188421, -122.3027950309469),
          new google.maps.LatLng(47.67204850690733, -122.3005513811579),
          new google.maps.LatLng(47.66843977609646, -122.3006162109969),
          new google.maps.LatLng(47.6684237117855, -122.2956041785762),
          new google.maps.LatLng(47.66118788136764, -122.2954984393577),
          new google.maps.LatLng(47.66121020535283, -122.2927983002187),
          new google.maps.LatLng(47.65842299311701, -122.2905009973495),
          new google.maps.LatLng(47.65385628741986, -122.2907218377615),
          new google.maps.LatLng(47.65388207172172, -122.2834667701751),
          new google.maps.LatLng(47.64836663078701, -122.2792938801066),
          new google.maps.LatLng(47.64701192685187, -122.2768135396464),
          new google.maps.LatLng(47.64936373546261, -122.2739812400943),
          new google.maps.LatLng(47.65229156284835, -122.2750276821067),
          new google.maps.LatLng(47.65722758337798, -122.2685370005845),
          new google.maps.LatLng(47.66351926267969, -122.2654465159505),
          new google.maps.LatLng(47.66583250671431, -122.2591653337311),
          new google.maps.LatLng(47.67326235157875, -122.2504762788981),
          new google.maps.LatLng(47.68241844055799, -122.2447626952426),
          new google.maps.LatLng(47.68556574427863, -122.2479196838472),
          new google.maps.LatLng(47.69031388427607, -122.2608085764029),
          new google.maps.LatLng(47.69058061434884, -122.2642673075104),
          new google.maps.LatLng(47.69430455848667, -122.2713216602049),
          new google.maps.LatLng(47.69725507667083, -122.2724755247366),
          new google.maps.LatLng(47.70008565426357, -122.2719704807172),
          new google.maps.LatLng(47.70982519352809, -122.2761635894203),
          new google.maps.LatLng(47.70832017129937, -122.2830934427932),
          new google.maps.LatLng(47.7084292595821, -122.3012411435975),
          new google.maps.LatLng(47.70185100781849, -122.3021998167682)
        ];

        // Construct the polygon
        // Note that we don't specify an array or arrays, but instead just
        // a simple array of LatLngs in the paths property
        var wedgwoodOptions = {
          paths: wedgwoodCoords,
          clickable: false,
          strokeColor: "#FF0000",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1
        }
        
        wedgwood = new google.maps.Polygon(wedgwoodOptions);
        wedgwood.setMap(map);
    
        //Wallingford Delivery Zone
        var wallingford;
        var wallingfordCoords = [
          new google.maps.LatLng(47.66556307670495, -122.3932683221606),
          new google.maps.LatLng(47.66528213796934, -122.3887521620189),
          new google.maps.LatLng(47.66326790427604, -122.385263069628),
          new google.maps.LatLng(47.6606451581973, -122.3795905241249),
          new google.maps.LatLng(47.65951212507053, -122.3727762378091),
          new google.maps.LatLng(47.65209081794224, -122.3595917122644),
          new google.maps.LatLng(47.64678138097727, -122.3472289087734),
          new google.maps.LatLng(47.64446082786336, -122.3357559920104),
          new google.maps.LatLng(47.64459661699104, -122.3335136124845),
          new google.maps.LatLng(47.65273628438192, -122.3268085441542),
          new google.maps.LatLng(47.6533515215604, -122.3222054329478),
          new google.maps.LatLng(47.66978099490605, -122.321826523284),
          new google.maps.LatLng(47.67156036335274, -122.3214814300274),
          new google.maps.LatLng(47.67260152892882, -122.3211987610778),
          new google.maps.LatLng(47.67408617337004, -122.3207208351904),
          new google.maps.LatLng(47.67579551027122, -122.3203465768243),
          new google.maps.LatLng(47.67777259876091, -122.3202977909273),
          new google.maps.LatLng(47.67878704046398, -122.3202391925182),
          new google.maps.LatLng(47.6793828170213, -122.3202162600305),
          new google.maps.LatLng(47.68092480293195, -122.3205261859671),
          new google.maps.LatLng(47.68150196354115, -122.3206716048101),
          new google.maps.LatLng(47.68215341472322, -122.3208188797838),
          new google.maps.LatLng(47.68330683662965, -122.3216710556409),
          new google.maps.LatLng(47.68493603101135, -122.3235623710457),
          new google.maps.LatLng(47.68681789099626, -122.3260859036335),
          new google.maps.LatLng(47.69064838956835, -122.3291697442947),
          new google.maps.LatLng(47.69078082832008, -122.3934065804036),
          new google.maps.LatLng(47.66556307670495, -122.3932683221606)
        ];
        
        var wallingfordOptions = {
          paths: wallingfordCoords,
          clickable: false,
          strokeColor: "#00FF00",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#00FF00",
          fillOpacity: 0.1
        }
        
        wallingford = new google.maps.Polygon(wallingfordOptions);
        wallingford.setMap(map);
        

        //queenAnne Delivery Zone
        var queenAnne;
        var queenAnneCoords = [
          new google.maps.LatLng(47.63276520560098, -122.3766169471505),
          new google.maps.LatLng(47.61494288478701, -122.354766025199),
          new google.maps.LatLng(47.60845307041374, -122.3440011178427),
          new google.maps.LatLng(47.61300520824731, -122.3379293023968),
          new google.maps.LatLng(47.61681902824596, -122.3439400826785),
          new google.maps.LatLng(47.62457691755593, -122.3439249577494),
          new google.maps.LatLng(47.63397868078395, -122.3435003195184),
          new google.maps.LatLng(47.6358883552635, -122.3435173364317),
          new google.maps.LatLng(47.63703750068576, -122.3440987871098),
          new google.maps.LatLng(47.63912276282888, -122.3455490581153),
          new google.maps.LatLng(47.64074706403646, -122.3463609663022),
          new google.maps.LatLng(47.6440725564892, -122.347380886129),
          new google.maps.LatLng(47.64550818107805, -122.3473816374453),
          new google.maps.LatLng(47.64682269278438, -122.3473846188536),
          new google.maps.LatLng(47.65138050407877, -122.3580858164941),
          new google.maps.LatLng(47.65240145975419, -122.3601126316553),
          new google.maps.LatLng(47.65955889170868, -122.3728588943063),
          new google.maps.LatLng(47.66001099073473, -122.3762386214794),
          new google.maps.LatLng(47.63276520560098, -122.3766169471505)
        ];

        var queenAnneOptions = {
          paths: queenAnneCoords,
          clickable: false,          
          strokeColor: "#FFFF00",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#FFFF00",
          fillOpacity: 0.1
        }
        
        queenAnne = new google.maps.Polygon(queenAnneOptions);
        queenAnne.setMap(map);

        //capitolHill Delivery Zone
        var capitolHill;
        var capitolHillCoords = [
          new google.maps.LatLng(47.62836934893917, -122.3274726446033),
          new google.maps.LatLng(47.62636731174677, -122.3277435652745),
          new google.maps.LatLng(47.62006114272849, -122.3283198050181),
          new google.maps.LatLng(47.61237372367998, -122.3308131406868),
          new google.maps.LatLng(47.60886062343092, -122.3309506142577),
          new google.maps.LatLng(47.60716499917202, -122.3298711523154),
          new google.maps.LatLng(47.60443782728383, -122.3272846610312),
          new google.maps.LatLng(47.60819153291478, -122.3181554048325),
          new google.maps.LatLng(47.60808038621649, -122.3032651869719),
          new google.maps.LatLng(47.60788846581925, -122.2861717091302),
          new google.maps.LatLng(47.61093227907975, -122.2860301858276),
          new google.maps.LatLng(47.6111233385198, -122.2864952668587),
          new google.maps.LatLng(47.6115797971494, -122.2865684590316),
          new google.maps.LatLng(47.61202563792921, -122.2859833188402),
          new google.maps.LatLng(47.61280015787352, -122.2860104611878),
          new google.maps.LatLng(47.61279920183944, -122.2848942522053),
          new google.maps.LatLng(47.61347693725997, -122.284782187933),
          new google.maps.LatLng(47.61397861826841, -122.2848679093173),
          new google.maps.LatLng(47.61418025745439, -122.2848883818171),
          new google.maps.LatLng(47.61458361640539, -122.2852440196302),
          new google.maps.LatLng(47.61648029116392, -122.2852289490191),
          new google.maps.LatLng(47.61644301130326, -122.2832198555234),
          new google.maps.LatLng(47.61766568679634, -122.2825966817696),
          new google.maps.LatLng(47.61757019131704, -122.2832052383199),
          new google.maps.LatLng(47.61890158103385, -122.2824165997421),
          new google.maps.LatLng(47.62072837912755, -122.2827780979967),
          new google.maps.LatLng(47.62120288097941, -122.2830088093638),
          new google.maps.LatLng(47.62550431387371, -122.2815044710625),
          new google.maps.LatLng(47.63055902178795, -122.275170064188),
          new google.maps.LatLng(47.64280662764554, -122.2749080901979),
          new google.maps.LatLng(47.64273727136453, -122.2853211365396),
          new google.maps.LatLng(47.64050167258968, -122.2966473118842),
          new google.maps.LatLng(47.62611925671074, -122.2921725128325),
          new google.maps.LatLng(47.62415635097148, -122.2952001366386),
          new google.maps.LatLng(47.6244792175204, -122.2955073421676),
          new google.maps.LatLng(47.6251328374776, -122.2955429573455),
          new google.maps.LatLng(47.62524357193826, -122.295147052773),
          new google.maps.LatLng(47.62587815377321, -122.2950840312184),
          new google.maps.LatLng(47.62660296980749, -122.2950564261926),
          new google.maps.LatLng(47.62735517791303, -122.2963263288731),
          new google.maps.LatLng(47.62860951487976, -122.2968512707793),
          new google.maps.LatLng(47.62881130786761, -122.297127237328),
          new google.maps.LatLng(47.62941253479143, -122.2988288578926),
          new google.maps.LatLng(47.62961286245682, -122.2989830484994),
          new google.maps.LatLng(47.63187064658042, -122.2989923586502),
          new google.maps.LatLng(47.63217172005957, -122.2991007888973),
          new google.maps.LatLng(47.63228400407446, -122.299686112623),
          new google.maps.LatLng(47.63230298642662, -122.3016219466421),
          new google.maps.LatLng(47.63314667654879, -122.3025309363793),
          new google.maps.LatLng(47.63321513437845, -122.3059638417517),
          new google.maps.LatLng(47.63301497885367, -122.3064674890025),
          new google.maps.LatLng(47.63267767661186, -122.3068561896516),
          new google.maps.LatLng(47.6324047850448, -122.3072322752598),
          new google.maps.LatLng(47.63231714283741, -122.3074529860629),
          new google.maps.LatLng(47.63944746033056, -122.3154851790984),
          new google.maps.LatLng(47.63950667762322, -122.3160856708005),
          new google.maps.LatLng(47.63953966301859, -122.3222759339695),
          new google.maps.LatLng(47.63740938714818, -122.3224140093765),
          new google.maps.LatLng(47.63324192943882, -122.3236089688789),
          new google.maps.LatLng(47.62836934893917, -122.3274726446033)
        ];
        
        var capitolHillOptions = {
          paths: capitolHillCoords,
          clickable: false,              
          strokeColor: "#E100FF",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#E100FF",
          fillOpacity: 0.1
        }
        
        capitolHill = new google.maps.Polygon(capitolHillOptions);
        capitolHill.setMap(map);

        //South Lake Delivery Zone
        var southLake;
        var southLakeCoords = [
          new google.maps.LatLng(47.63395560911968, -122.3435173732465),
          new google.maps.LatLng(47.62653268637478, -122.3437577838651),
          new google.maps.LatLng(47.6243925363532, -122.3438509649012),
          new google.maps.LatLng(47.6185690037825, -122.3439504922582),
          new google.maps.LatLng(47.61829341622197, -122.3439281838175),
          new google.maps.LatLng(47.61748262640786, -122.3439526286597),
          new google.maps.LatLng(47.61684000411748, -122.3439305243188),
          new google.maps.LatLng(47.61424222145813, -122.3399321615214),
          new google.maps.LatLng(47.61304759027062, -122.3379271415499),
          new google.maps.LatLng(47.61093005263595, -122.3404737518877),
          new google.maps.LatLng(47.60814259707998, -122.3378389952956),
          new google.maps.LatLng(47.61128839307519, -122.3308556974567),
          new google.maps.LatLng(47.60803327595292, -122.3306517802586),
          new google.maps.LatLng(47.60877640864826, -122.3309413309724),
          new google.maps.LatLng(47.61270965325208, -122.3306242229152),
          new google.maps.LatLng(47.61614626361197, -122.3290059817537),
          new google.maps.LatLng(47.61836206132381, -122.3284615417972),
          new google.maps.LatLng(47.6220979093116, -122.3285004778033),
          new google.maps.LatLng(47.62842828497158, -122.3275220269813),
          new google.maps.LatLng(47.6305172658515, -122.3255808291025),
          new google.maps.LatLng(47.63324807301526, -122.3236386138446),
          new google.maps.LatLng(47.63759566801419, -122.3223938291311),
          new google.maps.LatLng(47.63982813994178, -122.3223100818729),
          new google.maps.LatLng(47.64317498919802, -122.3224828564724),
          new google.maps.LatLng(47.64320591639085, -122.3230114782142),
          new google.maps.LatLng(47.64320443370303, -122.3242293973134),
          new google.maps.LatLng(47.64318592059792, -122.3253158494161),
          new google.maps.LatLng(47.64320360027207, -122.3271133132016),
          new google.maps.LatLng(47.64318333016693, -122.3290599834122),
          new google.maps.LatLng(47.64313482063471, -122.3297737335021),
          new google.maps.LatLng(47.64155309789508, -122.3306831360619),
          new google.maps.LatLng(47.63985569767946, -122.3311135711506),
          new google.maps.LatLng(47.63780361408136, -122.3309802068783),
          new google.maps.LatLng(47.63472909276534, -122.3303623546214),
          new google.maps.LatLng(47.6315926258425, -122.3304868313408),
          new google.maps.LatLng(47.62959598639465, -122.3329183813694),
          new google.maps.LatLng(47.62623968884076, -122.3384250028675),
          new google.maps.LatLng(47.63400151454819, -122.3385481167527),
          new google.maps.LatLng(47.63395560911968, -122.3435173732465)
        ];
        
        var southLakeOptions = {
          paths: southLakeCoords,
          clickable: false,              
          strokeColor: "#1100FF",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#1100FF",
          fillOpacity: 0.1
        }
        
        southLake = new google.maps.Polygon(southLakeOptions);
        southLake.setMap(map);
     }
        initPolygons();
    }

    

