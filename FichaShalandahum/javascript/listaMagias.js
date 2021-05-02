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


    function CriaBotoesTempo(){

        var inner = "";
        objMagias.MagiasTempo.forEach(element => {
            
            inner = '<div class="input-group-prepend botaoMagia" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
                    $("#divMagiasTempo").html($("#divMagiasTempo").html() + inner);
        });
    }

    function CriaBotoesElemental(){

        var inner = "";
        objMagias.MagiasElemental.forEach(element => {
            
            inner = '<div class="input-group-prepend botaoMagia" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
                    $("#divMagiasElem").html($("#divMagiasElem").html() + inner);
        });
    }
    
    function CriaBotoesLuz(){

        var inner = "";
        objMagias.MagiasLuz.forEach(element => {
            
            inner = '<div class="input-group-prepend botaoMagia" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
                    $("#divMagiasLuz").html($("#divMagiasLuz").html() + inner);
        });
    }
    
    function CriaBotoesVazio(){

        var inner = "";
        objMagias.MagiasVazio.forEach(element => {
            
            inner = '<div class="input-group-prepend botaoMagia" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
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

        

        objMagias.MagiasTempo = magiasTempo;
    }

    function CriaObjMagiasElemental(){
        var magiasElemental = new Array();
        var magia;

        magia = {
            id: 2,
            escola: "ELEMENTAL",
            nome: "ABAFAR QUEDA",
            tipo: "Genérica",
            tempoConj: "instantanea",
            alcance: "Curto",
            custoMin: "1 alma/fé por alvo dentro do raio",
            duracao: "X turnos",
            detalhes: "Em um raio de 3 hexágonos partindo do conjurador, você pode escolher alvos igual a quantidade de alma/fé gasta (incluindo o conjurador).\n"+
                      "Quando em leda livre, você consegue fazer com que uma lufada de ar apare a queda.\n"+ 
                      "O dano que seria gerado pela queda é reduzido em um total de d10 para cada 2 alma/fé gastas"
        }
        magiasElemental.push(magia);

        objMagias.MagiasElemental = magiasElemental;
    }

    function CriaObjMagiasLuz(){
        var magiasLuz = new Array();
        var magia;

        magia = {
            id: 3,
            escola: "LUZ",
            nome: "LUZ DE LAIEN",
            tipo: "Divina",
            tempoConj: "Ação + Movimento",
            alcance: "Curto",
            custoMin: "1 fé",
            duracao: "qtd fé gasta (sem x2) em turnos",
            detalhes: "Não pode ser feita por usuário sem crença.\n"+
                      "Clarão de luz invade o espaço.\n"+ 
                      "Alvos crença nula, ou diferente de Laien, devem fazer teste místico ou ficam cegos por tempo baseado na qtd de fé gasta"
        }
        magiasLuz.push(magia);

        objMagias.MagiasLuz = magiasLuz;
    }

    function CriaObjMagiasVazio(){
        var magiasVazio = new Array();
        var magia;

        magia = {
            id: 4,
            escola: "VAZIO",
            nome: "CANCELAR MAGIA ",
            tipo: "Genérica",
            tempoConj: "1 Esforço",
            alcance: "Longo, 1 alvo",
            custoMin: "veja a descrição",
            duracao: "Instântânea",
            detalhes: "O conjurador precisa ver o alvo castar uma magia\n"+
                      "Essa magia deve ser usada fora do seu turno, para tal necessita-se gastar um esforço para realizar uma ação fora de seu turno.\n"+
                      "No momento em que o alvo fizer uma magia você pode gastar uma quantidade de alma/fé que você acha que seja igual ou superior à alma/fé que o alvo está utilizando, então a magia do alvo é cancelada"
            
        }
        magiasVazio.push(magia);

        objMagias.MagiasVazio = magiasVazio;
    }


});