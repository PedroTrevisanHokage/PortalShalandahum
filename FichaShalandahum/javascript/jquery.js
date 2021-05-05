$(document).ready(function () {
	
	SetarValoresIniciais();
	AcoesBtnPlusMinus();
	CalcularPVs();
	AcoesBtnTeste();
	AtribuirOnChange();
	AtribuirAcoesCombate();
	AtribuirAcoesEmBotoes();

	ChangePericias();

	DesabilitaMinusZerados(); //Essa função tem que ficar sempre por último, pois tem que fazer a verificação somente após retornar todos valores do banco (qdo for implementado)
	
	DesabilitarBotoesArma();

	function rolarD10(explodir){
		var d10 = parseInt(Math.floor(Math.random() * 10));
		if(d10 == 0){
			d10 = 10;
		}
		
		var resultadoConsolidado = d10;
		
		//------ REGRA DE EXCPLOSÃO DE DADO ------
		//Em casos diferentes de teste de habilidades, 
		//caso rolar um d10 e o resultado for '10' rola-se o dado novamente, até que o resultado seja diferente de 10, 
		//então soma-se tudo
		//-----------------------------------------
		if(explodir){ 
			while(d10 == 10){
				
				d10 = parseInt(Math.floor(Math.random() * 10));
				if(d10 == 0){
					d10 = 10;
				}
				
				resultadoConsolidado += d10;
			}
		}		

		return resultadoConsolidado;
	}

	function RolarQualquerDado(valor){
		var dado = parseInt(Math.floor(Math.random() * valor));
		
		if(dado == 0){
			dado = valor;
		}

		return dado;
	}

	function SetarValoresIniciais(){
		$('#inputptsDisp').val("20");
		
		/*Atributos*/
		$('#inputFOR').val("0"); 
		$('#inputFOR').val("0"); 
		$('#inputDES').val("0"); 
		$('#inputINT').val("0"); 
		$('#inputVIG').val("0"); 
		$('#inputSENT').val("0");
		$('#inputCAR').val("0"); 
		$('#inputALMA').val("0");
		$('#inputFE').val("0"); 
		$('#inputESF').val("0"); 
		$('#inputPV').val("0"); 
		
		/*Equipamentos*/
	}

	function AtribuirAcoesEmBotoes(){
		$("#btnModalCarregarDados").click(function () {
			//ReceberInfosHeroi();
			lerHeroiJson();
		});
		
		$("#btnSalvarDadosHeroi").click(function () {
			PrepararDadosHeroi();
		});

		/*perícias*/
		$("#btnPerAcro").click(function () {
			testarPericia("Acrobacia", "DES", $("#inputAcrobacia").val(), $("#inputBonusAcrobacia").val());
		});

		$("#btnPerAnimais").click(function () {
			testarPericia("Animais", "CAR", $("#inputAnimais").val(), $("#inputBonusAnimais").val());
		});

		$("#btnPerAtletismo").click(function () {
			testarPericia("Atletismo", "FOR", $("#inputAtletismo").val(), $("#inputBonusAtletismo").val());
		});

		$("#btnPerAtuacao").click(function () {
			testarPericia("Atuação", "CAR", $("#inputAtuacao").val(), $("#inputBonusAtuacao").val());
		});

		$("#btnPerDiplomacia").click(function () {
			testarPericia("Diplomacia", "CAR", $("#inputDiplomacia").val(), $("#inputBonusDiplomacia").val());
		});

		$("#btnPerEnganacao").click(function () {
			testarPericia("Enganação", "CAR", $("#inputEnganacao").val(), $("#inputBonusEnganacao").val());
		});

		$("#btnPerEngenharia").click(function () {
			testarPericia("Engenharia", "INT", $("#inputEngenharia").val(), $("#inputBonusEngenharia").val());
		});

		$("#btnPerFurtividade").click(function () {
			testarPericia("Furtividade", "DES", $("#inputFurtividade").val(), $("#inputBonusFurtividade").val());
		});

		$("#btnPerHistoria").click(function () {
			testarPericia("História", "INT", $("#inputHistoria").val(), $("#inputBonusHistoria").val());
		});

		$("#btnPerIntimidacao").click(function () {
			testarPericia("Intimidação", "CAR", $("#inputIntimidacao").val(), $("#inputBonusIntimidacao").val());
		});

		$("#btnPerIntuicao").click(function () {
			testarPericia("Intuição", "SENT", $("#inputIntuicao").val(), $("#inputBonusIntuicao").val());
		});

		$("#btnPerInvestigacao").click(function () {
			testarPericia("Investigação", "SENT", $("#inputInvestigacao").val(), $("#inputBonusInvestigacao").val());
		});

		$("#btnPerMedicina").click(function () {
			testarPericia("Medicina", "INT", $("#inputMedicina").val(), $("#inputBonusMedicina").val());
		});

		$("#btnPerArcanismo").click(function () {
			testarPericia("Misticismo", "INT", $("#inputArcanismo").val(), $("#inputBonusArcanismo").val());
		});

		$("#btnPerNatureza").click(function () {
			testarPericia("Natureza", "INT", $("#inputNatureza").val(), $("#inputBonusNatureza").val());
		});

		$("#btnPerPersepcao").click(function () {
			testarPericia("Persepção", "SENT", $("#inputPersepcao").val(), $("#inputBonusPersepcao").val());
		});

		$("#btnPerPersuasao").click(function () {
			testarPericia("Persuasão", "CAR", $("#inputPersuasao").val(), $("#inputBonusPersuasao").val());
		});

		$("#btnPerPilotagem").click(function () {
			testarPericia("Pilotagem", "DES", $("#inputPilotagem").val(), $("#inputBonusPilotagem").val());
		});

		$("#btnPerReligiao").click(function () {
			testarPericia("Religião", "INT", $("#inputReligiao").val(), $("#inputBonusReligiao").val());
		});

		$("#btnPerSobrevivencia").click(function () {
			testarPericia("Sobrevivência", "INT", $("#inputSobrevivencia").val(), $("#inputBonusSobrevivencia").val());
		});
		
		$("#btnGerarNPC").click(function () {
			GerarNPC();
		});
	}
		
	function DesabilitarBotoesArma(){
		$("#btnVrau1CC").prop("disabled", true);
		$("#btnVrau2CC").prop("disabled", true);
		$("#btnVrau3CC").prop("disabled", true);

		$("#btnVrau1DIS").prop("disabled", true);
		$("#btnVrau2DIS").prop("disabled", true);
		$("#btnVrau3DIS").prop("disabled", true);
		
		$("#btnVrau1CCFOR").prop("disabled", true);
		$("#btnVrau1DISDES").prop("disabled", true);
	}
	
	function DesabilitaBotoesArmaDinamico(input, opcao){
		//input = numero do input a desabilitar
		//opcao = 1 - Desabilita DIS, 2 - Desabilita Melee

		if(input == 1 ){
			if(opcao == 1){
				$("#btnVrau1CCFOR").prop("disabled", false);
				$("#btnVrau1DISDES").prop("disabled", true);
			}else if (opcao == 2){
				$("#btnVrau1CCFOR").prop("disabled", true);
				$("#btnVrau1DISDES").prop("disabled", false);
			}else{
				$("#btnVrau1CCFOR").prop("disabled", true);
				$("#btnVrau1DISDES").prop("disabled", true);
			}
		}
		
		if(opcao == 1){
			$("#btnVrau"+input+"CC").prop("disabled", false);
			$("#btnVrau"+input+"DIS").prop("disabled", true);
			
		}else if(opcao == 2){
			$("#btnVrau"+input+"CC").prop("disabled", true);
			$("#btnVrau"+input+"DIS").prop("disabled", false);
		}else{
			$("#btnVrau"+input+"CC").prop("disabled", true);
			$("#btnVrau"+input+"DIS").prop("disabled", true);
		}
	}	

	function AtribuirOnChange(){
		document.getElementById("inputptsDisp").onchange = function() {DesabilitarBotaoPlus()};	
		
		$("#slcTipoArma1").change(function() {
			DesabilitaBotoesArmaDinamico(1,$("#slcTipoArma1").val());
		});

		$("#slcTipoArma2").change(function() {
			DesabilitaBotoesArmaDinamico(2, $("#slcTipoArma2").val());
		});

		$("#slcTipoArma3").change(function() {
			DesabilitaBotoesArmaDinamico(3, $("#slcTipoArma3").val());
		});
	}
	
	function AtribuirAcoesCombate(){
		$("#btnBlockArmCCPAS").click(function () {
			DefesaPassiva("F");
		});
		
		$("#btnBlockArmMIPAS").click(function () {
			DefesaPassiva("M");
		});
		
		$("#btnBlockArmCCATV").click(function () {
			DefesaAtiva("F", "CC");
		});
		$("#btnBlokCC").click(function () {
			DefesaAtiva("F", "CC");
		});
		
		$("#btnBlockArmDISTATV").click(function () {
			DefesaAtiva("F", "DIST");
		});
		$("#btnBlokDIST").click(function () {
			DefesaAtiva("F", "DIST");
		});
		
		$("#btnDefAtvMiALMA").click(function () {
			DefesaAtiva("M", "ALMA");
		});

		$("#btnDefAtvMiFE").click(function () {
			DefesaAtiva("M", "FE");
		});
		
		$("#btnCastarMagia").click(function () {
			CastarMagiaMilagre("MAGIA","ATK");
		});
		
		$("#btnCastarMilagre").click(function () {
			CastarMagiaMilagre("MILAGRE","ATK");
		});		
		
		
		$("#btnDefMiAtvAlma").click(function () {
			CastarMagiaMilagre("MAGIA","DEF");
		});
		
		$("#btnDefMiAtvFe").click(function () {
			CastarMagiaMilagre("MILAGRE","DEF");
		});
		
		$("#btnVrau1CC").click(function () {
			AtkMeleeDistMistComArma("MELEE", 'inputDescArma1', 'inputArma1DAF');
		});
		
		$("#btnVrau1CCFOR").click(function () {
			AtkMeleeDistMistComArma("MELEE", 'inputDescArma1', 'inputArma1DAF');
		});
		
		$("#btnVrau2CC").click(function () {
			AtkMeleeDistMistComArma("MELEE", 'inputDescArma2', 'inputArma2DAF');
		});
		
		$("#btnVrau3CC").click(function () {
			AtkMeleeDistMistComArma("MELEE", 'inputDescArma3', 'inputArma3DAF');
		});
		
		$("#btnVrau1DIS").click(function () {
			AtkMeleeDistMistComArma("DIST", 'inputDescArma1', 'inputArma1DAF');
		});
		
		$("#btnVrau1DISDES").click(function () {
			AtkMeleeDistMistComArma("DIST", 'inputDescArma1', 'inputArma1DAF');
		});
		
		$("#btnVrau2DIS").click(function () {
			AtkMeleeDistMistComArma("DIST", 'inputDescArma2', 'inputArma2DAF');
		});
		
		$("#btnVrau3DIS").click(function () {
			AtkMeleeDistMistComArma("DIST", 'inputDescArma3', 'inputArma3DAF');
		});
		
		
	}
	
	function ChangePericias(){
		
		$(".forca").val('0');
		$(".dest").val('0');
		$(".int").val('0');
		$(".sent").val('0');
		$(".car").val('0');
		
		$("#inputFOR").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputDES").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputINT").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputSENT").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputCAR").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputBonusFOR").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputBonusDES").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputBonusINT").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputBonusSENT").change(function(){
			SetarValoresPericiasAposCarregamento();
		});

		$("#inputBonusCAR").change(function(){
			SetarValoresPericiasAposCarregamento();
		});
	}
	
	function AcoesBtnPlusMinus(){
		$("#btnPlusFor").click(function () {
			AumentaAtrib("inputFOR", 1);
			DesabilitaMinusZerados();
			
			$(".forca").val($("#inputFOR").val());
		});

		$("#btnPlusDES").click(function () {
			AumentaAtrib("inputDES", 1);
			DesabilitaMinusZerados();
			
			$(".dest").val($("#inputDES").val());
		});

		$("#btnPlusINT").click(function () {
			AumentaAtrib("inputINT", 1);
			DesabilitaMinusZerados();

			$(".int").val($("#inputINT").val());
		});

		$("#btnPlusVIG").click(function () {
			AumentaAtrib("inputVIG", 1);
			DesabilitaMinusZerados();
		});

		$("#btnPlusSENT").click(function () {
			AumentaAtrib("inputSENT", 1);
			DesabilitaMinusZerados();

			$(".sent").val($("#inputSENT").val());
		});

		$("#btnPlusCAR").click(function () {
			AumentaAtrib("inputCAR", 1);
			DesabilitaMinusZerados();

			$(".car").val($("#inputCAR").val());
		});	

		$("#btnPlusALMA").click(function () {
			AumentaAtrib("inputALMA", 2);
			DesabilitaMinusZerados();
		});

		$("#btnPlusFE").click(function () {
			AumentaAtrib("inputFE", 2);
			DesabilitaMinusZerados();
		});

		$("#btnPlusESF").click(function () {
			AumentaAtrib("inputESF", 3);
			DesabilitaMinusZerados();
		});
		
		$("#btnMinusFor").click(function () {
			DiminuiAtrib("inputFOR", 1);
			DesabilitaMinusZerados();
			
			$(".forca").val($("#inputFOR").val());
		});

		$("#btnMinusDES").click(function () {
			DiminuiAtrib("inputDES", 1);
			DesabilitaMinusZerados();
			
			$(".dest").val($("#inputDES").val());
		});

		$("#btnMinusINT").click(function () {
			DiminuiAtrib("inputINT", 1);
			DesabilitaMinusZerados();

			$(".int").val($("#inputINT").val());
		});

		$("#btnMinusVIG").click(function () {
			DiminuiAtrib("inputVIG", 1);
			DesabilitaMinusZerados();
		});

		$("#btnMinusSENT").click(function () {
			DiminuiAtrib("inputSENT", 1);
			DesabilitaMinusZerados();

			$(".sent").val($("#inputSENT").val());
		});

		$("#btnMinusCAR").click(function () {
			DiminuiAtrib("inputCAR", 1);
			DesabilitaMinusZerados();

			$(".car").val($("#inputCAR").val());
		});

		$("#btnMinusALMA").click(function () {
			DiminuiAtrib("inputALMA", 2);
			DesabilitaMinusZerados();
		});

		$("#btnMinusFE").click(function () {
			DiminuiAtrib("inputFE", 2);
			DesabilitaMinusZerados();
		});

		$("#btnMinusESF").click(function () {
			DiminuiAtrib("inputESF", 3);
			DesabilitaMinusZerados();
		});		
	}
	
	function AcoesBtnTeste(){
		$("#btnTestarFOR").click(function () {
			testar("inputFOR");
		});
		$("#btnTestarDES").click(function () {
			testar("inputDES");
		});
		$("#btnTestarINT").click(function () {
			testar("inputINT");
		});
		$("#btnTestarVIG").click(function () {
			testar("inputVIG");
		});
		$("#btnTestarSENT").click(function () {
			testar("inputSENT");
		});
		$("#btnTestarCAR").click(function () {
			testar("inputCAR");
		});
		
	}
	
	function AumentaAtrib(input, circ){
		var valor = 0;
		
		if($('#'+input).val() != ""){
			valor = parseInt($('#'+input).val());
		}	
		
		var novoValor = valor + (1 * circ);
		
		if(parseInt($('#inputptsDisp').val()) > 0){ //se existe pontos disponíveis			
			if((1 * circ) <= parseInt($('#inputptsDisp').val())){ //se pontos atribuídos não excederem os pontos disponíveis
				$('#'+input).val(valor +1);
			
				$('#inputptsDisp').val(parseInt($('#inputptsDisp').val()) - (1 * circ))
			}
		}
		
		DesabilitarBotaoPlus();
		CalcularPVs();
	}
	
	function DiminuiAtrib(input, circ){
		var valor = 0;
		
		if($('#'+input).val() != ""){
			valor = parseInt($('#'+input).val());			
		}
		
		var novoValor = valor - (1 * circ);
		
		if (novoValor < 0){
			novoValor = 0;	
		}
		
		if(parseInt($('#'+input).val()) != 0){ //se o campo não for zero			
			
			if((valor-1) >= 0){
				$('#'+input).val(valor-1);
			
				$('#inputptsDisp').val(parseInt($('#inputptsDisp').val()) + (1 * circ));
			}
			
		}
		
		DesabilitarBotaoPlus();
		CalcularPVs();
	}
	
	function DesabilitarBotaoPlus(){
		
		var ptsDisp = 0;
		
		if($('#inputptsDisp').val() != ""){
			ptsDisp = parseInt($('#inputptsDisp').val());
		}
		
		if( ptsDisp >= 3){
			$('.Plus1circ').prop('disabled', false);
			$('.Plus2circ').prop('disabled', false);
			$('.Plus3circ').prop('disabled', false);
		} else if (ptsDisp < 3 && ptsDisp >= 2){
			$('.Plus1circ').prop('disabled', false);
			$('.Plus2circ').prop('disabled', false);
			$('.Plus3circ').prop('disabled', true);
		}else if (ptsDisp < 2 && ptsDisp >= 1){
			$('.Plus1circ').prop('disabled', false);
			$('.Plus2circ').prop('disabled', true);
			$('.Plus3circ').prop('disabled', true);
		}else if(ptsDisp < 1){
			$('.Plus1circ').prop('disabled', true);
			$('.Plus2circ').prop('disabled', true);
			$('.Plus3circ').prop('disabled', true);
		}
	}
	
	function DesabilitaMinusZerados(){
		
		var ptsFor = 0;
		var ptsDes = 0;
		var ptsInt = 0;
		var ptsVig = 0;
		var ptsSent = 0;
		var ptsCar = 0;
		var ptsAlma = 0;
		var ptsFe = 0;
		var ptsEsf = 0;
		
		if($('#inputFOR').val() != ""){
			ptsFor = parseInt($('#inputFOR').val());
		}
		if($('#inputDES').val() != ""){
			ptsDes = parseInt($('#inputDES').val());
		}
		if($('#inputINT').val() != ""){
			ptsInt = parseInt($('#inputINT').val());
		}
		if($('#inputVIG').val() != ""){
			ptsVig = parseInt($('#inputVIG').val());
		}
		if($('#inputSENT').val() != ""){
			ptsSent = parseInt($('#inputSENT').val());
		}
		if($('#inputCAR').val() != ""){
			ptsCar = parseInt($('#inputCAR').val());
		}
		if($('#inputALMA').val() != ""){
			ptsAlma = parseInt($('#inputALMA').val());
		}
		if($('#inputFE').val() != ""){
			ptsFe = parseInt($('#inputFE').val());
		}
		if($('#inputESF').val() != ""){
			ptsEsf = parseInt($('#inputESF').val());
		}
		
		if(ptsFor == 0){
			$('#btnMinusFor').prop('disabled', true);
		}else{
			$('#btnMinusFor').prop('disabled', false);
		}
		
		if(ptsDes == 0){
			$('#btnMinusDES').prop('disabled', true);
		}else{
			$('#btnMinusDES').prop('disabled', false);
		}
		
		if(ptsInt == 0){
			$('#btnMinusINT').prop('disabled', true);
		}else{
			$('#btnMinusINT').prop('disabled', false);
		}
		
		if(ptsVig == 0){
			$('#btnMinusVIG').prop('disabled', true);
		}else{
			$('#btnMinusVIG').prop('disabled', false);
		}
		
		if(ptsSent == 0){
			$('#btnMinusSENT').prop('disabled', true);
		}else{
			$('#btnMinusSENT').prop('disabled', false);
		}
		
		if(ptsCar == 0){
			$('#btnMinusCAR').prop('disabled', true);
		}else{
			$('#btnMinusCAR').prop('disabled', false);
		}
		
		if(ptsAlma == 0){
			$('#btnMinusALMA').prop('disabled', true);
		}else{
			$('#btnMinusALMA').prop('disabled', false);
		}
		
		if(ptsFe == 0){
			$('#btnMinusFE').prop('disabled', true);
		}else{
			$('#btnMinusFE').prop('disabled', false);
		}
		
		if(ptsEsf == 0){
			$('#btnMinusESF').prop('disabled', true);
		}else{
			$('#btnMinusESF').prop('disabled', false);
		}
	}	
	
	function CalcularPVs(){
		
		var pvTotal = 0
		
		if($('#inputPV').val() != ""){
			pvTotal = 0;
		}
		
		var vigor = 0;
		if($('#inputVIG').val == ""){
			vigor = 0;			
		}else{
			vigor = parseInt($('#inputVIG').val())
		}
		
		pvTotal = vigor * 10;

		if(pvTotal > 0){
			$('#inputPV').val(+pvTotal);
		}else{
			$('#inputPV').val("10");			
		}	
	}
	
	function testarPericia(nome, base, v1, b1){
		
		var valor = 0;
		var bonusPen = 0;

		if(v1 != ""){
			valor = parseInt(v1);
		}

		if(b1 != ""){
			bonusPen = parseInt(b1);
		}
		
		var d10 = rolarD10(false);
		
		var total = d10 + valor + bonusPen;
		
		var msg = "";
		if(d10 == 10)
			msg += "(ACERTO CRÍTICO!) \n";
		else if (d10 == 1)
			msg += "(FALHA CRÍTICA!) \n";

		msg += "Total do seu teste de " + nome + ": " + total + " \n(d10: "+d10+" + "+base+": "+valor+" + Bônus/Penalidade: "+bonusPen+")";
		
		alert(msg);
	}
	
	function testar(input){
		
		var testeDe = "";
		var bonusPenalidade = 0;
		var msgAdicional = "";
		
		if(input == "inputFOR"){
			testeDe = "Força";

			if($("#inputBonusFOR").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusFOR").val());
			}
		}
		
		if(input == "inputDES"){
			testeDe = "Destreza";
			msgAdicional = "\nAplique manualmente penalidade de Destreza de sua armadura, caso haja.";

			if($("#inputBonusDES").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusDES").val());
			}
		}
		
		if(input == "inputINT"){
			testeDe = "Inteligência";

			if($("#inputBonusINT").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusINT").val());
			}
		}
		
		if(input == "inputVIG"){
			testeDe = "Vigor";

			if($("#inputBonusVIG").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusVIG").val());
			}
		}
		
		if(input == "inputSENT"){
			testeDe = "Sentidos";

			if($("#inputBonusSENT").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusSENT").val());
			}
		}
		
		if(input == "inputCAR"){
			testeDe = "Carisma";

			if($("#inputBonusCAR").val() != ""){
				bonusPenalidade = parseInt($("#inputBonusCAR").val());
			}
		}
		
		var somar = 0;
		var d10 = rolarD10(false);
		
		var total = d10 + parseInt($('#'+input).val()) + bonusPenalidade;
		
		var msg = "";
		if(d10 == 10)
			msg += "(ACERTO CRÍTICO!) \n";
		else if (d10 == 1)
			msg += "(FALHA CRÍTICA!) \n";

		msg += "Total do seu teste de " + testeDe + ": " + total + " \n(d10: "+d10+" + "+testeDe+": "+$('#'+input).val()+" + Bônus/Penalidade em "+testeDe+": "+bonusPenalidade+") \n "+msgAdicional;
		
		alert(msg);				
	}
	
	function DefesaPassiva(tipo){
		
		var armadura = 0;
		var escudo = 0;
		var d10 = rolarD10(true);
		var msg = "";
		var bonus = 0;
		
		if(tipo == "F"){
			if($('#inputBloqCCArmad').val() != ""){
				armadura = parseInt($('#inputBloqCCArmad').val());
			}
			
			// if($('#inputBloqCCEsc').val() != ""){
			// 	escudo = parseInt($('#inputBloqCCEsc').val());
			// }
		
		}else{
			if($('#inputBloqMIArmad').val() != ""){
				armadura = parseInt($('#inputBloqMIArmad').val());
			}

			// if($('#inputBloqMIEsq').val() != ""){
			// 	escudo = parseInt($('#inputBloqMIEsq').val());
			// }
		}
		
		var total = d10 + armadura + escudo;
		
		if(d10 > 10){
			msg += "(CRÍTICO) \n"
		}else if(d10 == 1){
			msg += "(FALHA CRÍTICA) \n"
		}
		
		if(tipo == "F"){
			msg += "DEFESA PASSIVA FÍSICA: " + total + " \n(d10: "+d10+" + Bloq. Físico Armadura: "+armadura+"). \n\nAplique bônus se houverem";
			
		}else{
			msg += "DEFESA PASSIVA MÍSTICA: " + total + " \n(d10: "+d10+" + Bloq. Místico Armadura: "+armadura+"). \n\nAplique bônus se houverem";
		}			
		
		alert(msg);		
	}
	
	function AtkMeleeDistMistComArma(tipoAtk, inputNomeArma, inputArma){
		
		var For = 0;
		var dest = 0;
		var bonus = 0;
		var msg = "";
		var total = 0;
		var danoArma = 0;
		var nomeArma = "'Sem Nome'";
		
		var d10 = rolarD10(true);		
		
		if(d10 > 10){
			msg = "(CRÍTICO) \n";
		}else if(d10 == 1){
			msg = "(FALHA CRÍTICA) \n";
		}
		
		if($('#inputFOR').val() != ""){
			For = parseInt($('#inputFOR').val());
		}
		
		if($('#inputDES').val() != ""){
			dest = parseInt($('#inputDES').val());
		}		
		
		if($('#'+inputNomeArma).val() != ""){
			nomeArma = $('#'+inputNomeArma).val();
		}
		
		if($('#'+inputArma).val() != ""){
			danoArma = parseInt($('#'+inputArma).val());
		}
		
		if(tipoAtk == "MELEE"){
			
			if($("#inputBonusFOR").val() != ""){
				bonus = parseInt($("#inputBonusFOR").val());
			}
			
			total = d10 + For + danoArma + bonus;
			
			msg = msg + " Ataque com " +nomeArma+ " (melee): Total: "+total+ "\n (d10: " +d10+ " + Força: "+For+ " + Dano da Arma: " +danoArma+ " + Bônus em For: "+bonus+"). \n\n(Aplique demais bônus manualmente se houverem.)"
			
			alert(msg)
			
		}else if(tipoAtk == "DIST"){
			
			if($("#inputBonusDES").val() != ""){
				bonus = parseInt($("#inputBonusDES").val());
			}
			
			total = d10 + dest + danoArma + bonus;
			
			msg = msg + " Ataque com " +nomeArma+ " (distância): Total: "+total+ "\n (d10: " +d10+ " + Destreza: "+dest+ " + Dano da Arma: " +danoArma+ " + Bônus em Des: "+bonus+"). \n\nAplique demais bônus manualmente se houverem."
			
			alert(msg)
			
		} else{
			
			//lógica de ataque místico com arma
		}
	}
	
	function CastarMagiaMilagre(tipo, AtkOuDef, input){
		
		var almaFeDisp = 0;
		var almaFeUsada = 0;
		var d10 = rolarD10(true);
		var bonusMisticos = 0;
		var total = 0;
		var msg = "";
		var armMistica = 0;
		var escudoMistico = 0;
		var bonusArmaMistica = 0;
		
		if(d10 > 10){
			msg = "(CRÍTICO) ";
		}			
		
		if(input != ""){
			if($("#"+input).val() != ""){
				bonusArmaMistica = parseInt($("#"+input).val());
			}			
		}
		
		if(AtkOuDef == "ATK"){ // Ataque místico
			
			if (tipo == "MAGIA"){
				if($('#inputALMA').val() != ""){
					almaFeDisp = parseInt($('#inputALMA').val());
				}

				if($('#txtQtdAlma').val() != ""){
					almaFeUsada = parseInt($('#txtQtdAlma').val());
				}
				
				if($('#txtBonusMisticoMA').val() != ""){
					bonusMisticos = parseInt($('#txtBonusMisticoMA').val());
				}	
				
			}else{
				
				if($('#inputFE').val() != ""){
					almaFeDisp = parseInt($('#inputFE').val());
				}

				if($('#txtQtdFe').val() != ""){
					almaFeUsada = parseInt($('#txtQtdFe').val());
				}
				
				if($('#txtBonusMisticoMI').val() != ""){
					bonusMisticos = parseInt($('#txtBonusMisticoMI').val());
				}
			}		
			
			if(almaFeUsada <= 0){
				alert("É necessário gastar ao menos 1 de " +(tipo == "MAGIA" ? "Alma" : "Fé")+ " para fazer " +(tipo == "MAGIA" ? "uma magia" : "um milagre"));
				
			}else if (almaFeDisp < almaFeUsada){
				alert("Sua reserva de " +(tipo == "MAGIA" ? "Alma" : "Fé") + " tem "+almaFeDisp+" disponíveis.");		
				
			}else {
				
				total = d10 + (almaFeUsada *2) + bonusMisticos;
				
				if(tipo == "MAGIA"){
					msg = msg + "MAGIA: "+total+" (d10: "+d10+ " + (Alma Gasta x2): "+(almaFeUsada *2)+" + Total Bônus Místicos: "+bonusMisticos+ ")";
					$('#inputALMA').val(almaFeDisp - almaFeUsada);
					
				}else{
					msg = msg + "MILAGRE: "+total+" (d10: "+d10+ " + (Fé Gasta x2): "+(almaFeUsada *2)+" + Total Bônus Místicos: "+bonusMisticos+ ")";
					$('#inputFE').val(almaFeDisp - almaFeUsada);
				}			
				
				alert(msg);
			}
		}else{ // Defesa Mística Ativa
			
			if (tipo == "MAGIA"){ //Defesa Mística com Alma
				if($('#inputALMA').val() != ""){
					almaFeDisp = parseInt($('#inputALMA').val());
				}

				if($('#txtQtdAlma').val() != ""){
					almaFeUsada = parseInt($('#txtQtdAlma').val());
				}
				
				if($('#txtBonusMisticoMA').val() != ""){
					bonusMisticos = parseInt($('#txtBonusMisticoMA').val());
				}
				
			}else{ // Desefsa Mística com Fé
				
				if($('#inputFE').val() != ""){
					almaFeDisp = parseInt($('#inputFE').val());
				}

				if($('#txtQtdFe').val() != ""){
					almaFeUsada = parseInt($('#txtQtdFe').val());
				}
				
				if($('#txtBonusMisticoMI').val() != ""){
					bonusMisticos = parseInt($('#txtBonusMisticoMI').val());
				}
				
			}
			
			if (almaFeDisp < almaFeUsada){
				alert("Sua reserva de " +(tipo == "MAGIA" ? "Alma" : "Fé") + " tem "+almaFeDisp+" disponíveis.");		
				
			}else {
				
				if($('#inputBloqMIArmad').val() != ""){
					armMistica = parseInt($('#inputBloqMIArmad').val());
				}
				if($('#inputBloqMIEsq').val() != ""){
					escudoMistico = parseInt($('#inputBloqMIEsq').val());
				}
				
				total = d10 + (almaFeUsada *2) + (armMistica + escudoMistico) + bonusMisticos;
				
				
				if(tipo == "MAGIA"){
					msg = msg + "DEFESA MÍSTICA ATIVA (ALMA): "+total+" (d10: "+d10+ " + (Alma Gasta x2): "+(almaFeUsada *2)+ " + Armaduras e/ou Escudo Místicos: "+(armMistica + escudoMistico)+ " + Total Bônus Místicos: "+bonusMisticos+ ")";
					
					$('#inputALMA').val(almaFeDisp - almaFeUsada);
					
				}else{
					msg = msg + "DEFESA MÍSTICA ATIVA (FÉ): "+total+" (d10: "+d10+ " + (Fé Gasta x2): "+(almaFeUsada *2)+ " + Armaduras e/ou Escudo Místicos: "+(armMistica + escudoMistico)+" + Total Bônus Místicos: "+bonusMisticos+ ")";
					
					$('#inputFE').val(almaFeDisp - almaFeUsada);
				}			
				
				alert(msg);
			}
		}
		
	}
	
	function DefesaAtiva(tipo, meleeDist){
		var armadura = 0;
		var escudo = 0;
		var forca = 0;
		var dest = 0;
		var d10 = rolarD10(true);
		var bonus = 0;
		var msg = "";
		var total = 0;
		var penDest = 0;
		
		if(d10 > 10){
			msg += "(CRÍTICO) \n";
		}else if (d10 == 1){
			msg += "(FALHA CRÍTICA) \n";
		}	
		
		if(tipo == "F"){
			if($('#inputBloqCCArmad').val() != ""){
				armadura = parseInt($('#inputBloqCCArmad').val());
			}
			
			if($('#inputBloqCCEsc').val() != ""){
				escudo = parseInt($('#inputBloqCCEsc').val());
			}
			
			if($('#inputFOR').val() != ""){
				forca = parseInt($('#inputFOR').val());
			}
			
			if($('#inputDES').val() != ""){
				dest = parseInt($('#inputDES').val());
			}
			
			if($('#inputPenDesEsc').val() != ""){
				penDest = penDest + parseInt($('#inputPenDesEsc').val());
			}
			
			if($('#inputPenDesArmad').val() != ""){
				penDest = penDest + parseInt($('#inputPenDesArmad').val());
			}
			
			if(meleeDist == "CC"){
				
				if($("#inputBonusFOR").val() !=""){
					bonus = parseInt($("#inputBonusFOR").val());
				}

				total = d10 + armadura + escudo + forca + bonus;
				msg += "DEFESA ATIVA FÍSICA CORPO-A-CORPO:";
				msg += " Total: "+total+". \n(d10: " +d10+ " + Força: "+forca+ " + Amadura: "+armadura+" + Escudo: "+escudo+" + bônus/penalidade em FOR: "+bonus+") \n\nAplique demais bônus manualmente se houverem.";				
			}else{
				
				if($("#inputBonusDES").val() !=""){
					if(parseInt($("#inputBonusDES").val()) < 0){
						penDest = penDest + parseInt($("#inputBonusDES").val());	
					}else{
						bonus = parseInt($("#inputBonusDES").val());
					}
				}

				total = d10 + armadura + escudo + dest + bonus + penDest;
				msg += "DEFESA ATIVA FÍSICA À DISTÂNCIA:";
				msg += " Total: "+total+". \n(d10: " +d10+ " + Destreza: "+dest+ " + Amadura: "+armadura+" + Escudo: "+escudo+ " + Bônus em DES: "+bonus+" + Pen. Destreza Total: " +penDest+") \n\nAplique demais bônus manualmente se houverem.";
			}

			alert(msg);
		
		}else{
			
			var almaDisp = 0;
			var feDisp = 0;
			
			if($('#inputALMA').val() != ""){
				almaDisp = parseInt($('#inputALMA').val());
			}
			
			if($('#inputFE').val() != ""){
				feDisp = parseInt($('#inputFE').val());
			}			
			
			if(almaDisp == 0 && feDisp == 0){
				alert("Você não possui pontos em FÉ ou ALMA para realizar uma Defesa Mística Ativa");
				
			}else{
				if(meleeDist > "ALMA"){					
					$("#modalMagia").modal('show');
					
				}else{
					$("#modalMilagre").modal('show');
				}				
			}
		}				
	}

	function PrepararDadosHeroi(){

		var objHeroi;
		var armadurasHeroi = new Array();
		var armadura;
		var armasHeroi = new Array();
		var arma;
		var habilidadesHeroi = new Array();
		var hab;
		var inventarioHeroi = $("#txtInventario").val();
		var itensMisticosHeroi = new Array();
		var itemMist;
		var magiasHeroi = new Array();
		var magia;
		var adwasHeroi = $("#inputAdwas").val();
		var anots = $("#txtAnotacoes").val();
		//variaveis perícias (apenas precisa dos bônus)
		var periciasHeroi = new Array();
		var pericias;		

		pericias = {
			acrobacia: $("#inputBonusAcrobacia").val(),
			animais: $("#inputBonusAnimais").val(),
			atletismo: $("#inputBonusAtletismo").val(),
			atuacao: $("#inputBonusAtuacao").val(),
			diplomacia: $("#inputBonusDiplomacia").val(),
			enganacao: $("#inputBonusEnganacao").val(),
			engenharia: $("#inputBonusEngenharia").val(),
			furtividade: $("#inputBonusFurtividade").val(),
			historia: $("#inputBonusHistoria").val(),
			intimidacao: $("#inputBonusIntimidacao").val(),
			intuicao: $("#inputBonusIntuicao").val(),
			investigacao: $("#inputBonusInvestigacao").val(),
			medicina: $("#inputBonusMedicina").val(),
			misticismo: $("#inputBonusArcanismo").val(),
			natureza: $("#inputBonusNatureza").val(),
			persepcao: $("#inputBonusPersepcao").val(),
			persuasao: $("#inputBonusPersuasao").val(),
			pilotagem: $("#inputBonusPilotagem").val(),
			religiao: $("#inputBonusReligiao").val(),
			sobrevivencia: $("#inputBonusSobrevivencia").val(),
		};
		periciasHeroi.push(pericias);

		
		armadura = {
			tipo: 1, // armadura
			descArmadura: $("#inputDescArmad").val(),
			blockFisico: parseInt($("#inputBloqCCArmad").val()),
			blockMistico: parseInt($("#inputBloqMIArmad").val()),
			durabilidade: parseInt($("#inputDurabArmad").val()),
			penDestreza: parseInt($("#inputPenDesArmad").val())
		};
		armadurasHeroi.push(armadura);

		armadura = {
			tipo: 2, // escudo
			descArmadura: $("#inputDescEsc").val(),
			blockFisico: parseInt($("#inputBloqCCEsc").val()),
			blockMistico: parseInt($("#inputBloqMIEsq").val()),
			durabilidade: parseInt($("#inputDurabEsc").val()),
			penDestreza: parseInt($("#inputPenDesEsc").val())
		};
		armadurasHeroi.push(armadura);
		
		for(i=1; i<=3; i++){ //armas
			if($("#inputDescArma"+i).val() != ""){
				arma = {
					tipo: parseInt($("#slcTipoArma"+i).val()),
					descArma: $("#inputDescArma"+i).val(),
					danoFisico: parseInt($("#inputArma"+i+"DAF").val()),
					danoMistico: parseInt($("#inputArma"+i+"DAM").val()),
					durabilidade: parseInt($("#inputArma"+i+"DU").val())
				}
				armasHeroi.push(arma);
			}			
		}

		for(i=1; i<=5; i++){ //habilidades
			if($("#inputDescHab"+i).val() != ""){
				hab = {
					descHabilidade: $("#inputDescHab"+i).val(),
					nvlHabilidade: parseInt($("#inputNvlHab"+i).val()),
					infoHabilidade: $("#txtHab"+i).val()
				}
				habilidadesHeroi.push(hab);
			}			
		}

		for(i=1; i<=5; i++){ //Itens Místicos
			if($("#inputDescItem"+i).val() != ""){
				itemMist = {
					descItemMist: $("#inputDescItem"+i).val(),
					bonusMist: parseInt($("#inputBonusItem"+i).val())
				}
				itensMisticosHeroi.push(itemMist);
			}			
		}

		for(i=1; i<=6; i++){ //Magias
			if($("#inputMagia"+i).val() != ""){
				magia = {
					descMagia: $("#inputMagia"+i).val(),
					infoMagia: $("#txtInfoMagia"+i).val()
				}
				magiasHeroi.push(magia);
			}			
		}

		objHeroi = {
			nome: $("#inputNome").val(),
			etnia: $("#inputEtnia").val(),
			classe: $("#inputClasse").val(),
			ptsDisponiveis: parseInt($("#inputptsDisp").val()),
			ptsVidaTotais: parseInt($("#inputPV").val()),
			ptsVidaAtuais: parseInt($("#inputPVAtual").val()),
			ptsVidaTemp: parseInt($("#inputPVTemp").val()),
			
			forca: parseInt($("#inputFOR").val()),
			forcaBonus: parseInt($("#inputBonusFOR").val()),
			
			destreza: parseInt($("#inputDES").val()),
			destrezaBonus: parseInt($("#inputBonusDES").val()),

			inteligencia: parseInt($("#inputINT").val()),
			inteligenciaBonus: parseInt($("#inputBonusINT").val()),

			vigor: parseInt($("#inputVIG").val()),
			vigorBonus: parseInt($("#inputBonusVIG").val()),

			sentidos: parseInt($("#inputSENT").val()),
			sentidosBonus: parseInt($("#inputBonusSENT").val()),

			carisma: parseInt($("#inputCAR").val()),
			carismaBonus: parseInt($("#inputBonusCAR").val()),

			alma: parseInt($("#inputALMA").val()),
			fe: parseInt($("#inputFE").val()),
			esforco: parseInt($("#inputESF").val()),
			adwas: adwasHeroi,
			inventario: inventarioHeroi,
			armas: armasHeroi,
			armaduras: armadurasHeroi,
			habilidades: habilidadesHeroi,			
			itensMisticos: itensMisticosHeroi,
			magias: magiasHeroi,
			anotacoes: anots,

			pericias: periciasHeroi 
		};

		console.log(objHeroi);
		salvarTexto(objHeroi);
		//SalvarDadosHeroi(objHeroi);
	}

	function salvarTexto(objHeroi) {
		
		var textoJson = JSON.stringify(objHeroi);
		
		let texto = textoJson; // document.getElementById("texto").value;
		
		let titulo = objHeroi.nome; //document.getElementById("titulo").value"";
		
		let blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
		
		saveAs(blob, titulo + ".txt");
	}

	function lerHeroiJson(){
		
		var objHeroi;
		var dados = $("#txtCarregaDados").val();
		
		objHeroi = jQuery.parseJSON(dados)
		console.log(objHeroi);

		CarregarDadosNosCampos(objHeroi);
		$("#modalCarregaDadosHeroi").modal('hide');
		$("#txtCarregaDados").val("");		
	}

	

	function CarregarDadosNosCampos(response){
		
		/*Carregando os dados básicos*/
		$("#inputNome").val(response.nome);
		$("#inputEtnia").val(response.etnia);
		$("#inputClasse").val(response.classe);
		$("#inputptsDisp").val(response.ptsDisponiveis);
		$("#inputPV").val(response.ptsVidaTotais);
		$("#inputPVAtual").val(response.ptsVidaAtuais);
		$("#inputPVTemp").val(response.ptsVidaTemp);
		
		$("#inputFOR").val(response.forca);
		$("#inputBonusFOR").val(response.forcaBonus);		
		
		$("#inputDES").val(response.destreza);
		$("#inputBonusDES").val(response.destrezaBonus);		
		
		$("#inputINT").val(response.inteligencia);
		$("#inputBonusINT").val(response.inteligenciaBonus);		
		
		$("#inputVIG").val(response.vigor);
		$("#inputBonusVIG").val(response.vigorBonus);		
		
		$("#inputSENT").val(response.sentidos);
		$("#inputBonusSENT").val(response.sentidosBonus);		
		
		$("#inputCAR").val(response.carisma);
		$("#inputBonusCAR").val(response.carismaBonus);		
		
		$("#inputALMA").val(response.alma);
		$("#inputFE").val(response.fe);
		$("#inputESF").val(response.esforco);
		$("#txtInventario").val(response.inventario);
		$("#inputAdwas").val(response.adwas);
		$("#txtAnotacoes").val(response.anotacoes);
		
		/*Carregando armaduras (Escudo e Armadura)*/
		if(response.armaduras){
			if(response.armaduras.length > 0){
				for(i=1; i<=response.armaduras.length; i++){
					if(response.armaduras[i-1].tipo == 1){
						$("#inputDescArmad").val(response.armaduras[i-1].descArmadura);
						$("#inputBloqCCArmad").val(response.armaduras[i-1].blockFisico);
						$("#inputBloqMIArmad").val(response.armaduras[i-1].blockMistico);
						$("#inputDurabArmad").val(response.armaduras[i-1].durabilidade);
						$("#inputPenDesArmad").val(response.armaduras[i-1].penDestreza);
					}else{
						$("#inputDescEsc").val(response.armaduras[i-1].descArmadura);
						$("#inputBloqCCEsc").val(response.armaduras[i-1].blockFisico);
						$("#inputBloqMIEsq").val(response.armaduras[i-1].blockMistico);
						$("#inputDurabEsc").val(response.armaduras[i-1].durabilidade);
						$("#inputPenDesEsc").val(response.armaduras[i-1].penDestreza);
					}
				}	
			}
		}

		/*Carregando armas*/
		if(response.armas){
			if(response.armas.length > 0){
				for(j=1; j<=response.armas.length; j++){
					$("#slcTipoArma"+j).val(response.armas[j-1].tipo);
					$("#inputDescArma"+j).val(response.armas[j-1].descArma);
					$("#inputArma"+j+"DAF").val(response.armas[j-1].danoFisico);
					$("#inputArma"+j+"DAM").val(response.armas[j-1].danoMistico);
					$("#inputArma"+j+"DU").val(response.armas[j-1].durabilidade);
	
					DesabilitaBotoesArmaDinamico(j, response.armas[j-1].tipo);
				}
			}
		}		

		/*Carregando Habilidades*/
		if(response.habilidades){
			if(response.habilidades.length > 0){
				for(k=1; k<=response.habilidades.length; k++){
					$("#inputDescHab"+k).val(response.habilidades[k-1].descHabilidade);
					$("#inputNvlHab"+k).val(response.habilidades[k-1].nvlHabilidade);
					$("#txtHab"+k).val(response.habilidades[k-1].infoHabilidade);
				}
			}
		}
		
		/*Carregando Itens Místicos*/
		if(response.itensMisticos){
			if(response.itensMisticos.length > 0){
				for(l=1; l<=response.itensMisticos.length; l++){				
					$("#inputDescItem"+l).val(response.itensMisticos[l-1].descItemMist);
					$("#inputBonusItem"+l).val(response.itensMisticos[l-1].bonusMist);
				}
			}
		}

		/*Carregando Magias*/
		if(response.magias){
			if(response.magias.length > 0){
				for(l=1; l<=response.magias.length; l++){				
					$("#inputMagia"+l).val(response.magias[l-1].descMagia);
					$("#txtInfoMagia"+l).val(response.magias[l-1].infoMagia);
				}
			}
		}

		SetarValoresPericiasAposCarregamento();

		/*Carregando perícias*/
		if(response.pericias){
			$("#inputBonusAcrobacia").val(response.pericias[0].acrobacia);
			$("#inputBonusAnimais").val(response.pericias[0].animais);
			$("#inputBonusAtletismo").val(response.pericias[0].atletismo);
			$("#inputBonusAtuacao").val(response.pericias[0].atuacao);
			$("#inputBonusDiplomacia").val(response.pericias[0].diplomacia);
			$("#inputBonusEnganacao").val(response.pericias[0].enganacao);
			$("#inputBonusEngenharia").val(response.pericias[0].engenharia);
			$("#inputBonusFurtividade").val(response.pericias[0].furtividade);
			$("#inputBonusHistoria").val(response.pericias[0].historia);
			$("#inputBonusIntimidacao").val(response.pericias[0].intimidacao);
			$("#inputBonusIntuicao").val(response.pericias[0].intuicao);
			$("#inputBonusInvestigacao").val(response.pericias[0].investigacao);
			$("#inputBonusMedicina").val(response.pericias[0].medicina);
			$("#inputBonusArcanismo").val(response.pericias[0].misticismo);
			$("#inputBonusNatureza").val(response.pericias[0].natureza);
			$("#inputBonusPersepcao").val(response.pericias[0].persepcao);
			$("#inputBonusPersuasao").val(response.pericias[0].persuasao);
			$("#inputBonusPilotagem").val(response.pericias[0].pilotagem);
			$("#inputBonusReligiao").val(response.pericias[0].religiao);
			$("#inputBonusSobrevivencia").val(response.pericias[0].sobrevivencia);
		}		
	}

	function SetarValoresPericiasAposCarregamento(){
		var forca = 0;
		var dest = 0;
		var int = 0;
		var sent = 0;
		var car = 0;
		
		/*Começo do meu TOC*/
		if($("#inputBonusFOR").val() != "")
			forca = parseInt($("#inputFOR").val()) + parseInt($("#inputBonusFOR").val());
		else
			forca = parseInt($("#inputFOR").val());	
		
		if($("#inputBonusDES").val() != "")
			dest = parseInt($("#inputDES").val()) + parseInt($("#inputBonusDES").val());
		else
			dest = parseInt($("#inputDES").val());

		if($("#inputBonusINT").val() != "")
			int = parseInt($("#inputINT").val()) + parseInt($("#inputBonusINT").val());
		else
			int = parseInt($("#inputINT").val());

		if($("#inputBonusSENT").val() != "")
			sent = parseInt($("#inputSENT").val()) + parseInt($("#inputBonusSENT").val());
		else
			sent = parseInt($("#inputSENT").val());
		
		if($("#inputBonusCAR").val() != "")
			car = parseInt($("#inputCAR").val()) + parseInt($("#inputBonusCAR").val());
		else
			car = parseInt($("#inputCAR").val());

		/*Fim do meu TOC*/
		
		$(".forca").val(forca);
		$(".dest").val(dest);
		$(".int").val(int);
		$(".sent").val(sent);
		$(".car").val(car);
	}

	function GerarNPC(){
		
		var ptosDisp = 20;
		var ptosEsf = 0;
		var userAlmaFe = (rolarD10(false) >= 6) ? "ALMA" : "FE";
		var ptosFe = 0;
		var ptosAlma = 0;
		var ptosFOR = 0;
		var ptosDES = 0;
		var ptosVIG = 0;
		var ptosINT = 0;
		var ptosSENT = 0;
		var ptosCAR = 0;
		var ptosVida = 0;

		var definirEsforco = RolarQualquerDado(4);

		/*Definindo Esforço*/
		if(definirEsforco == 1){
			ptosEsf = 1;
			ptosDisp -= 3;
		}
		else if(definirEsforco == 2){
			ptosEsf = 2;
			ptosDisp -= 6;
		}else if(definirEsforco == 3){
			ptosEsf = 3;
			ptosDisp -= 9;
		}else{
			ptosEsf = 0;
		}

		while(ptosDisp > 0){

			var opcao = RolarQualquerDado(7);

			if(opcao == 1){ //FORÇA
				ptosFOR += 1;
				ptosDisp -= 1;

			}else if(opcao == 2){ // DESTREZA
				ptosDES += 1;
				ptosDisp -= 1;

			} else if(opcao == 3){ // INTELIGENCIA
				ptosINT += 1;
				ptosDisp -= 1;

			} else if(opcao == 4){ // VIGOR
				ptosVIG += 1;
				ptosDisp -= 1;
				
			} else if(opcao == 5){ // SENTIDOS
				ptosSENT += 1;
				ptosDisp -= 1;
				
			} else if(opcao == 6){ // CARISMA
				ptosCAR += 1;
				ptosDisp -= 1;
				
			} else { // ALMA ou FÉ
				
				if(ptosDisp >= 2){
					if(userAlmaFe == "ALMA"){
						if(ptosAlma <= 5){
							ptosAlma += 1;
							ptosDisp -= 2;
						}
					}else{
						if(ptosFe <= 5){
							ptosFe += 1;
							ptosDisp -= 2;
						}
					}
				}				
			}
		}

		var etniaAleat = RolarEtniaAleatoria();

		objHeroi = {
			nome: "NPC",
			etnia: etniaAleat,
			classe: "",
			ptsDisponiveis: 0,
			ptsVidaTotais: (parseInt(ptosVIG)*10 > 0) ? parseInt(ptosVIG)*10  : 10 ,
			ptsVidaAtuais: (parseInt(ptosVIG)*10 > 0) ? parseInt(ptosVIG)*10  : 10,
			ptsVidaTemp: 0,
			
			forca: parseInt(ptosFOR),
			forcaBonus: 0,
			
			destreza: parseInt(ptosDES),
			destrezaBonus: 0,

			inteligencia: parseInt(ptosINT),
			inteligenciaBonus: 0,

			vigor: parseInt(ptosVIG),
			vigorBonus: 0,

			sentidos: parseInt(ptosSENT),
			sentidosBonus: 0,

			carisma: parseInt(ptosCAR),
			carismaBonus: 0,

			alma: parseInt(ptosAlma),
			fe: parseInt(ptosFe),
			esforco: parseInt(ptosEsf),
			adwas: 0,
			inventario: null,
			armas: null,
			armaduras: null,
			habilidades: null,			
			itensMisticos: null,
			magias: null,
			anotacoes: null,

			pericias: null 
		};		
		
		var objHeroiFinal = InserirBonusEtnia(objHeroi, etniaAleat);
		
		CarregarDadosNosCampos(objHeroiFinal);
	}	

	function InserirBonusEtnia(objHeroi, etniaAleat){
		
		if(etniaAleat == "Humano"){
			
			var opcaoH = RolarQualquerDado(6);
			if(opcaoH == 1){
				objHeroi.forca += 1;
			}
			else if(opcaoH == 2){
				objHeroi.destreza += 1;		
			}
			else if(opcaoH == 3){
				objHeroi.vigor += 1;			
			}
			else if(opcaoH == 4){
				objHeroi.inteligencia += 1;
			}
			else if(opcaoH == 5){
				objHeroi.sentidos += 1;
			}
			else{
				objHeroi.carisma += 1;
			}	
			
			opcaoH = RolarQualquerDado(2);
			if(opcaoH == 1){
				objHeroi.alma += 1;
			}
			else{
				objHeroi.fe += 1;
			}

			objHeroi.anotacoes = "Deslocamento: 6 Hexágonos\n"+
								 "Fadiga: Caso não tenha um descanso de 7 horas seguidas, recebe -1 em todas características. Acumulativo por dias não descansados";

		}else if(etniaAleat == "Dakn"){

			var ptosAMais = 2;
			while(ptosAMais > 0){
				var opcaoDK = RolarQualquerDado(2);				
				if(opcaoDK == 1){
					objHeroi.forca += 1;
				}
				else{
					objHeroi.vigor += 1;
				}
				ptosAMais -= 1;
			}			

			var opcaoDK = RolarQualquerDado(2);
			if(opcaoDK == 1){
				objHeroi.alma += 1;
			}
			else{
				objHeroi.fe += 1;
			}

			objHeroi.anotacoes = "Deslocamento: 6 Hexágonos\n"+
								 "Penalidade Sob o Sol:Penalidade de -1 em jogadas de Destreza, Inteligência e carisma quando estão sob a luz do dia";


		}else if(etniaAleat == "Dakndir"){
			
			var ptosAMais = 2;
			while(ptosAMais > 0){
				var opcaoDKn = RolarQualquerDado(3);
				if(opcaoDKn == 1){
					objHeroi.carisma += 1;
				}
				else if(opcaoDKn == 2){
					objHeroi.inteligencia += 1;
				}
				else{
					objHeroi.destreza += 1;
				}

				ptosAMais -= 1;
			}				

			objHeroi.esforco += 1;

			objHeroi.anotacoes = "Penalidade de Força: Penalidade de -1 em jogadas de Força e Vigor";
			
		}else if(etniaAleat == "Asghar"){
			
			var ptosAMais = 3;
			while(ptosAMais > 0){
				var opcaoA = RolarQualquerDado(3);
				if(opcaoA == 1){
					objHeroi.vigor += 1;
				}
				else if(opcaoA == 2){
					objHeroi.destreza += 1;
				}
				else{
					objHeroi.inteligencia += 1;
				}

				ptosAMais -= 1;
			}

			objHeroi.anotacoes = "Deslocamento: 6 Hexágonos\n"+
								 "Infiel: Penalidade de -1 em jogadas de Fé ou Alma\n"+
								 "Trabalhar com Metal: +1 a +5 ao consertar Armas/Armaduras e Mechas, e ao trabalhar com Aço Negro\n"+
								 "Habilidade Única: Moldar Ferro Negro e Aço Negro";
			
		}else if(etniaAleat == "Ashá"){
			
			var ptosAMais = 3;
			while(ptosAMais > 0){
				var opcaoA = RolarQualquerDado(2);
				if(opcaoA == 1){
					objHeroi.destreza += 1;
				}
				else{
					objHeroi.sentidos += 1;
				}

				ptosAMais -= 1;
			}

			objHeroi.anotacoes = "Deslocamento: 6 Hexágonos\n"+
								 "Vôo Ashá: Metade do deslocamento em terra\n"+
								 "Carisma Baixo: Penalidade de 1 em jogadas de Carisma \n"+
								 "Visão Aguçada: Bônus +1 em testes de Sentido para Visão\n"+
								 "Rancor: Ashás guardam imenso rancor dos 'filhos da deusa' qualquer membro da igreja torna-se um inimigo natural para esta raça. Teste de Sentidos (Vontade) pra não atacar imediatamente um devoto de Laien";
		}

		return objHeroi;
	}
	
	
	function RolarEtniaAleatoria(){
		var opcao = RolarQualquerDado(5);
		var retorno = "";

		if(opcao == 1){ //HUMANO
			retorno = "Humano";

		}else if(opcao == 2){ // DAKN
			retorno = "Dakn";

		} else if(opcao == 3){ // DAKNDIR
			retorno = "Dakndir";

		} else if(opcao == 4){ // ASGHAR  
			retorno = "Asghar";
			
		} else{ // ASHA
			retorno = "Ashá";
		}

		return retorno;
	}
	
});