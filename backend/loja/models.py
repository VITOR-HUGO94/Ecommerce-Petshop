from django.db import models

ICON_CHOICES = [
    ('cat', 'Gato'),
    ('dog', 'Cachorro'),
    # … outros ícones possíveis …
]


class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class SubCategoria(models.Model):
    categoria = models.ForeignKey(Categoria, related_name='subcategorias', on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    icon_name = models.CharField(
        max_length=50,
        choices=ICON_CHOICES,
        default='cat',
        help_text='Ícone para esta subcategoria'
    )

    def __str__(self):
        return f"{self.categoria.nome} – {self.nome}"

class Produto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(
        SubCategoria,
        on_delete=models.CASCADE,
        verbose_name='Subcategoria',
        help_text='Escolha a subcategoria deste produto'
    )
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    imagem = models.ImageField(upload_to='produtos/')

    def __str__(self):
        return self.nome
