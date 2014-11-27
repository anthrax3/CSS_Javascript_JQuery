$(function(){
	memoire = 0;
	var Calc={
		display:function(v){
			$("#display").val(v);
		},
		clear:function(){
			$("#display").val(" ");
		},
		doCal:function(val){
			var result="";
			var dtemp=$("#display").val();
			if(dtemp=="0"){
				this.clear();
				result=val;
			}else if(val=="c"){
				this.clear();
				result = 0
			}else if(val=="="){
				result=eval(dtemp);
			}else if(val=="m+"){
				result = dtemp;
				memoire += parseFloat(result);
			}else if(val=="m-"){
				result = dtemp;
				memoire -= parseFloat(result);
			}else if(val=="mr"){
				result = memoire;
			}else if(val=="mc"){
				memoire = 0;
				result = dtemp;
			}else if(val=="del"){
				result=dtemp.slice(0, -1);
			}else{
				result=dtemp+val;
			}
			this.display(result);
		}
	};

	$("body").keypress(function(e){
		var whiteList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '*', '/', '(', ')', '%', '.'];
		var button = String.fromCharCode(e.which);
		var code = e.charCode;
		console.log(code);

		if (code == 61) {
			Calc.doCal("=");
		} else {
			if (inArray(whiteList, button)) {
				Calc.doCal(String.fromCharCode(e.which));
			}
		}
	});

	$('.calc button').click(function(e){
		e.preventDefault();
		Calc.doCal(this.value);
	});

	function inArray(haystack, needle)
	{
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	};
});