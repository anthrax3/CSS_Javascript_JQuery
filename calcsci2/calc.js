 $(function(){
	inst = {
		prev: null,
		current: null,
		operator: null,
		memory: 0,
	};

	var Calc={
		setOperator:function(op) {
			inst.prev = (inst.current != null )? parseFloat(inst.current) : 0;
			inst.current = inst.null;
			inst.operator = op;
			this.display('');
		},
		display:function(v){
			(isNaN(v))? $("#display").val("Error") : $("#display").val(v);
		},
		getDisplay:function(){
			return $("#display").val();
		},
		clear:function(){
			this.display('');
			inst.prev = null,
			inst.current = null,
			inst.operator = null
		},

		add:function() {
			inst.current = parseFloat(inst.prev + inst.current);
		},
		subtract:function() {
			inst.current = parseFloat(inst.prev - inst.current);
		},
		multiply:function() {
			inst.current = parseFloat(inst.prev * inst.current);
		},
		divide:function() {
			inst.current = parseFloat(inst.prev / inst.current);
		},
		modulo:function() {
			inst.current = parseFloat(inst.prev % inst.current);
		},
		power:function() {
			inst.current = Math.pow(inst.prev, inst.current);
		},
		fact:function() {
			inst.current = Math.fact(inst.current);
			this.display(inst.current);
		},
		sqrt:function() {
			inst.current = Math.sqrt(inst.current);
			this.display(inst.current);
		},
		sin:function() {
			inst.current = Math.sin(inst.current);
			this.display(inst.current);
		},
		cos:function() {
			inst.current = Math.cos(inst.current);
			this.display(inst.current);
		},
		tan:function() {
			inst.current = Math.tan(inst.current);
			this.display(inst.current);
		},
		exp:function() {
			inst.current = Math.exp(inst.current);
			this.display(inst.current);
		},

		memAdd:function() {
			inst.memory += parseFloat(inst.current);
		},
		memSubtract:function() {
			inst.memory -= parseFloat(inst.current);
		},
		memRead:function() {
			inst.current = inst.memory;
			this.display(inst.current);
		},
		memClear:function() {
			inst.memory = 0;
		},
		
		undo: function() {
			inst.current = (inst.current != null)? inst.current.slice(0, -1) : null;
			this.display(inst.current);
		},
		

		doCal:function(val){
			
			switch(val)
			{
					case 'c':
						this.clear();
						break;
					
					case '=':
						switch(inst.operator)
						{
								case '+':
									this.add();
									break;
								case '-':
									this.subtract();
									break;
								case '/':
									this.divide();
									break;
								case '*':
									this.multiply();
									break;
								case '%':
									this.modulo();
									break;
								case 'pui':
									this.power();
									break;
						}
						this.display(inst.current);
						break;
					
					case '+':
					case '-':
					case '/':
					case '*':
					case '%':
					case 'pui':
						this.setOperator(val);
						break;
					
					case 'fac':
						this.fact();
						break;
					case 'rac':
						this.sqrt();
						break;
					
					case 'sin':
						this.sin();
						break;
					case 'cos':
						this.cos();
						break;
					case 'tan':
						this.tan();
						break;
					case 'exp':
						this.exp();
						break;
					
					case 'm+':
						this.memAdd();
						break;
					case 'm-':
						this.memSubtract();
						break;
					case 'mr':
						this.memRead();
						break;
					case 'mc':
						this.memClear();
						break;
					
					case 'del':
						this.undo();
						break;
					
					case '.':
						inst.current += val;
						this.display(inst.current);
						break;
					
					default:
						inst.current = parseFloat(this.getDisplay() + val);
						this.display(inst.current);
					
						break;
						
			}
			console.log(inst);
		}
	};

	$("body").keypress(function(e){
		var whiteList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '*', '/', '%', '.'];
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

	$(".advenced").hide();
	$('#switch').click(function(e){
		e.preventDefault();
		$(".advenced").slideToggle();
	});

	function inArray(tab, element)
	{
		var length = tab.length;
		for(var i = 0; i < length; i++) {
			if(tab[i] == element)
				return true;
		}
		return false;
	};
	 
	Math.fact=function (nb){
		if(isNaN(nb) || nb < 0 || Math.round(nb) != nb)
			return "Error";
		return (nb === 0) ? 1 : nb * this.fact(nb - 1);
	};

});