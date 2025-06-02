from django.urls import path
from .views import CategoriaList, ProdutoList, ProdutoPorCategoria, CheckoutView, ProdutoDetail, ProdutoPorCategoria,CategoriaDetail

urlpatterns = [
    path('categorias/', CategoriaList.as_view()),
    path('categorias/<int:pk>/', CategoriaDetail.as_view()),
    path('produtos/', ProdutoList.as_view()),
    path('produtos/<int:pk>/', ProdutoDetail.as_view(), name='produto-detail'),
    path('produtos/categoria/<int:categoria_id>/', ProdutoPorCategoria.as_view()),
    path('produtos/categoria/<int:categoria_id>/', ProdutoPorCategoria.as_view(), name='produtos-por-categoria'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    
]