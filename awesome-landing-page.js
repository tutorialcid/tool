/*!

 =========================================================
 * Awesome Landing Page - v1.2.2
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/awesome-landing-page
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/awesome-landing-page/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

        var big_image;
        $().ready(function() {
            $('.selector').click(function() {
                SelectColor(this);
            });
            var selectCol = 0;
            if (selectCol == 0) {
                if ($('body').hasClass('landing-page1')) {

                }
            }

        });

        $(window).on('scroll', function() {
            responsive = $(window).width();
            if (responsive >= 768) {
                parallax();
            }
        });

        function SelectColor(btn) {
            oldColor = $('.filter-gradient').attr('data-color');
            newColor = $(btn).attr('data-color');

            oldButton = $('a[id^="Demo"]').attr('data-button');
            newButton = $(btn).attr('data-button');

            $('.filter-gradient').removeClass(oldColor).addClass(newColor).attr('data-color', newColor);

            $('a[id^="Demo"]').removeClass("btn-" + oldButton).addClass("btn-" + newButton).attr('data-button', newButton);

            $('.carousel-indicators').removeClass("carousel-indicators-" + oldColor).addClass("carousel-indicators-" + newColor);

            $('.card').removeClass("card-" + oldColor).addClass("card-" + newColor);

            $('.selector').removeClass('active');
            $(btn).addClass('active');
        }

        $('.switch').each(function() {
            var selector = $(this).parent('li')
            $(this).click(function() {
                if (selector.siblings().hasClass('active')) {
                    selector.addClass('active');
                    selector.siblings().removeClass('active');
                    var slide = $(this).attr('data-slide')
                    var lastClass = $('body').attr('class').split(' ').pop();
                    $('body').removeClass(lastClass);
                    $('body').addClass('landing-page' + slide);
                }
            });
        });

        var parallax = debounce(function() {
            no_of_elements = 0;
            $('.parallax').each(function() {
                var $elem = $(this);

                if (isElementInViewport($elem)) {
                    var parent_top = $elem.offset().top;
                    var window_bottom = $(window).scrollTop();
                    var $image = $elem.find('.parallax-background-image')
                    var $oVal = ((window_bottom - parent_top) / 3);
                    $image.css('margin-top', $oVal + 'px');
                }
            });
        }, 6)

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        };


        function isElementInViewport(elem) {
            var $elem = $(elem);

            // Get the scroll position of the page.
            var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
            var viewportTop = $(scrollElem).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            // Get the position of the element on the page.
            var elemTop = Math.round($elem.offset().top);
            var elemBottom = elemTop + $elem.height();

            return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
        }
		
		
		function Func_register() {
			
			document.getElementById("form_download").style.display = "none";
			document.getElementById("form_register").style.display = "";
			document.getElementsByClassName("disableregistdownload")[0].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[1].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[2].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[3].style.display = "none";

			 $.notify({
				  icon: "tim-icons icon-bell-55",
				  message: " Info ! <br> &nbsp;&nbsp;&nbsp;&nbsp; Silahkan lakukan registrasi dan langkah aktivasi. <br> &nbsp;&nbsp;&nbsp;&nbsp; Masa aktif Credit akan mengikuti masa aktif akun."

				}, {
				  type: "info",
				  timer: 1000,
				  placement: {
					from: 'top',
					align: 'align-right'
				  }
				});
						
		$('#formRegister').submit(function(e){
		e.preventDefault();
		var dataform = $(this).serialize();
		var delayInMilliseconds = 3500; //1 second
			$.ajax({
				url: base_url + 'home/register',
				type: "post",
				data: dataform,
				success: function(data) {
				 $.notify({
					  icon: "tim-icons icon-bell-55",
					  message: " Sukses ! <br> &nbsp;&nbsp;&nbsp;&nbsp; Anda telah terdaftar. <br> &nbsp;&nbsp;&nbsp;&nbsp; Anda akan segera diarahkan ke halaman Dashboard."

					}, {
					  type: "success",
					  timer: 1000,
					  placement: {
						from: 'top',
						align: 'align-right'
					  }
					});
					setTimeout(function()
					{
					 $.ajax({
						 url: base_url + 'login/masuk',
						 type: "post",
						 data: {
						 'username': document.getElementsByName('username')[0].value,
						 'password': document.getElementsByName('password')[0].value
						 },
						 success: function(data){
							 if (data.type == 'danger')
							 {
								 $.notify({
									  icon: "tim-icons icon-bell-55",
									  message: data.messages

									}, {
									  type: data.type,
									  timer: 100,
									  placement: {
										from: 'top',
										align: 'align-right'
									  }
									});
							 }
							 else
							 {
								 window.setTimeout( function(){
								 window.location = 'dashboard';
								 }, 100 );
							 }
						 
						}
					 });
					}, delayInMilliseconds);
				}
			});
		});

		}
		
		/* Fungsi formatRupiah */
		function formatRupiah(angka, prefix){
			var number_string = angka.toString(),
			split   		= number_string.split(','),
			sisa     		= split[0].length % 3,
			rupiah     		= split[0].substr(0, sisa),
			ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
			// tambahkan titik jika yang di input sudah menjadi angka ribuan
			if(ribuan){
				separator = sisa ? '.' : '';
				rupiah += separator + ribuan.join('.');
			}
 
			rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
			return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
		}
		
		function Func_download() {
			
			document.getElementById("form_register").style.display = "none";
			document.getElementById("form_download").style.display = "";
			document.getElementsByClassName("disableregistdownload")[0].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[1].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[2].style.display = "none";
			document.getElementsByClassName("disableregistdownload")[3].style.display = "none";

		$('#formDownload').submit(function(e){
		e.preventDefault();
			e.preventDefault();
		});

		}

		function Func_close() {
			
			document.getElementById("form_register").style.display = "none";
			document.getElementById("form_download").style.display = "none";
			document.getElementsByClassName("disableregistdownload")[0].style.display = "";
			document.getElementsByClassName("disableregistdownload")[1].style.display = "";
			document.getElementsByClassName("disableregistdownload")[2].style.display = "";
			document.getElementsByClassName("disableregistdownload")[3].style.display = "";
		}
		function Func_total() {
			if(document.getElementsByName("credit")[0].value == 0 || document.getElementsByName("credit")[0].value == -1)
			{
				document.getElementsByName("credit")[0].value = 0;
			}
			
			switch(document.getElementsByName("langganan")[0].value) {
				case '1':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. '));
				break;
				case '2':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 75000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 75000, 'Rp. '));
				break;
				case '3':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 130000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 130000, 'Rp. '));
				break;
				case '6':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 200000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 200000, 'Rp. '));
				break;
				case '12':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 350000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 350000, 'Rp. '));
				break;
				default:
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. '));
				}
			}
		
		$(document).on('keypress', '.form-control.credit', function(e) {
			if(document.getElementsByName("credit")[0].value == 0 || document.getElementsByName("credit")[0].value == -1)
			{
				document.getElementsByName("credit")[0].value = 0;
			}
			
			switch(document.getElementsByName("langganan")[0].value) {
				case '1':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. '));
				break;
				case '2':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 75000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 75000, 'Rp. '));
				break;
				case '3':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 130000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 130000, 'Rp. '));
				break;
				case '6':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 200000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 200000, 'Rp. '));
				break;
				case '12':
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 350000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 350000, 'Rp. '));
				break;
				default:
				// code block
				document.getElementsByName("totalcredit")[0].value = formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. ');
				console.log(formatRupiah((30000 * document.getElementsByName("credit")[0].value) + 50000, 'Rp. '));
				}
		});
