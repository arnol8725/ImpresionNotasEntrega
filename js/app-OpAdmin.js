var app = angular.module('appReimpresionNota', [
	'ngRoute',
	'ui.router',
	'ngDialog',
	'ADM-dateTimePicker'
]);

app.config(function($stateProvider, $urlRouterProvider) {
//app.config(function($routeProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('consultaReimpresionNota', {
	  //url: '/consultaPresupuestos/:numEmpleado',
	  url: '/consultaReimpresionNota?numempleado?estacion?',
	  templateUrl : 'vistas/ConsultaReimpresionNota.html',
	  controller: "consultaReimpresionNotaControlador"
	});
	
	$stateProvider
	.state('consultaDetallePedido', {
	  //url: '/consultaPresupuestos/:numEmpleado',
	  url: '/consultaDetallePedido?numempleado?estacion?',
	  templateUrl : 'vistas/ConsultaDetallePedido.html',
	  controller: "consultaDetallePedidoControlador"
	});

	/*
	$routeProvider
	.otherwise({redirectTo: '/consultaPresupuestos'})
    .when('/consultaPresupuestos', {
        templateUrl : 'vistas/ConsultaPresupuestos.html',
		controller: "consultaPresupuestosControlador"
    });
	*/
	
});

app.constant('WebService', {
  WS_SIST_INF: '/WebServicioTienda/WSSistemasInformacion.svc/json',
  WS_Impresion:'http://10.51.119.112:9001/WSDesTecAppsLocal',
  //WS_DetalleImpresion: '/WebServicioTienda/SurtimientoImpresion.svc/json',
  WS_DetalleImpresion: 'http://10.54.28.226/WebServicioTienda/SurtimientoImpresion.svc/json',
    //WS_DetalleImpresion: '/WebServicioTienda/SurtimientoImpresion.svc/json',
  WS_Detalle: 'http://10.54.28.226/WebServicioTienda/WSSurtimientoContado.svc/json',
  // WS_SIST_INFEPOS: 'http://10.54.28.226/WebServicioTienda/WSSistemasInfProducto.svc/json',

    WS_SIST_INFEPOS: 'http://ekt1460583.ad.elektra.com.mx:8071/WSSistemasInfProducto.svc/json',
 // WS_Detalle: 'http://localhost:10088/WSSurtimientoContado.svc/json',
  
    //WS_Detalle: '/WebServicioTienda/WSSurtimientoContado.svc/json',

});


app.config(['ADMdtpProvider', function(ADMdtp) {
    ADMdtp.setOptions({
        calType: 'gregorian',
		dtpType: 'date',
		format: 'DD/MM/YYYY',
        default: 'today',
		transition: false,
		autoClose: true,
		multiple: false,
		gregorianDic: {
			title: 'Español',
			monthsNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			daysNames: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
			todayBtn: "Hoy"
		}
    });
}]);