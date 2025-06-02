from django.contrib import admin
from .models import Categoria, SubCategoria, Produto

class SubCategoriaInline(admin.TabularInline):
    model = SubCategoria
    extra = 1
    fields = ('nome', 'icon_name')

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    inlines = [SubCategoriaInline]

@admin.register(SubCategoria)
class SubCategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'icon_name')
    list_filter = ('categoria',)
    
@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'preco')
    list_filter = ('categoria',)
    search_fields = ('nome', 'descricao')