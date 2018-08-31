var app = angular.module('appConsultaPresupuestos', [
	'ngRoute',
	'ui.router',
	'ngDialog',
	'ADM-dateTimePicker'
]);

app.config(function($stateProvider, $urlRouterProvider) {
//app.config(function($routeProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('consultaPresupuestos', {
	  //url: '/consultaPresupuestos/:numEmpleado',
	  url: '/consultaPresupuestos?empleado?',
	  templateUrl : 'vistas/ConsultaPresupuestos.html',
	  controller: "consultaPresupuestosControlador"
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
  WS_SIST_INF: '/WebServicioTienda/WSSistemasInformacion.svc/json'
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