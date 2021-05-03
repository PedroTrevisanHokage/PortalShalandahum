$(document).ready(function () {

    var objMagias;
    objMagias = {
        MagiasTempo: null,
        MagiasElemental: null,
        MagiasLuz: null,
        MagiasVazio: null
    }


    CriaObjMagiasTempo();
    CriaObjMagiasElemental();
    CriaObjMagiasLuz();
    CriaObjMagiasVazio();
    console.log(objMagias);
    CriaBotoesTempo();
    CriaBotoesElemental();
    CriaBotoesLuz();
    CriaBotoesVazio();

     AtribuirAcaoBotao();

    function AtribuirAcaoBotao(){
        $(".tempo").click(function () {
            ExibeMagiaTempo(this.id, "TEMPO");
        });
        
        $(".elemental").click(function () {
			ExibeMagiaTempo(this.id, "ELEMENTAL");
        });
        
        $(".luz").click(function () {
			ExibeMagiaTempo(this.id, "LUZ");
        });
        
        $(".vazio").click(function () {
			ExibeMagiaTempo(this.id, "VAZIO");
        });       

    }
    
    function ExibeMagiaTempo(idMagia, escola){
        
        var obj;

        if(escola == 'TEMPO'){
            obj = objMagias.MagiasTempo.find(function(_obj){
                return _obj.id == idMagia;
            });
        }else if(escola == 'ELEMENTAL'){
            obj = objMagias.MagiasElemental.find(function(_obj){
                return _obj.id == idMagia;
            });
        }else if(escola == 'LUZ'){
            obj = objMagias.MagiasLuz.find(function(_obj){
                return _obj.id == idMagia;
            });
        }else if(escola == 'VAZIO'){
            obj = objMagias.MagiasVazio.find(function(_obj){
                return _obj.id == idMagia;
            });
        }

        $("#inputNomeMagia").val(obj.nome);
        $("#inputTipoMagia").val(obj.tipo);
        $("#inputTempoConj").val(obj.tempoConj);
        $("#inputAlcance").val(obj.alcance);
        $("#inputCustoMin").val(obj.custoMin);
        $("#inputDuracao").val(obj.duracao);
        $("#txtDetalhesMagia").val(obj.detalhes);

        $("#modalDadosMagia").modal('show');
    }
    
    
    function CriaBotoesTempo(){

        var inner = "";
        objMagias.MagiasTempo.forEach(element => {
            
            inner = '<div id="'+element.id+'" class="input-group-prepend botaoMagia tempo" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
            $("#divMagiasTempo").html($("#divMagiasTempo").html() + inner);
        });
    }

    function CriaBotoesElemental(){

        var inner = "";
        objMagias.MagiasElemental.forEach(element => {
            
            inner = '<div id="'+element.id+'" class="input-group-prepend botaoMagia elemental" >'+
                    '   <button type="button" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
            $("#divMagiasElem").html($("#divMagiasElem").html() + inner);
        });
    }
    
    function CriaBotoesLuz(){

        var inner = "";
        objMagias.MagiasLuz.forEach(element => {
            
            inner = '<div id="'+element.id+'" class="input-group-prepend botaoMagia luz" >'+
                    '   <button type="button" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
            $("#divMagiasLuz").html($("#divMagiasLuz").html() + inner);
        });
    }
    
    function CriaBotoesVazio(){

        var inner = "";
        objMagias.MagiasVazio.forEach(element => {
            
            inner = '<div id="'+element.id+'" class="input-group-prepend botaoMagia vazio" >'+
                    '   <button type="button" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
            $("#divMagiasVazio").html($("#divMagiasVazio").html() + inner);
        });
    }
    
    function CriaObjMagiasTempo(){
        var magiasTempo = new Array();
        var magia;

        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "ACELERAÇÃO",
            tipo: "Alma",
            tempoConj: "Ação (instantâneo)",
            alcance: "Pessoal ou Toque",
            custoMin: "3 de alma",
            duracao: "1 turno",
            detalhes: "O alvo do toque do místico torna-se extremamente veloz em suas ações, conjurações e movimentação. Suas ações têm seu tempo de 'casting' cortados pela metade (se levarem 1 rodada tornam-se instantâneos, ou seja, consomem apenas a ação daquele turno) e sua movimentação é dobrada naquele turno.\n"+
                      "O tempo de duração pode ser aumentado conforme mais alma for gasta na conjuração. (preciso de ajuda nos custos)."
        }
        magiasTempo.push(magia);

        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "ENVELHECER",
            tipo: "Divina, Fé",
            tempoConj: "ação + movimento",
            alcance: "Toque",
            custoMin: "4 fé",
            duracao: "não se aplica",
            detalhes: "Alvo em Humanóides:\n"+
            "O alvo deve fazer um teste místico, caso falhe ele perde tempo de vida e envelhece um numero de anos igual à fé gasta\n"+
            "(Para determinar a CD do teste místico use 1d10 + (fé gasta x2) + Bônus Místicos Aplicáveis\n"+
            "\n"+
            "Alvo em Objetos:\n"+
            "O alvo perde resistência, dureza, cores e visivelmente fica mais antigo.\n"+
            "Objetos que oferecem resistência para quebrar ou romper, abaixam sua CD em 1 para cada 2 fé gasta"
            
        }
        magiasTempo.push(magia);
        
        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "ESQUIVA SOBRENATURAL",
            tipo: "Alma",
            tempoConj: "Ação + Movimento",
            alcance: "pessoal ou toque",
            custoMin: "1 de alma",
            duracao: "cena",
            detalhes: "Alvo ganha bônus ao total ao usar movimento de esquiva. Bônus = (qtd alma gasta)x2"
        }
        magiasTempo.push(magia);
       
        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "MOMENTO FUGAZ",
            tipo: "Alma",
            tempoConj: "Ação (instantâneo)",
            alcance: "Curto",
            custoMin: "4 de alma",
            duracao: "Uma rodada a partir da conjuração",
            detalhes: "Num estalar de dedos o tempo é congelado para seu alvo. Como movendo-se por um ar muito denso a movimentação do alvo é negada pela duração  e o jogador é movido para o último lugar na ordem de iniciativa. Dando clara vantagem a todos os seus aliados.\n"+
            "O tempo de duração pode ser aumentado conforme mais alma for gasta na conjuração. (preciso de ajuda nos custos)."
            
        }
        magiasTempo.push(magia);
        
        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "SONO",
            tipo: "Genérica",
            tempoConj: "ação + movimento",
            alcance: "Curto",
            custoMin: "1 Alma/Fé",
            duracao: "Veja Descrição",
            detalhes: "Até 3 alvos dentro de um raio de 3 hexágonos partindo de você, devem fazer um teste místico ou dormem por um rodadas iguais à quantidade de alma/fé gasta"
        }
        magiasTempo.push(magia);
        
        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "VISLUMBRE FUTURO",
            tipo: "Alma",
            tempoConj: "Ação (instantâneo)",
            alcance: "Pessoal ou Toque",
            custoMin: "3 de alma",
            duracao: "Um turno",
            detalhes: "O usuário ou receptor do feito místico (preciso de um nome melhor, magia?) recebe uma divinação de um momento no futuro. Em combate garante uma defesa ou esquiva perfeita ao usuário e um contra-ataque automáticos. \n"+
            "Fora de combate pode revelar nomes de pessoas, locais ou objetos importantes. A aparência de alguma criatura perigosa ou aliada. Trechos de conversa ou momentos chave que ocorrerão no futuro. Porém essa divinação é sempre muito vaga. \n"+
            "\n"+
            "A quantidade e qualidade das informações pode ser aumentado conforme mais alma for gasta na conjuração. (preciso de ajuda nos custos)"
            
        }
        magiasTempo.push(magia);

        var contador = 1000;
        magiasTempo.forEach(element => {
            element.id = contador++;
        });

        objMagias.MagiasTempo = magiasTempo;
    }

    function CriaObjMagiasElemental(){
        var magiasElemental = new Array();
        var magia;

        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "ABAFAR QUEDA",
            tempoConj: "instantanea",
            duracao: "X turnos",
            alcance: "Curto",
            custoMin: "1 alma/fé por alvo dentro do raio",
            tipo: "Genérica",
            detalhes: "Em um raio de 3 hexágonos partindo do conjurador, você pode escolher alvos igual a quantidade de alma/fé gasta (incluindo o conjurador).\n"+
                      "Quando em leda livre, você consegue fazer com que uma lufada de ar apare a queda.\n"+ 
                      "O dano que seria gerado pela queda é reduzido em um total de d10 para cada 2 alma/fé gastas"
        }
        magiasElemental.push(magia);

        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "ÁREA CONGELADA",
            tempoConj: "1 ação",
            duracao: "Cena",
            alcance: "Longo",
            custoMin: "3 alma/fé",
            tipo: "Genérica",
            detalhes: "Você cria uma área de gelo escorregadio de 10 hexágonos de raio e estática.\n"+
            "Essa área não avança por onde não houver terreno (não cria pontes)\n"+
            "Todos (inimigos ou aliados, incluindo o conjurador) que avançarem por mais de um hexágono nessa área devem fazer um teste de DES, caso bem sucedido pode avançar, caso negativo escorrega e cai no chão assumindo o a condição 'Caído'"
            
        }
        magiasElemental.push(magia);
        
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "ARMADURA MÍSTICA ELEMENTAL",
            tempoConj: "Ação",
            duracao: "fim do próximo turno do receptor",
            alcance: "Pessoal ou Toque",
            custoMin: "1 alma/fé",
            tipo: "Genérica",
            detalhes: "Escolha um elemento (Fogo, água,terra ou ar) no momento que escolher essa magia para sua lista.\n"+ 
            "Armadura Extra Mística baseado no quanto de alma/fé foi gasta x2 (regras normais de utilização de alma/fé).\n"+ 
            "\n"+
            "Reduza dano do tipo da armadura em 2."
            
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "BARREIRA ELEMENTAL",
            tempoConj: "Ação + Movimento",
            duracao: "fim do próximo turno do conjurador",
            alcance: "Curto",
            custoMin: " 4 Alma/Fé",
            tipo: "Genérica",
            detalhes: "Escolha um elemento (Fogo, água,terra ou ar) (Nar, Ma'an, 'ard, alhawa') no momento que escolher essa magia para sua lista.\n"+ 
            "Cria uma barreira de 1 hex de largura x 2 hex de altura.\n"+
            "Alvo deve ser bem sucedido em um teste de Vigor ou Místico para transpassar a barreira ou tomará dano baseado na qtd alma foi gasta x2 (regras normais de utilização de alma/fé).\n"+
            "O comprimento da barreira é equivalente à alma/fé gasta (sem x2) em hexágonos.\n"+
            "Você pode fazer com que a barreira faça curvas ou rodeie apenas um alvo.\n"+
            "Caso você deseje manter a barreira, você usa sua ação para utilizar novamente o quanto desejar de alma/fé."
            
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "EMPURRÃO DE AR",
            tempoConj: "1 ação",
            duracao: "Instantânea",
            alcance: "Curto",
            custoMin: "1 alma/fé",
            tipo: "Genérica",
            detalhes: "Você faz um ataque místico contra o alvo, além do dano místico o alvo faz um teste de VIG contra uma CD = 5 + (alma/fé gasta x2), caso não for bem sucedido ele será empurrado em um número de hexágonos igual a alma/fé gasta.\n"+
            "Caso o teste de VIG do alvo seja uma falha crítica (1 natural), além de ser empurrado, o alvo cai no chão"
            
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "ESQUENTAR METAL",
            tempoConj: "1 ação",
            duracao: "1 rodada por concentração",
            alcance: "Toque ou Curto",
            custoMin: "2 alma/fé por alvo",
            tipo: "Genérica",
            detalhes: "O alvo dessa magia é qualquer superfície metálica\n"+
            "O metal começa a esquentar gradativamente entre as rodadas a base de 5ºC por rodada\n"+
            "É necessário manter concentração no alvo, sendo assim, caso queira sustentar essa magia, o conjurador não pode fazer outra magia q exija concentração\n"+
            "A magia dura por um número de rodadas igual a alma/fé gasta ou até o conjurador deixar de se concentrar ou então até que o conjurador deseje findar"
            
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "EXPLOSÃO PÍRICA",
            tempoConj: " 1 Ação + Movimento",
            alcance: "Curto (ESF pode aumentar para Longo)",
            duracao: "Instantânea",
            custoMin: "3 alma/fé",
            tipo: "Genérica",
            detalhes: "O conjurador abre mão de seu movimento para focalizar a alma/fé gasta dentro de si e então usa sua ação para liberá-la em uma explosão de calor que atinge todos (aliados e inimigos, até mesmo objetos) em um raio de 3 hexágonos.\n"+
            "Porém o dano não transpassa objetos, sendo assim todos que estiverem atras de algo  grande o bastante para proteger seu corpo inteiro não levará dano.\n"+
            "O dano é calculado normalmente porém quem estiver nos hexágonos adjacentes ao do conjurador levarão o dano+1\n"+
            "(Cálculo do dano: 1d10 + (alma/fé gasta x2) + Bônus Místicos Aplicáveis)"
            
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "RAJADA ELEMENTAL",
            tempoConj: "Ação",
            alcance: "Longo",
            duracao: "Instantânea",
            custoMin: "1 alma/fé",
            tipo: "Genérica",
            detalhes: "Escolha um elemento (Fogo, água,terra ou ar) no momento que escolher essa magia para sua lista.\n"+ 
            "Realize um ataque místico usando o elemento escolhido usando as regras nomais de conjuração (Dano Místico =  1d10 + (alma/fé x2) + Bônus Aplicáveis)."
        }
        magiasElemental.push(magia);
        magia = {
            id: 1,
            escola: "ELEMENTAL",
            nome: "TREMOR",
            tempoConj: "1 ação ",
            alcance: "Longo",
            duracao: "Leia Descrição",
            custoMin: "1 alma/fé",
            tipo: "Genérica",
            detalhes: "Em um raio de 10 hexágonos partindo do conjurador, o chão passa a tremer, tornando terreno difícil para os demais que estiverem dentro do raio.\n"+
            "A magia dura um número de rodadas igual a qauntidade de alma/fé gasta. Em ação livre conte 5 minutos\n"+
            "(Em terreno difícil 1 hexágono conta como 2, sendo assim a movimentação é limitada porém não impossível)\n"+
            "\n"+
            "Caso um personagem esteja em concentração dentro do raio de ação, deve fazer teste de SENT para se manter concentrado pela duração.\n"+
            "(CD do teste é 5 + (alma/fé gasta x2))"
        }
        magiasElemental.push(magia);

        
        
        var contador = 2000;
        magiasElemental.forEach(element => {
            element.id = contador++;
        });

        objMagias.MagiasElemental = magiasElemental;
    }

    function CriaObjMagiasLuz(){
        var magiasLuz = new Array();
        var magia;

        magia = {
            id: 1,
            escola: "LUZ",
            nome: "ABENÇOAR ALIMENTO/LÍQUIDO",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "ESPADA DE LAIEN",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "JUSTIÇA DE LAIEN",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
       
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "LUZ DE LAIEN",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "MENSAGEM",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "PRESENÇA DE LAIEN",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "RAIO PRISMÁTICO",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);
        
        magia = {
            id: 1,
            escola: "LUZ",
            nome: "VISÃO VERDADEIRA",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasLuz.push(magia);

        var contador = 3000;
        magiasLuz.forEach(element => {
            element.id = contador++;
        });

        objMagias.MagiasLuz = magiasLuz;
    }

    function CriaObjMagiasVazio(){
        var magiasVazio = new Array();
        var magia;

        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "AMALDIÇOAR",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "CANCELAR MAGIA",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "IMAGEM ILUSÓRIA",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "MOMENTO DE INSANIDADE",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "SUSSURROS DISSONANTES",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "SUSPIRO DE VIDA",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);
        
        magia = {
            id: 1,
            escola: "VAZIO",
            nome: "ZONA ESCURA",
            tempoConj: "",
            alcance: "",
            duracao: "",
            custoMin: "",
            tipo: "",
            detalhes: ""
        }
        magiasVazio.push(magia);

        var contador = 4000;
        magiasVazio.forEach(element => {
            element.id = contador++;
        });

        objMagias.MagiasVazio = magiasVazio;
    }


});