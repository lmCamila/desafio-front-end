import { ApiService } from './../../core/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs/operators';

interface Data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  chart = false;
  title = 'Meus Planos';
  type = 'PieChart';
  data: any;
  columnNames: any;
  options: any;
  width = '500';
  height = '320';
  iniciados: number;
  cancelados: number;
  aguardando: number;
  concluidos: number;
  suspensos: number;
  chartConfig: any;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getPlans().subscribe(result => {
      this.iniciados = result.filter(p => p.status === 'Iniciado').length;
      this.cancelados = result.filter(p => p.status === 'Cancelado').length;
      this.aguardando = result.filter(p => p.status === 'Aguardando início').length;
      this.suspensos = result.filter(p => p.status === 'Suspenso').length;
      this.concluidos = result.filter(p => p.status === 'Concluído').length;
      this.data = [
        [ 'Iniciados', this.iniciados],
        ['Cancelados', this.cancelados],
        [ 'Aguardando Inicio', this.aguardando],
        [ 'Suspenso', this.suspensos],
        [ 'Concluído', this.concluidos],
      ];
      this.columnNames = ['Planos', 'Quantidade de planos'];
      this.options = {
        colors: ['#e0440e', '#DF0101', '#0174DF', '#FFFF00', '#298A08'],
        is3D: true
      };
      this.chart = true;
    });
  }
}
