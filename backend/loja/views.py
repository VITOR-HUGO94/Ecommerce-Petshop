from rest_framework import generics
from .models import Categoria, Produto
from .serializers import CategoriaSerializer, ProdutoSerializer
from rest_framework.response import Response
import requests
import mercadopago
from rest_framework.views import APIView
from django.db.models import Q



class CategoriaDetail(generics.RetrieveAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CategoriaList(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProdutoList(generics.ListAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        queryset = Produto.objects.all()
        search = self.request.query_params.get('search', None)
        subcat = self.request.query_params.get('subcategoria')
        if search:
            queryset = queryset.filter(
                Q(nome__icontains=search) | Q(descricao__icontains=search)
            )
             
        if subcat:
            queryset = queryset.filter(subcategoria_id=subcat)
        return queryset

class ProdutoDetail(generics.RetrieveAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class ProdutoPorCategoria(generics.ListAPIView):
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        categoria_id = self.kwargs['categoria_id']
        return Produto.objects.filter(categoria_id=categoria_id)

sdk = mercadopago.SDK("APP_USR-2262962966486985-050120-faf2b3c3ae6ea011ba6539e359e45292-2371695889")


class CheckoutView(APIView):
    def post(self, request):
        produtos = request.data.get('produtos', [])

        # Garante que produtos existe
        if not produtos:
            return Response({'error': 'Nenhum produto enviado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Monta os itens no formato correto
        items = []
        for produto in produtos:
            item = {
                "title": produto.get('nome', 'Produto sem nome'),  # ou use 'title' direto se vier assim do frontend
                "description": produto.get('descricao', 'Sem descrição'),  # opcional
                "currency_id": "BRL",  # ou "$" se você quiser exatamente o que mandou
                "quantity": produto.get('quantidade', 1),
                "unit_price": float(produto.get('preco', 0))
            }
            items.append(item)

        # Cria a preferência
        preference_data = {
            "items": items,
            ##"payer": {"email": "test_user_736015294@testuser.com"},
        }

        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]

        # Retorna o link para o React redirecionar
        return Response({"init_point": preference.get("init_point")})
