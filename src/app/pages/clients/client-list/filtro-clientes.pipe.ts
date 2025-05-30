import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {
  transform(clientes: any[], texto: string): any[] {
    if (!texto) return clientes;

    texto = texto.toLowerCase();

    return clientes.filter(c =>
      c.nombre?.toLowerCase().includes(texto) ||
      c.apellidos?.toLowerCase().includes(texto) ||
      c.email?.toLowerCase().includes(texto)
    );
  }
}
