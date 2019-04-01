import { ApiService } from './../../core/shared/api.service';
import { Component, OnInit } from '@angular/core';

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
  iniciados: number;
  cancelados: number;
  aguardando: number;
  concluidos: number;
  suspensos: number;

  dataSource: any;
  chartConfig: any;

  constructor(private api: ApiService) {
    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };
    this.api.getPlans().subscribe(data => {
      this.dataSource = {
        'chart': {
          'caption': 'Planos',
          'subCaption': 'Dados referentes aos status planos',
          'xAxisName': 'Status dos Planos',
          'yAxisName': 'Número de Planos',
          'numberSuffix': '',
          'theme': 'gammel',
        },
        'data': [{
          'label': 'Iniciados',
          'value':  data.filter(p => p.status === 'Iniciado').length
        }, {
          'label': 'Cancelados',
          'value': data.filter(p => p.status === 'Cancelado').length
        }, {
          'label': 'Aguardando',
          'value': data.filter(p => p.status === 'Aguardando início').length
        }, {
          'label': 'Suspensos',
          'value': data.filter(p => p.status === 'Suspenso').length
        }, {
          'label': 'Concluídos',
          'value': data.filter(p => p.status === 'Concluído').length
        }]
      };
     /*  this.iniciados = data.filter(p => p.status === 'Iniciado').length;
      this.cancelados = data.filter(p => p.status === 'Cancelado').length;
      this.aguardando = data.filter(p => p.status === 'Aguardando início').length;
      this.suspensos = data.filter(p => p.status === 'Suspenso').length;
      this.concluidos = data.filter(p => p.status === 'Concluído').length;
      console.log(this.iniciados, this.aguardando, this.cancelados, this.concluidos, this.iniciados, this.suspensos); */
    });
  }

  ngOnInit() {

  }
}
