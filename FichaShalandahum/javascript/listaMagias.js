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


    function CriaBotoesTempo(){

        var inner = "";
        objMagias.MagiasTempo.forEach(element => {
            
            inner = '<div class="input-group-prepend botaoMagia" >'+
                    '   <button type="button" id="'+element.id+'" class="btn btn-primary btn-sm btn-block ">'+element.nome+'</button>'+
                    '</div>';

            
                    $("#divMagiasTempo").html($("#divMagiasTempo").html() + inner);
        });
    }
    
    function CriaObjMagiasTempo(){
        var magiasTempo = new Array();
        var magia;

        magia = {
            id: 1,
            escola: "TEMPO",
            nome: "teste",
            tipo: "tipo teste",
            tempoConj: "instantanea",
            alcance: "x alcance",
            custoMin: "X alma/fé",
            duracao: "X turnos",
            detalhes: "ESTA MAGIA FAZ O MUNDO ACABAR"
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
            nome: "teste",
            tipo: "tipo teste",
            tempoConj: "instantanea",
            alcance: "x alcance",
            custoMin: "X alma/fé",
            duracao: "X turnos",
            detalhes: "ESTA MAGIA FAZ O MUNDO ACABAR"
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
            nome: "teste",
            tipo: "tipo teste",
            tempoConj: "instantanea",
            alcance: "x alcance",
            custoMin: "X alma/fé",
            duracao: "X turnos",
            detalhes: "ESTA MAGIA FAZ O MUNDO ACABAR"
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
            nome: "teste",
            tipo: "tipo teste",
            tempoConj: "instantanea",
            alcance: "x alcance",
            custoMin: "X alma/fé",
            duracao: "X turnos",
            detalhes: "ESTA MAGIA FAZ O MUNDO ACABAR"
        }
        magiasVazio.push(magia);

        objMagias.MagiasVazio = magiasVazio;
    }


});