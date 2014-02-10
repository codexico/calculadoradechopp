/* Author: codexico
Version: 0.1 - 20120131
Version: 0.2 - 20120131 - habilidade
*/

var GERBO = {
	init : function () {
		$("#calculadora input").change(function (event) {
			GERBO.resultado();
		});
		
		$("#calculadora").submit(function (event) {
			event.preventDefault();
			GERBO.resultado();
		});
		
		GERBO.rangeNotSupported();
		GERBO.resultado();
		
		$('#submit').hide();//desnecessario
	},
	
	calcular : function () {
		var resultado = {};
		//numpessoas * duracao * 300ml * habilidade
		resultado.calc = $("#numpessoas").val() * $("#duracao").val() * 1 * $(":checked").val();
		
		resultado.chopp = Math.ceil(resultado.calc);
		resultado.garrafas = Math.ceil(resultado.chopp / 0.6);
		resultado.latinhas = Math.ceil(resultado.chopp / 0.35);
		//log(resultado.chopp)
		return resultado;
	},
	
	resultado : function () {
		var resultado = GERBO.calcular();
		$("#result .chopp").empty().append(resultado.chopp);
		$("#result .garrafas").empty().append(parseInt(resultado.garrafas, 10));
		$("#result .latinhas").empty().append(parseInt(resultado.latinhas, 10));
	},
	
	rangeNotSupported : function () {
		//http://pietschsoft.com/post/2010/11/22/HTML5-Day-6-New-Range-Input-Type-3cinput-type3drange-3e.aspx
		// Check if browser supports <input type=range/>
		var i, rangeNotSupported;
		i = document.createElement("input");
		i.setAttribute("type", "range");
		rangeNotSupported = (i.type === "text");
		
		// If browser doesn't support <input type=range/>
		// then use jQuery UI to display them
		if (rangeNotSupported) {
			// loop through all <input type=range/>
			// on the page
			$("input[type=range]").each(function () {
				var range, $sliderVal, sliderValId, $sliderDiv;
				range = $(this);
				sliderValId = range.attr("id") + '_val';
				$sliderVal = $('<span id="' + sliderValId + '" class="range_val"/>').append(range.val());
				
				// Create <div/> to hold jQuery UI Slider
				$sliderDiv = $("<div/>");
				$sliderDiv.width(range.width());
				
				// Insert jQuery UI Slider where the
				// <input type=range/> is located
				range.after(
					$sliderDiv.slider({
						// Set values that are set declaratively
						// in the <input type=range/> element
						min: parseFloat(range.attr("min")),
						max: parseFloat(range.attr("max")),
						value: parseFloat(range.val()),
						step: parseFloat(range.attr("step")),
						// Update the <input type=range/> when
						// value of slider changes
						slide: function (evt, ui) {
							range.val(ui.value);
							//log(ui.value)
							$sliderVal.html(ui.value);
							GERBO.resultado();
						},
						change: function (evt, ui) {
							// set <input type=range/> value
							range.val(ui.value);
							//log(ui.value)
							$sliderVal.html(ui.value);
							GERBO.resultado();
						}
					})
				).
				// Hide <input type=range/> from display
				hide();
				$sliderDiv.siblings('label').find('output').remove();
				$sliderDiv.siblings('label').find('span').html($sliderVal);
			});
		}
	}
};

$(document).ready(function () {
	GERBO.init();
});