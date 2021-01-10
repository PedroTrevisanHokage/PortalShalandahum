$(document).ready(function(){
    $('#btnMagia').click(function(){
        $('#modalMagia div:first-child').remove();

        let htmlModal = '<div class="modal-dialog modal-dialog-centered" role="document">';
        htmlModal = htmlModal.concat('<div class="modal-content">');
        htmlModal = htmlModal.concat(headerModalAlma());
        htmlModal = htmlModal.concat(bodyModalAlma());
        htmlModal = htmlModal.concat(footerModalAlma());
        htmlModal = htmlModal.concat('</div></div>');
        $("#modalMagia").append(htmlModal);
    });
});

function headerModalAlma() {
    let htmlHeader = '<div class="modal-header">';
    htmlHeader = htmlHeader.concat('<h5 class="modal-title" id="exampleModalLabel">Quanto de Alma deseja gastar ?</h5>');
    htmlHeader = htmlHeader.concat('<button type="button" class="close" data-dismiss="modal" aria-label="Close">');
    htmlHeader = htmlHeader.concat('<span aria-hidden="true">&times;</span>');
    htmlHeader = htmlHeader.concat('</button>');
    htmlHeader = htmlHeader.concat('</div>');
    return htmlHeader;
}

function bodyModalAlma() {
    let htmlBody = '<div class="modal-body">';
    htmlBody = htmlBody.concat('<input type="text" id="txtQtdAlma" class="form-control" placeholder="Insira Qtde de Alma para gastar" aria-describedby="basic-addon1">');
    htmlBody = htmlBody.concat('<br/>');
    htmlBody = htmlBody.concat('<input type="text" id="txtBonusMisticoMA" class="form-control" placeholder="Insira Todos Bônus Místicos Aplicáveis" aria-describedby="basic-addon1">');
    htmlBody = htmlBody.concat('</div>');
    return htmlBody;
}

function footerModalAlma() {
    let htmlFooter = '<div class="modal-footer">';
    htmlFooter = htmlFooter.concat('<button type="button" id="btnCastarMagia" class="btn btn-primary">Castar Magia</button>');
    htmlFooter = htmlFooter.concat('<button type="button" id="btnDefMiAtvAlma" class="btn btn-primary">Defesa Mística Ativa</button>');
    htmlFooter = htmlFooter.concat('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
    htmlFooter = htmlFooter.concat('</div>');
    return htmlFooter;
}