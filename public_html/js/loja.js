// executa o código quando o documento estiver pronto (ready), ou seja, após 
// seu carregamento completo
$(document).ready(function () {

    // trata o evento input do slider min: quando mudar, deve atualizar o span 
    // minPreco e a lista de produtos, de acordo com o novo valor desse filtro
    $('#min').on('input', function () {
        atualizaMinPreco();
        atualizaProdutos();
    });

    // trata o evento input do slider max: quando mudar, deve atualizar o span 
    // maxPreco e a lista de produtos, de acordo com o novo valor desse filtro
    $('#max').on('input', function () {
        atualizaMaxPreco();
        atualizaProdutos();
    });

    // função para atualizar o span minPreco com o valor do slider min
    function atualizaMinPreco() {
        var min = $('#min').val();
        $('#minPreco').html(min);
    }

    // função para atualizar o span maxPreco com o valor do slider max
    function atualizaMaxPreco() {
        var max = $('#max').val();
        $('#maxPreco').html(max);
    }

    // função para carregar os produtos que estão no arquivo produtos.json
    function loadProdutos() {
        $.ajax({
            url: 'produtos.json',
            method: 'GET',
            success: function (data) {
                // coloca a lista de produtos que veio em data na nossa 
                // variável que guarda os produtos e chama a função para 
                // atualizar a lista
                produtos = data;
                atualizaProdutos();

                ajustaMinMax();
            }
        });
    }

    var produtos = [];

    // função para atualizar a lista de produtos de acordo com a variável 
    // produtos e de acordo com os filtros min e max
    function atualizaProdutos() {
        var min = $('#min').val();
        var max = $('#max').val();

        // limpa a lista, antes de preenchê-la com os produtos
        $('#produtos').html('');

        // passa pela nossa variável que guarda os produtos, filtrando-a de 
        // acordo com os valores em min e max
        for (p of produtos) {
            if (p.preco >= min && p.preco <= max) {
                $('#produtos').append('<li>' + p.nome + ' - ' + 'R$ ' + p.preco.toFixed(2) + '</li>');
            }
        }

        if ($('#produtos').html() === '') {
            $('#produtos').html('<li>Nenhum produto atende o critério especificado nos filtros...</li>')
        }
    }

    function ajustaMinMax() {
        var menorPreco = encontraMenorPreco();
        var maiorPreco = encontraMaiorPreco();

        $('#min').attr('min', menorPreco);
        $('#min').attr('max', maiorPreco);
        atualizaMinPreco();

        $('#max').attr('min', menorPreco);
        $('#max').attr('max', maiorPreco);
        atualizaMaxPreco();
    }

    function encontraMenorPreco() {
        var menor = 0;

        if (produtos.length > 0) {
            menor = produtos[0].preco;
            for (p of produtos) {
                if (p.preco < menor) {
                    menor = p.preco;
                }
            }
        }

        return menor;
    }

    function encontraMaiorPreco() {
        var maior = 0;

        if (produtos.length > 0) {
            maior = produtos[0].preco;
            for (p of produtos) {
                if (p.preco > maior) {
                    maior = p.preco;
                }
            }
        }

        return maior;
    }

    /* inicialmente, os spans minPreco e maxPreco estão sem valores; assim, 
     * quando o documento for carregado (ready), quero atualizar o minPreco e o 
     * maxPreco com os valores dos seus respectivos sliders; para isso, basta 
     * chamarmos as funções que fizemos para esse fim: */
    atualizaMinPreco();
    atualizaMaxPreco();

    /* além disso, queremos carregar os produtos que estão no servidor para 
     * dentro da lista de produtos que, inicialmente, está vazia; para isso, 
     * chamamos a função adequada: */
    loadProdutos();
});
