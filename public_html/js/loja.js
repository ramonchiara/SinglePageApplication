// executa o código quando o documento estiver pronto (ready), ou seja, após 
// seu carregamento completo
$(document).ready(function () {
    var produtos = [];
    
    $('#view').load('views/principal.html', loadPrincipal);

    $(window).on('hashchange', function () {
        var hash = window.location.hash;
        var id = hash.substring(1);

        if (id === '') {
            $('#view').load('views/principal.html', loadPrincipal);
        } else {
            $('#view').load('views/produto.html', function () {
                loadProduto(id);
            });
        }
    });

    function loadPrincipal() {
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
                    $('#produtos').append('<div class="col-xs-12 col-sm-4"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + p.nome + '</h3></div><div class="panel-body"><p>R$ ' + p.preco.toFixed(2) + '</p><p><a href="#' + p.id + '" class="btn btn-info">Detalhes</a></p></div></div></div>');
                }
            }

            if ($('#produtos').html() === '') {
                $('#produtos').html('<div class="col-xs-12"><p class="alert alert-warning">Nenhum produto atende o critério especificado nos filtros...</p></div>')
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
    }

    function loadProduto(id) {
        var p = encontraProduto(id);

        $('#nome').html(p.nome);
        $('#imagem').attr('src', 'http://lorempixel.com/100/100/abstract/' + id);
        $('#imagem').attr('alt', p.nome);
        $('#preco').html(p.preco.toFixed(2));
    }

    function encontraProduto(id) {
        var produto = null;

        for (p of produtos) {
            if (p.id == id) {
                produto = p;
                break;
            }
        }

        return produto;
    }

});
