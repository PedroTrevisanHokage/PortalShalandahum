$(document).ready(function () {
	
	SetarValoresIniciais();
	AcoesBtnPlusMinus();
	CalcularPVs();
	AcoesBtnTeste();
	AtribuirOnChange();
	AtribuirAcoesCombate();
	AtribuirAcoesEmBotoes()

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
	
	function AcoesBtnPlusMinus(){
		$("#btnPlusFor").click(function () {
			AumentaAtrib("inputFOR", 1);
			DesabilitaMinusZerados();
		});
		$("#btnPlusDES").click(function () {
			AumentaAtrib("inputDES", 1);
			DesabilitaMinusZerados();
		});
		$("#btnPlusINT").click(function () {
			AumentaAtrib("inputINT", 1);
			DesabilitaMinusZerados();
		});
		$("#btnPlusVIG").click(function () {
			AumentaAtrib("inputVIG", 1);
			DesabilitaMinusZerados();
		});
		$("#btnPlusSENT").click(function () {
			AumentaAtrib("inputSENT", 1);
			DesabilitaMinusZerados();
		});
		$("#btnPlusCAR").click(function () {
			AumentaAtrib("inputCAR", 1);
			DesabilitaMinusZerados();
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
		});
		$("#btnMinusDES").click(function () {
			DiminuiAtrib("inputDES", 1);
			DesabilitaMinusZerados();
		});
		$("#btnMinusINT").click(function () {
			DiminuiAtrib("inputINT", 1);
			DesabilitaMinusZerados();
		});
		$("#btnMinusVIG").click(function () {
			DiminuiAtrib("inputVIG", 1);
			DesabilitaMinusZerados();
		});
		$("#btnMinusSENT").click(function () {
			DiminuiAtrib("inputSENT", 1);
			DesabilitaMinusZerados();
		});
		$("#btnMinusCAR").click(function () {
			DiminuiAtrib("inputCAR", 1);
			DesabilitaMinusZerados();
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
	
	function testar(input){
		
		var testeDe = "";
		
		if(input == "inputFOR"){
			testeDe = "Força";
		}
		
		if(input == "inputDES"){
			testeDe = "Destreza";
		}
		
		if(input == "inputINT"){
			testeDe = "Inteligência";
		}
		
		if(input == "inputVIG"){
			testeDe = "Vigor";
		}
		
		if(input == "inputSENT"){
			testeDe = "Sentidos";
		}
		
		if(input == "inputCAR"){
			testeDe = "Carisma";
		}
		
		var somar = 0;
		var d10 = rolarD10(false);
		
		if($('#'+input).val() == ""){
			alert(d10)
		}else{			
			var total = d10 + parseInt($('#'+input).val());
		}
		
		var msg = "";
		if(d10 == 10)
			msg += "(Acerto Crítico!) ";

		msg += "Total do seu teste de " + testeDe + " é " + total + " (d10: "+d10+" + "+testeDe+": "+$('#'+input).val()+")"
		
		alert(msg);				
	}
	
	function DefesaPassiva(tipo){
		
		var armadura = 0;
		var escudo = 0;
		var d10 = rolarD10(true);
		var msg = "";
		
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
			msg += "(CRÍTICO) "
		}
		
		if(tipo == "F"){
			msg += "DEFESA PASSIVA FÍSICA: " + total + " (d10: "+d10+" + Bloq. Físico Armadura: "+armadura+"). Aplique bônus se houverem";
			
		}else{
			msg += "DEFESA PASSIVA MÍSTICA: " + total + " (d10: "+d10+" + Bloq. Místico Armadura: "+armadura+"). Aplique bônus se houverem";
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
			msg = "(CRÍTICO) ";
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
			
			total = d10 + For + danoArma + bonus;
			
			msg = msg + " Ataque com " +nomeArma+ " (melee): Total: "+total+ " (d10: " +d10+ " + Força: "+For+ " + Dano da Arma: " +danoArma+ "). Aplique bônus se houverem."
			
			alert(msg)
			
		}else if(tipoAtk == "DIST"){
			
			total = d10 + dest + danoArma + bonus;
			
			msg = msg + " Ataque com " +nomeArma+ " (distância): Total: "+total+ " (d10: " +d10+ " + Destreza: "+dest+ " + Dano da Arma: " +danoArma+ "). Aplique bônus se houverem."
			
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
		var bonus = 0; // logo será usado
		var msg = "";
		var total = 0;
		var penDest = 0;
		
		if(d10 > 10){
			msg += "(CRÍTICO) ";
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
				total = d10 + armadura + escudo + forca + bonus;
				msg += "DEFESA ATIVA FÍSICA CORPO-A-CORPO:";
				msg += " Total: "+total+". (d10: " +d10+ " + Força: "+forca+ " + Amadura: "+armadura+" + Escudo: "+escudo+") Aplique bônus se houverem.";				
			}else{
				total = d10 + armadura + escudo + dest + bonus + penDest;
				msg += "DEFESA ATIVA FÍSICA À DISTÂNCIA:";
				msg += " Total: "+total+". (d10: " +d10+ " + Destreza: "+dest+ " + Amadura: "+armadura+" + Escudo: "+escudo+ " + Pen. Destreza Total: " +penDest+") Aplique bônus se houverem.";
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

		for(i=1; i<=5; i++){ //Magias
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
			destreza: parseInt($("#inputDES").val()),
			inteligencia: parseInt($("#inputINT").val()),
			vigor: parseInt($("#inputVIG").val()),
			sentidos: parseInt($("#inputSENT").val()),
			carisma: parseInt($("#inputCAR").val()),
			alma: parseInt($("#inputALMA").val()),
			fe: parseInt($("#inputFE").val()),
			esforco: parseInt($("#inputESF").val()),
			adwas: adwasHeroi,
			inventario: inventarioHeroi,
			armas: armasHeroi,
			armaduras: armadurasHeroi,
			habilidades: habilidadesHeroi,			
			itensMisticos: itensMisticosHeroi,
			magias: magiasHeroi
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
		$("#inputDES").val(response.destreza);
		$("#inputINT").val(response.inteligencia);
		$("#inputVIG").val(response.vigor);
		$("#inputSENT").val(response.sentidos);
		$("#inputCAR").val(response.carisma);
		$("#inputALMA").val(response.alma);
		$("#inputFE").val(response.fe);
		$("#inputESF").val(response.esforco);
		$("#txtInventario").val(response.inventario);
		$("#inputAdwas").val(response.adwas);
		
		/*Carregando armaduras (Escudo e Armadura)*/
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

		/*Carregando armas*/
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

		/*Carregando Habilidades*/
		if(response.habilidades.length > 0){
			for(k=1; k<=response.habilidades.length; k++){
				$("#inputDescHab"+k).val(response.habilidades[k-1].descHabilidade);
				$("#inputNvlHab"+k).val(response.habilidades[k-1].nvlHabilidade);
				$("#txtHab"+k).val(response.habilidades[k-1].infoHabilidade);
			}
		}
		
		/*Carregando Itens Místicos*/
		if(response.itensMisticos.length > 0){
			for(l=1; l<=response.itensMisticos.length; l++){				
				$("#inputDescItem"+l).val(response.itensMisticos[l-1].descItemMist);
				$("#inputBonusItem"+l).val(response.itensMisticos[l-1].bonusMist);
			}
		}

		/*Carregando Magias*/
		if(response.magias.length > 0){
			for(l=1; l<=response.magias.length; l++){				
				$("#inputMagia"+l).val(response.magias[l-1].descMagia);
				$("#txtInfoMagia"+l).val(response.magias[l-1].infoMagia);
			}
		}
	}
	
});