from rest_framework import serializers
from .models import Categoria, Produto, SubCategoria

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoria
        fields = ['id', 'nome', 'icon_name']

class CategoriaSerializer(serializers.ModelSerializer):
    # aqui, na “raiz” do serializer, defina subcategorias
    subcategorias = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        # agora inclui explicitamente subcategorias
        fields = ['id', 'nome', 'subcategorias']

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
