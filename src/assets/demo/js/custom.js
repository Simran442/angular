$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
	loop: true,
	margin: 10,
	responsiveClass: true,
	autoplay:true,
    autoplayTimeout:5000,
	responsive: {
	  0: {
		items: 2,
		nav: true
	  },
	  600: {
		items: 3,
		nav: false
	  },
	  1000: {
		items: 3,
		nav: true,
		loop: false,
		margin: 20
	  }
	}
  })
})
        