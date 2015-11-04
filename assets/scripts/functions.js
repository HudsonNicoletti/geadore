(function($){
    
    $(document).ready(function(){
        
        var $window           = $(window),
            $body             = $("body"),
            $html             = $("html"),
            $htmlbody         = $("html, body"),
            $sliderContainer  = $('.slides'),
            $slider           = $sliderContainer.find("ul"),
            $header           = $("header"),
            $headerNav        = $header.find("nav"),
            $headerNavUl      = $headerNav.find("ul"),
            $headerNavLi      = $headerNavUl.find("li"),
            $mobileToggle     = $headerNav.find(".menu-toggle"),
            $scrollBtn        = $(".scroll-top"),
            $productsWrap     = $(".products"),
            $product          = $productsWrap.find(".product"),
            $productPPO       = $body.find(".productPopup-overlay"),
            $productPP        = $body.find(".productPopup"),
            SliderConfig      = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : false,
                paginationSpeed : 400,
                singleItem: true,
                stopOnHover: true,
                addClassActive: false
            };
        
        function fixedHeader( offset )
        {
            
            if( offset >= $sliderContainer.height() )
            {
                $header.css({
                    'position' : 'fixed',
                    'top'      : 0
                });
            }
            if( offset < $sliderContainer.height() )
            {
                $header.css({
                    'position' : 'relative'
                });
            }
            
        }
        
        function sliderInit()
        {
            var owl = $slider.owlCarousel(SliderConfig);
            
            return owl;
        }
        
        function toggleMenu()
        {
            if( $headerNavUl.hasClass("active") )
            {
                $headerNavUl.removeClass("active").css({
                    'display' : 'none'
                });
            }
            else
            {                
                $headerNavUl.addClass("active").css({
                    'display' : 'flex'
                });
            }
        }
        
        function googlemaps()
        {   
            var coords = [
                { title: "Ge' Adore" , phone: "43 3377.1600" , lat: -23.3178821, lng: -51.1645811 }
            ];

            var map = new google.maps.Map(document.getElementById('googleMap'),{
                center: { lat: -23.3178821, lng: -51.1645811 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
		    	style: google.maps.ZoomControlStyle.LARGE,
		    },
                scrollwheel: false,
                draggable: false,
                zoom: 18
            });

            for(var i = 0; i < coords.length; i++ )
            {

                var infoWindow = new google.maps.InfoWindow(),
                    position   = new google.maps.LatLng(coords[i].lat, coords[i].lng),
                    marker     = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: 'Metacon Engenharia',
                        icon : {
                            url: 'assets/images/marker.png',
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(40,68)    // 27 for Px from the X axis (tip of pointer) and 42 For Px from the Y axis (Height)
                        }
                    });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent("<div class='marker'><div class='marker-title'>"+coords[i].title+"</div><div class='marker-phone'><h3>Telefone: </h3><span>"+coords[i].phone+"</span></div></div>");
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

            }

        }
        
        function scrollTopVisibility(offset)
        {

            if( offset > $sliderContainer.height())
            {            
                $scrollBtn.css({
                    'opacity' : 1
                });            
            }
            if( offset < $sliderContainer.height() )
            {
                $scrollBtn.css({
                    'opacity' : 0
                });         
            }
        }
        
        sliderInit();
        
        $mobileToggle.on("click", function(){
            toggleMenu();   
        });

        $scrollBtn.on("click", function(){
            $htmlbody.animate({
                scrollTop : 0
            },800);

            return false;
        })

        $window.scroll(function(){
            var offset = $(window).scrollTop();

            fixedHeader( offset );
            scrollTopVisibility(offset);
        });
        
        
        if( $body.hasClass("home") )
        {
            google.maps.event.addDomListener(window, 'load', googlemaps() );
        }
        
        if( $body.hasClass("product-page") )
        {
            $product.each(function(){
                
                var img = $(this).find("img").attr("src");
                
                $(this).find("a.zoom").on("click", function(){
                    
                    $productPPO.css({
                        'display' : 'block'
                    });
                    
                    $productPP.css({
                        'display' : 'block'
                    });
                    
                    $productPP.find(".contents img").attr("src", img);
                    
                });
                
            });
            
            $productPPO.on("click", function(){
                
                    $productPPO.css({
                        'display' : 'none'
                    });
                    
                    $productPP.css({
                        'display' : 'none'
                    });
                    
                    $productPP.find(".contents img").attr("src", "");
                
            });
            
            $productPP.find("a.toggle").on("click", function(){
                
                    $productPPO.css({
                        'display' : 'none'
                    });
                    
                    $productPP.css({
                        'display' : 'none'
                    });
                    
                    $productPP.find(".contents img").attr("src", "");
                
            });
        }
        
        if( $body.hasClass("contact") )
        {
            google.maps.event.addDomListener(window, 'load', googlemaps() );
        }
        
    });
    
})(jQuery)